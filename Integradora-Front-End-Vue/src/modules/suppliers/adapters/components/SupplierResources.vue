<template>
    <div>
        <b-row class="mt-3">
            <b-col cols="9" md="8" lg="5" order-lg="1">
                <b-form-group label-for="search">
                    <div class="input-wrapper">
                        <b-form-input id="search" data-cy="input-search-supplier-resource" placeholder="Buscando..."
                            v-model="searchValue" class="input" @input="search"></b-form-input>
                        <b-icon icon="search" class="input-icon" />
                    </div>
                </b-form-group>
            </b-col>
            <b-col cols="3" md="4" lg="2" order-lg="3">
                <b-button data-cy="button-save-supplier-resource" v-b-popover.hover.top="'Registrar recurso'"
                    variant="dark-green" class="float-right button-add-customized"
                    @click="$bvModal.show('save-supplier-resource')">
                    <svg-icon type="mdi" class="text-white icon-customized" :path="$icons.mdiPlus" />
                </b-button>
            </b-col>
            <b-col cols="12" lg="5" class="px-4" order-lg="2">
                <b-form-group label-for="filter-select" class="px-2">
                    <Multiselect id="select-resource-filter" data-cy="multiselect-filter-resource-type"
                        :config="multiselectConfig" @update:modelValue="resourceTypeFilter = $event">
                    </Multiselect>
                </b-form-group>
            </b-col>
        </b-row>
        <template v-if="!loading">
            <b-row class="p-3 justify-content-center" v-if="resources.length > 0">
                <b-col cols="12" xl="6" v-for="(resource, index) in resources" :key="index"
                    class="mb-3 d-flex justify-content-center">
                    <b-card no-body class="custom-card bg-lighter shadow-sm d-none d-sm-block">
                        <b-row class="p-3 h-100">
                            <b-col cols="12" class="d-flex justify-content-end">
                                <b-button data-cy="button-supplier-resource-details" class="button-actions mr-1"
                                    size="sm" variant="secondary" v-b-popover.hover.bottom="'Detalles'"
                                    @click="getSupplierResourceDetails(resource.id, 'details')">
                                    <svg-icon type="mdi" class="text-white icon-customized"
                                        :path="$icons.mdiEyeOutline" />
                                </b-button>
                                <b-button data-cy="button-update-supplier-resource" class="button-actions mr-1"
                                    size="sm" variant="dark-green" v-b-popover.hover.bottom="'Modificar'"
                                    @click="getSupplierResourceDetails(resource.id, 'update')">
                                    <svg-icon type="mdi" class="text-white icon-customized"
                                        :path="$icons.mdiPencilOutline" />
                                </b-button>
                                <b-button data-cy="button-change-supplier-resource-status" class="button-actions"
                                    size="sm" :variant="resource.status ? 'danger' : 'success'"
                                    v-b-popover.hover.bottom="resource.status ? 'Deshabilitar' : 'Habilitar'"
                                    @click="showConfirmation(resource.id, resource.status)">
                                    <svg-icon type="mdi" class="text-white icon-customized"
                                        :path="resource.status ? $icons.mdiArchiveCancelOutline : $icons.mdiArchiveCheckOutline" />
                                </b-button>
                            </b-col>
                            <b-col cols="12" class="mt-2 align-self-center">
                                <b-row>
                                    <b-col cols="5" class="image-container">
                                        <b-card-img :src="resource.mainImage" alt="Card image" class="custom-img" />
                                    </b-col>
                                    <b-col cols="7" class="align-self-center">
                                        <b-row>
                                            <b-col cols="12" class="d-flex align-items-center">
                                                <svg-icon type="mdi" class="text-darker-secondary" size="1.2rem"
                                                    :path="getIconPath(resource.resourceTypeIcon)" />
                                                <h6 class="ml-2 custom-subtitle text-darker-secondary">{{
                                                    resource.resourceTypeName }}</h6>
                                            </b-col>
                                            <b-col cols="12">
                                                <h6 class="mt-3 text-dark-secondary">{{ resource.resourceName }}</h6>
                                                <h5 class="mt-2 custom-title text-dark">{{ resource.name }}</h5>
                                                <div
                                                    class="mt-3 callout d-flex align-items-center justify-content-center">
                                                    <h6 class="callout-title">${{ resource.price }} MXN</h6>
                                                    <span class="ml-1">({{ resource.measureUnit }})</span>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-card>
                    <b-card no-body class="custom-small-card bg-lighter shadow-sm d-sm-none">
                        <b-card-img top :src="resource.mainImage" alt="Card image" class="custom-small-card-img" />
                        <b-card-body class="p-3">
                            <b-row class="custom-overlay-btn">
                                <b-col cols="12" class="d-flex flex-row flex-nowrap justify-content-end">
                                    <b-button data-cy="button-small-supplier-resource-details"
                                        class="button-actions mr-1" size="sm" variant="secondary"
                                        v-b-popover.hover.bottom="'Detalles'"
                                        @click="getSupplierResourceDetails(resource.id, 'details')">
                                        <svg-icon type="mdi" class="text-white icon-customized"
                                            :path="$icons.mdiEyeOutline" />
                                    </b-button>
                                    <b-button data-cy="button-small-update-supplier-resource"
                                        class="button-actions mr-1" size="sm" variant="dark-green"
                                        v-b-popover.hover.bottom="'Modificar'"
                                        @click="getSupplierResourceDetails(resource.id, 'update')">
                                        <svg-icon type="mdi" class="text-white icon-customized"
                                            :path="$icons.mdiPencilOutline" />
                                    </b-button>
                                    <b-button data-cy="button-small-change-supplier-resource-status"
                                        class="button-actions" size="sm"
                                        :variant="resource.status ? 'success' : 'danger'"
                                        v-b-popover.hover.bottom="resource.status ? 'Habilitar' : 'Deshabilitar'"
                                        @click="showConfirmation(resource.id, resource.status)">
                                        <svg-icon type="mdi" class="text-white icon-customized"
                                            :path="resource.status ? $icons.mdiArchiveCheckOutline : $icons.mdiArchiveCancelOutline" />
                                    </b-button>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="12" class="d-flex align-items-center">
                                    <svg-icon type="mdi" class="text-darker-secondary" size="1.2rem"
                                        :path="getIconPath(resource.resourceTypeIcon)" />
                                    <h6 class="ml-2 custom-subtitle text-darker-secondary">{{
                                        resource.resourceTypeName }}</h6>
                                </b-col>
                                <b-col cols="12">
                                    <h6 class="mt-3 text-dark-secondary">{{ resource.resourceName }}</h6>
                                    <h5 class="mt-2 custom-title text-dark">{{ resource.name }}</h5>
                                    <div class="mt-3 callout d-flex align-items-center justify-content-center">
                                        <h6 class="callout-title">${{ resource.price }} MXN</h6>
                                        <span class="ml-1">({{ resource.measureUnit }})</span>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col cols="12" class="mt-3">
                    <b-row>
                        <b-col cols="6" md="4" class="align-self-center order-md-1 ">
                            <h6 class="text-dark-secondary justify-content-center pb-3">
                                Recursos: {{ total }}
                            </h6>
                        </b-col>
                        <b-col cols="6" md="4" class="d-flex justify-content-end order-md-3">
                            <b-form-group>
                                <b-input-group size="sm">
                                    <b-form-select data-cy="input-select-supplier-resources-pages" id="pages-select"
                                        v-model="perPage" @change="getSources">
                                        <template #first>
                                            <option value="4">4</option>
                                            <option value="6">6</option>
                                            <option value="8">8</option>
                                        </template>
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="4" class="d-flex justify-content-center order-md-2">
                            <b-pagination data-cy="pagination-supplier-resources" v-model="currentPage"
                                :total-rows="total" :per-page="perPage" size="sm" @input="getSources">
                            </b-pagination>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row class="p-3" v-else>
                <b-col cols="12" class="d-flex justify-content-center align-items-center flex-column">
                    <img :src="require('@/assets/img/no-resources-found.svg')" alt="empty-state" />
                    <h6 class="mt-2 text-dark-secondary">No hay recursos registrados</h6>
                </b-col>
            </b-row>
        </template>
        <template v-else>
            <b-row class="p-3 justify-content-center">
                <b-col cols="12" xl="6" v-for="index in 4" :key="index" class="mb-3 d-flex justify-content-center">
                    <supplier-resource-card-skeleton />
                </b-col>
            </b-row>
        </template>
        <save-supplier-resource-modal :supplierId="supplierId" @reload="reload" />
        <update-supplier-resource-modal :resourceDetails="supplierResourceSelected"
            :loading="loadingSupplierResourceDetails" @reload="getSources" />
        <supplier-resource-details-modal :resource="supplierResourceSelected"
            :loading="loadingSupplierResourceDetails" />
        <confirmation-modal :config="config" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as mdi from '@mdi/js';
