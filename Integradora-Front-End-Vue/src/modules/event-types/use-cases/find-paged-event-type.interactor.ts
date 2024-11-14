import { UseCase } from "@/kernel/contracts";
import { CustomResponse, FilterDto } from "@/kernel/types";
import { EventType } from "../entities/EventType";
import { EventTypesRepository } from "./ports/event-types.repository";

export class FindPagedEventInteractor implements UseCase<FilterDto, CustomResponse<EventType>> {
    constructor(private readonly eventTypeRepository: EventTypesRepository){}
    execute(payload: FilterDto): Promise<CustomResponse<EventType>> {
        return this.eventTypeRepository.findPagedEventTypes(payload);
    }
}