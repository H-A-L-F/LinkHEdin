import React, { useState } from 'react'
import { HiPlus, HiThumbUp, HiChatAlt, HiShare, HiPaperAirplane } from "react-icons/hi";
import { useAuth } from '../../hooks/useAuth';
import { useBackEnd } from '../../hooks/useBackEnd';
import Comment from './Comment';
import PostCommentFeed from './PostCommentFeed';
import { PostInterface } from './PostInterface';

interface PostCompInterface {
    ps: PostInterface,
}

function Post({ ps }: PostCompInterface) {
    const [openComment, setOpenComment] = useState(false)
    const [openCommentSection, setopenCommentSection] = useState(false)

    return (
        <React.Fragment>
            <div className='box'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between center-all'>
                        <div className='flex flex-row center-all'>
                            <div className='sq-avatar'>
                                <img src={ps.User.PhotoProfile} className='sq-avatar-image' />
                            </div>
                            <div className='w-2'></div>
                            <div className='flex flex-col'>
                                <div className='text-md font-semibold'>{ps.User.name}</div>
                                <div className='text-sm font-normal'>{ps.User.email}</div>
                                <div className='text-sm font-normal'>{ps.User.FollowedUser.length}</div>
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
                    <div className='text-sm font-normal'>{ps.text}</div>
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
                            <div className='text-sm font-normal link' onClick={() => { setopenCommentSection((prev) => !prev) }}>{ps.comments} comments</div>
                            <div className='w-2'></div>
                            <div className='text-sm font-normal'>{ps.sends} shares</div>
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
                    {openCommentSection && <PostCommentFeed ps={ps} />}
                </div>
            </div>
            <div className='h-2'></div>
            {openComment && <Comment ps={ps} />}
        </React.Fragment>
    )
}

export const MemoizedPost = React.memo(Post)