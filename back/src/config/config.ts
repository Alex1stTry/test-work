import dotenv from 'dotenv'

dotenv.config()

export const configs = {
    APP_HOST: process.env.HOST,
    APP_PORT: Number(process.env.PORT),

    DB_URI: process.env.MONGO_URI,

    SALT_ROUNDS: Number(process.env.SALT_ROUNDS),

    ACCESS_SECRET: process.env.ACCESS_SECRET,
    ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN,

    REFRESH_SECRET: process.env.REFRESH_SECRET,
    REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN,

    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,

    SUPABASE_BUCKET_URL: process.env.SUPABASE_BUCKET_URL,

    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_EMAIL: process.env.SENDGRID_EMAIL,

    ACTIVATION_LINK: process.env.ACTIVATION_LINK,

    ACTION_TOKEN_SECRET: process.env.ACTION_TOKEN_SECRET,
    ACTION_TOKEN_EXPIRES_IN: process.env.ACTION_TOKEN_EXPIRES_IN

}