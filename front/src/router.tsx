import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { MainLayout } from "./layouts/MainLayout";
import { LoginPage, RegisterPage, MyCurrentPage, UpdateAvatarPage, MyGallareyPage } from "./pages/index"
import { AuthRequired } from "./hoc/AuthRequired";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Navigate to={'auth/sign-in'} />
            },
            {
                path: 'auth/sign-in',
                element: <LoginPage />
            },
            {
                path: 'auth/sign-up',
                element: <RegisterPage />
            },
            {
                path: 'auth/me',
                element: <AuthRequired><MyCurrentPage /></AuthRequired>
            },
            {
                path: 'auth/update-avatar',
                element: <AuthRequired><UpdateAvatarPage /></AuthRequired>
            },
            {
                path: 'auth/my-gallery',
                element: <AuthRequired><MyGallareyPage /></AuthRequired>
            }
        ]
    },
]);

export {
    router
}