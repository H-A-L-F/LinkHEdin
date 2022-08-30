import React, { useState } from 'react'
import IconButton from '../Buttons/IconButton'
import EducationModal from './EducationModal'
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi";
import { useAuth } from '../../hooks/useAuth';
import { ApolloError, ApolloQueryResult, useQuery } from '@apollo/client';
import { USER_EDUCATION_QUERY } from '../../query/education';
import Loading from '../LoadingOverlay/Loading';
import { useBackEnd } from '../../hooks/useBackEnd';
import { toastError } from '../../config/toast';
import { EducationInterface } from './EducationInterface';
import { UserInterface } from './UserInterface';

export default function Education({ id, isUser, user }: { id: string | undefined, isUser: boolean, user: UserInterface }) {
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
                    <Body uid={user.id} loading={loading} data={data} error={error} refetch={refetch} />
                </div>
            </div>
            <div className='h-4'></div>
            <EducationModal openModal={openModal} setOpenModal={setOpenModal} uid={user.id} refetch={refetch} />
        </React.Fragment>
    )
}

interface BodyInterface {
    uid: string,
    loading: boolean,
    data: any,
    error: ApolloError | undefined
    refetch: (variables?: Partial<{
        UserID: string | undefined;
    }> | undefined) => Promise<ApolloQueryResult<any>>,
}


function Body({ uid, loading, data, error, refetch }: BodyInterface) {

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
            <Content ed={ed} uid={uid} refetch={refetch} />
        )
    }

    return (
        res.map((ed: any, idx: number) => {
            return (
                <div key={"ed-" + idx}>
                    <Content ed={ed} uid={uid} refetch={refetch} />
                    {
                        (idx < resLen - 1) && <div className='divider'></div>
                    }
                </div>
            )
        })
    )
}

interface ContentInterface {
    ed: EducationInterface,
    uid: string
    refetch: (variables?: Partial<{
        UserID: string | undefined;
    }> | undefined) => Promise<ApolloQueryResult<any>>,
}

function Content({ ed, uid, refetch }: ContentInterface) {
    const { delEducation } = useBackEnd()
    const [openModal, setOpenModal] = useState(false)

    async function handleDelete(id: string) {
        try {
            const resDel = await delEducation(id)
            refetch({ UserID: uid })
        } catch (err: any) {
            toastError(err)
        }
    }

    function openEditModal() {
        setOpenModal(true)
    }

    return (
        <React.Fragment>
            <div className='education'>
                <div className='info'>
                    <div className='font-semibold text-lg'>{ed.School}</div>
                    <div className='text-md'>{ed.FieldOfStudy}</div>
                    <div className='text-sm'>{ed.StartDate} - {ed.EndDate}</div>
                </div>
                <div className='flex flex-row'>
                    <IconButton Icon={HiTrash} onClick={() => { handleDelete(ed.ID); console.log(ed.ID) }} />
                    <div className='w-2'></div>
                    <IconButton Icon={HiPencil} onClick={openEditModal} />
                </div>
            </div>
            <EducationModal openModal={openModal} setOpenModal={setOpenModal} uid={uid} refetch={refetch} ed={ed} />
        </React.Fragment>
    )
}