import React from 'react'
import Post from '../components/Home/Post'
import StartAPost from '../components/Home/StartAPost'



export default function Home() {

  return (
    <div className='flex flex-col w-full h-full'>
      <StartAPost />
      <div className='h-4'></div>
      <Post />
    </div>
  )
}
