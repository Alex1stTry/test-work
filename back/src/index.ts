import express from 'express'
import cors from 'cors'
import { configs } from './config/config'
import { authRouter } from './routers/auth.router'
import { ApiError } from './errors/api.eror'
import { NextFunction, Request, Response } from 'express'
import fileupload from "express-fileupload";



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileupload())
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: [
            "Authorization",
            "Content-Type",
        ],
        preflightContinue: false,
        optionsSuccessStatus: 200,
    }),

)

app.use('/auth', authRouter)



app.listen(configs.APP_PORT, configs.APP_HOST, async () => {
    console.log(`Listening on http://${configs.APP_HOST}:${configs.APP_PORT}`);
})

app.use('*', (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json(err.message)
})


process.on('uncaughtException', (e) => {
    console.error('uncaughtException', e.message, e.stack)
    process.exit(1)
})
