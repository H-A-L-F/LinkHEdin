import React from 'react'
import { Navigate, useLocation, useOutlet } from 'react-router'
import Navbar from '../components/NavbarComp/Navbar'
import { useAuth } from '../hooks/useAuth'
import Left from './Left'
import Right from './Right'

export default function MainLayout() {
    const { user } = useAuth()
    let location = useLocation()
    const outlet = useOutlet()

    if (!user) {
        return <Navigate to={"/guest/login"} state={{ from: location }} replace />
    }

    console.log(location.pathname)

    return (
        <div>
            <Navbar />
            <div className='main-layout'>
                <div className='h-8'></div>
                <div className='flex flex-row w-full h-full'>
                    {
                        location.pathname === "/home" && <Left />
                    }
                    {outlet}
                    {
                        location.pathname === "/home" && <Right />
                    }
                </div>
            </div>
        </div>
    )
}
