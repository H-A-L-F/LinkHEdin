import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { HiPlus, HiBookmark } from "react-icons/hi";
import { JobInterface } from './JobInterface';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';

interface JobOfferInterface {
    data: [JobInterface],
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>,
}

export default function JobOffer({ data, refetch }: JobOfferInterface) {
    const { user } = useAuth()

    const len: number = data.length

    if (len === 0) {
        return <div className='text-lg font-semibold py-4'>There are no job offer</div>
    }

    return (
        <div className='box'>
            <div className='header'>
                Job offers
            </div>
            <div className='content'>
                {data.map((e, idx) => {
                    return (
                        <React.Fragment key={"job-" + idx}>
                            <div className='flex flex-row justify-between align-center center-all'>
                                <div className='flex flex-row'>
                                    <div className='sq-avatar'>
                                        <img src="https://picsum.photos/seed/picsum/200/300" className='sq-avatar-image' />
                                    </div>
                                    <div className='w-4'></div>
                                    <div className='flex flex-col'>
                                        <div className='font-semibold text-lg'>{e.title}</div>
                                        <div className='text-md'>{e.companyName}</div>
                                        <div className='text-sm'>{e.location}</div>
                                    </div>
                                </div>
                                <div className='btn-plain w-fit h-fit py-4 px-2'>
                                    <div className='bg'></div>
                                    <HiBookmark size={24} />
                                </div>
                            </div>
                            {
                                idx < len - 1 && <div className='divider my-4'></div>
                            }
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}
