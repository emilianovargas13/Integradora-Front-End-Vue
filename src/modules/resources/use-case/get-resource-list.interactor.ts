import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { GetResourceListDto } from "../entities";
import { ResourcesRepository } from "./ports/resources.repository";

export class GetResourceListInteractor implements UseCase<null, CustomResponse<GetResourceListDto>> {
    constructor(private readonly repository: ResourcesRepository) {}

    async execute(): Promise<CustomResponse<GetResourceListDto>> {
        return this.repository.getResourceList();
    }
}