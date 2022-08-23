import { useMutation } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import mainLogo from '../assets/mainLogo.png'
import GoogleSignIn from '../components/GoogleSignIn'
import { ROUTE } from '../config/constants'
import { toastError } from '../config/toast'
import { useBackEnd } from '../hooks/useBackEnd'
import { LOGIN_QUERY } from '../query/user'

export default function Login() {
  const navigate = useNavigate()
  const [loginFunc] = useMutation(LOGIN_QUERY)
  const { login } = useBackEnd()

  function handleSubmit(e: any) {
    e.preventDefault()

    if (!validateInput(e.target)) return

    const email = e.target.email.value
    const pass = e.target.pass.value

    login(loginFunc({ variables: { email: email, password: pass } }))
  }

  function validateInput(form: any) {
    if (form.email.value === "" || form.pass.value === "") {
      toastError("Please make all fields are filled!")
      return false
    }

    return true
  }

  function navRegister() {
    navigate(ROUTE.ROUTE_REGISTER)
  }

  function navForgotPass() {
    navigate(ROUTE.ROUTE_FORGOTPASS)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <div className='flex flex-col w-96 py-4 center-all'>
          <input className='text-input' type={"email"} placeholder={"Email"} name={"email"} />
          <div className='form-space-y'></div>
          <input className='text-input' type={"password"} placeholder={"Passwword"} name={"pass"} />
          <div className='form-space-y'></div>
          <div className='place-self-start link' onClick={navForgotPass}>Forgot passowrd?</div>
          <div className='form-space-y'></div>
          <button className='btn btn-primary'>Sign In</button>
          <div className='form-space-y'></div>
          <div className='text-base-content'>OR</div>
          <div className='form-space-y'></div>
          <GoogleSignIn />
        </div>
      </form>
      <div className='mt-8'></div>
      <p className='text-base-content'>New to linkedin? <span className='link' onClick={navRegister}>Join now!</span></p>
    </div>
  )
}