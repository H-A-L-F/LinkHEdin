import React from 'react'
import AvatarProfile from '../components/Profile/AvatarProfile'
import EditProfileBg from '../components/Profile/EditProfileBg'
import { UserInterface } from '../components/Profile/UserInterface'
import { useAuth } from '../hooks/useAuth'

interface UserProfileInterface {
    id: string | undefined
    isUser: boolean,
    user: UserInterface
}

export default function UserProfile({ id, isUser, user }: UserProfileInterface) {

    return (
        <div className='box'>
            <div className='profile'>
                <EditProfileBg />
                <AvatarProfile />
                <div className='personal-position'>
                    <div className='personal-content'>
                        <div className='user'>
                            <div className='text-lg font-semibold'>
                                {user.name}
                            </div>
                            <div className='text-md font-medium'>
                                {user.email}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
