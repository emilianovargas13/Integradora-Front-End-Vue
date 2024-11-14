import { FilterDto, CustomResponse } from "@/kernel/types";
import { ResourceType } from "../entities/ResourceType";
import { ResourceTypesRepository } from "../use-cases/ports/resource-types.repository";
import api from '@/config/http-client.gateway';
import { SaveResourceTypeDto } from "../entities/save-resource-type.dto";
import { UpdateResourceTypeDto } from "../entities/update-resource-type.dto";
import { GetResourceTypeListDto } from "../entities/get-resource-type-list.dto";
export class ResourceTypesStoreGateway implements ResourceTypesRepository {
    async findPageResourceTypes(filter: FilterDto): Promise<CustomResponse<ResourceType>> {
        try {
            const {dto, paginationDto} = filter;
            const {status, data: {data: {content, totalElements}}} = await api.post('/resourceTypes/paged', dto, {params: paginationDto});
            return {
                status,
                entities: content,
                total: totalElements
            } as CustomResponse<ResourceType>;
        } catch (error : any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            }
        }
    }
    async saveResourceType(resourceTypeDto: SaveResourceTypeDto): Promise<CustomResponse<ResourceType>> {
        try {
            const {status} = await api.post('/resourceTypes/', resourceTypeDto);

            return {status} as CustomResponse<ResourceType>;
        } catch (error : any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            }
        }
    }
    
    async changeResourceTypeStatus(id: number): Promise<CustomResponse<ResourceType>> {
        try {
            const {status} = await api.patch('/resourceTypes/change/status', {id})
            return {status} as CustomResponse<ResourceType>;
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            }
        }
    }
    async updateResourceType(updateResourceTypeDto: UpdateResourceTypeDto): Promise<CustomResponse<ResourceType>> {
        try {
            const {status} = await api.put('/resourceTypes/', updateResourceTypeDto);
            return {status} as CustomResponse<ResourceType>;
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            }
            
        }
    }

    async getResourceTypeList(): Promise<CustomResponse<GetResourceTypeListDto>> {
        try {
            const {status, data: {data}} = await api.get('/resourceTypes/list');
            return {
                status,            
                entities: data
            } as CustomResponse<GetResourceTypeListDto>
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<GetResourceTypeListDto>;
        }
    }
}