import { IRegisterUser } from "./user.interface"
import { UserRoleEnum } from "../enums/user-role.enum"

export interface ITokensPair {
    access_token: string
    refresh_token: string
}
export interface ITokens extends ITokensPair {
    id?: number
    created_at?: Date
    user_id?: number | IRegisterUser
}

export interface ITokensPayload {
    id: number,
    role: UserRoleEnum
    email: string
}

