import { UseCase } from "@/kernel/contracts";
import { UpdateResourceDto } from "../entities/update-resource-type.dto";
import { CustomResponse } from "@/kernel/types";
import { Resource } from "../entities";
import { ResourcesRepository } from "./ports/resources.repository";

export class UpdateResourceInteractor implements UseCase<UpdateResourceDto, CustomResponse<Resource>>{
    constructor(private readonly resourceTypeRepository: ResourcesRepository) {}
    execute(payload: UpdateResourceDto): Promise<CustomResponse<Resource>> {
        return this.resourceTypeRepository.updateResource(payload);
    }
}