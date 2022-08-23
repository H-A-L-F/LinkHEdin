import React from 'react'

export default function ForgotPassword() {
    function handleForgotPass() {

    }

    return (
        <form action="" onSubmit={handleForgotPass}>
            <div className='flex flex-col w-96 py-4 center-all'>
                <input className='text-input' type={"email"} placeholder={"Email"} name={"email"} />
                <div className='form-space-y'></div>
                <button className='btn btn-primary'>Reset password</button>
            </div>
        </form>
    )
}
