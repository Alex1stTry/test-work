import { apiService } from "./apiService"
import { urls } from "../constants/index"
import { IUser, ILoginUser, IResponseUser } from "../interfaces/index"
import { access, actionToken } from "../constants/index"
import { IRes } from "../types/responseType"

const authService = {
    async register(data: IUser): Promise<void> {
        try {
            return apiService.post(urls.auth.register, data)
        } catch (err) {
            console.log("During register :", err)
        }
    },

    async login(user: ILoginUser): Promise<IResponseUser> {
        const { data } = await apiService.post(urls.auth.login, user)
        this.setAccessToken(data.tokens.access_token)
        const { data: me } = await this.me()
        return me
    },

    setAccessToken(token: string): void {
        localStorage.setItem(access, token)
    },

    setActionToken(token: string): void {
        localStorage.setItem(actionToken, token)
    },
    removeAccessToken(): void {
        localStorage.removeItem(access)
    },

    getAccessToken(): string | null {
        return localStorage.getItem(access)
    },


    me(): IRes<IResponseUser> {
        return apiService.get(urls.auth.me)
    },

    uploadPhoto(data: FormData): void {
        apiService.post(urls.auth.uploadAvatar, data)
    },

    async getGallarey(): Promise<{ gallarey: string[] }> {
        const { data } = await apiService.get(urls.auth.checkGallarey)
        return data
    }
}

export {
    authService
}