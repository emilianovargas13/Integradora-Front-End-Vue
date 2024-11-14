import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { EventType } from "../entities/EventType";
import { EventTypesRepository } from "./ports/event-types.repository";

export class FindAllEventTypesInteractor implements UseCase<any, CustomResponse<EventType>> {
    constructor(private readonly eventTypesRepository: EventTypesRepository){}
    execute(): Promise<CustomResponse<EventType>> {
        return this.eventTypesRepository.findAllEventTypes();
    }
}