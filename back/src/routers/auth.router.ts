import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AuthValidator } from "../validators/auth.validator";
import { authController } from "../controllers/auth.controller";
import { fileMiddleware } from "../middlewares/avatar.middleware";
import { tokenMiddleware } from "../middlewares/token.middleware";
import { avatarConstants } from "../constants/avatar.constant";

const router = Router()

router.post('/sign-up', authMiddleware.isBodyValid(AuthValidator.register), authController.signUp)

router.post('/sign-in', authMiddleware.isBodyValid(AuthValidator.login), authController.login)

router.post('/reset-password', tokenMiddleware.checkAccessToken, authController.sendMail)
router.put('/reset-password', tokenMiddleware.checkActionToken, authController.resetPassword)

router.get('/me', tokenMiddleware.checkAccessToken, authController.me)

router.post('/upload-avatar', tokenMiddleware.checkAccessToken, fileMiddleware.isFileValid(avatarConstants), authController.uploadAvatar)
router.delete('/delete-avatar', tokenMiddleware.checkAccessToken, authController.deleteAvatar)
router.get('/my-gallarey', tokenMiddleware.checkAccessToken, authController.getMyGallarey)
export const authRouter = router