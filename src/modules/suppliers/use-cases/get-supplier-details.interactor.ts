import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { Supplier } from "../entities";
import { SuppliersRepository } from "./ports/suppliers.repository";

export class GetSupplierDetailsInteractor implements UseCase<number, CustomResponse<Supplier>> {
    constructor(private readonly repository: SuppliersRepository) {}

    async execute(id: number): Promise<CustomResponse<Supplier>> {
        return await this.repository.getSupplierDetails(id);
    }
}