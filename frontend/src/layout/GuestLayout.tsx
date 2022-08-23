import React from 'react'
import { Navigate, useLocation, useOutlet } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import mainLogo from '../assets/mainLogo.png'

export default function GuestLayout() {
    const { user } = useAuth()
    let location = useLocation()
    const outlet = useOutlet()

    if (user) {
        return <Navigate to={"/home"} state={{ from: location }} replace />
    }

    return (
        <div className='full-screen center-all'>
            <div className='flex flex-col center-all w-fit h-fit px-4'>
                <img className='w-72 mb-4' alt='LinkHEdIn' src={mainLogo} />
                {outlet}
            </div>
        </div>
    )
}
