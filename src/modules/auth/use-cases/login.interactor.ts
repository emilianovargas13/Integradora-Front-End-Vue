import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { LoginDto, UserDto } from "../entities";
import { AuthRepository } from "./ports/auth.repository";

export class LoginInteractor implements UseCase<LoginDto, CustomResponse<UserDto>>{
    constructor(private readonly repository: AuthRepository) {}

    async execute(payload: LoginDto): Promise<CustomResponse<UserDto>> {        
        return await this.repository.login(payload);
    }
}