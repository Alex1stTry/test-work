
const baseURL = 'http://localhost:3001';

const auth = 'auth';

const urls = {
    auth: {
        me: `${auth}/me`,
        login: `${auth}/sign-in`,
        register: `${auth}/sign-up`,
        uploadAvatar: `${auth}/upload-avatar`,
        checkGallarey: `${auth}/my-gallarey`,
        sendMail: `${auth}/reset-password`,
        resetPassword: `${auth}/reset-password`
    }
}
export {
    baseURL,
    urls
}