import React from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function UserChatRoom() {
    const {user} = useAuth()

    return (
        <div className='outline-holder'>
            <div className='chat-item' tabIndex={1}>
                <div className='inv-avatar'>
                    <img src={user.PhotoProfile} className='inv-avatar-image' />
                </div>
                <div className='w-2'></div>
                <div className='flex flex-col'>
                    <div className='text-md font-semibold'>{user.name}</div>
                    <div className='text-sm font-medium'>{user.email}</div>
                </div>
            </div>
        </div>
    )
}
