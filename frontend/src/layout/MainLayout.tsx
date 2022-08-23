import React from 'react'
import { Navigate, useLocation, useOutlet } from 'react-router'
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
            {/* <AppBar
                pages={[
                    { label: "Home", path: "/" },
                    { label: "Login", path: "/login" }
                ]}
            /> */}
            {outlet}
        </div>
    )
}
