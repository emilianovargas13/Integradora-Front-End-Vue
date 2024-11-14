import { CustomResponse } from "@/kernel/types";
import { LoginDto, RecoverPasswordDto, UserDto, ValidatePwRecoveryCodeDto } from "../entities";
import { GetPasswordRecoveryCodeInteractor, LoginInteractor, RecoverPasswordInteractor, ValidatePwRecoveryCodeInteractor } from "../use-cases";
import { AuthStorageGateway } from "./auth.storage.gateway";


export class AuthController {
    login(payload: LoginDto) {
        try {
            const repository = new AuthStorageGateway();
            const interactor = new LoginInteractor(repository);
            return interactor.execute(payload);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<UserDto>;
        }
    }

    getPasswordRecoveryCode(email: string) {
        try {
            const repository = new AuthStorageGateway();
            const interactor = new GetPasswordRecoveryCodeInteractor(repository);
            return interactor.execute(email);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<null>;            
        }
    }

    validatePasswordRecoveryCode(payload: ValidatePwRecoveryCodeDto) {
        try {
            const repository = new AuthStorageGateway();
            const interactor = new ValidatePwRecoveryCodeInteractor(repository);
            return interactor.execute(payload);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<boolean>;            
        }
    }

    recoverPassword(payload: RecoverPasswordDto) {
        try {
            const repository = new AuthStorageGateway();
            const interactor = new RecoverPasswordInteractor(repository);
            return interactor.execute(payload);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<boolean>;            
        }
    }
}