import React from 'react'
import AvatarProfile from '../components/Profile/AvatarProfile'
import EditProfileBg from '../components/Profile/EditProfileBg'
import PersonalProfile from '../components/Profile/PersonalProfile'
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

    return (
        <div className='box'>
            <div className='profile'>
                <EditProfileBg />
                <AvatarProfile />
                <PersonalProfile />
            </div>
        </div>
    )
}
