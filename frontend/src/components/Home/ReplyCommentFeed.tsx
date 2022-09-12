// import { useQuery } from '@apollo/client';
// import React, { useState } from 'react'

// export default function ReplyCommentFeed() {
//     const LIMIT = 4
//     const { loading, error, fetchMore, data } = useQuery(SEE_COMMENT_QUERY, {
//         variables: {
//             postId: ps.id,
//             limit: LIMIT,
//             offset: 0,
//         },
//     });
//     const [isLoading, setIsLoading] = useState(false)

//     async function temp() {
//         if (data.seeCommentOnPost === undefined) {
//             console.log("gada")
//             return
//         }
//         try {
//             setIsLoading(true)
//             const resFet = await fetchMore({
//                 variables: {
//                     offset: data.seeCommentOnPost.length,
//                 },
//                 updateQuery(previousQueryResult, { fetchMoreResult }) {
//                     if (!fetchMoreResult) {
//                         return previousQueryResult
//                     }

//                     return {
//                         seeCommentOnPost: [
//                             ...previousQueryResult.seeCommentOnPost,
//                             ...fetchMoreResult.seeCommentOnPost
//                         ]
//                     }
//                 },
//             })
//             setIsLoading(false)
//         } catch (err: any) {
//             console.log(err)
//             toastError(err)
//         }
//     }

//     if (loading) {
//         return <p>Loading...</p>
//     }

//     if (error) {
//         console.log(error)
//         return <div>Error</div>
//     }

//     if (data) {
//         // console.log(data.seeCommentOnPost, data.seeCommentOnPost.length)
//     }

//     return (
//         <div>ReplyCommentFeed</div>
//     )
// }

import React from "react";
