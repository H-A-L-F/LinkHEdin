import React from 'react'
import { HiPencilAlt, HiOutlineDotsHorizontal } from "react-icons/hi";
import { useAuth } from '../hooks/useAuth';

export default function Message() {
    const { user } = useAuth()
    return (
        <div className='box w-full'>
            <div className='flex flex-col h-full justify-start'>
                <div className='flex flex-row center-all w-full'>
                    <div className='flex flex-row justify-between w-96'>
                        <div className='text-lg font-semibold'>Messaging</div>
                        <div className='btn-plain px-2'>
                            <div className='bg'></div>
                            <HiPencilAlt size={24} />
                        </div>
                    </div>
                    <div className='divider-h'></div>
                    <div className='flex flex-row justify-between w-full'>
                        <div className='text-lg font-semibold'>{user.name}</div>
                        <div className='btn-plain'>
                            <div className='bg'></div>
                            <HiOutlineDotsHorizontal size={24} />
                        </div>
                    </div>
                </div>
                <div className='divider'></div>
                <div className='flex flex-row center-all w-full h-full justify-start'>
                    <div className='flex flex-col w-96 h-full'>
                        <div className='outline-holder'>
                            <div className='chat-item' tabIndex={1}>
                                <div className='inv-avatar'>
                                    <img src={user.PhotoProfile} className='inv-avatar-image' />
                                </div>
                                <div className='w-2'></div>
                                <div className='flex flex-col'>
                                    <div className='text-md font-semibold'>{user.name}</div>
                                    <div className='text-sm font-medium'>{user.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='divider-h'></div>
                    <div className='flex flex-row justify-between w-full'>
                    </div>
                </div>
            </div>
        </div>
    )
}
