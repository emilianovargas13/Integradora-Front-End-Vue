import api from '@/config/http-client.gateway';
import { FilterDto, CustomResponse } from "@/kernel/types";
import { SuppliersRepository } from '../use-cases/ports/suppliers.repository';
import { GetSupplierResourcesPagedDto, SaveSupplierDto, SaveSupplierResourceDto, Supplier, SupplierResource, SupplierResourceDetails, UpdateSupplierDto, UpdateSupplierResourceDto } from '../entities';

export class SuppliersStorageGateway implements SuppliersRepository {
    async getSuppliersPaged(filter: FilterDto): Promise<CustomResponse<Supplier>> {
        try {
            const { dto, paginationDto } = filter;
            const { status, data: { data: { content, totalElements } } } = await api.post('/suppliers/paged', dto, { params: paginationDto });
            return {
                status,
                entities: content,
                total: totalElements
            } as CustomResponse<Supplier>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<Supplier>;
        }
    }

    async getSupplierDetails(id: number): Promise<CustomResponse<Supplier>> {
        try {
            const { status, data: { data } } = await api.post('/suppliers/details', { id });
            return {
                status,
                entity: data
            } as CustomResponse<Supplier>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<Supplier>;
        }
    }

    async saveSupplier(payload: SaveSupplierDto): Promise<CustomResponse<null>> {
        try {
            const supplier = {
                ...payload,
                ...payload.address,
                buildingType: payload.address.buildingType!.value,
            };
            const response = await api.post('/suppliers/', supplier);
            return {
                status: response.status,
                message: response.data.message,
                error: false
            } as CustomResponse<null>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<null>;
        }
    }

    async updateSupplier(payload: UpdateSupplierDto): Promise<CustomResponse<null>> {
        try {
            const supplier = {
                ...payload,
                ...payload.address,
                buildingType: payload.address.buildingType!.value,
            };
            const response = await api.put('/suppliers/', supplier);
            return {
                status: response.status,
                message: response.data.message,
                error: false
            } as CustomResponse<null>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<null>;
        }
    }

    async changeSupplierStatus(id: number): Promise<CustomResponse<null>> {
        try {
            const response = await api.patch('/suppliers/change/status', { id });
            return {
                status: response.status,
                message: response.data.message,
                error: false
            } as CustomResponse<null>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<null>;
        }
    }

    async getSupplierResourcesPaged(payload: GetSupplierResourcesPagedDto): Promise<CustomResponse<SupplierResource>> {
        try {
            const { status, data: { data: { content, totalElements } } } = await api.post('/resource-suppliers/paged-by-supplier', payload.dto, { params: payload.pagination });
            return {
                status,
                entities: content,
                total: totalElements
            } as CustomResponse<SupplierResource>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<SupplierResource>;
        }
    }

    async saveSupplierResource(payload: SaveSupplierResourceDto): Promise<CustomResponse<null>> {
        try {
            const secondaryImages = payload.secondaryImages.map((image: string) => ({
                image
            }));
            const { mainImage, secondaryImages: _, ...payloadWithoutImages } = payload;
            const supplierResource = {
                ...payloadWithoutImages,
                supplierId: payload.supplierId,
                resourceId: payload.resource.id,
                images: {
                    mainImageDto: {
                        image: payload.mainImage
                    },
                    secondaryImages: secondaryImages
                }
            }
            const response = await api.post('/resource-suppliers/', supplierResource);
            return {
                status: response.status,
                message: response.data.message,
                error: false
            } as CustomResponse<null>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<null>;
        }
    }

    async changeSupplierResourceStatus(id: number): Promise<CustomResponse<null>> {
        try {
            const response = await api.patch('/resource-suppliers/change/status', { id });
            return {
                status: response.status,
                message: response.data.message,
                error: false
            } as CustomResponse<null>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<null>;
        }
    }

    async updateSupplierResource(payload: UpdateSupplierResourceDto): Promise<CustomResponse<null>> {
        try {
            const response = await api.put('/resource-suppliers/', payload);
            return {
                status: response.status,
                message: response.data.message,
                error: false
            } as CustomResponse<null>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<null>;
        }
    }

    async getSupplierResourceDetails(id: number): Promise<CustomResponse<SupplierResourceDetails>> {
        try {
            const { status, data: { data } } = await api.post('/resource-suppliers/details', { id });
            let images = [];
            if (data.images != '[]') images = data.images.substring(1, data.images.length - 1).split(',').map((image: string) => image.trim());
            data.images = images;
            return {
                status,
                entity: data
            } as CustomResponse<SupplierResourceDetails>;
        } catch (error: any) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true
            } as CustomResponse<SupplierResourceDetails>;
        }
    }
}
