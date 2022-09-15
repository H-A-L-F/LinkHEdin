import React from 'react'
import { filteringAtMention, RichTextPost } from '../../lib/function'

interface RichTextInterface {
    text: string
}

export default function RichText({ text }: RichTextInterface) {
    function loop() {
        let temp = text.split(" ")
        let tempArr: string[] = []
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
        return tempArr.join('')
    }

    function genRichText(input: string) {
        let res = filteringAtMention(input)
        return RichTextPost(res[0], 99, res[1])
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: loop() }}>
        </div>
    )
}
