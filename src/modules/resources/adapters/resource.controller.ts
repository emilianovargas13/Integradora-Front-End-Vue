import { SaveResourceDto } from "../entities/save-resource-dto";
import { Resource } from "../entities/resource";
import { ResourceStoreGateway } from "./resource.storage.gateway";
import { CustomResponse, FilterDto } from "@/kernel/types";
import { FindPagedResourceInteractor, SaveResourcesInteractor, ChangeResourceStatusInteractor, UpdateResourceInteractor, GetResourceListInteractor } from "../use-case/index";
import { UpdateResourceDto } from "../entities/update-resource-type.dto";
import { GetResourceListDto } from "../entities";

export class ResourceController {
    
    findPageResource(filter: FilterDto) {
        try {
            const resourceRepository = new ResourceStoreGateway();
            const resourceInteractor = new FindPagedResourceInteractor(resourceRepository);
            return resourceInteractor.execute(filter);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<Resource>;
        }
    }

    saveResource(resourceDto: SaveResourceDto) {
        try {
            const resourceRepository = new ResourceStoreGateway();
            const saveResourcesInteractor = new SaveResourcesInteractor(resourceRepository); 
            return saveResourcesInteractor.execute(resourceDto);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<Resource>;
        }
    }

    changeResourceStatus(id: number) {
        try {
            const resourceRepository = new ResourceStoreGateway();
            const changeResourceStatusInteractor = new ChangeResourceStatusInteractor(resourceRepository);
            return changeResourceStatusInteractor.execute(id);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<Resource>;
        }
    }

    updateResource(updateResourceDto: UpdateResourceDto) {
        try {
            const resourceRepository = new ResourceStoreGateway();
            const updateResourceTypeInteractor = new UpdateResourceInteractor(resourceRepository);
            return updateResourceTypeInteractor.execute(updateResourceDto);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<Resource>;
        }
    }

    getResourceList() {
        try {
            const repository = new ResourceStoreGateway();
            const interactor = new GetResourceListInteractor(repository);
            return interactor.execute();
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<GetResourceListDto>;
        }
    }
}
