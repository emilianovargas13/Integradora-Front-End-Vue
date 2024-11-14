<template>
    <div>
        <Header title="Tipos de recursos" :image="require('@/assets/img/resource-types-header.jpg')"/>
        <b-row>
            <b-col cols="12" class="d-flex justify-content-center align-items-center">
                <b-breadcrumb :items="breadCrumb" class="bg-transparent"></b-breadcrumb>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="5">
                <b-form-group label-for="filter-input">
                    <div class="input-wrapper">
                        <b-form-input
                            class="input"
                            id="filter-input"
                            placeholder="Buscando..."
                            v-model="filter"
                            debounce="500"
                            data-cy="input-filter"
                        ></b-form-input>
                        <b-icon icon="search" class="input-icon"/>
                    </div>
                </b-form-group>
            </b-col>
            <b-col cols="7">
                <b-button
                    v-b-popover.hover.top="'Registrar tipo de recurso'"
                    variant="dark-green" 
                    class="float-right button-add-customized"
                    @click="openModalSaveResourceType"
                    data-cy="button-add-resource-type"
                >
                    <svg-icon 
                        type="mdi" 
                        class="text-white icon-customized"  
                        :path="$icons.mdiPlus"
                    />
                </b-button>
            </b-col>
        </b-row>
        <b-row class="p-3">
            <b-col cols="12">
                <b-table 
                    :items="resourceTypeProvider" 
                    :fields="headerItems" 
                    outlined
                    class="text-center text-white shadow"
                    responsive
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    striped
                    ref="resource-types-table"
                    id="resource-types-table"
                    show-empty
                    empty-text
                    hover
                    thead-class="primary-bg bg-primary text-white"
                    :busy="isLoading"
                >
                    <template #table-busy>
                        <div class="text-center text-primary my-2">
                            <b-spinner small></b-spinner>
                            <strong class="ml-2">Cargando tipos de recurso...</strong>
                        </div>
                    </template>
                    <template #head()="data">
                        <b-col class="text-center"> 
                            <label >
                                {{ data.label }}
                            </label>
                        </b-col>
                    </template>
                    <template #cell(name)="data">
                        <b-row>
                            <div class="d-flex align-items-center text-dark-secondary"></div>
                            <b-col cols="12" lg="6" class="text-left d-none d-lg-inline">
                                <b-avatar variant="green" :size="data.item.expanded ? '2em' : '2.5em'"> 
                                    <svg-icon 
                                        type="mdi" 
                                        class="text-white icon-customized"  
                                        :path="getIconPath(data.item.iconName)"
                                    />
                                </b-avatar>
                            </b-col>
                            <b-col cols="12" lg="6" class="d-flex justify-content-center align-items-center">
                                <label class="mt-1 text-dark-secondary">
                                    {{ data.item.name }}
                                </label>
                            </b-col>
                        </b-row>
                    </template>
                    <template #cell(description)="data">
                        <b-col class="d-flex justify-content-center align-items-center">
                            <label class="text-center mt-1 text-dark-secondary">
                                <template v-if="!data.item.description">
                                    Sin descripción
                                </template>
                                <template v-if="data.item.description.length > 70">
                                    <template v-if="data.item.expanded">
                                        {{ data.item.description }}
                                        <b-button
                                            variant="link"
                                            class="primary"
                                            @click="toggleDescription(data.item)"
                                            data-cy="button-toggle-description-less"
                                        >
                                            Ver menos
                                        </b-button>
                                    </template>
                                    <template v-else>
                                        {{ shortDescription(data.item.description) }}
                                        <b-button
                                            variant="link"
                                            class="primary"
                                            @click="toggleDescription(data.item)"
                                            data-cy="button-toggle-description-more"
                                        >
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
                    <template #cell(status)="data">
                        <b-col class="text-center mt-1">
                            <b-badge :variant="data.item.status ? 'success' : 'danger'" >{{ data.item.status ? 'Habilitado' : 'Deshabilitado' }}</b-badge>
                        </b-col>
                    </template>
                    <template #cell(actions)="data">
                        <data class="actions-container">
                            <span class="actions-wrapper">
                                <b-button
                                    v-b-popover.hover.top="'Modificar'"
                                    class="bg-dark-green button-actions btn-sm mr-2"
                                    @click="openModalUpdateResourceType(data.item)"
                                    data-cy="button-edit-resource-type"
                                >
                                    <svg-icon 
                                        type="mdi" 
                                        class="text-white icon-customized"  
                                        :path="$icons.mdiPencilBoxMultipleOutline"
                                    />
                                </b-button>
                                <b-button
                                    v-b-popover.hover.top="setPopoverText(data.item.status)"
                                    :class="`btn-sm button-actions ${data.item.status ? 'bg-danger' : 'bg-success'} mr-2`"
                                    @click="confirmChangeStatus(data.item.id)"
                                    data-cy="button-toggle-status-resource-type"
                                >
                                    <svg-icon 
                                        type="mdi" 
                                        class="text-white icon-customized"  
                                        :path="data.item.status ? $icons.mdiArchiveCancelOutline :  $icons.mdiArchiveCheckOutline"
                                    />
                                </b-button>
                            </span>
                        </data>
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
                            <b-col cols ="6" md="4" class="order-md-1 align-self-center">
                                <h6 class="text-dark-secondary justify-content-center pb-3">
                                    Tipos de recurso: {{ totalRows }}
                                </h6>
                            </b-col>

                            <b-col cols ="6" md="4" class="d-flex justify-content-end order-md-3">
                                <b-form-group>
                                    <b-input-group size="sm">
                                        <b-form-select
                                            id="pages-select"
                                            v-model="perPage"
                                            data-cy="input-select-per-page"
                                        >
                                            <template #first>
                                                <option value="3">3</option>
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                            </template>
                                        </b-form-select>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12"  md="4" class="d-flex justify-content-center order-md-2">
                                <b-pagination
                                    v-model="currentPage"
                                    :total-rows="totalRows"
                                    :per-page="perPage"
                                    size="sm"
                                    data-cy="input-pagination"
                                >
                                </b-pagination>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <ModalSaveResourceType
            @refreshTable="refreshTable"
        />
        <ModalUpdateResourceType
            @refreshTable="refreshTable"
            :resourceTypeSelected="resourceTypeSelected"
        />
        <ConfirmationModal
            :config="config"
        />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Header from '@/components/Header.vue';
    import SvgIcon from '@jamescoyle/vue-icon'
    import { ResourceType } from '../../entities/ResourceType';
    import * as mdi from '@mdi/js';
    import { ResourceTypeController } from '../resource-types.controller';
    import { ConfirmationConfig, FilterDto } from '@/kernel/types';
    import ModalSaveResourceType from '../../components/ModalSaveResourceType.vue';
    import ModalUpdateResourceType from '../../components/ModalUpdateResourceType.vue';
    import { showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
    import ConfirmationModal from '@/components/ConfirmationModal.vue';
    import { formatDescription } from '@/kernel/functions';
    export default Vue.extend({
        name: 'ResourceTypes',
        components: {
            Header, SvgIcon, ModalSaveResourceType, ModalUpdateResourceType, ConfirmationModal
        },
        data(){
            return {
                breadCrumb:[
                    { text: 'Tipos de recurso', active: true },
                    { text: 'Recursos', to: '/resources' }
                ],
                resourceTypes: [] as Array<ResourceType>,
                headerItems:[
                    { key: 'name', label: 'Nombre' },
                    { key: 'description', label: 'Descripción', tdClass: 'custom-td' },
                    { key: 'status', label: 'Estado'},
                    { key: 'actions', label: 'Acciones' }
                ],
                emptyText: 'No hay tipos de recurso para mostrar',
                currentPage: 1,
                totalRows: 0,
                perPage: 3,
                filter: "",
                isLoading: false,
                resourceTypeSelected: {} as ResourceType,
                isChangingStatus: false,
                config: { 
                    id: 'resource-type-action-confirmation',
                    type: 'warning',
                    title: 'Cambiar estado de tipo de recurso',
                    message: '¿Estás seguro? Cambiar el estado del tipo de recurso afectará a sus recursos asociados.',
                    confirmButtonText: 'Cambiar estado',
                    loadingButtonText: 'Cambiando estado',
                    isLoading: false
                } as ConfirmationConfig
            }
        },
        methods: {
            confirmChangeStatus(id: number) {
                this.config = {
                    ...this.config,
                    action: () => this.changeResourceTypeStatus(id)
                };
                this.$root.$emit("bv::show::modal", this.config.id);
            },
            setPopoverText(status: boolean){
                return status ? 'Deshabilitar' : 'Habilitar'
            },
            getIconPath(iconName: string) {
                return mdi[iconName as keyof typeof mdi] || mdi.mdiHelpCircle;
            },
            showLoader(){
                this.isLoading = true
            },
            openModalSaveResourceType() {
                this.$root.$emit("bv::show::modal", "modal-save-resource-type");
            },
            openModalUpdateResourceType(resourceType: ResourceType) {
                this.resourceTypeSelected = JSON.parse(JSON.stringify(resourceType))
                this.$root.$emit("bv::show::modal", "modal-update-resource-type");
            },
            refreshTable(){
                this.$root.$emit("bv::refresh::table", "resource-types-table");
            },
            hideLoader(){
                this.isLoading = false
            },
            async resourceTypeProvider(ctx?: any){
                try {
                    this.showLoader()
                    const filter = {
                        paginationDto: {
                            page: this.currentPage -1,
                            size: ctx.perPage,
                            sort: 'id',
                            direction: 'desc'
                        },
                        dto: {
                            value: this.filter
                        }
                    } as FilterDto

                    const controller = new ResourceTypeController();
                    const {status, entities, total} = await controller.findPageResourceTypes(filter)
                    if(status === 200){
                        this.totalRows = total!
                        return entities!.map((item : ResourceType) => ({ ...item, expanded: false }));
                    }
                } catch (error) {}
                finally{
                    this.hideLoader()
                }
            },
            async changeResourceTypeStatus(id: number){
                try {
                    this.config.isLoading = true;
                    const controller = new ResourceTypeController();
                    const {status} = await controller.changeResourceTypeStatus(id)
                    if(status === 200){             
                        showSuccessToast('Estado del tipo de recurso modificado')
                        this.refreshTable()
                    }
                } catch (error) {}
                finally{
                    this.config.isLoading = false;
                    this.$root.$emit("bv::hide::modal", this.config.id);
                }
            },
            toggleDescription(resourceType: ResourceType) {
                resourceType.expanded = !resourceType.expanded;
            },
            shortDescription(description : string) {
                return formatDescription(description, 70)
            }
        },
    })
</script>

<style scoped></style>