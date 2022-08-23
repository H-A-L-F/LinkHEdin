import { useMutation } from '@apollo/client'
import { formatError } from 'graphql'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toastError } from '../config/toast'
import { useBackEnd } from '../hooks/useBackEnd'
import { CHANGE_PASS_QUERY, VALIDATE_CHANGE_PASS_QUERY } from '../query/user'

export default function ResetPassword() {
    const { id } = useParams()
    const [authorized, setAuthorized] = useState(false)
    const [changePassFunc] = useMutation(CHANGE_PASS_QUERY)
    const { changePass } = useBackEnd()

    function handleResetPass(e: any) {
        e.preventDefault()

        if (!validateInput(e.target)) return

        const pass = e.target.pass.value

        console.log(pass, id)
        changePass(changePassFunc({ variables: { password: pass, id: id } }))
    }

    function validateInput(form: any) {
        if (form.pass.value === "" || form.confpass.value === "") {
            toastError("Please fill all fields!")
            return false
        }

        if (form.pass.value !== form.confpass.value) {
            toastError("Password does not match")
            return false
        }

        return true
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
