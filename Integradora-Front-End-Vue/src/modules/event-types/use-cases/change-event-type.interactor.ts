import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { EventType } from "../entities/EventType";
import { EventTypesRepository } from "./ports/event-types.repository";

export class ChangeEventTypeInteracor implements UseCase<number, CustomResponse<EventType>> {
    constructor(private readonly eventTypesRepository: EventTypesRepository){}
    execute(payload: number): Promise<CustomResponse<EventType>> {
        return this.eventTypesRepository.changeEventTypeStatus(payload)
    }
}