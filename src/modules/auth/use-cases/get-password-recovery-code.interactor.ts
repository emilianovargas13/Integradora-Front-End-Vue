import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { AuthRepository } from "./ports/auth.repository";

export class GetPasswordRecoveryCodeInteractor implements UseCase<string, CustomResponse<null>>{
    constructor(private readonly repository: AuthRepository) {}

    async execute(email: string): Promise<CustomResponse<null>> {        
        return await this.repository.getPasswordRecoveryCode(email);
    }
}