import React from 'react'
import { To, useNavigate } from 'react-router-dom'

export default function Link({ text, link }: { text: string, link: To }) {
    const navigate = useNavigate()

    function handleClick() {
        navigate(link)
    }

    return (
        <div onClick={handleClick} className='link'>
            {text}
        </div>
    )
}
