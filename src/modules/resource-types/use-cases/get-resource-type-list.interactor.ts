import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { GetResourceTypeListDto } from "../entities/get-resource-type-list.dto";
import { ResourceTypesRepository } from "./ports/resource-types.repository";

export class GetResourceTypeListInteractor implements UseCase<null, CustomResponse<GetResourceTypeListDto>> {
    constructor(private readonly repository: ResourceTypesRepository) {}
    async execute(): Promise<CustomResponse<GetResourceTypeListDto>> {
        return await this.repository.getResourceTypeList();
    }
}