import { SupplierResource, SupplierResourceDetails } from '../../entities';
import SupplierResourceCardSkeleton from './SupplierResourceCardSkeleton.vue';
import { ConfirmationConfig, MultiselectConfig, MultiselectOption, PaginationDto } from '@/kernel/types';
import CustomMultiselect from '@/components/CustomMultiselect.vue';
import SaveSupplierResourceModal from './SaveSupplierResourceModal.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { SuppliersController } from '../suppliers.controller';
import { showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
import SupplierResourceDetailsModal from './SupplierResourceDetailsModal.vue';
import UpdateSupplierResourceModal from './UpdateSupplierResourceModal.vue';

export default Vue.extend({
    name: 'SupplierResources',
    components: { SupplierResourceCardSkeleton, Multiselect: CustomMultiselect, SaveSupplierResourceModal, UpdateSupplierResourceModal, SupplierResourceDetailsModal, ConfirmationModal },
    props: {
        supplierId: {
            type: Number,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        },
        resources: {
            type: Array as () => Array<SupplierResource>,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        multiselectConfig: {
            type: Object as () => MultiselectConfig,
            required: true
        },
    },
    data() {
        return {
            searchValue: '',
            resourceTypeFilter: {} as MultiselectOption,
            currentPage: 1,
            perPage: 4,
            timeout: 0,
            config: {
                id: 'change-supplier-resource-status',
                type: 'warning',
                title: 'Cambiar estado del recurso',
                message: '¿Estás seguro? Cambiar el estado del recurso afectará a los borradores de eventos que lo contengan.',
                confirmButtonText: 'Cambiar estado',
                loadingButtonText: 'Cambiando estado',
                isLoading: false
            } as ConfirmationConfig,
            loadingSupplierResourceDetails: false,
            supplierResourceSelected: {} as SupplierResourceDetails
        };
    },
    methods: {
        reload() {
            this.searchValue = '';
            this.resourceTypeFilter = {} as MultiselectOption;
            this.currentPage = 1;
            this.perPage = 4;
            this.getSources();
        },
        getSources() {
            const resourceTypeId = this.resourceTypeFilter ? this.resourceTypeFilter.id : null;
            this.$emit('reloadResources', this.searchValue, resourceTypeId, {
                page: this.currentPage - 1,
                size: this.perPage,
                sort: 'id',
                direction: 'desc'
            } as PaginationDto);
        },
        search() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.getSources();
            }, 500);
        },
        getIconPath(iconName: string) {
            return mdi[iconName as keyof typeof mdi] || mdi.mdiHelpCircle;
        },
        async getSupplierResourceDetails(id: number, action: string) {
            try {
                this.loadingSupplierResourceDetails = true;
                if (action === 'details') this.$bvModal.show('supplier-resource-details');
                if (action === 'update') this.$bvModal.show('update-supplier-resource');
                const controller = new SuppliersController();
                const { status, entity } = await controller.getSupplierResourceDetails(id);
                if (status === 200) {
                    this.supplierResourceSelected = entity!;
                }
            } catch (error) {
                if (action === 'details') this.$bvModal.hide('supplier-resource-details');
                if (action === 'update') this.$bvModal.hide('update-supplier-resource');
            } finally {
                this.loadingSupplierResourceDetails = false;
            }
        },
        showConfirmation(id: number, status: boolean) {
            this.config = {
                ...this.config,
                type: status ? 'danger' : 'question',
                title: status ? 'Deshabilitar recurso' : 'Habilitar recurso',
                message: status ? '¿Estás seguro de que deseas deshabilitar este recurso? Si procedes, algunos borradores de evento podrán verse afectados.' : '¿Estás seguro de que deseas habilitar este recurso?',
                confirmButtonText: status ? 'Deshabilitar' : 'Habilitar',
                loadingButtonText: status ? 'Deshabilitando' : 'Habilitando',
                action: () => this.changeSupplierResourceStatus(id)
            };
            this.$root.$emit('bv::show::modal', 'change-supplier-resource-status');
        },
        async changeSupplierResourceStatus(id: number) {
            try {
                this.config.isLoading = true;
                const controller = new SuppliersController();
                const { status } = await controller.changeSupplierResourceStatus(id);
                if (status === 200) {
                    showSuccessToast('Estado del recurso modificado');
                    this.getSources();
                }
            } catch (error) {

            } finally {
                this.config.isLoading = false;
                this.$root.$emit('bv::hide::modal', 'change-supplier-resource-status');
            }
        }
    },
    watch: {
        resourceTypeFilter: {
            handler: function () {
                this.getSources();
            },
            deep: true
        }
    }
});
</script>

<style scoped>
h5,
h6 {
    margin-bottom: 0;
}

.custom-card {
    border: 1px solid #e9ecef;
    border-radius: 0.8rem;
    max-width: 600px;
}

.custom-card:hover,
.custom-small-card:hover {
    transform: scale(1.025);
}

.custom-small-card {
    border: 1px solid #e9ecef;
    border-radius: 0.8rem;
    width: 340px;
}

.custom-title {
    font-size: 1.3rem;
    font-weight: 645;
}

.image-container {
    display: flex;
    align-items: center;
}

.custom-img {
    border-radius: 0.8rem;
    height: 180px;
    width: 100%;
    object-fit: cover;
}

.custom-small-card-img {
    height: 160px;
    width: 100%;
    object-fit: cover;
    border-radius: 0.8rem 0.8rem 0 0;
}

.callout {
    background-color: var(--light-primary);
    border-radius: 0.8rem;
    padding: 0.5rem 1rem;
}
</style>