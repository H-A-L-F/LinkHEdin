import React from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function Dropdown() {
    const {setUser} = useAuth()

    function handleSignOut() {
        setUser(undefined)
    }

    return (
        <div className='dropdown flex flex-col'>
            <p className='link' onClick={handleSignOut}>Sign Out</p>
        </div>
    )
}
