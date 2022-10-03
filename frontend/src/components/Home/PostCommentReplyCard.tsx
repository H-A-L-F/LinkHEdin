import { ApolloQueryResult, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import CommentReply from './CommentReply'
import { PostCommentInterface, PostReplyInterface } from './postComment'

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
                    <CommentReply refetch={refetch} reply={reply} setOpenReplyReply={setOpenReplyReply} setReply={setReply} />
                )
            })}
        </div>
    )
}
