import { ITokensPair, ITokensPayload } from "../interfaces/tokens.interface"
import * as jsonwebtoken from "jsonwebtoken"
import { configs } from "../config/config"
import { TokenTypeEnum } from "../enums/token-type.enum"
import { ApiError } from "../errors/api.eror";

class TokenService {
    public async generateToken(payload: ITokensPayload): Promise<ITokensPair> {
        const access_token = jsonwebtoken.sign(payload, configs.ACCESS_SECRET, { expiresIn: configs.ACCESS_EXPIRES_IN });
        const refresh_token = jsonwebtoken.sign(payload, configs.REFRESH_SECRET, { expiresIn: configs.REFRESH_EXPIRES_IN });
        return { access_token, refresh_token }
    }

    public checkToken(token: string, type: TokenTypeEnum): ITokensPayload {
        try {
            let secret: string
            switch (type) {
                case TokenTypeEnum.ACCESS:
                    secret = configs.ACCESS_SECRET
                    break;
                case TokenTypeEnum.REFRESH:
                    secret = configs.REFRESH_SECRET
                    break;
            }
            return jsonwebtoken.verify(token, secret) as ITokensPayload
        } catch (e) {
            throw new ApiError(401, 'Invalid token type ')
        }
    }
    public async generateActionToken(payload: ITokensPayload): Promise<string> {
        return jsonwebtoken.sign(payload, configs.ACTION_TOKEN_SECRET, { expiresIn: configs.ACTION_TOKEN_EXPIRES_IN });
    }

    public checkActionToken(token: string): ITokensPayload {
        return jsonwebtoken.verify(token, configs.ACTION_TOKEN_SECRET) as ITokensPayload
    }
}

export const tokenService = new TokenService()