import React from 'react'
import { HiPhotograph, HiPlay } from "react-icons/hi";

export default function Home() {
  return (
    <div className='box'>
      <div className='flex flex-col'>
        <div className='btn-plain add-outline'>
          <div className='bg'></div>
          <div className='place-self-start py-4'>
            Start a post
          </div>
        </div>
        <div className='h-4'></div>
        <div className='flex flex-row'>
          <div className='btn-plain'>
            <div className='bg'></div>
            <div className='flex flex-row py-4'>
              <HiPhotograph className='fill-info' />
              <div className='w-2'></div>
              <div className='font-semibold'>Photo</div>
            </div>
          </div>

          <div className='btn-plain'>
            <div className='bg'></div>
            <div className='flex flex-row py-4'>
              <HiPlay className='fill-success' />
              <div className='w-2'></div>
              <div className='font-semibold'>Photo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
