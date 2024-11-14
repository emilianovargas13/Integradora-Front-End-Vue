import { CustomResponse, FilterDto } from "@/kernel/types";
import { UsersStorageGateway } from "./users.storage.gateway";
import { ChangeUserStatusInteractor, GetUsersPagedInteractor, ResetUserPasswordInteractor, SaveUserInteractor } from "../use-cases";
import { SaveUserDto, User } from "../entities";

export class UsersController {
    getUsersPaged(filter: FilterDto) {
        try {
            const repository = new UsersStorageGateway();
            const interactor = new GetUsersPagedInteractor(repository);
            return interactor.execute(filter);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<User>;
        }
    }

    saveUser(payload: SaveUserDto) {
        try {
            const repository = new UsersStorageGateway();
            const interactor = new SaveUserInteractor(repository);
            return interactor.execute(payload);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<null>;
        }
    }

    changeUserStatus(id: number) {
        try {
            const repository = new UsersStorageGateway();
            const interactor = new ChangeUserStatusInteractor(repository);
            return interactor.execute(id);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<null>;
        }
    }

    resetUserPassword(id: number) {
        try {
            const repository = new UsersStorageGateway();
            const interactor = new ResetUserPasswordInteractor(repository);
            return interactor.execute(id);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<null>;
        }
    }
}