import React from 'react'
import { Navigate, useOutlet } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export default function GuestLayout() {
    const { user } = useAuth()
    const outlet = useOutlet()

    if (user) {
        return <Navigate to={"/home"} replace />
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
