import { UseCase } from "@/kernel/contracts";
import { UpdateEventTypeDto } from "../entities/update-event-type.dto";
import { CustomResponse } from "@/kernel/types";
import { EventType } from "../entities/EventType";
import { EventTypesRepository } from "./ports/event-types.repository";

export class UpdateEventTypeInteractor implements UseCase<UpdateEventTypeDto, CustomResponse<EventType>> {
    constructor(private readonly eventTypesRepository: EventTypesRepository){}
    execute(payload: UpdateEventTypeDto): Promise<CustomResponse<EventType>> {
        return this.eventTypesRepository.updateEventType(payload);
    }
}