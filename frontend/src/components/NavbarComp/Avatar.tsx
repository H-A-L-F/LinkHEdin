import React from 'react'
import './avatar.scss'

export default function Avatar({ image, className }: { image: string, className: string }) {
    return (
        <div className={"avatar " + className}>
            <img className="avatar__image" src={image} />
        </div>
    )
}
