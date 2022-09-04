import React, { useState } from 'react'
import { useInView, useInViewEffect } from 'react-hook-inview'

interface InViewInterface {
    callback: () => Promise<void>,
    isLoading: boolean,
}

export default function InView({ callback, isLoading }: InViewInterface) {
    const [isVisible, setIsVisible] = useState(false)

    const ref = useInViewEffect(
        async ([entry], observer) => {
            if (entry.isIntersecting) {
                console.log("Refetch")
                callback()
            } else if (!entry.isIntersecting) {
                console.log("Baca dlu")
            }
            setIsVisible(entry.isIntersecting)
        }
    )

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div ref={ref} className="text-xl font-bold py-4 mb-32">{isVisible ? 'Hello World!' : ''}</div>
    )
}
