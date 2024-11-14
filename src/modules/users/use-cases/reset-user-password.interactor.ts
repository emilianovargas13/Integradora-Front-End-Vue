import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { UsersRepository } from "./ports/users.repository";

export class ResetUserPasswordInteractor implements UseCase<number, CustomResponse<string>> {
    constructor(private readonly repository: UsersRepository) {}

    async execute(id: number): Promise<CustomResponse<string>> {
        return await this.repository.resetUserPassword(id);
    }
}