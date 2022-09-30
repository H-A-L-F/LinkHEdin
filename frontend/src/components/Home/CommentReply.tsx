import { ApolloQueryResult } from '@apollo/client'
import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'
import { PostReplyInterface } from './postComment'
import RichText from './RichText'

interface CommentReplyInterface {
    reply: PostReplyInterface,
    setReply: React.Dispatch<any>,
    setOpenReplyReply: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: (variables?: Partial<{
        id: string;
    }> | undefined) => Promise<ApolloQueryResult<any>>,
}

export default function CommentReply({ reply, setReply, setOpenReplyReply, refetch }: CommentReplyInterface) {
    const { user } = useAuth()
    const { replyLike } = useBackEnd()

    async function handleLike(id: string) {
        try {
            const res = await replyLike(id)
            if (res) {
                refetch()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-row ml-16 mt-2'>
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
                        <div className='flex flex-row justify-between'>
                            <div></div>
                            <div className='text-sm font-medium'>Likes: {reply.Likes}</div>
                        </div>
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
        </div>
    )
}
