import { CustomResponse } from "@/kernel/types";
import { LoginDto, UserDto, ValidatePwRecoveryCodeDto } from "../../entities";
import { RecoverPasswordDto } from "../../entities/recover-password.dto";

export interface AuthRepository {
    login(payload: LoginDto): Promise<CustomResponse<UserDto>>;
    getPasswordRecoveryCode(email: string): Promise<CustomResponse<null>>;
    validatePasswordRecoveryCode(payload: ValidatePwRecoveryCodeDto): Promise<CustomResponse<boolean>>;
    recoverPassword(payload: RecoverPasswordDto): Promise<CustomResponse<null>>;
}