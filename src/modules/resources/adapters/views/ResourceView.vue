<template>
    <div>
        <Header title="Recursos" :image="require('@/assets/img/resource.jpg')" />
        <b-row>
            <b-col cols="12" class="d-flex justify-content-center align-items-center">
                <b-breadcrumb :items="breadCrumb" class="bg-transparent"></b-breadcrumb>
            </b-col>
        </b-row>
        <b-row class="px-3 py-2">
            <b-col cols="12" lg="5">
                <b-form-group label-for="filter-input">
                    <div class="input-wrapper mx-3">
                        <b-form-input class="input" id="filter-input" placeholder="Buscando..." v-model="filter"
                            debounce="500"></b-form-input>
                        <b-icon icon="search" class="input-icon" />
                    </div>
                </b-form-group>
            </b-col>
            <b-col cols="12" lg="5"  class="text-center">
                <b-form-group label-for="filter-select">
                    <Multiselect
                        id="select-resource-filter"
                        :config="multiselectConfig"
                        data-cy="select-resource-type"
                        @update:modelValue="resourceTypeFilter = $event"
                    >
                    </Multiselect>
                </b-form-group>
            </b-col>
            <b-col cols="12" lg="2">
                <b-button v-b-popover.hover.top="'Registrar recurso'" variant="dark-green"
                    class="float-right button-add-customized mb-3" @click="openModalSaveResource()">
                    <svg-icon type="mdi" class="text-white icon-customized" :path="$icons.mdiPlus" />
                </b-button>
            </b-col>
        </b-row>
        <b-row class="px-3">
            <b-col cols="12">
                <b-table :items="resourceProvider" :fields="headerItems" outlined class="text-center text-white shadow"
                    responsive :current-page="currentPage" :per-page="perPage" :filter="filter" striped
                    ref="resource-table" id="resource-table" show-empty empty-text hover
                    thead-class="primary-bg bg-primary text-white" :busy="isLoading">
                    <template #table-busy>
                        <div class="text-center text-primary my-2">
                            <b-spinner small></b-spinner>
                            <strong class="ml-2">Cargando recursos...</strong>
                        </div>
                    </template>
                    <template #head()="data">
                        <b-col class="text-center">
                            <label>{{ data.label }}</label>
                        </b-col>
                    </template>
                    <template #cell(name)="data">
                        <label class="text-dark-secondary">
                            {{ data.item.name }}
                        </label>
                    </template>
                    <template #cell(description)="data">
                        <b-col class="d-flex justify-content-center align-items-center">
                            <label class="text-center mt-1 text-dark-secondary">
                                <template v-if="!data.item.description">
                                    Sin descripción
                                </template>
                                <template v-else-if="data.item.description.length > 70">
                                    <template v-if="data.item.expanded">
                                        {{ data.item.description }}
                                        <b-button variant="link" class="primary" @click="toggleDescription(data.item)">
                                            Ver menos
                                        </b-button>
                                    </template>
                                    <template v-else>
                                        {{ shortDescription(data.item.description) }}
                                        <b-button variant="link" class="primary" @click="toggleDescription(data.item)">
                                            Ver más
                                        </b-button>
                                    </template>
                                </template>
                                <template v-else>
                                    {{ data.item.description }}
                                </template>
                            </label>
                        </b-col>
                    </template>
                    <template #cell(resourceTypeName)="data">
                        <b-col class="text-center mt-1">
                            <label class="text-dark-secondary">
                                {{ data.item.resourceTypeName }}
                            </label>
                        </b-col>
                    </template>
                    <template #cell(status)="data">
                        <b-col class="text-center mt-1">
                            <b-badge :variant="data.item.status ? 'success' : 'danger'">
                                {{ data.item.status ? 'Habilitado' : 'Deshabilitado' }}
                            </b-badge>
                        </b-col>
                    </template>
                    <template #cell(actions)="data">
                        <div class="actions-container">
                            <span class="actions-wrapper">
                                <b-button v-b-popover.hover.top="'Modificar'"
                                    class="bg-dark-green button-actions btn-sm mr-2"
                                    @click="openModalUpdateResource(data.item)">
                                    <svg-icon type="mdi" class="text-white icon-customized"
                                        :path="$icons.mdiPencilBoxMultipleOutline" />
                                </b-button>
                                <b-button v-b-popover.hover.top="setPopoverText(data.item.status)"
                                    :class="`btn-sm button-actions ${data.item.status ? 'bg-danger' : 'bg-success'} mr-2`"
                                    @click="confirmChangeStatus(data.item.id)">
                                    <svg-icon type="mdi" class="text-white icon-customized"
                                        :path="data.item.status ? $icons.mdiArchiveCancelOutline : $icons.mdiArchiveCheckOutline" />
                                </b-button>
                            </span>
                        </div>
                    </template>
                    <template v-slot:empty>
                        <span class="text-center text-dark-secondary">{{ emptyText }}</span>
                    </template>
                    <template v-slot:emptyfiltered>
                        <span class="text-center text-dark-secondary">No hay resultados para tu búsqueda</span>
                    </template>
                </b-table>
                <b-row>
                    <b-col cols="12" class="mt-1">
                        <b-row>
                            <b-col cols="6" md="4" class="order-md-1 align-self-center">
                                <h6 class="text-dark-secondary justify-content-center pb-3">
                                    Recursos: {{ totalRows }}
                                </h6>
                            </b-col>
                            <b-col cols="6" md="4" class="d-flex justify-content-end order-md-3">
                                <b-form-group>
                                    <b-input-group size="sm">
                                        <b-form-select id="pages-select" v-model="perPage">
                                            <option value="3">3</option>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                        </b-form-select>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12" md="4" class="d-flex justify-content-center order-md-2">
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                    size="sm"></b-pagination>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <ModalSaveResource @refreshTable="refreshTable" />
        <ModalUpdateResource :resourceSelected="resourceSelected" @refreshTable="refreshTable" />
        <ConfirmationModal :config="confirmChangeStatusConfig"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { Resource } from '../../entities';
