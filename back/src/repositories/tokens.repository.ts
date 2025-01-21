import { ITokens, ITokensPair } from "../interfaces/tokens.interface";
import { createClient } from "@supabase/supabase-js";
import { configs } from "../config/config";

class TokensRepository {
    constructor(private supaBase = createClient(configs.SUPABASE_URL, configs.SUPABASE_API_KEY)) { }


    public async create(userId: number, tokens: ITokensPair): Promise<ITokens | null> {
        try {
            const { data, error } = await this.supaBase
                .from('tokens')
                .insert([
                    {
                        user_id: userId,
                        access_token: tokens.access_token,
                        refresh_token: tokens.refresh_token
                    }
                ])
                .select()
                .single();

            if (error) {
                console.error('Unexpected error:', error);
                return null;
            }
            return data;
        }
        catch (err) {
            console.error('Unexpected error:', err);
            return null;
        }
    }

    public async isAccessExist(token: string): Promise<ITokens | null> {
        try {
            const { data, error } = await this.supaBase
                .from('tokens')
                .select()
                .eq('access_token', token)
                .single();
            if (error) {
                console.error('Unexpected error:', error);
                return null;
            }
            return data;
        } catch (err) {
            console.error('Unexpected error:', err);
            return null;
        }
    }
}

export const tokensRepository = new TokensRepository()