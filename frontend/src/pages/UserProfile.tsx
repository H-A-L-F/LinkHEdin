import React from 'react'
import AvatarProfile from '../components/Profile/AvatarProfile'
import EditProfileBg from '../components/Profile/EditProfileBg'
import { UserInterface } from '../components/Profile/UserInterface'
import { useAuth } from '../hooks/useAuth'
import { useUserProfile } from './Profile'

interface UserProfileInterface {
    id: string | undefined
    isUser: boolean,
    user: UserInterface
}

// export default function UserProfile({ id, isUser, user }: UserProfileInterface) {
export default function UserProfile() {
    const { currUser } = useUserProfile()

    console.log(currUser)

    return (
        <div className='box'>
            <div className='profile'>
                <EditProfileBg />
                <AvatarProfile />
                <div className='personal-position'>
                    <div className='personal-content'>
                        <div className='user'>
                            <div className='text-lg font-semibold'>
                                {currUser.name}
                            </div>
                            <div className='text-md font-medium'>
                                {currUser.email}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
