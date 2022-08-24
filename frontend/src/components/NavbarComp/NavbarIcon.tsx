import React from 'react'
import { IconType } from 'react-icons'

export default function NavbarIcon({ Icon, title }: { Icon: IconType, title: string }) {
    return (
        <div className='nav-item'>
            <div className='bg'></div>
            <div className='content flex flex-col'>
                <Icon className='icon'/>
            </div>
            <div className='hint'>{title}</div>
        </div>
    )
}
