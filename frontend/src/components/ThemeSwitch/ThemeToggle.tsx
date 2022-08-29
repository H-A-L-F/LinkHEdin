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
                <label htmlFor="checkbox" className="label-theme">
                    {/* <i className="fas fa-moon"></i>
                <i className='fas fa-sun'></i> */}
                    <HiMoon className='fas fa-moon' />
                    <HiSun className='fas fa-sun' />
                    <div className='ball-theme' />
                </label>
            </div>
        </div>
    )
}
