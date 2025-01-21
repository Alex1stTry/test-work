import Joi from "joi";
import { regexConstants } from "../constants/regex.constant";

export class AuthValidator {
    public static username = Joi.string().required().min(3).max(20);
    public static email = Joi.string().regex(regexConstants.EMAIL).required();
    public static password = Joi.string().regex(regexConstants.PASSWORD).required();
    public static age = Joi.number();


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