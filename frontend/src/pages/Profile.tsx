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

export default function Profile() {
    const { id } = useParams()
    const { user } = useAuth()
    const [openModal, setOpenModal] = useState(false)

    function openEducationModal() {
        setOpenModal(true)
    }

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
                    <IconButton Icon={HiPlus} onClick={openEducationModal}/>
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
            <div className='h-4'></div>
            <EducationModal openModal={openModal} setOpenModal={setOpenModal}/>
        </div>
    )
}
