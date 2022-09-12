import { useQuery } from '@apollo/client';
import { MemoizedPostCommentCard } from './PostCommentCard'
import React, { useState } from 'react'
import { PostInterface } from './PostInterface';
import { SEE_COMMENT_QUERY } from '../../query/comment';
import { toastError } from '../../config/toast';
import { PostCommentInterface } from './postComment';
import ReactLoading from "react-loading";

export default function PostCommentFeed({ ps }: { ps: PostInterface }) {
    const LIMIT = 4
    const { loading, error, fetchMore, data } = useQuery(SEE_COMMENT_QUERY, {
        variables: {
            postId: ps.id,
            limit: LIMIT,
            offset: 0,
        },
    });
    const [isLoading, setIsLoading] = useState(false)

    async function temp() {
        if (data.seeCommentOnPost === undefined) {
            console.log("gada")
            return
        }
        try {
            setIsLoading(true)
            const resFet = await fetchMore({
                variables: {
                    offset: data.seeCommentOnPost.length,
                },
                updateQuery(previousQueryResult, { fetchMoreResult }) {
                    if (!fetchMoreResult) {
                        return previousQueryResult
                    }

                    return {
                        seeCommentOnPost: [
                            ...previousQueryResult.seeCommentOnPost,
                            ...fetchMoreResult.seeCommentOnPost
                        ]
                    }
                },
            })
            setIsLoading(false)
        } catch (err: any) {
            console.log(err)
            toastError(err)
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        console.log(error)
        return <div>Error</div>
    }

    if (data) {
        // console.log(data.seeCommentOnPost, data.seeCommentOnPost.length)
    }

    return (
        <div className=''>
            {data.seeCommentOnPost?.map((e: PostCommentInterface, idx: number) => {
                return (
                    <React.Fragment key={"post-cmt-" + idx} >
                        <MemoizedPostCommentCard pc={e} />
                        {
                            idx < data.seeCommentOnPost.length - 1 && <div className='h-4'></div>
                        }
                    </React.Fragment>
                )
            })}
            <div className='h-2'></div>
            {data.seeCommentOnPost.length < ps.comments &&
                <div className='btn-plain' onClick={temp}>
                    <div className='bg'></div>
                    {
                        isLoading ?
                            <div className='center-all'>
                                <ReactLoading
                                    type="balls"
                                    color="gray"
                                    height={"10%"}
                                    width={"10%"}
                                ></ReactLoading>
                            </div>
                            :
                            <div className='text-md font-semibold'>Load more</div>
                    }
                </div>
            }
        </div>
    )
}
