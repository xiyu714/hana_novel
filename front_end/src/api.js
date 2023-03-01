import Axios from 'axios'

export const axios = Axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 60000, // 超时
    baseURL:  import.meta.env.PROD?'/api/':'http://localhost:30000/api/'
})

export class api {
}
