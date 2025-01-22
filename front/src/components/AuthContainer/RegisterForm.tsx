import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { AxiosError } from "axios";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import css from "./Form.module.css"
import { IUser } from "../../interfaces/index";
import { AuthValidator } from "../../validator/authValidator";
import { authService } from "../../services/index";

const RegisterForm = () => {

    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const { formState: { errors, isValid }, register, handleSubmit } = useForm<IUser>({
        mode: 'all',
        resolver: joiResolver(AuthValidator.register)
    })

    const registerUser: SubmitHandler<IUser> = async (data: IUser) => {
        try {
            await authService.register(data)
            navigate('/auth/sign-in')
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data)
            }
        }
    }
    return (
        <form onSubmit={handleSubmit(registerUser)} className={css.Form}>
            <TextField id="username" type="text" label="Name" variant="filled" {...register('username')} />
            {errors.username && <div className={css.error}>{errors.username.message}</div>}

            <TextField id="age" type="number" label="Age" variant="filled" {...register('age')} />
            {errors.age && <div className={css.error}>{errors.age.message}</div>}

            <TextField id="email" label="Email" variant="filled" {...register('email')} />
            {errors.email && <div className={css.error}>{errors.email.message}</div>}

            <TextField id="password" label="Password" variant="filled" {...register('password')} />
            {errors.password && <div className={css.error}>{errors.password.message}</div>}

            <Button variant="outlined" type="submit" disabled={!isValid}>Register</Button>
            {error && <div className={css.serverError}>{error}</div>}
        </form>
    );
};

export { RegisterForm };