import { ApolloQueryResult, OperationVariables } from '@apollo/client'
import React from 'react'
import { toastError } from '../../config/toast'
import { useBackEnd } from '../../hooks/useBackEnd'
import Modal from '../Modal/Modal'

interface JobModalInterface {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>,
}

export default function JobModal({ openModal, setOpenModal, refetch }: JobModalInterface) {
    const { postAJob } = useBackEnd()

    async function handleSubmit() {
        const title = (document.getElementById("Title-ced") as HTMLInputElement).value
        const companyName = (document.getElementById("CompanyName-ced") as HTMLInputElement).value
        const location = (document.getElementById("Location-ced") as HTMLInputElement).value

        if (!validateInput(title, companyName, location)) return

        try {
            const resAdd = await postAJob(title, companyName, location)
        } catch (err: any) {
            toastError(err)
        }

        refetch()
        handleClose()
    }

    function handleClose() {
        setOpenModal(false)
    }

    function validateInput(title: string, companyName: string, location: string) {
        if ((title === "" || undefined) || (companyName === "" || undefined) || (location === "" || undefined)) {
            toastError("Please fill all the fields!")
            return false
        }

        return true
    }

    return (
        <Modal
            title='Post a job'
            open={openModal}
            edit={true}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            Content=
            {
                <div className='form pr-2'>
                    <div className='h-2'></div>
                    <div className='w-full flex flex-col'>
                        <p className='text-s'>Title</p>
                        <input id='Title-ced' type="text" className='text-input ' placeholder='Ex: Head of Coach' />
                    </div>

                    <div className='w-full flex flex-col'>
                        <p className='text-s'>Company Name</p>
                        <input id='CompanyName-ced' type="text" className='text-input ' placeholder="Ex: Binus University" />
                    </div>

                    <div className='w-full flex flex-col'>
                        <p className='text-s'>Location</p>
                        <input id='Location-ced' type="text" className='text-input ' placeholder="Ex: Kemanggisan, Jakarta" />
                    </div>
                </div>
            }
        />
    )
}
