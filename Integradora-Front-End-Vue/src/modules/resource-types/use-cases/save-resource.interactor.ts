import { UseCase } from "@/kernel/contracts";
import { SaveResourceTypeDto } from "../entities/save-resource-type.dto";
import { CustomResponse } from "@/kernel/types";
import { ResourceType } from "../entities/ResourceType";
import { ResourceTypesRepository } from "./ports/resource-types.repository";

export class SaveResourceTypeInteractor implements UseCase<SaveResourceTypeDto, CustomResponse<ResourceType>> {
    constructor(private readonly repository: ResourceTypesRepository) {}
    execute(payload: SaveResourceTypeDto): Promise<CustomResponse<ResourceType>> {
        return this.repository.saveResourceType(payload);
    }
    
}