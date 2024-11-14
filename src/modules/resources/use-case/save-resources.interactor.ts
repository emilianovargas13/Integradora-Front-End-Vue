import { CustomResponse } from "@/kernel/types";
import { SaveResourceDto } from "../entities/save-resource-dto";
import { UseCase } from "@/kernel/contracts";
import { Resource } from "../entities/resource";
import { ResourcesRepository } from "./ports/resources.repository";


export class SaveResourcesInteractor implements UseCase<SaveResourceDto, CustomResponse<Resource>> {
    constructor(private readonly repository: ResourcesRepository) {}
    execute(payload: SaveResourceDto): Promise<CustomResponse<Resource>> {
        return this.repository.saveResource(payload);
    }
    
}