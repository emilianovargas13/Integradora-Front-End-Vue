import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { UsersRepository } from "./ports/users.repository";

export class ChangeUserStatusInteractor implements UseCase<number, CustomResponse<null>> {
    constructor(private readonly repository: UsersRepository) {}
    
    async execute(id: number): Promise<CustomResponse<null>> {
        return await this.repository.changeUserStatus(id);
    }
}