import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { HiPlus, HiDotsHorizontal } from "react-icons/hi";
import JobModal from '../components/Jobs/JobModal';
import JobOffer from '../components/Jobs/JobOffer';
import { useAuth } from '../hooks/useAuth';
import { FIND_JOB_QUERY } from '../query/job';

export default function Jobs() {
    const { user } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const { loading, data, error, refetch } = useQuery(FIND_JOB_QUERY)

    function handleOpenModal() {
        setOpenModal(true)
    }

    if (error) {
        console.log(error)
        return <div></div>
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <React.Fragment>
            <div className='flex flex-col'>
                <div className='btn-plain w-fit py-4 px-4' onClick={handleOpenModal}>
                    <div className='bg'></div>
                    <div className='flex flex-row'>
                        <HiPlus className='text-md font-bold' />
                        <div className='w-2'></div>
                        <div className='text-md font-bold'>
                            Post a job
                        </div>
                    </div>
                </div>
                <div className='h-4'></div>
                <JobOffer data={data.jobs} />
            </div>
            <JobModal openModal={openModal} setOpenModal={setOpenModal} />
        </React.Fragment>
    )
}
