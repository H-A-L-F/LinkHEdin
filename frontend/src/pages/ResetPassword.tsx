import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toastError } from '../config/toast'
import { useBackEnd } from '../hooks/useBackEnd'
import { VALIDATE_CHANGE_PASS_QUERY } from '../query/user'

export default function ResetPassword() {
    const [authorized, setAuthorized] = useState(false)

    function handleResetPass(e: any) {

    }

    function validateInput(form: any) {

    }

    useEffect(() => {
        console.log("Panggil", authorized)
    }, [authorized])

    if (!authorized) return <ResetPassCode setAuthorized={setAuthorized} />
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


function ResetPassCode({ setAuthorized }: { setAuthorized: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { id } = useParams()
    const [validateChangePassFunc] = useMutation(VALIDATE_CHANGE_PASS_QUERY)
    const { validateChangePassReq } = useBackEnd()

    function handleSubmitCode(e: any) {
        e.preventDefault()

        if (e.target.code.value === "") {
            toastError("You must fill the code before proceeding!")
            return
        }

        const code = e.target.code.value

        const input = {
            id: id,
            code: code
        }

        validateChangePassReq(validateChangePassFunc({ variables: { input: input } }), setAuthorized)
        console.log("lewat")
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
