import {customAlphabet, nanoid} from 'nanoid'

const nanoId = customAlphabet('0123456789', 8);
const chapterId = customAlphabet('0123456789', 10);

export let get_book_id = () => {
    return Number(nanoId())
}

export let get_chapter_id = () => {
    return Number(chapterId())
}

