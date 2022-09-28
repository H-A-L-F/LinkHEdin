import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { HiPlus, HiThumbUp, HiChatAlt, HiShare, HiPaperAirplane } from "react-icons/hi";
import { useAuth } from '../../hooks/useAuth';
import { useBackEnd } from '../../hooks/useBackEnd';
import { FIND_POST_QUERY } from '../../query/post';
import ShareModal from '../ShareModal/ShareModal';
import Comment from './Comment';
import PostCommentFeed from './PostCommentFeed';
import { PostInterface } from './PostInterface';
import PostProfile from './PostProfile';
import RichComment from './RichComment';
import RichText from './RichText';

interface PostCompInterface {
    ps: PostInterface,
}

function Post({ ps }: PostCompInterface) {
    const [openComment, setOpenComment] = useState(false)
    const [openCommentSection, setopenCommentSection] = useState(false)
    const [openShare, setOpenShare] = useState(false)
    const { postLike, followUser } = useBackEnd()
    const { refetchUser } = useBackEnd()
    const { user } = useAuth()
    const { data, refetch } = useQuery(FIND_POST_QUERY, {
        variables: {
            id: ps.id,
        },
    })

    function handleFollow() {
        followUser(ps.User.id)
        refetchUser()
        refetch()
    }

    async function handleLike() {
        try {
            const res = await postLike(ps.id)
            if (res) {
                refetch()
            }
        } catch (error) {
            console.log(error)
        }
    }

    function isLiked(arr: any) {
        let flag = false
        arr.forEach((element: any) => {
            if (element.userId === user.id) flag = true
        })
        return flag
    }

    return (
        <React.Fragment>
            <div className='box'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between center-all'>
                        <PostProfile user={ps.User} />
                        <div className='btn-plain w-fit h-fit py-2' onClick={handleFollow}>
                            <div className='bg'></div>
                            <div className='flex flex-row center-all'>
                                <HiPlus size={20} />
                                <div className='w-2'></div>
                                <div className='font-semibold'>
                                    {user.FollowedUser.includes(ps.User.id) ? "Unfollow" : "Follow"}
                                </div>
                            </div>
                        </div>
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
                            <div className='text-sm font-normal link' onClick={() => { setopenCommentSection((prev) => !prev) }}>{ps.comments} comments</div>
                            <div className='w-2'></div>
                            <div className='text-sm font-normal'>{ps.likes.length} likes</div>
                            <div className='w-2'></div>
                            <div className='text-sm font-normal'>{ps.sends} shares</div>
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className='flex flex-row justify-around'>
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
                    </div>
                    <div className='h-2'></div>
                    {openCommentSection && <PostCommentFeed ps={ps} />}
                </div>
            </div>
            <div className='h-2'></div>
            {/* {openComment && <Comment ps={ps}/>} */}
            {openComment && <RichComment ps={ps} />}
            <ShareModal data={ps} type="post" openModal={openShare} setOpenModal={setOpenShare} />
        </React.Fragment>
    )
}

export const MemoizedPost = React.memo(Post)