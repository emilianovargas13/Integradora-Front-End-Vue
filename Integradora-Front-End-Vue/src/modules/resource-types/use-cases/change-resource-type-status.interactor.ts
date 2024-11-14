import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { ResourceType } from "../entities/ResourceType";
import { ResourceTypesRepository } from "./ports/resource-types.repository";

export class ChangeResourceTypeStatusInteractor implements UseCase<number, CustomResponse<ResourceType>> {
    constructor(private readonly resourceTypeRepository: ResourceTypesRepository) {}
    execute(payload: number): Promise<CustomResponse<ResourceType>> {
        return this.resourceTypeRepository.changeResourceTypeStatus(payload);
    }

}