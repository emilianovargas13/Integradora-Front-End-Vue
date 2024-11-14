import { UseCase } from "@/kernel/contracts";
import { RecoverPasswordDto } from "../entities";
import { CustomResponse } from "@/kernel/types";
import { AuthRepository } from "./ports/auth.repository";

export class RecoverPasswordInteractor implements UseCase<RecoverPasswordDto, CustomResponse<null>> {
    constructor(private readonly repository: AuthRepository) {}
    
    async execute(payload: RecoverPasswordDto): Promise<CustomResponse<null>> {
        return await this.repository.recoverPassword(payload);
    }
}