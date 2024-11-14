import { UseCase } from "@/kernel/contracts";
import { SaveEventTypeDto } from "../entities/save-event-type.dto";
import { CustomResponse } from "@/kernel/types";
import { EventType } from "../entities/EventType";
import { EventTypesRepository } from "./ports/event-types.repository";

export class SaveEventTypeinteractor implements UseCase<SaveEventTypeDto, CustomResponse<EventType>>{
    constructor(private readonly eventTypesRepository: EventTypesRepository) {}
    execute(payload: SaveEventTypeDto): Promise<CustomResponse<EventType>> {
        return this.eventTypesRepository.saveEventType(payload);
    }
}