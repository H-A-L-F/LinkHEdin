import { useQuery } from "@apollo/client";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../config/constants";
import { toastError, toastSuccess } from "../config/toast";
import { sendImage } from "../lib/image";
import { USER_FETCH_QUERY } from "../query/user";
import { useAuth } from "./useAuth";
import { useLoading } from "./useLoading";

const backEndContext = createContext({} as any)

export function ProvideBackEnd({ children }: { children: JSX.Element }) {
    const auth = useProvideBackEnd();
    return <backEndContext.Provider value={auth}>{children}</backEndContext.Provider>;
}

export const useBackEnd = () => {
    return useContext(backEndContext);
};

function useProvideBackEnd() {
    const { setLoading } = useLoading()
    const navigate = useNavigate()
    const { user, setUser } = useAuth()
    const { refetch } = useQuery(USER_FETCH_QUERY);

    function login(loginFunc: Promise<any>) {
        setLoading(true)

        loginFunc.then((res) => {
            const user = res.data.login
            console.log(user)
            setUser(user)
            setLoading(false)
            navigate(ROUTE.ROUTE_HOME)
        })

        loginFunc.catch((err) => {
            setLoading(false)
            console.log(err)
            toastError(err)
        })
    }

    function register(registerFunc: Promise<any>) {
        setLoading(true)

        registerFunc.then((res) => {
            toastSuccess("Succesfully created user")
            const data = res.data
            if (data && data.register.token !== undefined) {
                setLoading(false)
                navigate(ROUTE.ROUTE_LOGIN)
            }
        })

        registerFunc.catch((err) => {
            setLoading(false)
            console.log(err.message)
            toastError("Fill all field properly!")
        })
    }

    function validateUser(validateUserFunc: Promise<any>) {
        setLoading(true)

        validateUserFunc.then((res) => {
            setLoading(false)
            navigate(ROUTE.ROUTE_LOGIN)
        })

        validateUserFunc.catch((err) => {
            setLoading(false)
            toastError("Please check your code again!")
        })
    }

    function reqChangePass(reqChangePassFunc: Promise<any>) {
        setLoading(true)

        reqChangePassFunc.then((res) => {
            setLoading(false)
            toastSuccess("Password reset link has been sent to your email.")
        })

        reqChangePassFunc.catch((err) => {
            setLoading(false)
            console.log(err)
            toastError(err)
        })
    }

    function validateChangePassReq(validateChangePassFunc: Promise<any>, setAuthorized: React.Dispatch<React.SetStateAction<boolean>>) {
        setLoading(true)

        validateChangePassFunc.then((res) => {
            setLoading(false)
            toastSuccess("Code correct")
            setAuthorized(true)
            return true
        })

        validateChangePassFunc.catch((err) => {
            setLoading(false)
            toastError(err)
        })
    }

    function changePass(changePassFunc: Promise<any>) {
        setLoading(true)

        changePassFunc.then((res) => {
            setLoading(false)
            toastSuccess("Successfully change password")
            navigate(ROUTE.ROUTE_LOGIN)
        })

        changePassFunc.catch((err) => {
            setLoading(false)
            toastError(err)
            console.log(err)
        })
    }

    function refetchUser() {
        setLoading(true)
        refetch()
            .then((resp) => {
                const newUser = { ...resp.data.whoisme, token: user.token };
                console.log("new user : ", newUser);
                setUser(newUser)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                toastError(err.message);
            });
    }

    // function constructUpdateUser(name?: string, email?: string, profpict?: string, headline?: string, bgphoto?: string) {
    //     return {
    //         Name: name,
    //         Email: email,
    //         PhotoProfile: profpict,
    //         Headline: headline,
    //         BgPhotoProfile: bgphoto,
    //     }
    // }

    function constructUpdateUser(input: { name?: string, email?: string, profpict?: string, headline?: string, bgphoto?: string }) {
        return {
            Name: input.name,
            Email: input.email,
            PhotoProfile: input.profpict,
            Headline: input.headline,
            BgPhotoProfile: input.bgphoto,
        }
    }

    async function uploadImage(img: any) {
        setLoading(true)
        await sendImage(img)
            .then((url) => {
                setLoading(false)
                return url
            })
            .catch((err) => {
                setLoading(false)
                toastError(err)
                return ""
            })
    }

    function updateProfilePict(updateFunc: Promise<any>) {
        setLoading(true)

        updateFunc.then(() => {
            setLoading(false);
            refetchUser();
            toastSuccess("Profile picture changed");
        })

        updateFunc.catch((err) => {
            setLoading(false);
            toastError(err.message);
        });
    }

    function setProfilePict() {

    }

    return {
        login,
        register,
        validateUser,
        reqChangePass,
        validateChangePassReq,
        changePass,
        refetchUser,
        constructUpdateUser,
        uploadImage,
        updateProfilePict
    }
}