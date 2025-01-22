import { IUser, IResponseUser } from "../interfaces/user.interface";
import { configs } from "../config/config";
import { ITokens } from "../interfaces/tokens.interface";
import { IResponseUserWithTokens } from "../interfaces/user.interface";
import { IGallarey } from "../interfaces/gallarey.interface";

export class UserPresenter {
    public static toResponse(data: IUser): IResponseUser {
        return {
            id: data.id,
            username: data.username,
            age: data.age,
            email: data.email,
            role: data.role,
            created_at: data.created_at,
            last_Login: data.last_Login,
            avatar: data.avatar ? `${configs.SUPABASE_BUCKET_URL}/${data.avatar}` : null,
        }
    }

    public static toResponseWithTokens(user: IUser, tokens: ITokens): IResponseUserWithTokens {
        return {
            ...this.toResponse(user),
            tokens
        }
    }
    public static async toResponseWithGallarey(avatars: string[], id: number): Promise<IGallarey> {
        return {
            gallarey: avatars ? avatars.map((avatar) => `${configs.SUPABASE_BUCKET_URL}/avatar/${id}/${avatar}`) : null
        }
    }
}   