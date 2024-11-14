import { UseCase } from "@/kernel/contracts";
import { GetSupplierResourcesPagedDto, SupplierResource } from "../entities";
import { CustomResponse } from "@/kernel/types";
import { SuppliersRepository } from "./ports/suppliers.repository";

export class GetSupplierResourcesPagedInteractor implements UseCase<GetSupplierResourcesPagedDto, CustomResponse<SupplierResource>> {
    constructor(private readonly repository: SuppliersRepository) {}

    async execute(payload: GetSupplierResourcesPagedDto): Promise<CustomResponse<SupplierResource>> {
        return await this.repository.getSupplierResourcesPaged(payload);
    }
}