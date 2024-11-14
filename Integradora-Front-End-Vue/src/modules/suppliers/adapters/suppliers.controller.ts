import { CustomResponse, FilterDto } from "@/kernel/types";
import { SuppliersStorageGateway } from "./suppliers.storage.gateway";
import { ChangeSupplierResourceStatusInteractor, ChangeSupplierStatusInteractor, GetSupplierDetailsInteractor, GetSupplierResourceDetailsInteractor, GetSupplierResourcesPagedInteractor, GetSuppliersPagedInteractor, SaveSupplierInteractor, SaveSupplierResourceInteractor, UpdateSupplierInteractor, UpdateSupplierResourceInteractor } from "../use-cases";
import { GetSupplierResourcesPagedDto, SaveSupplierDto, SaveSupplierResourceDto, Supplier, SupplierResource, SupplierResourceDetails, UpdateSupplierDto, UpdateSupplierResourceDto } from "../entities";

export class SuppliersController {
    getSuppliersPaged(filter: FilterDto) {
        try {
            const repository = new SuppliersStorageGateway();
            const interactor = new GetSuppliersPagedInteractor(repository);
            return interactor.execute(filter);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<Supplier>;
        }
    }

    getSupplierDetails(id: number) {
        try {
            const repository = new SuppliersStorageGateway();
            const interactor = new GetSupplierDetailsInteractor(repository);
            return interactor.execute(id);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<Supplier>;
        }
    }

    saveSupplier(payload: SaveSupplierDto) {
        try {
            const repository = new SuppliersStorageGateway();
            const interactor = new SaveSupplierInteractor(repository);
            return interactor.execute(payload);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<null>;
        }
    }

    updateSupplier(payload: UpdateSupplierDto) {
        try {
            const repository = new SuppliersStorageGateway();
            const interactor = new UpdateSupplierInteractor(repository);
            return interactor.execute(payload);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<null>;
        }
    }

    changeSupplierStatus(id: number) {
        try {
            const repository = new SuppliersStorageGateway();
            const interactor = new ChangeSupplierStatusInteractor(repository);
            return interactor.execute(id);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<null>;
        }
    }

    getSupplierResourcesPaged(payload: GetSupplierResourcesPagedDto) {
        try {
            const repository = new SuppliersStorageGateway();
            const interactor = new GetSupplierResourcesPagedInteractor(repository);
            return interactor.execute(payload);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<SupplierResource>;
        }
    }

    saveSupplierResource(payload: SaveSupplierResourceDto) {
        try {
            const repository = new SuppliersStorageGateway();
            const interactor = new SaveSupplierResourceInteractor(repository);
            return interactor.execute(payload);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<null>;
        }
    }

    updateSupplierResource(payload: UpdateSupplierResourceDto) {
        try {
            const repository = new SuppliersStorageGateway();
            const interactor = new UpdateSupplierResourceInteractor(repository);
            return interactor.execute(payload);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<null>;
        }
    }

    changeSupplierResourceStatus(id: number) {
        try {
            const repository = new SuppliersStorageGateway();
            const interactor = new ChangeSupplierResourceStatusInteractor(repository);
            return interactor.execute(id);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<null>;
        }
    }

    getSupplierResourceDetails(id: number) {
        try {
            const repository = new SuppliersStorageGateway();
            const interactor = new GetSupplierResourceDetailsInteractor(repository);
            return interactor.execute(id);
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<SupplierResourceDetails>;
        }
    }
}