import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Mention, MentionsInput } from 'react-mentions';
import { GET_HASHTAG_QUERY } from '../../query/hashtag';
import { GET_USER_QUERY } from '../../query/user';
import mentionInputStyle from './mentionInputStyle';
import mentionStyle from './mentionStyle';

interface RichInputInterface {
    value: string,
    setValue: React.Dispatch<any>,
}

export default function RichInput({value, setValue}: RichInputInterface) {
    const userRes = useQuery(GET_USER_QUERY);
    const [users, setUsers] = useState([]);
    const [hashtag, setHashtag] = useState([]);
    const hashtagRes = useQuery(GET_HASHTAG_QUERY);

    useEffect(() => {
        if (hashtagRes.data && hashtagRes.data.length !== 0) {
            const data = hashtagRes.data.getAllHashtag;
            setHashtag(
                data.map((data: any) => {
                    return { id: data, display: data };
                })
            );
        }
    }, [hashtagRes]);

    useEffect(() => {
        if (userRes.data) {
            setUsers(
                userRes.data.users.map((data: any) => {
                    return { id: data.id, display: "@" + data.name };
                })
            );
        }
    }, [userRes]);

    return (
        <MentionsInput
            style={mentionInputStyle}
            className="mention-input"
            value={value}
            onChange={(e: any) => {
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
