import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'
import { FIND_COMMENT_QUERY } from '../../query/comment'
import { PostCommentInterface } from './postComment'
import RichReply from './RichReply'
import RichText from './RichText'

interface PostCommentCardInterface {
    pc: PostCommentInterface
}

function PostCommentCard({ pc }: PostCommentCardInterface) {
    const { user } = useAuth()
    const { commentLike } = useBackEnd()
    const [openReply, setOpenReply] = useState(false)
    const { data, refetch } = useQuery(FIND_COMMENT_QUERY, {
        variables: {
            id: pc.ID,
        },
    })

    async function handleLike() {
        try {
            const res = await commentLike(pc.ID)
            if (res) {
                refetch()
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (data) {
        pc = data.comment
    }

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row'>
                <div className='inv-avatar'>
                    <img src={user.PhotoProfile} alt="" className='inv-avatar-image' />
                </div>
                <div className='w-2'></div>
                <div className='flex flex-col w-full'>
                    <div className='box bg-base-100'>
                        <div className='flex flex-col'>
                            <div className='text-md font-bold'>{pc.User.name}</div>
                            <div className='text-sm font-medium'>{pc.User.email}</div>
                            <div className='h-2'></div>
                            <div className='text-sm font-medium'>
                                <RichText text={pc.Text} />
                            </div>
                            <div className='flex flex-row justify-between'>
                                <div></div>
                                <div className='text-sm font-medium'>Likes: {pc.Likes}</div>
                            </div>
                        </div>
                    </div>
                    <div className='h-2'></div>
                    <div className='flex flex-row w-full'>
                        <div className='btn-plain' onClick={handleLike}>
                            <div className='bg'></div>
                            <div className='text-sm font-medium'>Like</div>
                        </div>
                        <div className='btn-plain' onClick={() => { setOpenReply(prev => !prev) }}>
                            <div className='bg'></div>
                            <div className='text-sm font-medium'>Reply</div>
                        </div>
                    </div>
                </div>
            </div>
            {
                openReply && <RichReply pc={pc} refetch={refetch} />
            }
            {pc.Replies.map((reply: any, idx: number) => {
                return (
                    <div className='flex flex-row ml-16 mt-2' key={"reply-" + idx}>
                        <div className='inv-avatar'>
                            <img src={user.PhotoProfile} alt="" className='inv-avatar-image' />
                        </div>
                        <div className='w-2'></div>
                        <div className='flex flex-col w-full'>
                            <div className='box bg-base-100'>
                                <div className='flex flex-col'>
                                    <div className='text-md font-bold'>{reply.User.name}</div>
                                    <div className='text-sm font-medium'>{reply.User.email}</div>
                                    <div className='h-2'></div>
                                    {/* <div className='text-sm font-medium'>
                                        <span className='font-semibold'>@{reply.User.name + " "}</span>
                                        {reply.Text}
                                    </div> */}
                                    <RichText text={reply.Text} />
                                </div>
                            </div>
                            <div className='h-2'></div>
                            <div className='flex flex-row w-full'>
                                <div className='btn-plain' onClick={handleLike}>
                                    <div className='bg'></div>
                                    <div className='text-sm font-medium'>Like</div>
                                </div>
                                <div className='btn-plain'>
                                    <div className='bg'></div>
                                    <div className='text-sm font-medium'>Reply</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export const MemoizedPostCommentCard = React.memo(PostCommentCard)