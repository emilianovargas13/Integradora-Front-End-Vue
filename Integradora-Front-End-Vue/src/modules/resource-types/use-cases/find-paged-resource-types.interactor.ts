import { UseCase } from "@/kernel/contracts";
import { CustomResponse, FilterDto } from "@/kernel/types";
import { ResourceType } from "../entities/ResourceType";
import { ResourceTypesRepository } from "./ports/resource-types.repository";

export class FindPagedResourceTypesInteractor implements UseCase<FilterDto, CustomResponse<ResourceType>>{
    constructor(private readonly resourceTypesRepository: ResourceTypesRepository){}
    execute(payload: FilterDto): Promise<CustomResponse<ResourceType>> {
        return this.resourceTypesRepository.findPageResourceTypes(payload);
    }
}