import * as mdi from '@mdi/js';
import { ResourceController } from '../resource.controller';
import { ConfirmationConfig, FilterDto, MultiselectConfig, MultiselectOption } from '@/kernel/types';
import ModalSaveResource from "@/modules/resources/components/ModalSaveResource.vue";
import ModalUpdateResource from '@/modules/resources/components/ModalUpdateResource.vue';
import { showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import CustomMultiselect from '@/components/CustomMultiselect.vue';
import { CustomResourceDto } from '../../entities/custom-resource-dto';
import { findResourceTypeList } from '@/modules/resource-types/boundary.module';
import { GetResourceTypeListDto } from '@/modules/resource-types/entities/get-resource-type-list.dto';

export default Vue.extend({
    name: 'Resource',
    components: {
        Header, SvgIcon, ModalSaveResource, ModalUpdateResource, ConfirmationModal, Multiselect: CustomMultiselect
    },
    data() {
        return {
            breadCrumb: [
                { text: 'Tipos de recurso', to: '/resource-types-management' },
                { text: 'Recursos', active: true }
            ],
            resource: [] as Array<Resource>,
            headerItems: [
                { key: 'name', label: 'Nombre' },
                { key: 'resourceTypeName', label: 'Tipo' },
                { key: 'description', label: 'Descripción', tdClass: 'custom-td' },  
                { key: 'status', label: 'Estado' },
                { key: 'actions', label: 'Acciones' }
            ],
            filter: '',
            totalRows: 0,
            currentPage: 1,
            perPage: 3,
            isLoading: false,
            emptyText: 'No hay recursos registrados',
            resourceSelected: {} as CustomResourceDto,
            config: {} as ConfirmationConfig,
            icons: mdi,
            multiselectConfig: {
                options: [] as MultiselectOption[],
                label: 'label',
                trackBy: 'label',
                loading: false,
                multiple: false,
                disabled: false,
                placeholder: 'Tipo de recurso'
            } as MultiselectConfig,
            confirmChangeStatusConfig: {
                id: 'change-status-resource-confirmation',
                type: 'question',
                title: 'Cambiar estado',
                message: '¿Estás seguro de cambiar el estado de este recurso?',
                confirmButtonText: 'Cambiar',
                loadingButtonText: 'Cambiando',
                isLoading: false

            } as ConfirmationConfig,
            resourceTypeFilter: {} as MultiselectOption,
            resources: [] as Array<Resource>
        };
    },
    methods: {
        async resourceProvider(ctx?: any) {
            try {
                this.isLoading = true;
                this.resources = [];
                const filter = {
                    paginationDto: {
                        page: this.currentPage - 1,
                        size: ctx?.perPage || this.perPage,
                        sort: 'id',
                        direction: 'desc'
                    },
                    dto: {
                        value: this.filter,
                        resourceTypeId: this.resourceTypeFilter ? this.resourceTypeFilter.id : 0
                    }
                } as FilterDto;
                const controller = new ResourceController();
                const { status, entities, total } = await controller.findPageResource(filter)
                if (status === 200) {
                    this.totalRows = total!;
                    return  this.resources = entities!.map(item => ({ ...item, expanded: false }));
                }
            } catch (error) { }
            finally {
                this.isLoading = false
            }
        },
        shortDescription(description: string) {
            return description.length > 70 ? description.slice(0, 70) + '...' : description;
        },
        toggleDescription(item: Resource) {
            item.expanded = !item.expanded;
        },
        openModalSaveResource() {
            this.$bvModal.show("modal-save-resource");
        },
        openModalUpdateResource(item: Resource) {
            const resource : CustomResourceDto = {
                id: item.id,
                name: item.name,
                description: item.description,
                resourceType: {
                    id: item.resourceTypeId,
                    label: item.resourceTypeName
                }
            }
            this.resourceSelected = JSON.parse(JSON.stringify(resource));
            this.$bvModal.show("modal-update-resource");
        },
        refreshTable() {
            this.$root.$emit("bv::refresh::table", "resource-table");
        },
        setPopoverText(status: boolean) {
            return status ? 'Deshabilitar' : 'Habilitar';
        },
        confirmChangeStatus(id: number){
            this.confirmChangeStatusConfig = {
                ...this.confirmChangeStatusConfig,
                action: () => this.changeStatus(id)
            };
            this.$root.$emit("bv::show::modal", this.confirmChangeStatusConfig.id);
        },
        async changeStatus(id: number) {
            try {
                this.confirmChangeStatusConfig.isLoading = true;
                const controller = new ResourceController();
                const { status } = await controller.changeResourceStatus(id);
                if (status === 200) {
                    showSuccessToast('Estado del recurso modificado')
                    this.refreshTable();
                }
            } catch (error) {}finally{
                this.confirmChangeStatusConfig.isLoading = false;
                this.$root.$emit("bv::hide::modal", this.confirmChangeStatusConfig.id);
            }
        },
        // TODO: Agregar loading al multiselect
        async getResourceTypelist() {
            try {
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
            } catch (error) {}
        }
    },
    mounted() {
        this.getResourceTypelist();
    },
    watch: {
        resourceTypeFilter: {
            handler: function(){
                this.$root.$emit("bv::refresh::table", "resource-table");
            },
            deep: true
        }
    }
});
</script>

<style scoped>
.input-wrapper {
    position: relative;
}

.input-icon {
    position: absolute;
    top: 10px;
    right: 10px;
}

.filter-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 10px;
}
</style>
