import { FilterDto, CustomResponse } from "@/kernel/types";
import { EventType } from "../entities/EventType";
import { EventTypesRepository } from "../use-cases/ports/event-types.repository";
import api from '@/config/http-client.gateway';
import { SaveEventTypeDto } from "../entities/save-event-type.dto";
import { UpdateEventTypeDto } from "../entities/update-event-type.dto";
export class EventTypesStorageGateway implements EventTypesRepository {
    async findPagedEventTypes(filter: FilterDto): Promise<CustomResponse<EventType>> {
        try {
            const {paginationDto, dto } = filter;
            const {status, data: {data: {content, totalElements}}} = await api.post('/eventTypes/paged', dto, {params: paginationDto});
            return {
                status,
                entities: content,
                total: totalElements
            } as CustomResponse<EventType>;
        } catch (error : any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            }
        }
    }
    async saveEventType(saveEventType: SaveEventTypeDto): Promise<CustomResponse<EventType>> {
        try {
            const {status} = await api.post('/eventTypes/', saveEventType);
            return {
                status
            } as CustomResponse<EventType>;
        } catch (error : any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            }
            
        }
    }
    async changeEventTypeStatus(id: number): Promise<CustomResponse<EventType>> {
        try {
            const {status} = await api.patch(`/eventTypes/change/status`, {id});
            return {
                status
            } as CustomResponse<EventType>;
        } catch (error : any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            }
        }
    }
    async updateEventType(updateEventTypeDto: UpdateEventTypeDto): Promise<CustomResponse<EventType>> {
        try {
            const {status} = await api.put(`/eventTypes/`, updateEventTypeDto);
            return {
                status
            } as CustomResponse<EventType>;
        } catch (error : any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            }
        }
    }

    async findAllEventTypes(): Promise<CustomResponse<EventType>> {
        try {
            const {status, data: {data}} = await api.get('/eventTypes/list');
            return {
                status,
                entities: data
            } as CustomResponse<EventType>;
        } catch (error : any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            }
        }
    }
}