
import { joiResolver } from "@hookform/resolvers/joi";
import { ILoginUser } from "../../interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthValidator } from "../../validator/authValidator";
import { useNavigate } from "react-router-dom";
import css from './Form.module.css'
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { AxiosError } from "axios";
import { authService } from "../../services/index";

const LoginForm = () => {

    const [error, setError] = useState('')

    const { register, handleSubmit, formState: { isValid } } = useForm<ILoginUser>({
        mode: 'all',
        resolver: joiResolver(AuthValidator.login)
    })

    const nav = useNavigate()

    const log: SubmitHandler<ILoginUser> = async (user) => {
        try {
            await authService.login(user)
            nav('/auth/me')
        } catch (e) {
            if (e instanceof AxiosError) {
                setError(e.response?.data)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(log)} className={css.Form}>
            <TextField id="email" type="text" label="Email" variant="filled" {...register('email')} />

            <TextField id="password" type="text" label="Password" variant="filled" {...register('password')} />

            <Button variant="outlined" type="submit" disabled={!isValid}>Login</Button>
            {error && <div className={css.serverError}>{error}</div>}
        </form>
    )
};

export { LoginForm };
