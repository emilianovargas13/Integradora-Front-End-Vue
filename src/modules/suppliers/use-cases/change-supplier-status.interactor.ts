import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { SuppliersRepository } from "./ports/suppliers.repository";

export class ChangeSupplierStatusInteractor implements UseCase<number, CustomResponse<null>> {
    constructor(private readonly storage: SuppliersRepository) {}

    async execute(id: number): Promise<CustomResponse<null>> {
        return await this.storage.changeSupplierStatus(id);
    }
}