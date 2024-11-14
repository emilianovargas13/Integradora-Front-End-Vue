import { UseCase } from "@/kernel/contracts";
import { CustomResponse, FilterDto } from "@/kernel/types";
import { Supplier } from "../entities";
import { SuppliersRepository } from "./ports/suppliers.repository";

export class GetSuppliersPagedInteractor implements UseCase<FilterDto, CustomResponse<Supplier>> {
    constructor(private readonly repository: SuppliersRepository) {}

    async execute(filter: FilterDto): Promise<CustomResponse<Supplier>> {
        return await this.repository.getSuppliersPaged(filter);
    }
}