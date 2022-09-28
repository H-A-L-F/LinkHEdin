import { ApolloQueryResult } from '@apollo/client'
import React, { useState } from 'react'
import { HiPaperAirplane } from 'react-icons/hi'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'
import RichInput from '../Input/RichInput'
import { PostInterface } from './PostInterface'

interface RichCommentInterface {
    ps: PostInterface,
    refetch: (variables?: Partial<{ id: string; }> | undefined) => Promise<ApolloQueryResult<any>>,
}

export default function RichComment({ ps, refetch }: RichCommentInterface) {
    const { user } = useAuth()
    const { commentPost } = useBackEnd()
    const [value, setValue] = useState("")

    async function handleComment() {
        await commentPost(user.id, ps.id, value);
        setValue("")
        refetch()
    }

    return (
        <div className='box py-4'>
            <div className='flex flex-row'>
                <div className='comment-box'>
                    <RichInput value={value} setValue={setValue} />
                </div>
                <div className='btn-plain' onClick={handleComment}>
                    <div className='bg'></div>
                    <HiPaperAirplane size={24} />
                </div>
            </div>
        </div>
    )
}
