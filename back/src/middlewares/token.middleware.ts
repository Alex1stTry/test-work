import { NextFunction, Request, Response } from "express";
import { tokenService } from "../services/token.service";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.eror";
import { tokensRepository } from "../repositories/tokens.repository";
import { ITokensPayload } from "../interfaces/tokens.interface";
class TokenMiddleware {
    public async checkAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const header = req.headers.authorization
            if (!header) {
                throw new ApiError(401, 'Token isn`t provided');
            }

            const token = header.split('Bearer ')[1]

            const payload = tokenService.checkToken(token, TokenTypeEnum.ACCESS)
            if (!payload) {
                throw new ApiError(401, 'Invalid token')
            }

            const isAccessExist = await tokensRepository.isAccessExist(token)
            if (!isAccessExist) {
                throw new ApiError(401, 'Invalid token')
            }
            req.res.locals.payload = payload as ITokensPayload
            next()
        }
        catch (e) {
            next(e);
        }
    }
}

export const tokenMiddleware = new TokenMiddleware()