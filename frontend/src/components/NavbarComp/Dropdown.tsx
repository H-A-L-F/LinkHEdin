import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTE } from '../../config/constants'
import { useAuth } from '../../hooks/useAuth'
import ThemeToggle from '../ThemeSwitch/ThemeToggle'
import Link from './Link'

export default function Dropdown() {
    const {user, setUser} = useAuth()

    function handleSignOut() {
        setUser(undefined)
    }

    return (
        <div className='dropdown flex flex-col'>
            <Link text='Profile' link={ROUTE.ROUTE_PROFILE(user.id)}/>
            <p className='link' onClick={handleSignOut}>Sign Out</p>
            <ThemeToggle />
        </div>
    )
}
