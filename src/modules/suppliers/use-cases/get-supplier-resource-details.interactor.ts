import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { SupplierResourceDetails } from "../entities";
import { SuppliersRepository } from "./ports/suppliers.repository";

export class GetSupplierResourceDetailsInteractor implements UseCase<number, CustomResponse<SupplierResourceDetails>> {
    constructor(private readonly repository: SuppliersRepository) {}

    async execute(id: number): Promise<CustomResponse<SupplierResourceDetails>> {
        return await this.repository.getSupplierResourceDetails(id);
    }
}