import { CustomResponse, FilterDto } from "@/kernel/types";
import { ResourceTypesStoreGateway } from "./resource-types.storage.gateway";
import { ResourceType } from "../entities/ResourceType";
import { SaveResourceTypeDto } from "../entities/save-resource-type.dto";
import {FindPagedResourceTypesInteractor, SaveResourceTypeInteractor, ChangeResourceTypeStatusInteractor, UpdateResourceTypeInteractor} from "../use-cases/index"
import { UpdateResourceTypeDto } from "../entities/update-resource-type.dto";
import { GetResourceTypeListInteractor } from "../use-cases/get-resource-type-list.interactor";
import { GetResourceTypeListDto } from "../entities/get-resource-type-list.dto";

export class ResourceTypeController { 

    findPageResourceTypes(filter: FilterDto){
        try {
            const resourceTypesRepository  = new ResourceTypesStoreGateway();
            const resourceTypeInteractor = new FindPagedResourceTypesInteractor(resourceTypesRepository);
            return resourceTypeInteractor.execute(filter);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<ResourceType>
        }
    }

    saveResourceType(resourceTypeDto: SaveResourceTypeDto){
        try {
            const resourceTypesRepository  = new ResourceTypesStoreGateway();
            const saveResourceTypeInteractor = new SaveResourceTypeInteractor(resourceTypesRepository);
            return saveResourceTypeInteractor.execute(resourceTypeDto);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<ResourceType>
        }
    }

    changeResourceTypeStatus(id: number){
        try {
            const resourceTypesRepository  = new ResourceTypesStoreGateway();
            const changeResourceTypeStatusInteractor = new ChangeResourceTypeStatusInteractor(resourceTypesRepository);
            return changeResourceTypeStatusInteractor.execute(id);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<ResourceType>
        }
    }

    updateResourceType(updateResourceTypeDto: UpdateResourceTypeDto){
        try {
            const resourceTypesRepository  = new ResourceTypesStoreGateway();
            const updateResourceTypeInteractor = new UpdateResourceTypeInteractor(resourceTypesRepository);
            return updateResourceTypeInteractor.execute(updateResourceTypeDto);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<ResourceType>
        }
    }

    getResourceTypeList() {
        try {
            const repository = new ResourceTypesStoreGateway();
            const interactor = new GetResourceTypeListInteractor(repository);
            return interactor.execute();
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<GetResourceTypeListDto>
        }
    }
}