import React from 'react'
import { Navigate, useOutlet } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export default function MainLayout() {
    const { user } = useAuth()
    const outlet = useOutlet()

    if (!user) {
        return <Navigate to={"/guest/login"} replace />
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
