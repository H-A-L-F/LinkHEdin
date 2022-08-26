import React from 'react'
import { useParams } from 'react-router-dom'
import AvatarProfile from '../components/Profile/AvatarProfile';
import { toastError } from '../config/toast';
import { useAuth } from '../hooks/useAuth';
import { useBackEnd } from '../hooks/useBackEnd';

export default function Profile() {
    const { id } = useParams()
    const { user } = useAuth()

    return (
        <div className='box'>
            <p>test</p>
            <div className='profile'>
                <div className='profile-bg'>
                    <img src="https://picsum.photos/seed/picsum/200/300" alt="" className='image'/>
                </div>
                <AvatarProfile />
            </div>
        </div>
    )
}
