import React from 'react'
import { filteringAtMention, RichTextPost } from '../../lib/function'

interface RichTextInterface {
    text: string
}

export default function RichText({ text }: RichTextInterface) {
    function genRichText() {
        let res = filteringAtMention(text)
        console.log(RichTextPost(res[0], 99, res[1]))
        return RichTextPost(res[0], 99, res[1])
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: genRichText() }}>
        </div>
    )
}
