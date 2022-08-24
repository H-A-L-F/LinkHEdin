import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Avatar() {
    const { user } = useAuth()
    const [dropdown, setDropdown] = useState(false)

    function toggleActive(state: any) {
        if (state.isActive) return 'navbar-items-active'
        return 'navbar-items'
    }

    function handleLogout() {

    }

    return (
        <NavLink to='/profile' onMouseEnter={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className={toggleActive}>
            <img src={user.photoprofile} className='navbar-picture'></img>
            <p className='item-label'>{user.first_name}</p>
            {dropdown && (
                <div className='dropdown'>
                    <div onClick={handleLogout}>Logout</div>
                </div>
            )}
        </NavLink>
    )
}
