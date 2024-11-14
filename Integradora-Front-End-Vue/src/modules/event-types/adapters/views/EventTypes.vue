<template>
    <div>
        <Header title="Tipos de eventos" :image="require('@/assets/img/event-types-header.jpg')"/>
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
                            @input="onFilter"
                            debounce="500"
                            data-cy="input-filter"
                        ></b-form-input>
                        <b-icon icon="search" class="input-icon"/>
                    </div>
                </b-form-group>
            </b-col>
            <b-col cols="7">
                <b-button
                    v-b-popover.hover.top="'Guardar nuevo tipo de evento'"
                    variant="dark-green" 
                    class="float-right button-add-customized"
                    @click="openSaveModal"
                    data-cy="button-add-event-type"
                >
                    <svg-icon 
                        type="mdi" 
                        class="text-white icon-customized"  
                        :path="$icons.mdiPlus"
                    />
                </b-button>
            </b-col>
        </b-row>
        <template v-if="!loading">
            <template v-if="eventTypes.length > 0">
                <b-row class="p-3 justify-content-center align-items-center">
                    <b-col
                        cols="12"
                        lg="4"
                        v-for="(eventType, index) in eventTypes"
                        :key="index"
                        :class="`d-flex justify-content-center align-items-center`"
                    >
                        <div :class="`card-container mb-3`">
                            <div class="card-image-container">
                                <img :src="eventType.image" alt="event-type">
                                <div class="icon-overlay">
                                    <b-button
                                        :class="`btn-sm button-actions ${eventType.status ? 'bg-danger' : 'bg-green'}`"
                                        v-b-popover.hover.left="setPopoverText(eventType.status)"
                                        @click="onConfirmChangeStatus(eventType)"
                                        data-cy="button-toggle-status-event-type"
                                    >
                                        <svg-icon 
                                            type="mdi"
                                            class="text-white icon-customized"  
                                            :path="eventType.status ? $icons.mdiArchiveCancelOutline :  $icons.mdiArchiveCheckOutline"
                                        />
                                    </b-button>
                                </div>
                                <div class="title-overlay">{{ eventType.name }}</div>
                            </div>
                            <div class="card-content">
                                <p class="text-dark-secondary">
                                    <template v-if="eventType.description.length > 70">
                                        <template v-if="eventType.expanded">
                                            {{ eventType.description }}
                                            <b-button
                                                variant="link"
                                                class="primary btn-sm"
                                                @click="toggleDescription(eventType)"
                                                data-cy="button-toggle-description-less"
                                            >
                                                Ver menos
                                            </b-button>
                                        </template>
                                        <template v-else>
                                            {{ showFormatedDescription(eventType.description) }}
                                            <b-button
                                                variant="link"
                                                class="primary btn-sm"
                                                @click="toggleDescription(eventType)"
                                                data-cy="button-toggle-description-more"
                                            >
                                                Ver más
                                            </b-button>
                                        </template>
                                    </template>
                                    <template v-else>
                                        {{ eventType.description }}
                                    </template>
                                </p>
                                <b-button
                                    v-if="!eventType.expanded"
                                    variant="primary"
                                    type="button"
                                    class="button-actions btn-sm"
                                    @click="openUpdateModal(eventType)"
                                    data-cy="button-edit-event-type"
                                >
                                    Modificar
                                </b-button>
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="p-4">
                    <b-col cols="12">
                        <b-row>
                            <b-col cols="6" md="4" class="order-md-1 align-self-center">
                                <h6 class="text-dark-secondary justify-content-center pb-3">
                                    Registros: {{ totalRows }}
                                </h6>
                            </b-col>

                            <b-col cols="6" md="4" class="d-flex justify-content-end order-md-3">
                                <b-form-group>
                                    <b-input-group size="sm">
                                        <b-form-select
                                            id="pages-select"
                                            v-model="perPage"
                                            @change="eventTypeProvider"
                                            data-cy="input-select-per-page"
                                        >
                                            <template #first>
                                                <option value="3">3</option>
                                                <option value="6">6</option>
                                                <option value="9">9</option>
                                            </template>
                                        </b-form-select>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12" md="4" class="d-flex justify-content-center order-md-2">
                                <b-pagination
                                    v-model="currentPage"
                                    :total-rows="totalRows"
                                    :per-page="perPage"
                                    size="sm"
                                    @input="eventTypeProvider"
                                    data-cy="input-pagination"
                                >
                                </b-pagination>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </template>
            <template v-else>
                <b-row class="p-3">
                    <b-col cols="12" class="d-flex justify-content-center align-items-center flex-column">
                        <img
                            :src="require('@/assets/img/card-empty-state.svg')"
                            alt="empty-state"
                        />
                        <p class="text-dark-secondary">No hay tipos de eventos registrados</p>
                    </b-col>
                </b-row>
            </template>
        </template>
        <template v-else>
            <b-row class="p-4 justify-content-center" gutter="1">
                <b-col cols="12" lg="4" md="6" class="d-flex justify-content-center"  v-for="index in 3" :key="index">
                    <CardSkeleton/>
                </b-col>
            </b-row>
        </template>
        <ConfirmationModal
            :config="config"
        />
        <ModalSaveEventType
            @eventTypeProvider="eventTypeProvider"
        />
        <ModalUpdateEventType
            :eventTypeSelected="eventTypeSelected"
            @eventTypeProvider="eventTypeProvider"
        />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Header from '@/components/Header.vue';
    import SvgIcon from '@jamescoyle/vue-icon' 
    import * as mdi from '@mdi/js';
    import { EventTypeController } from '../event-types.controller';
    import { EventType } from '../../entities/EventType';
    import { ConfirmationConfig, FilterDto } from '@/kernel/types';
    import ConfirmationModal from '@/components/ConfirmationModal.vue';
    import { showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
    import ModalSaveEventType from '../../components/ModalSaveEventType.vue';
    import CardSkeleton from '@/components/CardSkeleton.vue';
    import ModalUpdateEventType from '../../components/ModalUpdateEventType.vue';
    import { formatDescription } from '@/kernel/functions';
    export default Vue.extend({
        components:{
            Header, ConfirmationModal, SvgIcon, ModalSaveEventType,
            CardSkeleton, ModalUpdateEventType
        },
        data(){
            return {
                breadCrumb: [
                    { text: 'Publicados', active: false },
                    { text: 'Tipos de eventos', active: true }
                ],
                filter: '',
                eventTypes: [] as Array<EventType>,
                loading: false,
                currentPage: 1,
                perPage: 3,
                totalRows: 0,
                config : {
                    id: 'event-type-action-confirmation',
                    type: 'warning',
                    title: '¿Modificar estado de tipo de evento?',
                    message: 'Los cambios se verán reflejados en los eventos asociados a este tipo.',
                    button: 'aceptar',
                    confirmButtonText: 'Cambiar estado',
                    loadingButtonText: 'Cambiando estado',
                    isLoading: false
                } as ConfirmationConfig,
                timeout: null as any,
                eventTypeSelected: {} as EventType
            }
        },
        methods: {
            showLoading(){
                this.loading = true;
            },
            openSaveModal(){
                this.$bvModal.show('modal-save-event-type');
            },
            onFilter(){
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.eventTypeProvider();
                }, 500);
            },
            hideLoading(){
                this.loading = false;
            },
            async eventTypeProvider(){
                this.showLoading();
                try {                    
                    const filter = {
                        paginationDto: {
                            page: this.currentPage - 1,
                            size: this.perPage,
                            sort: 'id',
                            direction: 'desc'
                        },
                        dto: {
                            value: this.filter
                        }
                    } as FilterDto
                    const controller = new EventTypeController();
                    const {status, entities, total} = await controller.findPagedEventTypes(filter);
                    if(status === 200){
                        this.totalRows = total!;
                        this.eventTypes = entities!.map((item : EventType) => ({ ...item, expanded: false }));
                    }
                } catch (error) {}
                finally{
                    this.hideLoading();
                }
            },
            onConfirmChangeStatus(eventType: EventType){
                const {id} = eventType;
                this.config = {
                    ...this.config,
                    action: () => this.changeEventStatus(id!)
                }
                this.$root.$emit("bv::show::modal", this.config.id);
            },
            async changeEventStatus(id: number){
                try {
                    this.config.isLoading = true;
                    const controller = new EventTypeController();
                    const {status} = await controller.changeEventTypeStatus(id)
                    if(status === 200){             
                        showSuccessToast('Estado del tipo de recurso actualizado');
                        this.eventTypeProvider()
                    }
                } catch (error) {}
                finally{
                    this.config.isLoading = false;
                    this.$root.$emit("bv::hide::modal", this.config.id);
                }
            },
            setPopoverText(status: boolean){
                return status ? 'Inhabilitar' : 'Habilitar'
            },
            openUpdateModal(eventType: EventType){
                this.eventTypeSelected = JSON.parse(JSON.stringify(eventType));
                this.$bvModal.show('modal-update-event-type');
            },
            toggleDescription(eventType: EventType) {
                eventType.expanded = !eventType.expanded;
            },
            showFormatedDescription(description: string){
                return formatDescription(description, 30);
            }
        },
        mounted(){
            this.eventTypeProvider();
        },
    })
</script>

<style scoped>

.margin-custom{
    margin-bottom: 30px;
}

.breadcrumb-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    padding: 10px;
}

.card-container {
    width: 100%;
    height: 250px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    transition: box-shadow 0.3s ease;
}

.card-container:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-image-container {
    position: relative;
    width: 100%;
    height: 150px;
    overflow: hidden;
}

.card-image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.icon-overlay {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
}

.title-overlay {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 5px 10px;
    font-weight: bold;
    border-radius: 5px;
}

.card-content {
    padding: 10px;
    text-align: center;
    font-size: 14px;
    color: #333;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: center;
    color: #666;
}

@media (max-width: 768px) {
    .filter-container {
        flex-direction: column;
        gap: 10px;
    }
}
</style>