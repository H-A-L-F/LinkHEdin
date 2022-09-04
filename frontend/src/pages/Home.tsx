import React, { useEffect, useState } from 'react'
import Post, { MemoizedPost } from '../components/Home/Post'
import StartAPost from '../components/Home/StartAPost'
import { useQuery } from '@apollo/client';
import { INFINITY_QUERY } from '../query/post';
import { PostInterface } from '../components/Home/PostInterface';
import { toastError } from '../config/toast';
import InView from '../components/Home/InView';


export default function Home() {
  const { loading, error, fetchMore, data, networkStatus } = useQuery(INFINITY_QUERY, {
    variables: { offset: 0, limit: 4 },
    notifyOnNetworkStatusChange: true,
  });
  const [isLoading, setIsLoading] = useState(false)

  async function temp() {
    if (data.postInfinity === undefined) {
      console.log("gada")
      return
    }
    try {
      setIsLoading(true)
      const resFet = await fetchMore({
        variables: {
          offset: data.postInfinity.length,
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
    console.log(data.postInfinity)
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <StartAPost />
      <div className='h-4'></div>
      {data.postInfinity?.map((e: PostInterface, idx: number) => {
        return (
          <React.Fragment key={"post-" + idx} >
            <MemoizedPost ps={e} />
            {
              idx < data.postInfinity.length - 1 && <div className='h-4'></div>
            }
          </React.Fragment>
        )
      })}
      <div className='h-64'></div>
      <InView callback={temp} isLoading={isLoading} />
    </div>
  )
}
