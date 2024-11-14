import api from '@/config/http-client.gateway';
import { CustomResponse } from "@/kernel/types";
import { AuthRepository } from "../use-cases/ports/auth.repository";
import { LoginDto, RecoverPasswordDto, UserDto, ValidatePwRecoveryCodeDto } from "../entities";

export class AuthStorageGateway implements AuthRepository {    
    async login(payload: LoginDto): Promise<CustomResponse<UserDto>> {
        try {                        
            const response = await api.post('/auth/', payload);            
            return {
                status: response.status,
                message: response.data.message,                
                error: false,
                entity: response.data.data
            }
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<UserDto>;
        }
    }

    async getPasswordRecoveryCode(email: string): Promise<CustomResponse<null>> {
        try {
            const response = await api.patch('/users/generate-password-reset-token', { email });
            return {
                status: response.status,
                message: response.data.message,
                error: false
            } as CustomResponse<null>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<null>;
        }
    }

    async validatePasswordRecoveryCode(payload: ValidatePwRecoveryCodeDto): Promise<CustomResponse<boolean>> {
        try {
            const response = await api.post('/users/validate-token', payload);
            return {
                status: response.status,
                message: response.data.message,
                error: false,
                entity: response.data.data
            } as CustomResponse<boolean>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<boolean>;
        }
    }

    async recoverPassword(payload: RecoverPasswordDto): Promise<CustomResponse<null>> {
        try {
            const response = await api.patch('/users/recover-password', payload);
            return {
                status: response.status,
                message: response.data.message,
                error: false
            }
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<null>;
        }
    }
}