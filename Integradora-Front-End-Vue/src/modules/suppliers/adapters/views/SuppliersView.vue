<template>
    <div>
        <Header title="Proveedores" :image="require('@/assets/img/suppliers-header.jpg')" />
        <b-container fluid>
            <b-row class="mt-4">
                <b-col cols="9" md="8" lg="6">
                    <b-form-group label-for="search">
                        <div class="input-wrapper">
                            <b-form-input data-cy="input-suppliers-search" id="search" placeholder="Buscando..."
                                v-model="searchValue" class="input" @input="search"></b-form-input>
                            <b-icon icon="search" class="input-icon" />
                        </div>
                    </b-form-group>
                </b-col>
                <b-col cols="3" md="4" lg="6">
                    <b-button data-cy="button-show-save-supplier-view" v-b-popover.hover.top="'Registrar proveedor'"
                        variant="dark-green" class="float-right button-add-customized"
                        @click="$router.push({ name: 'saveSupplier' })">
                        <svg-icon type="mdi" class="text-white icon-customized" :path="$icons.mdiPlus" />
                    </b-button>
                </b-col>
            </b-row>
            <template v-if="!loading">
                <b-row class="p-3 justify-content-center" v-if="suppliers.length > 0">
                    <b-col cols="12" sm="6" lg="4" v-for="(supplier, index) in suppliers" :key="index"
                        class="mb-3 d-flex justify-content-center">
                        <b-card no-body class="custom-card bg-light shadow-sm">
                            <b-card-img top :src="supplier.image" class="custom-card-img bg-white" />
                            <h5 class="title-overlay">{{ supplier.name }}</h5>
                            <b-card-body class="p-3">
                                <b-row class="custom-overlay-btn">
                                    <b-col cols="12" class="d-flex justify-content-end">
                                        <b-button data-cy="button-change-supplier-status" class="button-actions"
                                            size="sm" :variant="supplier.status ? 'danger' : 'success'"
                                            v-b-popover.hover.left="setPopoverText(supplier.status)"
                                            @click="showConfirmation(supplier.id)">
                                            <svg-icon type="mdi" class="text-white icon-customized"
                                                :path="supplier.status ? $icons.mdiArchiveCancelOutline : $icons.mdiArchiveCheckOutline" />
                                        </b-button>
                                    </b-col>
                                </b-row>
                                <b-row class="text-darker-secondary">
                                    <b-col cols="12" class="d-flex align-items-center justify-content-center mb-2">
                                        <svg-icon type="mdi" size="1rem" :path="$icons.mdiEmail" />
                                        <h6 class="ml-2 custom-h6">{{ supplier.email }}</h6>
                                    </b-col>
                                    <b-col cols="12" class="d-flex align-items-center justify-content-center">
                                        <svg-icon type="mdi" size="1rem" :path="$icons.mdiPhone" />
                                        <h6 class="ml-2 custom-h6">+{{ supplier.lada }} {{ supplier.phone }}</h6>
                                    </b-col>
                                </b-row>
                                <b-button variant="primary" size="sm" data-cy="button-show-supplier-details"
                                    class="button-actions d-block mx-auto text-center mt-3"
                                    @click="getSupplierDetails(supplier.id)">
                                    Ver detalles
                                </b-button>
                            </b-card-body>
                        </b-card>
                    </b-col>
                    <b-col cols="12" class="mt-3">
                        <b-row>
                            <b-col cols="6" md="4" class="align-self-center order-md-1 ">
                                <h6 class="text-dark-secondary justify-content-center pb-3">
                                    Provedores: {{ totalRows }}
                                </h6>
                            </b-col>
                            <b-col cols="6" md="4" class="d-flex justify-content-end order-md-3">
                                <b-form-group>
                                    <b-input-group size="sm">
                                        <b-form-select data-cy="input-suppliers-pages" id="pages-select"
                                            v-model="perPage" @change="getSuppliers">
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
                                <b-pagination data-cy="pagination-suppliers" v-model="currentPage"
                                    :total-rows="totalRows" :per-page="perPage" size="sm" @input="getSuppliers">
                                </b-pagination>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <b-row class="p-3" v-else>
                    <b-col cols="12" class="d-flex justify-content-center align-items-center flex-column">
                        <img :src="require('@/assets/img/no-suppliers-founded.svg')" alt="empty-state" />
                        <h6 class="mt-2 text-dark-secondary">No hay proveedores registrados</h6>
                    </b-col>
                </b-row>
            </template>
            <template v-else>
                <b-row class="p-3">
                    <b-col cols="12" md="6" lg="4" class="d-flex justify-content-center">
                        <CardSkeleton />
                    </b-col>
                    <b-col cols="12" md="6" lg="4" class="d-none d-md-flex justify-content-center">
                        <CardSkeleton />
                    </b-col>
                    <b-col cols="12" md="6" lg="4" class="d-none d-lg-flex justify-content-center">
                        <CardSkeleton />
                    </b-col>
                </b-row>
            </template>
        </b-container>
        <confirmation-modal :config="config" />
    </div>
