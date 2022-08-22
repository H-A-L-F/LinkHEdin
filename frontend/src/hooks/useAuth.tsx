import { useContext, createContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const authContext = createContext({} as any);
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: { children: JSX.Element }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useLocalStorage("user", null)

    // function login(email: string, password: string) {
    //     const [loginFunc] = useMutation(LOGIN_QUERY)

    //     setLoading(true)
    //     loginFunc({ variables: { email: email, password: password } }).then((res) => {
    //         const data = res.data;
    //         if (data && data.login.token !== "undefined") {
    //             console.log(data.login)
    //             setUser(data.login)
    //             setLoading(false)
    //             navigate("/home")
    //         }
    //     }).catch((err) => {
    //         setLoading(false)
    //         console.log(err.message)
    //         toastError(err)
    //     })
    // }

    return {
        user,
        setUser
    }
}