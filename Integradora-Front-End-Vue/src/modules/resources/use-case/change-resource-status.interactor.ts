import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { Resource } from "../entities";
import { ResourcesRepository } from "./ports/resources.repository";

export class ChangeResourceStatusInteractor implements UseCase<number, CustomResponse<Resource>> {
    constructor(private readonly resourceTypeRepository: ResourcesRepository) {}
    execute(payload: number): Promise<CustomResponse<Resource>> {
        return this.resourceTypeRepository.changeResourceStatus(payload);
    }

}