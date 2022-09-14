import React, { createRef, useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'
import { PostInterface } from './PostInterface'
import { MentionsInput, Mention } from 'react-mentions'
import mentionInputTestStyle from './mentionInputTestStyle'
import mentionStyle from './mentionStyle'
import { useQuery } from '@apollo/client'
import { GET_USER_QUERY } from '../../query/user'
import { GET_HASHTAG_QUERY } from '../../query/hashtag'
import classNames from '../../styles/component.scss'

interface CommentInterface {
    ps: PostInterface,
    // setValue: React.Dispatch<any>,
    // setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Comment({ ps }: CommentInterface) {
    const { user } = useAuth()
    const { commentPost } = useBackEnd()
    const cmtRef = createRef<HTMLTextAreaElement>()
    const [value, setValue] = useState<any>("")

    function handleEnter(event: any) {
        if (event.key === 'Enter') handleComment()
    }

    async function handleComment() {
        const text = cmtRef.current?.value
        // await commentPost(user.id, ps.id, text);
        await commentPost(user.id, ps.id, value);
        (document.getElementById('cmt-input') as HTMLInputElement).value = ""
        setValue("")
    }

    console.log(commentPost)

    const { loading, data, error } = useQuery(GET_USER_QUERY);
    const [users, setUsers] = useState([]);
    const [hashtag, setHashtag] = useState([]);
    const hashtagData = useQuery(GET_HASHTAG_QUERY);

    useEffect(() => {
        if (hashtagData.data && hashtagData.data.length !== 0) {
            const data = hashtagData.data.getAllHashtag;
            setHashtag(
                data.map((data: any) => {
                    return { id: data, display: data };
                })
            );
        }
    }, [hashtagData]);

    useEffect(() => {
        if (data) {
            setUsers(
                data.users.map((data: any) => {
                    return { id: data.id, display: "@" + data.name };
                })
            );
        }
    }, [data]);

    return (
        <div className='box py-4'>
            <div className='comment-box'>
                {/* <textarea id='cmt-input' className='input' placeholder='Comment here...' ref={cmtRef} onKeyDown={handleEnter} /> */}
                <MentionsInput
                    style={mentionInputTestStyle}
                    // classNames={classNames}
                    // className="input"
                    id='cmt-input'
                    value={value}
                    onChange={(e: any) => {
                        // setShow(false);
                        setValue(e.target.value);
                    }}
                    onKeyDown={handleEnter}
                >
                    <Mention
                        trigger="@"
                        style={mentionStyle}
                        data={users}
                    />
                    <Mention
                        trigger="#"
                        style={mentionStyle}
                        data={hashtag}
                    />
                </MentionsInput>
            </div>
        </div>
    )
}
