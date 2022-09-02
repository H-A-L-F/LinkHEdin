import React, { useEffect, useState } from 'react'
import Post from '../components/Home/Post'
import StartAPost from '../components/Home/StartAPost'
import { useInView, useInViewEffect } from 'react-hook-inview'


export default function Home() {
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

  return (
    <div className='flex flex-col w-full h-full'>
      <StartAPost />
      <div className='h-4'></div>
      <Post />
      <div className='h-64'></div>
      <div ref={ref} className="text-xl font-bold py-4 mb-32">{isVisible ? 'Hello World!' : ''}</div>
    </div>
  )
}
