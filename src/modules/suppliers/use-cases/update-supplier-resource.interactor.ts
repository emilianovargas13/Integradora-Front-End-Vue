import { UseCase } from "@/kernel/contracts";
import { UpdateSupplierResourceDto } from "../entities";
import { CustomResponse } from "@/kernel/types";
import { SuppliersRepository } from "./ports/suppliers.repository";

export class UpdateSupplierResourceInteractor implements UseCase<UpdateSupplierResourceDto, CustomResponse<null>> {
    constructor(private readonly repository: SuppliersRepository) {}

    async execute(payload: UpdateSupplierResourceDto): Promise<CustomResponse<null>> {
        return await this.repository.updateSupplierResource(payload);
    }
}