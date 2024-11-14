import api from '@/config/http-client.gateway';
import { FilterDto, CustomResponse } from "@/kernel/types";
import { UsersRepository } from "../use-cases/ports/users.repository";
import { SaveUserDto, User } from '../entities';

export class UsersStorageGateway implements UsersRepository {
    async getUsersPaged(filter: FilterDto): Promise<CustomResponse<User>> {
        try {
            const { dto, paginationDto } = filter;
            const { status, data: { data: { content, totalElements } } } = await api.post('/users/paged', dto, { params: paginationDto });
            return {
                status,
                entities: content,
                total: totalElements
            } as CustomResponse<User>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<User>;
        }
    }

    async saveUser(payload: SaveUserDto): Promise<CustomResponse<null>> {
        try {
            const response = await api.post('/users/', payload);
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

    async changeUserStatus(id: number): Promise<CustomResponse<null>> {
        try {
            const response = await api.patch('/users/change/status', { id });
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

    async resetUserPassword(id: number): Promise<CustomResponse<string>> {
        try {
            const response = await api.post('/users/reset-password', { id });
            return {
                status: response.status,
                message: response.data.message,
                entity: response.data.data,
                error: false
            } as CustomResponse<string>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<string>;
        }
    }
}
