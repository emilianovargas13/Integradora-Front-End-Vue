import { UseCase } from "@/kernel/contracts";
import { CustomResponse, FilterDto } from "@/kernel/types";
import { Resource } from "../entities/resource";
import { ResourcesRepository } from "./ports/resources.repository";

export class FindPagedResourceInteractor implements UseCase<FilterDto, CustomResponse<Resource>>{
    constructor(private readonly resourceTypesRepository: ResourcesRepository){}
    execute(payload: FilterDto): Promise<CustomResponse<Resource>> {
        return this.resourceTypesRepository.findPageResource(payload);
    }
}