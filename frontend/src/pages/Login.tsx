import React from 'react'
import { useNavigate } from 'react-router-dom'
import mainLogo from '../assets/mainLogo.png'

export default function Login() {
  const navigate = useNavigate()

  function navRegister() {
    navigate("/register")
  }

  return (
    <div className='full-screen center-all'>
      <div className='flex flex-col center-all w-fit h-fit px-4'>
        <img className='w-72 mb-4' alt='LinkHEdIn' src={mainLogo} />
        <div className='flex flex-col w-96 py-4 center-all'>
          <input className='text-input' type={"email"} placeholder={"Email"} />
          <div className='form-space-y'></div>
          <input className='text-input' type={"password"} placeholder={"Passwword"} />
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
        <p className='text-base-content'>New to linkedin? <span className='link' onClick={navRegister}>Join now!</span></p>
      </div>
    </div>
  )
}