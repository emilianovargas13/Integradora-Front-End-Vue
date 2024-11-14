import { CustomResponse, FilterDto } from "@/kernel/types";
import { SaveUserDto, User } from "../../entities";

export interface UsersRepository {
    getUsersPaged(filter: FilterDto): Promise<CustomResponse<User>>;
    saveUser(payload: SaveUserDto): Promise<CustomResponse<null>>;
    changeUserStatus(id: number): Promise<CustomResponse<null>>;
    resetUserPassword(id: number): Promise<CustomResponse<string>>;
}