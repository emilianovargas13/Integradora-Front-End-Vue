import { UseCase } from "@/kernel/contracts";
import { UpdateResourceTypeDto } from "../entities/update-resource-type.dto";
import { CustomResponse } from "@/kernel/types";
import { ResourceType } from "../entities/ResourceType";
import { ResourceTypesRepository } from "./ports/resource-types.repository";

export class UpdateResourceTypeInteractor implements UseCase<UpdateResourceTypeDto, CustomResponse<ResourceType>>{
    constructor(private readonly resourceTypeRepository: ResourceTypesRepository) {}
    execute(payload: UpdateResourceTypeDto): Promise<CustomResponse<ResourceType>> {
        return this.resourceTypeRepository.updateResourceType(payload);
    }
}