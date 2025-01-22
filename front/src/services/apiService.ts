import axios from "axios";

import { access, baseURL } from "../constants/index"

const apiService = axios.create({ baseURL })


apiService.interceptors.request.use(request => {

    const accessToken = localStorage.getItem(access)
    if (access) {
        request.headers.Authorization = `Bearer ${accessToken}`
    }
    return request
}, error => {
    return Promise.reject(error)
})

export {
    apiService
}