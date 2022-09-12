import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'
import { PostCommentInterface } from './postComment'

interface PostCommentCardInterface {
    pc: PostCommentInterface
}

function PostCommentCard({ pc }: PostCommentCardInterface) {
    const { user } = useAuth()
    const { commentLike } = useBackEnd()

    function handleLike() {
        commentLike(pc.ID)
    }

    return (
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
                        <div className='text-sm font-medium'>{pc.Text}</div>
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
}

export const MemoizedPostCommentCard = React.memo(PostCommentCard)