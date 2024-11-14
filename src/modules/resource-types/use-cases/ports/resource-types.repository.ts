import { CustomResponse, FilterDto } from "@/kernel/types";
import { ResourceType } from "../../entities/ResourceType";
import { SaveResourceTypeDto } from "../../entities/save-resource-type.dto";
import { UpdateResourceTypeDto } from "../../entities/update-resource-type.dto";
import { GetResourceTypeListDto } from "../../entities/get-resource-type-list.dto";

export interface ResourceTypesRepository {
    findPageResourceTypes(filter: FilterDto): Promise<CustomResponse<ResourceType>>
    saveResourceType(resourceTypeDto: SaveResourceTypeDto) : Promise<CustomResponse<ResourceType>>
    changeResourceTypeStatus(resourceTypeId: number): Promise<CustomResponse<ResourceType>>
    updateResourceType(updateResourceTypeDto: UpdateResourceTypeDto): Promise<CustomResponse<ResourceType>>
    getResourceTypeList(): Promise<CustomResponse<GetResourceTypeListDto>>
}