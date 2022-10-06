import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { filteringAtMention, RichTextPost, RichTextPost2 } from '../../lib/function'
import { FIND_USER_QUERY } from '../../query/user'
import ReactLoading from "react-loading";
import RichMention from './RichMention'
import RichHashtag from './RichHashtag'

interface RichTextInterface {
    text: string
}

const INDEX = 99

export default function RichText({ text }: RichTextInterface) {
    // const a = RichTextPost2(text, INDEX)
    const { user } = useAuth()
    const [queriedUser, setUser] = useState({
        name: "",
        email: "",
        PhotoProfile: "",
    })
    const { refetch, loading } = useQuery(FIND_USER_QUERY, {
        variables: { id: user.id },
    })
    const [open, setOpen] = useState<boolean>(false)
    const richTagClass = document.getElementsByClassName("ri-class-" + INDEX)
    let tempArr: string[] = []
    // console.log(text)
    const arr: string[] = text.split(" ")

    function handleMouseEnter(name: string) {
        console.log("handling")
        refetch({ id: name }).then((resp) => {
            const data = resp.data.user
            setUser(data)
            setOpen(true)
        })
    }

    for (var i = 0; i < richTagClass.length; i++) {
        let name = richTagClass[i].id
        richTagClass[i].addEventListener("mouseenter", () => {
            handleMouseEnter(name)
        })
        richTagClass[i].addEventListener("mouseleave", (e) => {
            setOpen(false)
        })
    }

    function loop() {
        let temp = text.split(" ")
        temp.map((e: string, idx: number) => {
            if (e.includes('@')) {
                tempArr.push(genRichText(e).concat(" "))
                return genRichText(e)
            }
            else if (e.includes('#')) {
                tempArr.push(genRichText(e).concat(" "))
                return genRichText(e)
                // return RichTextPost(e, 99, e)
            }
            else if (e.includes('http')) {
                tempArr.push(genRichText(e).concat(" "))
                return genRichText(e)
                // return RichTextPost(e, 99, e)
            }
            else {
                tempArr.push(e.concat(" "))
            }
        })
    }

    function genRichText(input: string) {
        let res = filteringAtMention(input)
        return RichTextPost(res[0], INDEX, res[1])
    }

    loop()

    return (
        <React.Fragment>
            {open ? (
                <div className="box">
                    {loading ? (
                        <ReactLoading
                            className="loading-react-loading"
                            type="bars"
                            color="black"
                            height={"10%"}
                            width={"10%"}
                        ></ReactLoading>
                    ) : (
                        <div className='post-profile-hover' style={{
                            transition: "all 1s ease",
                            display: open ? "block" : "none",
                        }}>
                            <div className='flex flex-row p-2'>
                                <div className='sq-avatar'>
                                    <img src={queriedUser.PhotoProfile} className='sq-avatar-image' />
                                </div>
                                <div className='w-2'></div>
                                <div className='flex flex-col'>
                                    <div className='text-md font-semibold'>{queriedUser.name}</div>
                                    <div className='text-sm font-normal'>{queriedUser.email}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                ""
            )}
            {/* <div dangerouslySetInnerHTML={{ __html: loop() }}>
            </div> */}
            {/* <div className="rich-container">
                <div dangerouslySetInnerHTML={{ __html: a }} />
            </div> */}
            <div className='m-0' style={{
                position: "relative",
            }}>
                {arr.map((text: string, idx: number) => {
                    if (text.includes('#')) {
                        return <RichHashtag data={text} key={"rm-" + idx} />
                    }
                    else if (text.includes('@')) {
                        return <RichMention data={text} key={"rm-" + idx} />
                    }
                    else if (text.includes('http')) {
                        return text + " "
                    }
                    else {
                        return text + " "
                    }
                })}
            </div>
        </React.Fragment>
    )
}
