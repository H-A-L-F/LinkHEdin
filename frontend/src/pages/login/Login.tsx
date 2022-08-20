import React from 'react'
import mainLogo from '../../assets/mainLogo.png'

export default function Login() {
  return (
    <div className='full-screen center-all bg-base-100'>
      <div className='flex flex-col center-all w-fit h-fit px-4'>
        <img className='w-72 mb-4' alt='LinkHEdIn' src={mainLogo} />
        <div className='flex flex-col w-96 py-4 center-all'>
          <input className='text-input' type={"email"} placeholder={"email"} />
          <div className='form-space-y'></div>
          <input className='text-input' type={"password"} placeholder={"passwword"} />
          <div className='form-space-y'></div>
          <div className='place-self-start link'>Forgot passowrd?</div>
          <div className='form-space-y'></div>
          <div className='btn btn-primary'>Sign In</div>
          <div className='form-space-y'></div>
          <div className='text-base-content'>OR</div>
          <div className='form-space-y'></div>
          <div className='btn btn-neutral'>Sign in with google</div>
        </div>
        <div className='mt-8'></div>
        <p className='text-base-content'>New to linkedin? <span className='link'>Join now!</span></p>
      </div>
    </div>
  )
}