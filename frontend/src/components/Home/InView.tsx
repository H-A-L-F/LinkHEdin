import React, { useState } from 'react'
import { useInView, useInViewEffect } from 'react-hook-inview'
import ReactLoading from "react-loading";

interface InViewInterface {
    callback: () => Promise<void>,
    isLoading: boolean,
    hasMore: boolean
}

export default function InView({ callback, isLoading, hasMore }: InViewInterface) {
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
        return (
            <div className='center-all'>
                <ReactLoading
                    type="balls"
                    color="gray"
                    height={"10%"}
                    width={"10%"}
                ></ReactLoading>
            </div>
        )
    }

    if (!hasMore) {
        return <div className='center-all text-lg font-bold'>No more post...</div>
    }

    return (
        <div ref={ref} className="text-xl font-bold py-4 mb-32">{isVisible ? 'Hello World!' : ''}</div>
    )
}
