import React, { useState } from 'react'
import IconButton from '../Buttons/IconButton'
import EducationModal from './EducationModal'
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi";
import { useAuth } from '../../hooks/useAuth';
import { ApolloError, ApolloQueryResult, useQuery } from '@apollo/client';
import { USER_EDUCATION_QUERY } from '../../query/education';
import Loading from '../LoadingOverlay/Loading';

interface EducationInterface {
    id: string | undefined
}

export default function Education({ id }: EducationInterface) {
    const { user } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const { loading, data, error, refetch } = useQuery(USER_EDUCATION_QUERY, { variables: { UserID: id } })

    function openEducationModal() {
        setOpenModal(true)
    }

    return (
        <React.Fragment>
            <div className='box'>
                <div className='header'>
                    Education
                    <IconButton Icon={HiPlus} onClick={openEducationModal} />
                </div>
                <div className='content'>
                    <Body loading={loading} data={data} error={error} refetch={refetch} />
                </div>
            </div>
            <div className='h-4'></div>
            <EducationModal openModal={openModal} setOpenModal={setOpenModal} uid={user.id} refetch={refetch}/>
        </React.Fragment>
    )
}

interface BodyInterface {
    loading: boolean,
    data: any,
    error: ApolloError | undefined
    refetch: (variables?: Partial<{
        UserID: string | undefined;
    }> | undefined) => Promise<ApolloQueryResult<any>>,
}

interface Education {

}

function Body({ loading, data, error, refetch }: BodyInterface) {
    // const { loading, data, error, refetch } = useQuery(USER_EDUCATION_QUERY, { variables: { UserID: id } })

    if (error) {
        console.log(error)
        return <div></div>
    }

    if (loading) {
        return <Loading loading={loading} />
    }

    const res = data.userEducation
    const resLen = res.length
    if (resLen == 1) {
        const ed = res[0]
        return (
            <div className='education'>
                <div className='info'>
                    <div className='font-semibold text-lg'>{ed.School}</div>
                    <div className='text-md'>{ed.FieldOfStudy}</div>
                    <div className='text-sm'>{ed.StartDate} - {ed.EndDate}</div>
                </div>
                <div className='flex flex-row'>
                    <IconButton Icon={HiTrash} />
                    <div className='w-2'></div>
                    <IconButton Icon={HiPencil} />
                </div>
            </div>
        )
    }

    return (
        res.map((ed: any, idx: number) => {
            return (
                <div key={"ed-" + idx}>
                    <div className='education'>
                        <div className='info'>
                            <div className='font-semibold text-lg'>{ed.School}</div>
                            <div className='text-md'>{ed.FieldOfStudy}</div>
                            <div className='text-sm'>{ed.StartDate} - {ed.EndDate}</div>
                        </div>
                        <div className='flex flex-row'>
                            <IconButton Icon={HiTrash} />
                            <div className='w-2'></div>
                            <IconButton Icon={HiPencil} />
                        </div>
                    </div>
                    {
                        (idx < resLen - 1) && <div className='divider'></div>
                    }
                </div>
            )
        })
    )
}
