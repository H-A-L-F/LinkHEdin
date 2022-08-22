import React, { useState, useEffect, useContext, createContext } from "react";
import { register } from "../controller/userController";
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
    
    return {
        user,
        setUser
    }
}