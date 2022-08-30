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
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
    const [user, setUser] = useLocalStorage("user", undefined)

    function changeTheme() {
        theme === "dark" ? setTheme("light") : setTheme("dark")
    }

    return {
        user,
        setUser,
        theme,
        changeTheme,
    }
}