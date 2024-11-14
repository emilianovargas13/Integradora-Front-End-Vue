import { CustomResponse, FilterDto } from "@/kernel/types";
import { EventType } from "../../entities/EventType";
import { SaveEventTypeDto } from "../../entities/save-event-type.dto";
import { UpdateEventTypeDto } from "../../entities/update-event-type.dto";

export interface EventTypesRepository {
    findPagedEventTypes(filter: FilterDto): Promise<CustomResponse<EventType>>
    saveEventType(saveEventType : SaveEventTypeDto) : Promise<CustomResponse<EventType>>
    changeEventTypeStatus(id: number) : Promise<CustomResponse<EventType>>
    updateEventType(updateEventTypeDto : UpdateEventTypeDto) : Promise<CustomResponse<EventType>>
    findAllEventTypes() : Promise<CustomResponse<EventType>>
}