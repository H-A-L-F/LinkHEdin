import React, { createRef, useState } from 'react'
import { HiPhotograph, HiPlay, HiVideoCamera, HiX } from "react-icons/hi";
import { useAuth } from '../../hooks/useAuth';
import Popup from '../Modal/Popup';

export default function StartAPost() {
    const { user } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const [value, setValue] = useState<any>("");
    const [image, setImage]: any = useState()
    const [video, setVideo]: any = useState()

    const imgRef = createRef<HTMLInputElement>();

    function handleClose() {
        setOpenModal(false)
    }

    function handleOpen() {
        setOpenModal(true)
    }

    function handleSetImage() {

    }

    function handleSetVideo() {

    }

    function handleImageOnChange() {
        let img = null;
        if (imgRef?.current?.files?.length == 1) {
            img = imgRef?.current?.files[0];
        }
        if (img === null) return;
        let reader = new FileReader();

        reader.readAsDataURL(img);
        reader.onload = () => {
            setVideo(undefined)
            setImage(reader.result);
        };

    }

    function handleRemoveImage() {
        (document.getElementById("file-input") as HTMLInputElement).value = ""
        setImage(undefined)
    }

    return (
        <React.Fragment>
            <div className='box'>
                <div className='flex flex-col'>
                    <div className='btn-plain add-outline' onClick={handleOpen}>
                        <div className='bg'></div>
                        <div className='place-self-start py-4'>
                            Start a post
                        </div>
                    </div>
                    <div className='h-4'></div>
                    <div className='flex flex-row'>
                        <div className='btn-plain'>
                            <div className='bg'></div>
                            <div className='flex flex-row py-4'>
                                <HiPhotograph className='fill-info' />
                                <div className='w-2'></div>
                                <div className='font-semibold'>Photo</div>
                            </div>
                        </div>

                        <div className='btn-plain'>
                            <div className='bg'></div>
                            <div className='flex flex-row py-4'>
                                <HiPlay className='fill-success' />
                                <div className='w-2'></div>
                                <div className='font-semibold'>Photo</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Popup
                open={openModal}
                handleClose={handleClose}
                Content={
                    <div className='flex flex-col'>
                        <div className='flex flex-row justify-between center-all'>
                            <div className='text-lg font-semibold'>Create a post</div>
                            <div className='btn-plain w-fit h-fit py-2 px-2' onClick={handleClose}>
                                <div className='bg'></div>
                                <HiX size={24} />
                            </div>
                        </div>
                        <div className='divider'></div>
                        <div className='h-4'></div>
                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <div className='inv-avatar'>
                                    <img src={user.PhotoProfile} className='inv-avatar-image' />
                                </div>
                                <div className='w-2'></div>
                                <div className='text-md font-semibold'>{user.name}</div>
                            </div>
                            {image &&
                                <div className='preview'>
                                    <div className='content-pos'>
                                        <img src={image} className='content' />
                                    </div>
                                    <div className='remove' onClick={handleRemoveImage}>
                                        <div className='btn-ghost w-fit h-fit py-2 px-2'>
                                            <div className='bg'></div>
                                            <HiX size={24} />
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className='h-2'></div>
                            <div className='btn-plain w-fit h-fit py-2'>
                                <div className='bg'></div>
                                <div className='text-info text-md font-semibold'>Add hashtag</div>
                            </div>
                            <div className='h-2'></div>
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-row'>
                                    <label htmlFor="file-input-img" className="file-input-img">
                                        <div className='btn-plain w-fit h-fit'>
                                            <div className='bg'></div>

                                            <HiPhotograph size={24} />
                                        </div>
                                    </label>
                                    <input
                                        ref={imgRef}
                                        id="file-input-img"
                                        type="file"
                                        name="media"
                                        accept="image/*"
                                        onChange={handleImageOnChange}
                                        hidden
                                    />
                                    <div className='btn-plain w-fit h-fit'>
                                        <div className='bg'></div>
                                        <HiVideoCamera size={24} />
                                    </div>
                                </div>
                                <div className='btn-primary'>
                                    <div className='bg'></div>
                                    <div className=''>Post</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </React.Fragment>
    )
}
