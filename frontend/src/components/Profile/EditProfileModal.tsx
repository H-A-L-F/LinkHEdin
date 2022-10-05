import { ApolloQueryResult } from '@apollo/client';
import React from 'react'
import { toastError } from '../../config/toast';
import { useBackEnd } from '../../hooks/useBackEnd';
import Modal from '../Modal/Modal';
import { UserInterface } from './UserInterface';

interface EditProfileModalInterface {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: (variables?: Partial<{
        UserID: string | undefined;
    }> | undefined) => Promise<ApolloQueryResult<any>>,
    us?: UserInterface,
    isUser: boolean
}

export default function EditProfileModal({ openModal, setOpenModal, refetch, us, isUser }: EditProfileModalInterface) {
    const {setName} = useBackEnd()

    async function handleSubmit() {
        const school = (document.getElementById("School-ced") as HTMLInputElement).value

        if (!validateInput(school)) return

        try {
            const resAdd = await setName(us?.id, school)
            refetch({ UserID: us?.id })
        } catch (err: any) {
            toastError(err)
        }

        handleClose()
    }

    function validateInput(school: string) {
        if (school === "") {
            toastError("Please fill all the fields")
            return false
        }

        return true
    }

    function handleClose() {
        setOpenModal(false)
    }

    return (
        <Modal
            title='Add Education'
            open={openModal}
            edit={isUser}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            Content=
            {
                <div className='form pr-2'>
                    <div className='h-2'></div>
                    <div className='w-full flex flex-col'>
                        <p className='text-s'>Name</p>
                        <input id='School-ced' type="text" className='text-input ' placeholder='Ex: Binus University' defaultValue={us?.name}/>
                    </div>
                    <div className='h-2'></div>
                </div>
            }
        />
    )
}
