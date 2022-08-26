import React from 'react'
import { IconType } from 'react-icons'

export default function IconButton({ Icon }: { Icon: IconType }) {
    return (
        <div className='btn-ghost'>
            <div className='bg'></div>
            <div className='content flex flex-col'>
                <Icon className='icon' />
            </div>
        </div>
    )
}
