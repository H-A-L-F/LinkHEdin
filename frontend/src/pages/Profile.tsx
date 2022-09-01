import React, { createContext, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import AvatarProfile from '../components/Profile/AvatarProfile';
import EditProfileBg from '../components/Profile/EditProfileBg';
import { toastError } from '../config/toast';
import { useAuth } from '../hooks/useAuth';
import { useBackEnd } from '../hooks/useBackEnd';
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi";
import IconButton from '../components/Buttons/IconButton';
import EducationModal from '../components/Profile/EducationModal';
import Modal from '../components/Modal/Modal';
import Education from '../components/Profile/Education';
import Experience from '../components/Profile/Experience';
import UserProfile from './UserProfile';
import { useQuery } from '@apollo/client';
import { FIND_USER_QUERY } from '../query/user';
import { useLoading } from '../hooks/useLoading';
import Loading from '../components/LoadingOverlay/Loading';

const profileContext = createContext({} as any)

export function ProvideUserProfile() {
    // const userProfile = useProvideUserProfile()
    // console.log("testing?")
    // console.log(userProfile)
    const {setLoading} = useLoading()
    
    const { id } = useParams()
    const { user } = useAuth()
    const { loading, data, error, refetch } = useQuery(FIND_USER_QUERY, { variables: { id: id } })

    if (error) {
        console.log(error)
        return <div></div>
    }

    if (loading) {
        return <Loading loading={loading} />
    }

    let currUser = data.user
    const isUser = data.user.id === user.id

    function refetchCurrUser() {
        setLoading(true)
        refetch()
            .then((resp) => {
                const newUser = { ...resp.data.whoisme, token: user.token };
                currUser = newUser
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
                toastError(err.message);
            });
    }

    return (
        <profileContext.Provider value={{ id, currUser, isUser, refetchCurrUser }}>
            <div>
                <UserProfile />
                <div className='h-4'></div>
                <Education />
                <Experience />
            </div>
        </profileContext.Provider>
    )
}

export const useUserProfile = () => {
    return useContext(profileContext)
}

function useProvideUserProfile() {
    const { id } = useParams()
    const { user } = useAuth()
    const { loading, data, error, refetch } = useQuery(FIND_USER_QUERY, { variables: { id: id } })

    if (error) {
        console.log(error)
        return <div></div>
    }

    if (loading) {
        return <Loading loading={loading} />
    }

    const currUser = data.user
    const isUser = data.user.id === user.id

    console.log("masukkk")
    console.log(data)

    return {
        id,
        currUser,
        isUser,
        refetch
    }
}

// export default function Profile() {
//     const { id } = useParams()
//     const { user } = useAuth()
//     const { loading, data, error } = useQuery(FIND_USER_QUERY, { variables: { id: id } })

//     if (error) {
//         console.log(error)
//         return <div></div>
//     }

//     if (loading) {
//         return <Loading loading={loading} />
//     }

//     const currUser = data.user
//     const isUser = data.user.id === user.id

//     return (
//         <div>
//             <UserProfile id={id} isUser={isUser} user={currUser} />
//             <div className='h-4'></div>
//             <Education id={id} isUser={isUser} user={currUser} />
//             <Experience id={id} isUser={isUser} user={currUser} />
//         </div>
//     )
// }
