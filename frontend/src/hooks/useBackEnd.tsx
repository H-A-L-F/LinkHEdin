import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../config/constants";
import { toastError, toastSuccess } from "../config/toast";
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
    const {setUser} = useAuth()

    function login(loginFunc: Promise<any>) {
        setLoading(true)

        loginFunc.then((res) => {
            const user = res.data
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

    return {
        login,
        register,
        validateUser,
        reqChangePass
    }
}