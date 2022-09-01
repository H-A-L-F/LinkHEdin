import React, { useState } from 'react'
import { HiPhotograph, HiPlay, HiVideoCamera, HiX } from "react-icons/hi";
import { useAuth } from '../../hooks/useAuth';
import Popup from '../Modal/Popup';

export default function StartAPost() {
    const { user } = useAuth()
    const [openModal, setOpenModal] = useState(false)

    function handleClose() {
        setOpenModal(false)
    }

    function handleOpen() {
        setOpenModal(true)
    }

    return (
        <React.Fragment>
            <div className='box'>
                <div className='flex flex-col'>
                    <div className='btn-plain add-outline' onClick={handleOpen}>
                        <div className='bg'></div>
                        <div className='place-self-start py-4'>
                            Start a post
                        </div>
                    </div>
                    <div className='h-4'></div>
                    <div className='flex flex-row'>
                        <div className='btn-plain'>
                            <div className='bg'></div>
                            <div className='flex flex-row py-4'>
                                <HiPhotograph className='fill-info' />
                                <div className='w-2'></div>
                                <div className='font-semibold'>Photo</div>
                            </div>
                        </div>

                        <div className='btn-plain'>
                            <div className='bg'></div>
                            <div className='flex flex-row py-4'>
                                <HiPlay className='fill-success' />
                                <div className='w-2'></div>
                                <div className='font-semibold'>Photo</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Popup
                open={openModal}
                handleClose={handleClose}
                Content={
                    <div className='flex flex-col'>
                        <div className='flex flex-row justify-between center-all'>
                            <div className='text-lg font-semibold'>Create a post</div>
                            <div className='btn-plain w-fit h-fit py-2 px-2' onClick={handleClose}>
                                <div className='bg'></div>
                                <HiX size={24} />
                            </div>
                        </div>
                        <div className='divider'></div>
                        <div className='h-4'></div>
                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <div className='inv-avatar'>
                                    <img src={user.PhotoProfile} className='inv-avatar-image' />
                                </div>
                                <div className='w-2'></div>
                                <div className='text-md font-semibold'>{user.name}</div>
                            </div>
                            
                            <div className='flex flex-row justify-between bg-primary'>
                                <div className='flex flex-row'>
                                    <div className='btn-plain w-fit h-fit'>
                                        <div className='bg'></div>
                                        <HiPhotograph size={24} />
                                    </div>
                                    <div className='btn-plain w-fit h-fit'>
                                        <div className='bg'></div>
                                        <HiVideoCamera size={24} />
                                    </div>
                                </div>
                                <div className='btn-primary'>
                                    <div className='bg'></div>
                                    <div className=''>Post</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </React.Fragment>
    )
}
