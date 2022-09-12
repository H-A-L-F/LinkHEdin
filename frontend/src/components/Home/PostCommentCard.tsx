import React from 'react'
import { useAuth } from '../../hooks/useAuth'

interface PostCommentCardInterface {

}

function PostCommentCard({ }: PostCommentCardInterface) {
    const { user } = useAuth()
    return (
        <div className='flex flex-row'>
            <div className='inv-avatar'>
                <img src={user.PhotoProfile} alt="" className='inv-avatar-image' />
            </div>
            <div className='w-2'></div>
            <div className='box bg-base-100 w-full'>
                <div className='flex flex-col'>
                    <div className='text-md font-bold'>{user.name}</div>
                    <div className='text-sm font-medium'>{user.email}</div>
                    <div className='h-2'></div>
                    <div className='text-sm font-medium'>{"ASDAASDDSADAADSS"}</div>
                </div>
            </div>
        </div>
    )
}

export const MemoizedPostCommentCard = React.memo(PostCommentCard)