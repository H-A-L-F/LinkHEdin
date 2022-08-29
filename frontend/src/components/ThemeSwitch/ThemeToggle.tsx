import React from 'react'
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import './themetoggle.scss'
import { HiSun, HiMoon } from "react-icons/hi";

export default function ThemeToggle() {
    const { changeTheme } = useAuth()

    return (
        <div className='center-all'>
            <div className='wrapper-theme'>
                <input type="checkbox" className="checkbox-theme" id="checkbox" onClick={changeTheme} />
                <label htmlFor="checkbox" className="label-theme cursor-pointer">
                    <HiSun className='fas fa-sun' />
                    <HiMoon className='fas fa-moon' />
                    <div className='ball-theme' />
                </label>
            </div>
        </div>
    )
}
