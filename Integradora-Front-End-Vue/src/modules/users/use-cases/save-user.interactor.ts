import { UseCase } from "@/kernel/contracts";
import { SaveUserDto } from "../entities";
import { UsersRepository } from "./ports/users.repository";
import { CustomResponse } from "@/kernel/types";

export class SaveUserInteractor implements UseCase<SaveUserDto, CustomResponse<null>> {
    constructor(private readonly repository: UsersRepository) {}
    
    async execute(payload: SaveUserDto): Promise<CustomResponse<null>> {
        return await this.repository.saveUser(payload);
    }
}