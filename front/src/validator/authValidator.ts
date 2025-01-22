import Joi from "joi";

import { regexConstants } from "../constants/index";

export class AuthValidator {
    public static username = Joi.string().required().min(3).max(20).messages({
        "string.empty": "Username is required",
        "string.pattern.base": "Username must be at least 3 characters long and less than 20 characters long",
    });
    public static email = Joi.string().regex(regexConstants.EMAIL).required().messages({
        "string.empty": "Email is required",
        "string.pattern.base": "Invalid email format",
    });
    public static password = Joi.string().regex(regexConstants.PASSWORD).required().messages({
        "string.empty": "Password is required",
        "string.pattern.base": "Password must be at least 8 characters long and contain at least one letter, one number, and one special character",
    });
    public static age = Joi.number().min(16).messages({
        "number.base": "Age must be a number",
        "number.min": "Age must be at least 16 years old",
    });

    public static register = Joi.object({
        username: this.username,
        email: this.email,
        password: this.password,
        age: this.age
    })

    public static login = Joi.object({
        email: this.email,
        password: this.password
    })
}