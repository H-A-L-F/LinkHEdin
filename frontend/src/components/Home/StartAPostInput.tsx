import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { MentionsInput, Mention } from 'react-mentions'
import { GET_HASHTAG_QUERY } from '../../query/hashtag';
import { GET_USER_QUERY } from '../../query/user';
import mentionInputStyle from './mentionInputStyle';
import mentionStyle from './mentionStyle';

interface StartAPostInputInterface {
    value: any,
    setValue: React.Dispatch<any>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StartAPostInput({ value, setValue, setShow }: StartAPostInputInterface) {
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
        <MentionsInput
            style={mentionInputStyle}
            className="h-32 text-base-content"
            value={value}
            onChange={(e: any) => {
                setShow(false);
                setValue(e.target.value);
            }}
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
    )
}
