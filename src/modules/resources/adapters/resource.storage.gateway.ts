import { ResourcesRepository } from "../use-case/ports/resources.repository";
import { FilterDto, CustomResponse } from "@/kernel/types";
import { GetResourceListDto, Resource } from "../entities";
import api from '@/config/http-client.gateway';
import { SaveResourceDto } from "../entities/save-resource-dto";
import { UpdateResourceDto } from "../entities/update-resource-type.dto";

export class ResourceStoreGateway implements ResourcesRepository {
    async findPageResource(filter: FilterDto): Promise<CustomResponse<Resource>> {
        try {
            const { dto, paginationDto } = filter;
            const { status, data: { data: { content, totalElements } } } = await api.post('/resources/paged', dto, { params: paginationDto });
            return {
                status,
                entities: content,
                total: totalElements
            } as CustomResponse<Resource>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            };
        }
    }

    async saveResource(resourceTypeDto: SaveResourceDto): Promise<CustomResponse<Resource>> {
        try {
            const { status } = await api.post('/resources/', resourceTypeDto);

            return { status } as CustomResponse<Resource>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            }
        }
    }

    async changeResourceStatus(id: number): Promise<CustomResponse<Resource>> {
        try {
            const { status } = await api.patch('/resources/change/status', { id })
            return { status } as CustomResponse<Resource>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            }
        }
    }
    
    async updateResource(updateResourceTypeDto: UpdateResourceDto): Promise<CustomResponse<Resource>> {
        try {
            const { status } = await api.put('/resources/', updateResourceTypeDto);
            return { status } as CustomResponse<Resource>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            }

        }
    }

    async getResourceList(): Promise<CustomResponse<GetResourceListDto>> {
        try {
            const response = await api.get('/resources/list');
            return {
                status: response.status,
                entities: response.data.data
            }
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            }
        }
    }
}
