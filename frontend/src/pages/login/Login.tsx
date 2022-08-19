import React from 'react'
import mainLogo from '../../assets/mainLogo.png'

export default function Login() {
  return (
    <div className='full-screen center-all'>
      <div className='flex flex-col center-all w-fit h-fit'>
        <img className='w-72 mb-4' alt='LinkHEdIn' src={mainLogo} />
        <div className='flex flex-col w-fit px-2 py-4 space-x-2'>
          <input className='text-input' type={"email"} placeholder={"email"} />
          <div className='form-space-y'></div>
          <input className='text-input' type={"password"} placeholder={"passwword"} />
          <div className='button'></div>
        </div>
      </div>
    </div>
  )
}