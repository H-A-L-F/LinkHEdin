import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import mainLogo from '../assets/mainLogo.png'
import { ROUTE } from '../config/constants'
import { toastError } from '../config/toast'
import { useBackEnd } from '../hooks/useBackEnd'
import { REGISTER_QUERY } from '../query/user'

export default function Register() {
    const navigate = useNavigate()
    const [registerFunc] = useMutation(REGISTER_QUERY);
    const {register} = useBackEnd()

    function handleRegister(e: any) {
        e.preventDefault()
        const email = e.target.email.value
        const name = e.target.name.value
        const pass = e.target.pass.value

        const input = {
            name: name,
            email: email,
            password: pass,
        }

        validateInput(e.target) && register(registerFunc({ variables: { input: input } }))
    }

    function validateInput(form: any) {
        if(form.email.value === "") {
            toastError("You must fill the email field!")
            return false
        }

        if(form.name.value === "") {
            toastError("You must fill the name field!")
            return false
        }

        if(form.pass.value === "") {
            toastError("You must fill the password field!")
            return false
        }

        return true
    }

    function navLogin() {
        navigate(ROUTE.ROUTE_LOGIN)
    }

    return (
        <div className='full-screen center-all'>
            <div className='flex flex-col center-all w-fit h-fit px-4'>
                <img className='w-72 mb-4' alt='LinkHEdIn' src={mainLogo} />
                <form action="" onSubmit={handleRegister}>
                    <div className='flex flex-col w-96 py-4 center-all'>
                        <input className='text-input' type={"email"} placeholder={"Email"} name={"email"} />
                        <div className='form-space-y'></div>
                        <input className='text-input' type={"text"} placeholder={"Name"} name={"name"} />
                        <div className='form-space-y'></div>
                        <input className='text-input' type={"password"} placeholder={"Passwword"} name={"pass"} />
                        <div className='form-space-y'></div>
                        <button className='btn btn-primary'>Register</button>
                    </div>
                </form>
                <div className='mt-8'></div>
                <p className='text-base-content'>Already on linkedin? <span className='link' onClick={navLogin}>Sign in!</span></p>
            </div>
        </div>
    )
}
