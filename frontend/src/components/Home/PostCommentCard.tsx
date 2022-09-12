import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { PostCommentInterface } from './postComment'

interface PostCommentCardInterface {
    pc: PostCommentInterface
}

function PostCommentCard({ pc }: PostCommentCardInterface) {
    const { user } = useAuth()
    return (
        <div className='flex flex-row'>
            <div className='inv-avatar'>
                <img src={user.PhotoProfile} alt="" className='inv-avatar-image' />
            </div>
            <div className='w-2'></div>
            <div className='box bg-base-100 w-full'>
                <div className='flex flex-col'>
                    <div className='text-md font-bold'>{pc.User.name}</div>
                    <div className='text-sm font-medium'>{pc.User.email}</div>
                    <div className='h-2'></div>
                    <div className='text-sm font-medium'>{pc.Text}</div>
                </div>
            </div>
        </div>
    )
}

export const MemoizedPostCommentCard = React.memo(PostCommentCard)