import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { ApiError } from "../errors/api.eror";
import { AvatarType } from "../types/avatar-type";

class FileMiddleware {
    public isFileValid(
        config: AvatarType,
    ) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const file = req.files?.file as UploadedFile;
                if (!file) {
                    throw new ApiError(400, "File not found");
                }
                if (file.size > config.MAX_SIZE) {
                    throw new ApiError(400, "Max size is 5mb");
                }
                if (!config.MIMETYPES.includes(file.mimetype)) {
                    throw new ApiError(400, "Invalid file type");
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

export const fileMiddleware = new FileMiddleware();