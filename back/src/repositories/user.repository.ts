import { IRegisterUser } from "../interfaces/user.interface";
import { configs } from "../config/config";
import { createClient } from "@supabase/supabase-js";
import { UserRoleEnum } from "../enums/user-role.enum";
import { IUser } from "../interfaces/user.interface";
import { UploadedFile } from "express-fileupload";


class UserRepository {
    constructor(private supaBase = createClient(configs.SUPABASE_URL, configs.SUPABASE_API_KEY)) { }

    public async register(dto: IRegisterUser): Promise<string | null> {
        try {
            const { data, error } = await this.supaBase
                .from('user-table')
                .insert([
                    {
                        username: dto.username,
                        email: dto.email,
                        password: dto.password,
                        age: dto.age,
                        avatar: dto.avatar,
                        role: UserRoleEnum.USER,
                        is_Verified: false,
                    }
                ])
                .select()
                .single();

            if (error) {
                console.error('Error inserting user:', error.message);
                return null;
            }

            if (data) {
                return "User created successfully"

            }


        } catch (err) {
            console.error('Unexpected error:', err);
            return null;
        }
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        try {
            const { data, error } = await this.supaBase
                .from('user-table')
                .select()
                .eq('email', email)
                .single();

            if (error) {
                console.error('Error finding user by email:', error.message);
                return null;
            }

            if (data) {
                return data
            }
            return null
        } catch (err) {
            console.error('Unexpected error:', err);
            return null;
        }
    }

    public async updatePasswordById(id: number, newPassword: string): Promise<string> {
        try {
            const { data, error } = await this.supaBase
                .from('user-table')
                .update({ password: newPassword })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Error finding user by email:', error.message);
                return null;
            }

            if (data) {
                return "Password updated successfully"
            }
            return "Password updated successfully"
        }
        catch (err) {
            console.error('Unexpected error:', err);
            return null;
        }
    }

    public async createAvatar(path: string, file: UploadedFile): Promise<string | null> {
        try {
            const { data, error } = await this.supaBase.storage
                .from('test')
                .upload(path, file.data, {
                    upsert: true
                });

            if (error) {
                console.error('Upload error:', error.message, error);
                return null;
            }

            console.log('File uploaded successfully:', data.path);
            return data.path;
        } catch (err) {
            console.error('Unexpected error:', err);
            return null;
        }
    }

    public async updateAvatarById(id: number, path: string): Promise<string> {
        try {
            const { error } = await this.supaBase
                .from('user-table')
                .update({ avatar: path })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Error finding user by email:', error.message);
                return null;
            }
            return "Avatar updated successfully"
        }
        catch (err) {
            console.error('Unexpected error:', err);
            return null;
        }
    }
}

export const userRepository = new UserRepository();
