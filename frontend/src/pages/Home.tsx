import React, { useEffect, useState } from 'react'
import Post from '../components/Home/Post'
import StartAPost from '../components/Home/StartAPost'
import { useInView, useInViewEffect } from 'react-hook-inview'
import { useQuery } from '@apollo/client';
import { INFINITY_QUERY } from '../query/post';
import { PostInterface } from '../components/Home/PostInterface';


export default function Home() {
  const { loading, error, fetchMore, data } = useQuery(INFINITY_QUERY, {
    variables: { offset: 0, limit: 8 },
  });
  const [isVisible, setIsVisible] = useState(false)

  const ref = useInViewEffect(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        console.log("Refetch")
      } else if (!entry.isIntersecting) {
        console.log("Baca dlu")
      }
      setIsVisible(entry.isIntersecting)
    }
  )

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
  let currData = data.postInfinity
  let currLen = currData.length

  return (
    <div className='flex flex-col w-full h-full'>
      <StartAPost />
      <div className='h-4'></div>
      {currData?.map((e: PostInterface, idx: number) => {
        return (
          <React.Fragment key={"post-" + idx} >
            <Post ps={e} />
            {
              idx < currLen - 1 && <div className='h-4'></div>
            }
          </React.Fragment>
        )
      })}
      <div className='h-64'></div>
      <div ref={ref} className="text-xl font-bold py-4 mb-32">{isVisible ? 'Hello World!' : ''}</div>
    </div>
  )
}
