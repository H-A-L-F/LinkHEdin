import { ApolloQueryResult, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'
import { FIND_COMMENT_QUERY } from '../../query/comment'
import CommentReply from './CommentReply'
import { PostCommentInterface, PostReplyInterface } from './postComment'
import RichText from './RichText'

interface PostCommentReplyCardInterface {
    pc: PostCommentInterface,
    setReply: React.Dispatch<any>,
    setOpenReplyReply: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: (variables?: Partial<{
        id: string;
    }> | undefined) => Promise<ApolloQueryResult<any>>,
}

export default function PostCommentReplyCard({ pc, setReply, setOpenReplyReply, refetch }: PostCommentReplyCardInterface) {
    const { user } = useAuth()
    const { commentLike } = useBackEnd()

    async function handleLike(id: string) {
        try {
            const res = await commentLike(id)
            if (res) {
                refetch()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {pc.Replies.map((reply: PostReplyInterface, idx: number) => {
                return (
                    <div className='flex flex-col' key={"reply-" + idx}>
                        {/* <div className='flex flex-row ml-16 mt-2'>
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
                                        <RichText text={reply.Text} />
                                    </div>
                                </div>
                                <div className='h-2'></div>
                                <div className='flex flex-row w-full'>
                                    <div className='btn-plain' onClick={() => { handleLike(reply.ID) }}>
                                        <div className='bg'></div>
                                        <div className='text-sm font-medium'>Like</div>
                                    </div>
                                    <div className='btn-plain' onClick={() => {
                                        setReply(reply)
                                        setOpenReplyReply(prev => !prev)
                                    }}>
                                        <div className='bg'></div>
                                        <div className='text-sm font-medium'>Reply</div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <CommentReply refetch={refetch} reply={reply} setOpenReplyReply={setOpenReplyReply} setReply={setReply} />
                    </div>
                )
            })}
        </div>
    )
}
