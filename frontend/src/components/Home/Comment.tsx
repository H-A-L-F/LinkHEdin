import React, { createRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'
import { PostInterface } from './PostInterface'

interface CommentInterface {
    ps: PostInterface
}

export default function Comment({ ps }: CommentInterface) {
    const { user } = useAuth()
    const { commentPost } = useBackEnd()
    const cmtRef = createRef<HTMLTextAreaElement>()

    function handleEnter(event: any) {
        if (event.key === 'Enter') handleComment()
    }

    function handleComment() {
        const text = cmtRef.current?.value
        commentPost(user.id, ps.id, text)
        (document.getElementById('cmt-input') as HTMLInputElement).value = null
    }

    return (
        <div className='box py-4'>
            <div className='comment-box'>
                <textarea id='cmt-input' className='input' placeholder='Comment here...' ref={cmtRef} onKeyDown={handleEnter} />
            </div>
        </div>
    )
}
