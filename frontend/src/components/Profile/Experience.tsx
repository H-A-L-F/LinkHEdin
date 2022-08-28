import React, { useState } from 'react'
import IconButton from '../Buttons/IconButton'
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi";
import { useAuth } from '../../hooks/useAuth';
import { ApolloError, ApolloQueryResult, useApolloClient, useQuery } from '@apollo/client';
import Loading from '../LoadingOverlay/Loading';
import { useBackEnd } from '../../hooks/useBackEnd';
import { toastError } from '../../config/toast';
import ExperienceModal from './ExperienceModal';
import { USER_EXPERIENCE_QUERY } from '../../query/experience';
import { ExperienceInterface } from './ExperienceInterface';

export default function Experience({ id }: { id: string | undefined }) {
    const { loading, data, error, refetch } = useQuery(USER_EXPERIENCE_QUERY, { variables: { UserID: id } })
    const [openModal, setOpenModal] = useState(false)
    const { user } = useAuth()

    function openExperienceModal() {
        setOpenModal(true)
    }

    return (
        <React.Fragment>
            <div className='box'>
                <div className='header'>
                    Experience
                    <IconButton Icon={HiPlus} onClick={openExperienceModal} />
                </div>
                <div className='content'>
                    <Body uid={user.id} loading={loading} data={data} error={error} refetch={refetch} />
                </div>
            </div>
            <div className='h-4'></div>
            <ExperienceModal openModal={openModal} setOpenModal={setOpenModal} uid={user.id} refetch={refetch} />
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

    const res = data.userExperience
    const resLen = res.length
    if (resLen == 1) {
        const ex = res[0]
        return (
            <Content ex={ex} uid={uid} refetch={refetch} />
        )
    }

    return (
        res.map((ex: any, idx: number) => {
            return (
                <div key={"ex-" + idx}>
                    <Content ex={ex} uid={uid} refetch={refetch} />
                    {
                        (idx < resLen - 1) && <div className='divider'></div>
                    }
                </div>
            )
        })
    )
}

interface ContentInterface {
    ex: ExperienceInterface,
    uid: string
    refetch: (variables?: Partial<{
        UserID: string | undefined;
    }> | undefined) => Promise<ApolloQueryResult<any>>,
}

function Content({ ex, uid, refetch }: ContentInterface) {
    const { delExperience } = useBackEnd()
    const [openModal, setOpenModal] = useState(false)

    async function handleDelete(id: string) {
        try {
            const resDel = await delExperience(id)
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
                    <div className='font-semibold text-lg'>{ex.Title}</div>
                    <div className='text-md'>{ex.CompanyName + " | " + ex.EmploymentType}</div>
                    <div className='text-sm'>{ex.StartYear} - {ex.EndYear}</div>
                    <div className='text-sm'>{ex.Location}</div>
                </div>
                <div className='flex flex-row'>
                    <IconButton Icon={HiTrash} onClick={() => { handleDelete(ex.ID); console.log(ex.ID) }} />
                    <div className='w-2'></div>
                    <IconButton Icon={HiPencil} onClick={openEditModal} />
                </div>
            </div>
            <ExperienceModal openModal={openModal} setOpenModal={setOpenModal} uid={uid} refetch={refetch} ex={ex} />
        </React.Fragment>
    )
}