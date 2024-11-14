import { UseCase } from "@/kernel/contracts";
import { SaveSupplierResourceDto } from "../entities";
import { CustomResponse } from "@/kernel/types";
import { SuppliersRepository } from "./ports/suppliers.repository";

export class SaveSupplierResourceInteractor implements UseCase<SaveSupplierResourceDto, CustomResponse<null>> {
    constructor(private readonly repository: SuppliersRepository) {}

    async execute(payload: SaveSupplierResourceDto): Promise<CustomResponse<null>> {
        return await this.repository.saveSupplierResource(payload);
    }
}