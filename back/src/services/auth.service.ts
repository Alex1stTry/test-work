import { ILogin, ILoginUser, IRegisterUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { hashService } from "./hash.service";
import { ApiError } from "../errors/api.eror";
import { tokenService } from "../services/token.service";
import { tokensRepository } from "../repositories/tokens.repository";
import { ITokensPayload } from "../interfaces/tokens.interface";
import { IUser } from "../interfaces/user.interface";
import { UploadedFile } from "express-fileupload";

class AuthService {
    public async register(dto: IRegisterUser): Promise<string> {
        const user = await userRepository.findByEmail(dto.email)

        if (user) {
            throw new ApiError(409, 'User already exists')
        }

        const password = await hashService.hashPassword(dto.password)

        return await userRepository.register({ ...dto, password })
    }

    public async login(dto: ILoginUser): Promise<ILogin> {
        const user = await userRepository.findByEmail(dto.email)

        const isPasswordCorrect = await hashService.comparePassword(dto.password, user.password)

        if (!isPasswordCorrect) {
            throw new ApiError(401, 'Incorrect credentials')
        }
        const tokens = await tokenService.generateToken({ id: user.id, email: user.email, role: user.role })

        const tokenPair = await tokensRepository.create(user.id, tokens)
        const updatedUser = await userRepository.update(user.id, { token_pair_id: tokenPair.id })

        return { user: updatedUser, tokens }
    }

    public async resetPassword(payload: ITokensPayload, oldPassword: string, newPassword: string): Promise<string> {
        const user = await userRepository.findByEmail(payload.email)

        const isPasswordCorrect = await hashService.comparePassword(oldPassword, user.password)
        if (!isPasswordCorrect) {
            throw new ApiError(401, 'Incorrect credentials')
        }

        const hashPassword = await hashService.hashPassword(newPassword)
        return await userRepository.updatePasswordById(user.id, hashPassword)
    }
    public async me(payload: ITokensPayload): Promise<IUser> {
        return await userRepository.findByEmail(payload.email)
    }

    public async uploadAvatar(payload: ITokensPayload, avatar: UploadedFile): Promise<IUser> {
        const user = await userRepository.findByEmail(payload.email)

        const path = `avatar/${user.id}/${avatar.name}`

        await userRepository.updateAvatarById(user.id, path)

        await userRepository.createAvatar(path, avatar)

        return await userRepository.findByEmail(payload.email)
    }
}
export const authService = new AuthService()