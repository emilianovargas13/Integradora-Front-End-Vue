import { CustomResponse, FilterDto } from "@/kernel/types";
import { GetResourceListDto, Resource } from "../../entities";
import { SaveResourceDto } from "../../entities/save-resource-dto";
import { UpdateResourceDto } from "../../entities/update-resource-type.dto";

export interface ResourcesRepository{
    findPageResource(filter: FilterDto): Promise<CustomResponse<Resource>>
    saveResource(resourceTypeDto: SaveResourceDto) : Promise<CustomResponse<Resource>>
    updateResource(updateResourceTypeDto: UpdateResourceDto): Promise<CustomResponse<Resource>>
    changeResourceStatus(resourceTypeId: number): Promise<CustomResponse<Resource>>
    getResourceList(): Promise<CustomResponse<GetResourceListDto>>
}

