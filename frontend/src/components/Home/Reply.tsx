import React, { createRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'

interface ReplyInterface {
    cid: string,
}

export default function Reply({ cid }: ReplyInterface) {
    const { commentReply } = useBackEnd()
    const { user } = useAuth()
    const cmtRef = createRef<HTMLTextAreaElement>()

    function handleEnter(event: any) {
        if (event.key === 'Enter') handleComment()
    }

    async function handleComment() {
        const text = cmtRef.current?.value
        await commentReply(cid, user.id, text);
        (document.getElementById('cmt-input') as HTMLInputElement).value = ""
    }

    return (
        <div className='box py-4'>
            <div className='comment-box'>
                <textarea id='cmt-input' className='input' placeholder='Reply here...' ref={cmtRef} onKeyDown={handleEnter} />
            </div>
        </div>
    )
}
