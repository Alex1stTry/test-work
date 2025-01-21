import { IUser, IResponseUser } from "../interfaces/user.interface";
import { configs } from "../config/config";

export class UserPresenter {
    public static toResponse(user: IUser): IResponseUser {
        return {
            id: user.id,
            username: user.username,
            age: user.age,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            last_Login: user.last_Login,
            avatar: user.avatar ? `${configs.SUPABASE_BUCKET_URL}/${user.avatar}` : null,
        }
    }
}