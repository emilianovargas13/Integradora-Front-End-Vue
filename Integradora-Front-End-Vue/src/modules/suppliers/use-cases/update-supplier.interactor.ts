import { UseCase } from "@/kernel/contracts";
import { UpdateSupplierDto } from "../entities";
import { CustomResponse } from "@/kernel/types";
import { SuppliersRepository } from "./ports/suppliers.repository";

export class UpdateSupplierInteractor implements UseCase<UpdateSupplierDto, CustomResponse<null>> {
    constructor(private readonly repository: SuppliersRepository) {}

    async execute(payload: UpdateSupplierDto): Promise<CustomResponse<null>> {
        return await this.repository.updateSupplier(payload);
    }
}