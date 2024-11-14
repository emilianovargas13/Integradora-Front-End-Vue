import { UseCase } from "@/kernel/contracts";
import { CustomResponse } from "@/kernel/types";
import { AuthRepository } from "./ports/auth.repository";
import { ValidatePwRecoveryCodeDto } from "../entities";

export class ValidatePwRecoveryCodeInteractor implements UseCase<ValidatePwRecoveryCodeDto, CustomResponse<boolean>>{
    constructor(private readonly repository: AuthRepository) {}

    async execute(payload: ValidatePwRecoveryCodeDto): Promise<CustomResponse<boolean>> {        
        return await this.repository.validatePasswordRecoveryCode(payload);
    }
}