import Axios from 'axios'

export const axios = Axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 60000, // 超时
    baseURL: 'http://localhost:30000/api/'
})

export class api {
}