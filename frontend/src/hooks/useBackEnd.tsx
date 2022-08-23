import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
    // const [registerFunc] = useMutation(REGISTER_QUERY)

    // function register(name: string, email: string, password: string) {
    //     const input = {
    //         name: name,
    //         email: email,
    //         password: password,
    //     }

    //     setLoading(true)
    //     const mutation = registerFunc({ variables: { input: input } })

    //     mutation.then((res) => {
    //         toastSuccess("Succesfully created user")
    //         const data = res.data
    //         if (data && data.register.token !== undefined) {
    //             setLoading(false)
    //             navigate("/login")
    //         }
    //     })

    //     mutation.catch((err) => {
    //         setLoading(false)
    //         console.log(err.message)
    //         toastError(err)
    //     })
    // }

    function login(loginFunc: Promise<any>) {
        setLoading(true)

        loginFunc.then((res) => {
            const user = res.data
            console.log(user)
            setUser(user)
            setLoading(false)
            navigate("/home")
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
                navigate("/login")
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
            navigate("/login")
        })

        validateUserFunc.catch((err) => {
            setLoading(false)
            toastError("Please check your code again!")
        })
    }

    return {
        login,
        register,
        validateUser
    }
}