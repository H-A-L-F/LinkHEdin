import { useMutation } from '@apollo/client';
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { useBackEnd } from '../hooks/useBackEnd';
import { UPDATE_USER_QUERY } from '../query/user';

export default function Profile() {
    const { id } = useParams()
    const { user } = useAuth()
    const [updateFunc] = useMutation(UPDATE_USER_QUERY)
    const { uploadImage, constructUpdateUser, updateProfilePict } = useBackEnd()

    function imageOnChange(e: any) {
        const img = e.target.files[0]
        uploadImage(img).then((url: string) => {
            const updateUser = constructUpdateUser({ profpict: url })
            updateProfilePict(updateFunc({ variables: { id: user.id, input: updateUser } }))
        })
    }

    return (
        <div className='box'>
            <p>test</p>
            <div className='profile'>
                <div className='profile-bg'>
                    
                </div>
                <div className='avatar'>
                    <label htmlFor="input-file">
                        <img
                            className="image"
                            src={user.photoprofile}
                            alt=""
                        />
                    </label>
                    <input
                        onChange={imageOnChange}
                        className="none"
                        id="input-file"
                        type="file"
                        hidden={true}
                    />
                </div>
            </div>
        </div>
    )
}
