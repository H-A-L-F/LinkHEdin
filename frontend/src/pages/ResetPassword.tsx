import React, { useState } from 'react'

export default function ResetPassword() {
    const [authorized, setAuthorized] = useState(false)

    function handleResetPass(e: any) {

    }

    function validateInput(form: any) {

    }

    if(!authorized) return <ResetPassCode /> 
    return (
        <form action="" onSubmit={handleResetPass}>
            <div className='flex flex-col w-96 py-4 center-all'>
                <input className='text-input' type={"password"} placeholder={"Password"} name={"pass"} />
                <div className='form-space-y'></div>
                <input className='text-input' type={"password"} placeholder={"Repeat Password"} name={"confpass"} />
                <div className='form-space-y'></div>
                <button className='btn btn-primary'>Reset password</button>
            </div>
        </form>
    )
}


function ResetPassCode() {
    function handleSubmitCode() {

    }

    return (
        <form action="" onSubmit={handleSubmitCode}>
            <div className='flex flex-col w-96 py-4 center-all'>
                <input className='text-input' type={"text"} placeholder={"Code"} name={"code"} />
                <div className='form-space-y'></div>
                <button className='btn btn-primary'>Submit</button>
            </div>
        </form>
    )
}
