import React from 'react'
import { Navigate, useLocation, useOutlet } from 'react-router'
import Navbar from '../components/NavbarComp/Navbar'
import { useAuth } from '../hooks/useAuth'

export default function MainLayout() {
    const { user } = useAuth()
    let location = useLocation()
    const outlet = useOutlet()

    if (!user) {
        return <Navigate to={"/guest/login"} state={{ from: location }} replace />
    }

    return (
        <div>
            <Navbar />
            <div className='main-layout'>
                <div className='h-8'></div>
                {outlet}
            </div>
        </div>
    )
}
