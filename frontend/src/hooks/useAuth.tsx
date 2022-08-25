import { useContext, createContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const authContext = createContext({} as any);

export function ProvideAuth({ children }: { children: JSX.Element }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useLocalStorage("user", undefined)

    return {
        user,
        setUser
    }
}