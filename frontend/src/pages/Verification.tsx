import { useMutation } from '@apollo/client'
import { useParams } from 'react-router'
import mainLogo from '../assets/mainLogo.png'
import { toastError } from '../config/toast'
import { useBackEnd } from '../hooks/useBackEnd'
import { VALIDATE_USER_QUERY } from '../query/user'

export default function Verification() {
    const [validateUserFunc] = useMutation(VALIDATE_USER_QUERY)
    const { id } = useParams()
    const { validateUser } = useBackEnd()

    function handleVerfication(e: any) {
        e.preventDefault()

        if (!validateInput(e.target)) return

        const code = e.target.code.value

        const input = {
            id: id,
            code: code
        }

        validateUser(validateUserFunc({ variables: { input: input } }))
    }

    function validateInput(form: any): boolean {
        if (id === "") {
            toastError("Invalid Link!")
            return false
        }

        if (form.code.value === "") {
            toastError("You must fill the code sent to your email!")
            return false
        }

        return true
    }

    return (
        <div>
            <form action="" onSubmit={handleVerfication}>
                <div className='flex flex-col w-96 py-4 center-all'>
                    <div className='form-space-y'></div>
                    <input className='text-input' type={"text"} placeholder={"Code"} name={"code"} />
                    <div className='form-space-y'></div>
                    <button className='btn btn-primary'>Activate</button>
                </div>
            </form>
        </div>
    )
}