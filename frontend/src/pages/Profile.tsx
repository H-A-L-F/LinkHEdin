import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AvatarProfile from '../components/Profile/AvatarProfile';
import EditProfileBg from '../components/Profile/EditProfileBg';
import { toastError } from '../config/toast';
import { useAuth } from '../hooks/useAuth';
import { useBackEnd } from '../hooks/useBackEnd';
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi";
import IconButton from '../components/Buttons/IconButton';
import EducationModal from '../components/Profile/EducationModal';
import Modal from '../components/Modal/Modal';
import Education from '../components/Profile/Education';
import Experience from '../components/Profile/Experience';

export default function Profile() {
    const { id } = useParams()
    const { user } = useAuth()

    return (
        <div>
            <div className='box'>
                <div className='profile'>
                    <EditProfileBg />
                    <AvatarProfile />
                </div>
            </div>
            <div className='h-4'></div>
            <Education id={id}/>
            <Experience id={id}/>
        </div>
    )
}
