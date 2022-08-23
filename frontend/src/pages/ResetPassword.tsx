import React from 'react'

export default function ResetPassword() {
    function handleResetPass(e: any) {

    }

    function validateInput(form: any) {

    }

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
