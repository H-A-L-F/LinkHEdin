import React from 'react'
import { useParams } from 'react-router-dom'
import AvatarProfile from '../components/Profile/AvatarProfile';
import EditProfileBg from '../components/Profile/EditProfileBg';
import { toastError } from '../config/toast';
import { useAuth } from '../hooks/useAuth';
import { useBackEnd } from '../hooks/useBackEnd';
import { HiPencil, HiTrash } from "react-icons/hi";
import IconButton from '../components/Buttons/IconButton';

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
            <div className='box'>
                <div className='header'>
                    Education
                    <IconButton Icon={HiPencil} />
                </div>
                <div className='content'>
                    <div className='education'>
                        <div className='info'>
                            <div className='font-semibold text-lg'>Binus</div>
                            <div className='text-md'>CompSci</div>
                            <div className='text-sm'>02 Jan - 30 Jan</div>
                        </div>
                        <div className='flex flex-row'>
                            <IconButton Icon={HiTrash} />
                            <div className='w-2'></div>
                            <IconButton Icon={HiPencil} />
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className='education'>
                        <div className='info'>
                            <div className='font-semibold text-lg'>Binus</div>
                            <div className='text-md'>CompSci</div>
                            <div className='text-sm'>02 Jan - 30 Jan</div>
                        </div>
                        <div className='flex flex-row'>
                            <IconButton Icon={HiTrash} />
                            <div className='w-2'></div>
                            <IconButton Icon={HiPencil} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
