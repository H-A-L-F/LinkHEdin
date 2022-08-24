import React, { MouseEventHandler } from 'react'
import { IconType } from 'react-icons'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Avatar from './Avatar'

export default function NavbarLink({ route, Icon, title }: { route: string, Icon: IconType, title: string }) {
    function toggleActive(state: any) {
        if (state.isActive) return 'nav-item-active'
        return 'nav-item'
    }

    return (
        <NavLink to={route} className={toggleActive}>
            {/* <Icon className='navbar-icon'/>
            <p className='item-label'>{title}</p> */}
            <div className='bg'></div>
            <div className='content flex flex-col'>
                <Icon className='icon' />
            </div>
            <div className='hint'>{title}</div>
        </NavLink>
    )
}
