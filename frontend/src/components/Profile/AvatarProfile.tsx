import React from 'react'
import { toastError } from '../../config/toast'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'
import { useUserProfile } from '../../pages/Profile'

export default function AvatarProfile() {
    const { user } = useAuth()
    const { currUser, isUser } = useUserProfile()
    const { setProfilePict } = useBackEnd()

    function imageOnChange(e: any) {
        if (!validateFile(e.target)) return
        const img = e.target.files[0]
        setProfilePict(img, user.id)
    }

    function validateFile(form: any) {
        if (form.files.length == 0) {
            toastError("Please choose a picture")
            return false
        }
        return true;
    }

    return (
        <div className='avatar'>
            {isUser ?
                <div>
                    <label htmlFor="input-file-ava">
                        <img
                            className="image"
                            src={user.PhotoProfile}
                            alt=""
                        />
                    </label>
                    <input
                        onChange={imageOnChange}
                        className="none"
                        id="input-file-ava"
                        type="file"
                        hidden={true}
                    />
                </div>
                :
                <img
                    className="image"
                    src={currUser.PhotoProfile}
                    alt=""
                />
            }

        </div>
    )
}
