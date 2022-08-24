import React, { MouseEventHandler } from 'react'
import { IconType } from 'react-icons'
import { useAuth } from '../../hooks/useAuth'
import Avatar from './Avatar'
import './navbarlink.scss'

export default function NavbarLink({ avatar, Icon, title, onClick }: { avatar?: boolean, Icon?: IconType, title: string, onClick?: MouseEventHandler<HTMLDivElement> }) {
    const { user } = useAuth()

    if (Icon) return <Icon className='headerOption__icon'/>
    return (
        <div onClick={onClick} className="headerOption">
            {avatar && (
                <Avatar className="headerOption__icon" image={user?.photoURL} />
            )}
            <h3 className="headerOption__title text-base-content">{title}</h3>
        </div>
    )   
}
