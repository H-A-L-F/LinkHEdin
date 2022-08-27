import React from 'react'
import { IconType } from 'react-icons'

export default function IconButton({ Icon, onClick }: { Icon: IconType, onClick?: React.MouseEventHandler<HTMLDivElement>}) {
    return (
        <div className='icon-ghost' onClick={onClick}>
            <div className='bg'></div>
            <div className='content flex flex-col'>
                <Icon className='icon' />
            </div>
        </div>
    )
}
