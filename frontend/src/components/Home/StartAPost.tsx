import React, { useState } from 'react'
import { HiPhotograph, HiPlay, HiX } from "react-icons/hi";
import Popup from '../Modal/Popup';

export default function StartAPost() {
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
                        <div className='flex flex-row'>
                            <div>Create a post</div>
                            <HiX />
                        </div>
                    </div>
                }
            />
        </React.Fragment>
    )
}
