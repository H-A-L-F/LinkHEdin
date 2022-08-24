import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useMedia } from "./useMedia";

export function useDarkMode() {

    const [enabledState, setEnabledState] = useLocalStorage<boolean>(
        "dark-mode-enabled",
        false
    );

    const prefersDarkMode = usePrefersDarkMode();

    const enabled = enabledState ?? prefersDarkMode;

    useEffect(
        () => {
            const className = "dark-mode";
            const element = window.document.body;
            if (enabled) {
                setDark()
                element.classList.add(className);
            } else {
                setLight()
                element.classList.remove(className);
            }
        },
        [enabled]
    );
    
    return [enabled, setEnabledState];
}

function usePrefersDarkMode() {
    return useMedia<boolean>(["(prefers-color-scheme: dark)"], [true], false);
}

function setDark() {
    document.documentElement.setAttribute("data-theme", "dark")//set theme to light
}

function setLight() {
    document.documentElement.setAttribute("data-theme", "light"); //set theme to light
}