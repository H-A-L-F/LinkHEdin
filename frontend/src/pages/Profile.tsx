import React from 'react'
import { useParams } from 'react-router-dom'
import AvatarProfile from '../components/Profile/AvatarProfile';
import EditProfileBg from '../components/Profile/EditProfileBg';
import { toastError } from '../config/toast';
import { useAuth } from '../hooks/useAuth';
import { useBackEnd } from '../hooks/useBackEnd';

export default function Profile() {
    const { id } = useParams()
    const { user } = useAuth()

    return (
        <div className='box'>
            <div className='profile'>
                <EditProfileBg />
                <AvatarProfile />
            </div>
        </div>
    )
}
