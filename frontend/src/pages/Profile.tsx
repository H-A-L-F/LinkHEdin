import { useMutation } from '@apollo/client';
import React from 'react'
import { useParams } from 'react-router-dom'
import { UPDATE_USER_QUERY } from '../query/user';

export default function Profile() {
    const { id } = useParams()
    const [updateFunc] = useMutation(UPDATE_USER_QUERY);

    function imageOnChange(e: any) {
        setLoading(true);
        const img = e.target.files[0];
        sendImage(img)
            .then((url) => {
                const input = {
                    Name: "",
                    Email: "",
                    PhotoProfile: url,
                    Headline: "",
                    BgPhotoProfile: "",
                };

                updateFunc({
                    variables: {
                        id: user.id,
                        input: input,
                    },
                })
                    .then(() => {
                        refetchUser();
                        toastSuccess("Succesfully change image");
                        setLoading(false);
                    })
                    .catch((err) => {
                        setLoading(false);
                        toastError(err.message);
                    });
            })
            .catch((err) => {
                setLoading(false);
                toastError(err.message);
            });
    }

    return (
        <div className='box'>
            <div className='profile'>
                <div className='profile-bg'>
                    <img src="" alt="" />
                    <label htmlFor="input-file">
                        <img
                            id="img-photo-profile"
                            src={data ? data.user.PhotoProfile : ""}
                            alt=""
                        />
                    </label>
                    <input
                        onChange={imageOnChange}
                        className="none"
                        id="input-file"
                        type="file"
                    />
                </div>
            </div>
        </div>
    )
}
