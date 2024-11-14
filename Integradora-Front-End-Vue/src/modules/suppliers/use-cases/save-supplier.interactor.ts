import { UseCase } from "@/kernel/contracts";
import { SaveSupplierDto } from "../entities";
import { CustomResponse } from "@/kernel/types";
import { SuppliersRepository } from "./ports/suppliers.repository";

export class SaveSupplierInteractor implements UseCase<SaveSupplierDto, CustomResponse<null>> {
    constructor(private readonly repository: SuppliersRepository) {}

    async execute(payload: SaveSupplierDto): Promise<CustomResponse<null>> {
        return await this.repository.saveSupplier(payload);
    }
}