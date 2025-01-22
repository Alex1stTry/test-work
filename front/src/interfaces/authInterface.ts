export interface IUser {
    username: string;
    age?: number;
    email: string;
    password: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IResponseUser extends IUser {
    id: number;
    role: string;
    created_at: Date;
    avatar?: string;
    last_Login?: Date;
}