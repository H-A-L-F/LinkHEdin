import React from 'react'
import { filteringAtMention, RichTextPost } from '../../lib/function'

interface RichTextInterface {
    text: string
}

export default function RichText({ text }: RichTextInterface) {
    function genRichText() {
        let res = filteringAtMention(text)
        return RichTextPost(res, 99)
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: genRichText() }}>
        </div>
    )
}
