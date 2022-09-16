import React from 'react'
import { useParams } from 'react-router-dom'

export default function Search() {
  const { input } = useParams()

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-row'>
        <div className='btn-plain bg-base-300 py-2'>
          <div className='bg'></div>
          <div className='text-sm font-bold'>hashtags</div>
        </div>
        <div className='w-4'></div>
        <div className='btn-plain bg-base-300 py-2'>
          <div className='bg'></div>
          <div className='text-sm font-bold'>people</div>
        </div>
      </div>
      <div className='h-4'></div>
      <div className='box'>

      </div>
      <div className='h-2'></div>
      <div className='box'>

      </div>
    </div>
  )
}
