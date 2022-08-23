import { useMutation } from '@apollo/client'
import React from 'react'
import { toastError } from '../config/toast'
import { useBackEnd } from '../hooks/useBackEnd'
import { REQ_CHANGE_PASS_QUERY } from '../query/user'

export default function ForgotPassword() {
    const [reqChangePassFunc] = useMutation(REQ_CHANGE_PASS_QUERY)
    const { reqChangePass } = useBackEnd()

    function handleForgotPass(e: any) {
        e.preventDefault()

        if (!validateInput(e.target)) return

        const email = e.target.email.value

        reqChangePass(reqChangePassFunc({ variables: { email: email } }))
    }

    function validateInput(form: any): boolean {
        if (form.email.value === "") {
            toastError("You must fill the email field!")
            return false
        }

        return true
    }

    return (
        <form action="" onSubmit={handleForgotPass}>
            <div className='flex flex-col w-96 py-4 center-all'>
                <input className='text-input' type={"email"} placeholder={"Email"} name={"email"} />
                <div className='form-space-y'></div>
                <button className='btn btn-primary'>Reset password</button>
                <div className='form-space-y'></div>
                <div className='btn btn-neutral'>Back</div>
            </div>
        </form>
    )
}
