import React from 'react'
import { HiPlus, HiThumbUp, HiChatAlt, HiShare, HiPaperAirplane } from "react-icons/hi";
import { useAuth } from '../../hooks/useAuth';

export default function Post() {
    const { user } = useAuth()

    return (
        <div className='box'>
            <div className='flex flex-col'>
                <div className='flex flex-row justify-between center-all'>
                    <div className='flex flex-row center-all'>
                        <div className='sq-avatar'>
                            <img src={user.PhotoProfile} className='sq-avatar-image' />
                        </div>
                        <div className='w-2'></div>
                        <div className='flex flex-col'>
                            <div className='text-md font-semibold'>{user.name}</div>
                            <div className='text-sm font-normal'>{user.email}</div>
                            <div className='text-sm font-normal'>{user.FollowedUser.length}</div>
                        </div>
                    </div>
                    <div className='btn-plain w-fit h-fit py-2'>
                        <div className='bg'></div>
                        <div className='flex flex-row center-all'>
                            <HiPlus size={20} />
                            <div className='w-2'></div>
                            <div className='font-semibold'>
                                Follow
                            </div>
                        </div>
                    </div>
                </div>
                <div className='divider'></div>
                {/* <div className='preview'>
                    <div className='content-pos'>
                        <img src={user.PhotoProfile} className='content' />
                    </div>
                </div> */}
                <img src={user.PhotoProfile} className='w-full h-96 rounded-md' />
                <div className='flex flex-row justify-between'>
                    <div></div>
                    <div className='flex flex-row'>
                        <div className='text-sm font-normal'>{user.name}</div>
                        <div className='w-2'></div>
                        <div className='text-sm font-normal'>{user.name}</div>
                    </div>
                </div>
                <div className='divider'></div>
                <div className='flex flex-row justify-around'>
                    <div className='btn-plain w-fit h-fit py-2'>
                        <div className='bg'></div>
                        <div className='flex flex-row center-all'>
                            <HiThumbUp size={20} />
                            <div className='w-2'></div>
                            <div className='font-semibold'>
                                Like
                            </div>
                        </div>
                    </div>
                    <div className='btn-plain w-fit h-fit py-2'>
                        <div className='bg'></div>
                        <div className='flex flex-row center-all'>
                            <HiChatAlt size={20} />
                            <div className='w-2'></div>
                            <div className='font-semibold'>
                                Comment
                            </div>
                        </div>
                    </div>
                    <div className='btn-plain w-fit h-fit py-2'>
                        <div className='bg'></div>
                        <div className='flex flex-row center-all'>
                            <HiShare size={20} />
                            <div className='w-2'></div>
                            <div className='font-semibold'>
                                Share
                            </div>
                        </div>
                    </div>
                    <div className='btn-plain w-fit h-fit py-2'>
                        <div className='bg'></div>
                        <div className='flex flex-row center-all'>
                            <HiPaperAirplane size={20} />
                            <div className='w-2'></div>
                            <div className='font-semibold'>
                                Send
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
