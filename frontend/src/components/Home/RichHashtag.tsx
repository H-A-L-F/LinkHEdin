import React from 'react'
import { useNavigate } from 'react-router-dom'
import { appendDivString, filteringAtMention, regexGetId } from '../../lib/function'

interface RichHashtagInterface {
    data: string,
}

export default function RichHashtag({ data }: RichHashtagInterface) {
    let res = filteringAtMention(data)
    let val = ""
    let text = ""
    data = res[0]
    for (let i = 0; i < data.length; i++) {
        if (data.charAt(i) === '#') {
            for (let j = i; j < data.length; j++) {
                if (j != i)
                    text += data.charAt(j)
                if (data.charAt(j) == ' ' || j == data.length - 1) {
                    const div = `<a href='/search/${text}' class='richhashtag'>`
                    const endDiv = '</a>'
                    const lenDiv = div.length + 1;
                    val = data.substring(i, j + 2)
                    data = appendDivString(data, i, j + 2, div, endDiv)
                    i += lenDiv;
                    break;
                }
            }
        }
    }

    const navigate = useNavigate()

    function handleClick() {
        navigate('/search/' + text)
    }

    return (
        <span className='link' onClick={handleClick}>{val + " "}</span>
    )
}
