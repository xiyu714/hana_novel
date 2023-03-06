import {customAlphabet, nanoid} from 'nanoid'

const nanoId = customAlphabet('0123456789', 8);
const chapterId = customAlphabet('0123456789', 10);
const userId = customAlphabet('0123456789', 8);

export let get_book_id = () => {
    return Number(nanoId())
}

export let get_chapter_id = () => {
    return Number(chapterId())
}

export let get_user_id = () => {
    return Number(userId())
}

export let get_session_id = () => {
    return nanoid()
}
