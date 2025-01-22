import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";
import { ILoginUser, IRegisterUser } from "../interfaces/user.interface";
import { ITokensPayload } from "../interfaces/tokens.interface";
import { UploadedFile } from "express-fileupload";
import { UserPresenter } from "../presenter/user.presenter";
import { ApiError } from "../errors/api.eror";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IRegisterUser
            const message = await authService.register(dto)
            res.status(201).json(message)
        } catch (e) {
            next(e);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as ILoginUser
            const user = await authService.login(dto)
            const responseUser = UserPresenter.toResponseWithTokens(user.user, user.tokens)
            res.json(responseUser)
        } catch (e) {
            next(e);
        }
    }

    public async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.res.locals.payload as ITokensPayload
            const oldPassword = req.body.oldPassword as string
            const newPassword = req.body.newPassword as string
            const message = await authService.resetPassword(payload, oldPassword, newPassword)
            res.json(message)
        } catch (e) {
            next(e);
        }
    }

    public async me(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.res.locals.payload as ITokensPayload
            const user = await authService.me(payload)
            const responseUser = UserPresenter.toResponse(user)
            res.json(responseUser)
        } catch (e) {
            next(e);
        }
    }

    public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.res.locals.payload as ITokensPayload
            const avatar = req.files?.file as UploadedFile
            const user = await authService.uploadAvatar(payload, avatar)
            const responseUser = UserPresenter.toResponse(user)
            res.json(responseUser)
        } catch (e) {
            next(e);
        }
    }

    public async getMyGallarey(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.res.locals.payload as ITokensPayload
            const result = await authService.getMyGallarey(payload)
            const responseUser = await UserPresenter.toResponseWithGallarey(result, payload.id)
            res.json(responseUser)
        } catch (e) {
            next(e);
        }
    }

    public async sendMail(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.res.locals.payload as ITokensPayload
            const message = await authService.sendMail(payload)
            res.json(message)
        } catch (e) {
            next(e);
        }
    }
    public async deleteAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.res.locals.payload as ITokensPayload
            const fileName = req.query.fileName as string

            if (!fileName) {
                throw new ApiError(400, "Filename is required")
            }

            const message = await authService.deleteAvatar(payload, fileName)
            res.json(message)
        } catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController()