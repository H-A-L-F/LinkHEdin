import React from 'react'
import { HiPhotograph } from "react-icons/hi";

export default function Home() {
  return (
    <div className='box'>
      <div className='flex flex-col'>
        <div className='flex flex-row'>
          <div className='outline'>
            Start a post
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='btn-plain'>
            <div className='bg'></div>
            <div className='content'>
              Photo
              <HiPhotograph />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
