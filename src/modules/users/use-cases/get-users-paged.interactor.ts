import { UseCase } from "@/kernel/contracts";
import { CustomResponse, FilterDto } from "@/kernel/types";
import { User } from "../entities/user";
import { UsersRepository } from "./ports/users.repository";

export class GetUsersPagedInteractor implements UseCase<FilterDto, CustomResponse<User>> {
    constructor(private readonly repository: UsersRepository) {}
    
    async execute(filter: FilterDto): Promise<CustomResponse<User>> {
        return await this.repository.getUsersPaged(filter);
    }
}