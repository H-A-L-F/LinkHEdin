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
    return (
        <div>
            {pc.Replies.map((reply: PostReplyInterface, idx: number) => {
                return (
                    <div className='flex flex-col' key={"reply-" + idx}>
                        <CommentReply refetch={refetch} reply={reply} setOpenReplyReply={setOpenReplyReply} setReply={setReply} />
                    </div>
                )
            })}
        </div>
    )
}
