import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../config/toast";
import { LOGIN_QUERY, REGISTER_QUERY } from "../query/user";

export function loginUser(email: string, password: string) {
    const [loginFunc] = useMutation(LOGIN_QUERY)
    return loginFunc({ variables: { email: email, password: password } })
}

// export function registerUser(name: string, email: string, password: string) {
//     const [registerFunc] = useMutation(REGISTER_QUERY);
//     const input = {
//         name: name,
//         email: email,
//         password: password,
//     };
//     return registerFunc({ variables: { input: input } });
// }

export function registerUser(registerFunc: Promise<any>, setLoading: React.Dispatch<React.SetStateAction<boolean>>): boolean {
    const navigate = useNavigate()

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
        toastError(err)
    })
    return false
}