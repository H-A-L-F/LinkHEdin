import React, { useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function Avatar() {
    const { user, setUser } = useAuth()
    const divRef = useRef()

    function handleSignOut() {
        setUser(undefined)
    }

    return (
        <div className='nav-item' tabIndex={1}>
            <div className='bg'></div>
            <div className='avatar content'>
                <img src={user.photoprofile} className='image'></img>
                <div className='name'>{user.name}</div>
            </div>
            <div className='dropdown flex flex-col'>
                <p className='link' onClick={handleSignOut}>Sign Out</p>
            </div>
        </div>
    )
}
