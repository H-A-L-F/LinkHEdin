import React from 'react'
import { HiChatAlt, HiPaperAirplane, HiPlus, HiShare, HiThumbUp } from 'react-icons/hi'
import { useAuth } from '../../hooks/useAuth'
import { PostInterface } from '../Home/PostInterface'
import PostProfile from '../Home/PostProfile'
import RichText from '../Home/RichText'

interface ChatPostInterface {
    ps: any,
}

export default function ChatPost({ ps }: ChatPostInterface) {
    const { user } = useAuth()
    ps = JSON.parse(ps)

    return (
        <div className='box min-w-96'>
            <div className='flex flex-col'>
                <div className='flex flex-row justify-between center-all'>
                    <PostProfile user={ps.User} />
                    {/* <div className='btn-plain w-fit h-fit py-2' onClick={handleFollow}>
                        <div className='bg'></div>
                        <div className='flex flex-row center-all'>
                            <HiPlus size={20} />
                            <div className='w-2'></div>
                            <div className='font-semibold'>
                                {user.FollowedUser.includes(ps.User.id) ? "Unfollow" : "Follow"}
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className='divider'></div>
                {/* <div className='text-sm font-normal'>{ps.text}</div> */}
                <RichText text={ps.text} />
                <div className='h-2'></div>
                {ps.AttachmentType === "image" &&
                    <img src={ps.AttachmentLink} className='w-full h-96 rounded-md' />
                }
                {ps.AttachmentType === "video" &&
                    <video src={ps.AttachmentLink} className='w-full h-96 rounded-md' controls />
                }
                <div className='flex flex-row justify-between'>
                    <div></div>
                    <div className='flex flex-row'>
                        <div className='text-sm font-normal link'>{ps.comments} comments</div>
                        <div className='w-2'></div>
                        <div className='text-sm font-normal'>{ps.likes.length} likes</div>
                        <div className='w-2'></div>
                        <div className='text-sm font-normal'>{ps.sends} shares</div>
                    </div>
                </div>
                <div className='divider'></div>
                {/* <div className='flex flex-row justify-around'>
                    <div className='btn-plain w-fit h-fit py-2' onClick={handleLike}>
                        <div className='bg'></div>
                        <div className='flex flex-row center-all'>
                            <HiThumbUp size={20} className={isLiked(ps.likes) ? 'text-primary' : ''} />
                            <div className='w-2'></div>
                            <div className='font-semibold'>
                                Like
                            </div>
                        </div>
                    </div>
                    <div className='btn-plain w-fit h-fit py-2' onClick={() => { setOpenComment((prev) => !prev) }}>
                        <div className='bg'></div>
                        <div className='flex flex-row center-all'>
                            <HiChatAlt size={20} />
                            <div className='w-2'></div>
                            <div className='font-semibold'>
                                Comment
                            </div>
                        </div>
                    </div>
                    <div className='btn-plain w-fit h-fit py-2' onClick={() => { setOpenShare((prev) => !prev) }}>
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
                </div> */}
                <div className='h-2'></div>
            </div>
        </div>
    )
}
