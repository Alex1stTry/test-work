import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/api.eror";

export class AuthMiddleware {
    public isBodyValid(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body)
                next();
            } catch (e) {
                next(new ApiError(400, e.details[0].message))
            }
        }
    }
}

export const authMiddleware = new AuthMiddleware()