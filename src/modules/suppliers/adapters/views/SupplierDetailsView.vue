<template>
    <b-container fluid>
        <b-row class="px-3 pt-3">
            <b-col>
                <b-breadcrumb :items="routes" class="shadow-sm bg-lighter px-3"></b-breadcrumb>
                <b-card no-body class="custom-card shadow">
                    <b-tabs card fill justified>
                        <b-tab title="Información general">
                            <template v-if="!loading">
                                <b-button data-cy="button-show-update-supplier-view"
                                    v-b-popover.hover.left="'Modificar'" variant="transparent"
                                    class="edit-button d-flex align-items-center justify-content-center"
                                    @click="updateSupplier" size="sm">
                                    <svg-icon type="mdi" class="text-secondary" size="30"
                                        :path="$icons.mdiPencilOutline" />
                                </b-button>
                                <b-row class="justify-content-center align-items-center p-4">
                                    <b-col cols="12" sm="10" md="8" lg="6" xl="5"
                                        class="justify-content-center mt-4 mt-sm-0">
                                        <b-img :src="supplier.image" class="custom-img"></b-img>
                                    </b-col>
                                    <b-col cols="12" lg="6" xl="7" class="mt-4 mt-lg-0">
                                        <h4 class="text-center text-darker-secondary">{{ supplier.name }}</h4>
                                        <hr class="custom-divider">
                                        <b-row>
                                            <b-col cols="12" xl="6"
                                                class="d-flex align-items-center justify-content-md-center text-dark-secondary">
                                                <svg-icon type="mdi" class="custom-icon" :path="$icons.mdiEmail" />
                                                <h6 class="ml-2">{{ supplier.email }}</h6>
                                            </b-col>
                                            <b-col cols="12" xl="6"
                                                class="d-flex align-items-center justify-content-md-center text-dark-secondary mt-3 mt-xl-0">
                                                <svg-icon type="mdi" class="custom-icon" :path="$icons.mdiPhone" />
                                                <h6 class="ml-2">+{{ supplier.lada }} {{ supplier.phone }}</h6>
                                            </b-col>
                                            <b-col cols="12" class="mt-3">
                                                <span class="custom-label">Nombre del contacto:</span>
                                                <span class="ml-2 d-none d-sm-inline-block">
                                                    {{ supplier.contactName }}</span>
                                                <p class="mt-2 d-sm-none">{{ supplier.contactName }}</p>
                                            </b-col>
                                            <b-col cols="12" class="mt-3">
                                                <span class="custom-label">Descripción:</span>
                                                <p class="mt-2">{{ supplier.description }}</p>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                                <hr class="custom-divider my-0">
                                <b-row class="p-4">
                                    <b-col cols="12" class="d-flex align-items-center text-dark-secondary">
                                        <svg-icon type="mdi" class="custom-icon" :path="$icons.mdiHomeCityOutline" />
                                        <h6 class="ml-2">{{ supplier.buildingType }}</h6>
                                    </b-col>
                                    <b-col cols="12" class="d-flex text-dark-secondary mt-3">
                                        <svg-icon type="mdi" class="custom-icon" :path="$icons.mdiMapOutline" />
                                        <h6 class="ml-2">{{ supplier.city }}, {{ supplier.state }}, {{ supplier.country
                                            }}.</h6>
                                    </b-col>
                                    <b-col cols="12" class="d-flex text-dark-secondary mt-3">
                                        <svg-icon type="mdi" class="custom-icon" :path="$icons.mdiMapMarkerOutline" />
                                        <h6 class="ml-2">{{ getSupplierAddressLine() }}</h6>
                                    </b-col>
                                    <b-col cols="12" class="mt-3" v-if="supplier.referenceDetails">
                                        <span class="custom-label">Referencias:</span>
                                        <span class="ml-2">{{ supplier.referenceDetails }}</span>
                                    </b-col>
                                </b-row>
                            </template>
                            <template v-else>
                                <supplier-card-skeleton />
                            </template>
                        </b-tab>
                        <b-tab lazy title="Recursos" @click="loadSupplierResourcesTab">
                            <supplier-resources :supplierId="supplier.id" :loading="loadingResources"
                                :resources="resources" :total="totalResources" :multiselectConfig="multiselectConfig"
                                @reloadResources="loadSupplierResources" />
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { decryptRouteParam, encryptRouteParam } from '@/config/cryptojs';
import Vue from 'vue';
import { GetSupplierResourcesPagedDto, Supplier, SupplierResource } from '../../entities';
import { SuppliersController } from '../suppliers.controller';
import SupplierResources from '../components/SupplierResources.vue';
import { MultiselectConfig, MultiselectOption, PaginationDto } from '@/kernel/types';
import SupplierCardSkeleton from '../components/SupplierCardSkeleton.vue';
import { findResourceTypeList } from '@/modules/resource-types/boundary.module';
import { GetResourceTypeListDto } from '@/modules/resource-types/entities/get-resource-type-list.dto';

