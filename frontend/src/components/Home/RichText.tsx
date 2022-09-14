import React from 'react'
import { filteringAtMention, RichTextPost } from '../../lib/function'

interface RichTextInterface {
    text: string
}

export default function RichText({text}: RichTextInterface) {
    let a: string = ""

    function genRichText() {
        let res = filteringAtMention(a)
        return RichTextPost(res, 99)
    }

    return (
        <div className=''>
            {genRichText()}
        </div>
    )
}
