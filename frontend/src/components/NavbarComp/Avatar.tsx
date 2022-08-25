import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Avatar() {
    const { user } = useAuth()
    const [dropdown, setDropdown] = useState(false)
    const divRef = useRef()

    function toggleActive(state: any) {
        if (state.isActive) return 'nav-item-active'
        return 'nav-item'
    }

    function handleLogout() {

    }

    // onMouseEnter={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} 
    return (
        <div className='nav-item' tabIndex={1}>
            <div className='bg'></div>
            <div className='avatar content'>
                <img src={user.photoprofile} className='image'></img>
                <div className='name'>{user.name}</div>
            </div>
            <div className='dropdown'>

            </div>
        </div>
    )
}