export default Vue.extend({
    name: 'SupplierDetailsView',
    components: { SupplierResources, SupplierCardSkeleton },
    data() {
        return {
            loading: false,
            loadingResources: false,
            resourcesLoaded: false,
            supplier: {} as Supplier,
            resources: [] as SupplierResource[],
            totalResources: 0,
            routes: [
                { text: 'Proveedores', to: { name: 'suppliers' } },
                { text: 'Detalles del proveedor', active: true },
            ],
            multiselectConfig: {
                options: [] as MultiselectOption[],
                label: 'label',
                trackBy: 'label',
                loading: false,
                multiple: false,
                disabled: false,
                placeholder: 'Tipo de recurso'
            } as MultiselectConfig,
        };
    },
    methods: {
        async getSupplier(id: number) {
            try {
                this.loading = true;
                const controller = new SuppliersController();
                const response = await controller.getSupplierDetails(id);
                if (response.status === 200) {
                    this.supplier = response.entity!;
                    this.supplier.id = id;
                }
            } catch (error) {
                this.supplier = {} as Supplier;
            } finally {
                this.loading = false;
            }
        },
        getSupplierAddressLine() {
            const addressLine = this.supplier.interiorNumber ? `${this.supplier.street} Ext. ${this.supplier.exteriorNumber}, Int. ${this.supplier.interiorNumber}, Col. ${this.supplier.colony}, C.P. ${this.supplier.postalCode}.` : `${this.supplier.street} Ext. ${this.supplier.exteriorNumber}, Col. ${this.supplier.colony}, C.P. ${this.supplier.postalCode}.`;
            return `${addressLine}`;
        },
        updateSupplier() {
            this.$router.push({
                name: 'updateSupplier',
                params: {
                    id: this.$route.params.id,
                    supplier: encryptRouteParam(JSON.stringify(this.supplier)),
                },
            });
        },
        loadSupplierResourcesTab() {
            if (!this.resourcesLoaded) {
                const payload = {
                    dto: {
                        searchValue: '',
                        supplierId: this.supplier.id,
                    },
                    pagination: {
                        page: 0,
                        size: 4,
                        sort: 'id',
                        direction: 'desc'
                    } as PaginationDto
                } as GetSupplierResourcesPagedDto;
                this.loadSupplierResources('', 0, payload.pagination);
                this.getResourceTypelist();
                this.resourcesLoaded = true;
            }
        },
        loadSupplierResources(searchValue: string, resourceTypeId: number, pagination: PaginationDto) {
            const payload = {
                dto: {
                    searchValue,
                    supplierId: this.supplier.id,
                },
                pagination
            } as GetSupplierResourcesPagedDto;
            if (resourceTypeId) payload.dto.resourceTypeId = resourceTypeId;
            this.getSupplierResourcesPaged(payload);
        },
        async getSupplierResourcesPaged(payload: GetSupplierResourcesPagedDto) {
            try {
                this.loadingResources = true;
                const controller = new SuppliersController();
                const { status, entities, total } = await controller.getSupplierResourcesPaged(payload);
                if (status === 200) {
                    this.totalResources = total!;
                    this.resources = entities!;
                }
            } catch (error) {
                this.resources = [];
            } finally {
                this.loadingResources = false;
            }
        },
        async getResourceTypelist() {
            try {
                this.multiselectConfig.loading = true;
                const { status, entities } = await findResourceTypeList();
                if (status === 200) {
                    this.multiselectConfig = {
                        ...this.multiselectConfig,
                        options: entities!.map((entity: GetResourceTypeListDto) => ({
                            id: entity.id,
                            label: entity.name,
                        }))
                    };
                }
            } catch (error) {

            } finally {
                this.multiselectConfig.loading = false;
            }
        }
    },
    created() {
        if (!this.$route.params.id) {
            this.$router.push({ name: 'suppliers' });
        } else {
            this.getSupplier(Number(decryptRouteParam(this.$route.params.id)));
        }
    }
});
</script>

<style scoped>
h4,
h6,
p {
    margin-bottom: 0;
}

.custom-card {
    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.custom-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid var(--secondary);
}

.custom-label {
    font-weight: 600;
    color: var(--darker-secondary);
}

.custom-divider {
    border-top: 1px solid #cfd4d8;
}

.edit-button {
    position: absolute;
    top: 4rem;
    right: 0.5rem;
}

.edit-button svg-icon {
    color: #6c757d;
}
</style>