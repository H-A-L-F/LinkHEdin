import React, { useState } from 'react'
import { UserInterface } from '../Profile/UserInterface'

interface PostProfileInterface {
    user: UserInterface
}

export default function PostProfile({ user }: PostProfileInterface) {
    const [hover, setHover] = useState(false)

    return (
        <div className='post-profile'>
            <div className='post-profile-content' onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}>
                <div className='sq-avatar'>
                    <img src={user.PhotoProfile} className='sq-avatar-image' />
                </div>
                <div className='w-2'></div>
                <div className='flex flex-col'>
                    <div className='text-md font-semibold'>{user.name}</div>
                    <div className='text-sm font-normal'>{user.email}</div>
                    <div className='text-sm font-normal'>Followers: {user.FollowedUser.length}</div>
                </div>
            </div>
            <div className='post-profile-hover' style={{
                transition: "all 1s ease",
                display: hover ? "block" : "none",
            }}>
                <div className='flex flex-row p-2'>
                    <div className='sq-avatar'>
                        <img src={user.PhotoProfile} className='sq-avatar-image' />
                    </div>
                    <div className='w-2'></div>
                    <div className='flex flex-col'>
                        <div className='text-md font-semibold'>{user.name}</div>
                        <div className='text-sm font-normal'>{user.email}</div>
                        <div className='text-sm font-normal'>{user.Headline}</div>
                        <div className='text-sm font-normal'>Followers: {user.FollowedUser.length}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
