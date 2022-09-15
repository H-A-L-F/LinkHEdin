import { toastError } from "../config/toast";

export function findHashtags(searchText: string) {
    var regexp = /\B\#\w\w+\b/g
    const result = searchText.match(regexp);
    if (result) {
        return result
    } else {
        return [];
    }
}

export function findAtTags(searchText: string) {
    var regexp = /\B\@\w\w+\b/g
    const result = searchText.match(regexp);
    if (result) {
        return result
    } else {
        return [];
    }
}

export function sortAtMention(str: string) {
    // removing first index
    if (str.charAt(2) === '@') {
        const temp = str.slice(1)
        const tempArr = findAtTags(temp)
        return tempArr[0]
    } else if (str.charAt(2) === '#') {
        const temp = str.slice(1)
        const tempArr = findHashtags(temp)
        return tempArr[0]
    }
}

export function replaceAt(str: any, index: any, length: any, replacement: any) {
    return str.substring(0, index) + replacement + str.substring(index + length);
}

export function appendDivString(str: string, idx: number, end: number, div: string, lastDiv: string) {
    const len = div.length;
    str = str.slice(0, idx) + div + str.slice(idx);
    str = str.slice(0, len + end - 1) + lastDiv + str.slice(len + end);
    return str;
}

function regexGetId(input: string) {
    console.log("input: " + input)
    let regex = /@\[[^\]]*\]\(\d\)/i;
    let regex2 = /\([0-9]+\)/i;
    let res1 = input.match(regex)
    if (res1 !== null) {
        let res2 = res1[0].match(regex2)
        let str = res2?.toString()
        if (str !== undefined) {
            let final = str.substring(1, str.length - 1)
            console.log(final)
            return final
        }
    }
    toastError("fail to get ID")
    return false
}

export function RichTextPost(str: string, idx: any, raw: string) {
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === '@') {
            let text = ""
            for (let j = i; j < str.length; j++) {
                if (j != i)
                    text += str.charAt(j)
                text = text.trim()
                if (str.charAt(j) == ' ' || j == str.length - 1) {
                    const id = regexGetId(raw)
                    const div = `<a href="/profile/${id}" value="${text}" id="rich-tag${"-" + idx}" class='richat ri-class-${idx}'>`
                    const endDiv = '</a>'
                    const lenDiv = div.length + 1;
                    str = appendDivString(str, i, j + 2, div, endDiv)
                    // str = div + "@" + text + endDiv
                    i += lenDiv;
                    break;
                }
            }
        }
        if (str.charAt(i) === '#') {
            let text = ""
            for (let j = i; j < str.length; j++) {
                if (j != i)
                    text += str.charAt(j)
                if (str.charAt(j) == ' ' || j == str.length - 1) {
                    const div = `<a href='/search/${text}' class='richhashtag'>`
                    const endDiv = '</a>'
                    const lenDiv = div.length + 1;
                    str = appendDivString(str, i, j + 2, div, endDiv)
                    i += lenDiv;
                    console.log("<a>::::", str)
                    break;
                }
            }
        }


        if (str.slice(i, i + 4) === 'http') {
            let text = ""
            for (let j = i; j < str.length; j++) {
                const char = str.charAt(j);
                text += char;
                if (char === ' ' || j === str.length - 1) {
                    const div = `<a href=${text}>`
                    const endDiv = `</a>`
                    const lenDiv = div.length + 1;
                    str = appendDivString(str, i, j + 2, div, endDiv);
                    i += lenDiv;
                    break;
                }
            }
        }
    }

    return str;
}

export function filteringAtMention(str: string): string[] {
    let raw = str
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) === '@') {
            let j = i;
            while (true) {
                j++;
                if (str.charAt(j) === ' ' || j === str.length)
                    break;
            }
            const obj = {
                "index": i,
                "end": j,
            }
            const wantToSort = str.slice(obj.index, obj.end);
            const newStr = sortAtMention(wantToSort)
            str = replaceAt(str, obj.index, obj.end - obj.index, newStr)
        }
    }
    return [str, raw];
}