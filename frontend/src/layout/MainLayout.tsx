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

    return (
        <React.Fragment>
            <Navbar />
            <div className='main-layout'>
                <div className='h-8'></div>
                <div className='flex flex-row flex-grow w-full h-full'>
                    {
                        location.pathname === "/home" && <Left /> ||
                        location.pathname === "/mynetwork" && <Left /> ||
                        location.pathname === "/jobs" && <Left /> ||
                        location.pathname === "/notifications" && <Left />
                    }
                    {outlet}
                    {
                        location.pathname === "/home" && <Right /> ||
                        location.pathname === "/jobs" && <Right /> ||
                        location.pathname === "/messages" && <Right /> ||
                        location.pathname === "/notifications" && <Right /> ||
                        location.pathname.startsWith("/profile") && <Right />
                    }
                </div>
                <div className='h-8'></div>
            </div>
        </React.Fragment>
    )
}
