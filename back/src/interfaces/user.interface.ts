import { UserRoleEnum } from "../enums/user-role.enum";
import { ITokens, ITokensPair } from "./tokens.interface";


export interface IUser {
    id?: number;
    username: string;
    age?: number;
    email: string;
    password: string;
    role: UserRoleEnum;
    created_at?: Date;
    is_Verified?: boolean;
    last_Login?: Date;
    token_pair_id?: number | ITokens;
    avatar?: string;
}

export interface IRegisterUser extends Pick<IUser, 'username' | 'email' | 'password' | 'age' | 'avatar'> {

}

export interface ILoginUser extends Pick<IUser, 'email' | 'password'> { }

export interface IResponseUser extends Pick<IUser, 'id' | 'username' | 'email' | 'age' | 'avatar' | "role" | "created_at" | "last_Login"> { }
export interface ILogin {
    user: IResponseUser,
    tokens: ITokensPair
}