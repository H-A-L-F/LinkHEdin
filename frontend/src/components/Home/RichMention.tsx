import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { appendDivString, filteringAtMention, regexGetId } from '../../lib/function';
import { FIND_USER_QUERY } from '../../query/user';
import ReactLoading from "react-loading";
import { useNavigate } from 'react-router-dom';

interface RichMentionInterface {
    data: string
}

export default function RichMention({ data }: RichMentionInterface) {
    let res = filteringAtMention(data)
    let val = ""
    let id: string | false = false
    data = res[0]
    for (let i = 0; i < data.length; i++) {
        if (data.charAt(i) === '@') {
            let text = ""
            for (let j = i; j < data.length; j++) {
                if (j != i)
                    text += data.charAt(j)
                text = text.trim()
                if (data.charAt(j) == ' ' || j == data.length - 1) {
                    id = regexGetId(res[1])
                    const div = `<a href="/profile/${id}" value="${text}" id="${id}" class='richat ri-class'>`
                    const endDiv = '</a>'
                    const lenDiv = div.length + 1
                    val = data.substring(i, j + 2)
                    data = appendDivString(data, i, j + 2, div, endDiv)
                    i += lenDiv;
                    break;
                }
            }
        }
    }

    const { user } = useAuth()
    const userState = useQuery(FIND_USER_QUERY, {
        variables: { id: id },
    })
    const [open, setOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    function handleClick() {
        if (id !== false) navigate("/profile/" + id)
    }

    return (
        <React.Fragment>
            {open ? (
                userState.loading ? (
                    <ReactLoading
                        className="loading-react-loading"
                        type="bars"
                        color="black"
                        height={"10%"}
                        width={"10%"}
                    ></ReactLoading>
                ) : (
                    <div className='profile-hover' style={{
                        transition: "all 1s ease",
                        display: open ? "block" : "none",
                    }}>
                        <div className='sq-avatar'>
                            <img src={userState.data.user.PhotoProfile} className='sq-avatar-image' />
                        </div>
                        <div className='w-2'></div>
                        <div className='flex flex-col'>
                            <div className='text-md font-semibold'>{userState.data.user.name}</div>
                            <div className='text-sm font-normal'>{userState.data.user.email}</div>
                        </div>
                    </div>
                )
            ) : (
                ""
            )}
            <span className='link p-0 m-0' onMouseEnter={() => { setOpen(true) }} onMouseLeave={() => { setOpen(false) }} onClick={handleClick}>

                {
                    val + " "
                }
            </span>
        </React.Fragment>
    )
}
