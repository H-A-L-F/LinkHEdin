import React from 'react'
import { Navigate, useLocation, useOutlet } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export default function GuestLayout() {
    const { user } = useAuth()
    let location = useLocation()
    const outlet = useOutlet()

    if (user) {
        return <Navigate to={"/home"} state={{ from: location }} replace />
    }

    return (
        <div>
            {/* <AppBar
                pages={[
                    { label: "Settings", path: "settings" },
                    { label: "Profile", path: "profile" }
                ]}
            /> */}
            {outlet}
        </div>
    )
}
