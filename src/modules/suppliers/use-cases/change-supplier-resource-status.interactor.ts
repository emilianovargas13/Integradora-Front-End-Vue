import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { SuppliersRepository } from "./ports/suppliers.repository";

export class ChangeSupplierResourceStatusInteractor implements UseCase<number, CustomResponse<null>> {
    constructor(private readonly repository: SuppliersRepository) {}

    async execute(id: number): Promise<CustomResponse<null>> {
        return await this.repository.changeSupplierResourceStatus(id);
    }
}