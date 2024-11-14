import { CustomResponse, FilterDto } from "@/kernel/types";
import { GetSupplierResourcesPagedDto, SaveSupplierDto, SaveSupplierResourceDto, Supplier, SupplierResource, SupplierResourceDetails, UpdateSupplierDto, UpdateSupplierResourceDto } from "../../entities";

export interface SuppliersRepository {
    getSuppliersPaged(filter: FilterDto): Promise<CustomResponse<Supplier>>;
    getSupplierDetails(id: number): Promise<CustomResponse<Supplier>>;
    saveSupplier(payload: SaveSupplierDto): Promise<CustomResponse<null>>;
    updateSupplier(payload: UpdateSupplierDto): Promise<CustomResponse<null>>;
    changeSupplierStatus(id: number): Promise<CustomResponse<null>>;
    getSupplierResourcesPaged(payload: GetSupplierResourcesPagedDto): Promise<CustomResponse<SupplierResource>>;
    saveSupplierResource(payload: SaveSupplierResourceDto): Promise<CustomResponse<null>>;
    changeSupplierResourceStatus(id: number): Promise<CustomResponse<null>>;
    getSupplierResourceDetails(id: number): Promise<CustomResponse<SupplierResourceDetails>>;
    updateSupplierResource(payload: UpdateSupplierResourceDto): Promise<CustomResponse<null>>;
}