import React from 'react'
import { useParams } from 'react-router-dom'
import { toastError } from '../config/toast';
import { useAuth } from '../hooks/useAuth';
import { useBackEnd } from '../hooks/useBackEnd';

export default function Profile() {
    const { id } = useParams()
    const { user } = useAuth()
    const { setProfilePict } = useBackEnd()

    function imageOnChange(e: any) {
        if(!validateFile(e.target)) return
        const img = e.target.files[0]
        setProfilePict(img, user.id)
    }

    function validateFile(form: any) {
        if(form.files.length == 0) {
            toastError("Please choose a picture")
            return false
        }

        return true;
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
