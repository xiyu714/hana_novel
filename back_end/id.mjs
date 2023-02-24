import {customAlphabet, nanoid} from 'nanoid'

const nanoId = customAlphabet('0123456789', 8);

export let get_book_id = () => {
    return Number(nanoId())
}

export let get_chapter_id = () => {
    return Number(nanoId())
}

