import React from 'react'
import { useParams } from 'react-router-dom'

export default function Profile() {
    const { id } = useParams()

    return (
        <div className='box'>
            <div className='profile'>
                <div className='profile-bg'>
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    )
}
