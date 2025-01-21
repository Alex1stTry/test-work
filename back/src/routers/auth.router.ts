import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AuthValidator } from "../validators/auth.validator";
import { authController } from "../controllers/auth.controller";
import { fileMiddleware } from "../middlewares/avatar.middleware";
import { tokenMiddleware } from "../middlewares/token.middleware";

const router = Router()

router.post('/sign-up', authMiddleware.isBodyValid(AuthValidator.register), authController.signUp)

router.post('/sign-in', authMiddleware.isBodyValid(AuthValidator.login), authController.login)

router.put('/reset-password', tokenMiddleware.checkAccessToken, authController.resetPassword)

router.get('/me', tokenMiddleware.checkAccessToken, authController.me)

router.post('/upload-avatar', tokenMiddleware.checkAccessToken, fileMiddleware.isFileValid({ MAX_SIZE: 5 * 1024 * 1024, MIMETYPES: ['image/jpeg', 'image/png'] }), authController.uploadAvatar)

export const authRouter = router