</template>

<script lang="ts">
import Header from '@/components/Header.vue';
import Vue from 'vue';
import { Supplier } from '../../entities';
import { ConfirmationConfig, FilterDto } from '@/kernel/types';
import { SuppliersController } from '../suppliers.controller';
import { encryptRouteParam } from '@/config/cryptojs';
import CardSkeleton from '@/components/CardSkeleton.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';

export default Vue.extend({
    name: 'SuppliersView',
    components: {
        Header, CardSkeleton, ConfirmationModal
    },
    mounted() {
        this.getSuppliers();
    },
    data() {
        return {
            loading: false,
            searchValue: '',
            currentPage: 1,
            perPage: 3,
            totalRows: 0,
            suppliers: [] as Array<Supplier>,
            timeout: 0,
            config: {
                id: 'change-supplier-status',
                type: 'warning',
                title: 'Cambiar estado de proveedor',
                message: '¿Estás seguro? Cambiar el estado de un proveedor puede afectar a otros procesos.',
                confirmButtonText: 'Cambiar estado',
                loadingButtonText: 'Cambiando estado',
                isLoading: false
            } as ConfirmationConfig
        };
    },
    methods: {
        async getSuppliers() {
            try {
                this.loading = true;
                const filter = {
                    paginationDto: {
                        page: this.currentPage - 1,
                        size: this.perPage,
                        sort: 'id',
                        direction: 'desc'
                    },
                    dto: {
                        supplierName: this.searchValue
                    }
                } as FilterDto;
                const controller = new SuppliersController();
                const { status, entities, total } = await controller.getSuppliersPaged(filter);
                if (status === 200) {
                    this.totalRows = total!;
                    this.suppliers = entities!;
                }
            } catch (error) {
                this.suppliers = [];
            } finally {
                this.loading = false;
            }
        },
        setPopoverText(status: boolean) {
            return status ? 'Deshabilitar' : 'Habilitar';
        },
        search() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.getSuppliers();
            }, 500);
        },
        getSupplierDetails(id: number) {
            this.$router.push({
                name: 'supplierDetails',
                params: { id: encryptRouteParam(id.toString()) }
            });
        },
        showConfirmation(id: number) {
            this.config.action = () => this.changeSupplierStatus(id);
            this.$root.$emit('bv::show::modal', 'change-supplier-status');
        },
        async changeSupplierStatus(id: number) {
            try {
                this.config.isLoading = true;
                const controller = new SuppliersController();
                const { status } = await controller.changeSupplierStatus(id);
                if (status === 200) {
                    showSuccessToast('Estado del proveedor modificado');
                    this.getSuppliers();
                }
            } catch (error) {

            } finally {
                this.config.isLoading = false;
                this.$root.$emit('bv::hide::modal', 'change-supplier-status');
            }
        }
    },
})
</script>

<style scoped>
h5,
h6 {
    margin-bottom: 0;
}

.custom-card {
    border-radius: 10px;
    max-width: 340px;
}

.custom-card:hover {
    transform: scale(1.025);
}

.custom-card-img {
    height: 180px;
    object-fit: cover;
    border-bottom: 1px solid #e9ecef;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.title-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--light);
    color: var(--dark);
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 90%;
}

.custom-h6 {
    font-size: 0.9rem;
}
</style>