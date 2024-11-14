<template>
    <div>
        <Header title="Administradores" :image="require('@/assets/img/users-header.jpg')" />
        <b-container fluid>
            <b-row class="mt-4">
                <b-col cols="10" md="8" lg="6">
                    <b-form-group label-for="search">
                        <div class="input-wrapper">
                            <b-form-input data-cy="input-suppliers-search" id="search" placeholder="Buscando..." v-model="searchValue" class="input"
                                debounce="500"></b-form-input>
                            <b-icon icon="search" class="input-icon" />
                        </div>
                    </b-form-group>
                </b-col>
                <b-col cols="2" md="4" lg="6">
                    <b-button data-cy="button-show-save-admin-modal" v-b-popover.hover.top="'Registrar administrador'" variant="dark-green"
                        class="float-right button-add-customized" @click="$bvModal.show('save-user')">
                        <svg-icon type="mdi" class="text-white icon-customized" :path="$icons.mdiPlus" />
                    </b-button>
                </b-col>
            </b-row>
            <b-row class="p-3">
                <b-col cols="12">
                    <b-table id="users-table" ref="users-table" :items="getUsers" :fields="fields"
                        :current-page="currentPage" :per-page="perPage" :filter="searchValue" show-empty
                        empty-text="No hay registros para mostrar" :busy="loading" class="text-center text-white shadow"
                        thead-class="primary-bg bg-primary text-white" outlined striped hover responsive>
                        <template #table-busy>
                            <div class="text-center text-primary my-2">
                                <b-spinner small></b-spinner>
                                <strong class="ml-2">Cargando administradores...</strong>
                            </div>
                        </template>
                        <template v-slot:empty>
                            <span class="text-center text-dark-secondary">No hay administradores para mostrar</span>
                        </template>
                        <template v-slot:emptyfiltered>
                            <span class="text-center text-dark-secondary">No hay resultados para tu búsqueda</span>
                        </template>
                        <template v-slot:cell(fullname)="data">
                            <div class="d-flex align-items-center text-dark-secondary">
                                <b-avatar size="2rem" variant="green" class="mr-3">
                                    <span class="text-white" style="font-size: 0.9rem;">
                                        {{ getAvatarText(data.item.name, data.item.lastname) }}
                                    </span>
                                </b-avatar>
                                <span>
                                    {{ data.item.name }} {{ data.item.lastname }} {{ data.item.surname ?
                                        data.item.surname : '' }}
                                </span>
                            </div>
                        </template>
                        <template v-slot:cell(email)="data">
                            <span class="text-dark-secondary">{{ data.item.email }}</span>
                        </template>
                        <template v-slot:cell(phone)="data">
                            <span class="text-dark-secondary">+{{ data.item.lada }} {{ data.item.phone }}</span>
                        </template>
                        <template v-slot:cell(status)="data">
                            <b-badge variant="success" v-if="data.item.status">Activo</b-badge>
                            <b-badge variant="danger" v-else>Bloqueado</b-badge>
                        </template>
                        <template v-slot:cell(actions)="data">
                            <data class="actions-container">
                                <span class="actions-wrapper">
                                    <b-button data-cy="button-reset-password" v-b-popover.hover.top="'Resetear contraseña'"
                                        @click="showResetUserPasswordConfirmation(data.item.id)"
                                        class="bg-dark-green button-actions btn-sm mr-2">
                                        <svg-icon type="mdi" class="text-white icon-customized"
                                            :path="$icons.mdiShieldKeyOutline" />
                                    </b-button>
                                    <b-button data-cy="button-change-user-status" v-b-popover.hover.top="setPopoverText(data.item.status)"
                                        @click="showChangeUserStatusConfirmation(data.item.id, data.item.status)"
                                        :class="`btn-sm button-actions ${data.item.status ? 'bg-danger' : 'bg-success'} mr-2`">
                                        <svg-icon type="mdi" class="text-white icon-customized"
                                            :path="data.item.status ? $icons.mdiLockOutline : $icons.mdiLockOpenOutline" />
                                    </b-button>
                                </span>
                            </data>
                        </template>
                    </b-table>
                    <b-row>
                        <b-col cols="6" md="4" class="align-self-center order-md-1 ">
                            <h6 class="text-dark-secondary justify-content-center pb-3">
                                Administradores: {{ totalRows }}
                            </h6>
                        </b-col>
                        <b-col cols="6" md="4" class="d-flex justify-content-end order-md-3">
                            <b-form-group>
                                <b-input-group size="sm">
                                    <b-form-select data-cy="input-admins-pages" id="pages-select" v-model="perPage">
                                        <template #first>
                                            <option value="3">3</option>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                        </template>
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="4" class="d-flex justify-content-center order-md-2">
                            <b-pagination data-cy="button-pagination-admins" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="sm">
                            </b-pagination>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
        <confirmation-modal :config="config" />
        <save-user-modal @reload="reload()" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SvgIcon from '@jamescoyle/vue-icon'
import Header from '@/components/Header.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { User } from '../../entities';
import { ConfirmationConfig, FilterDto } from '@/kernel/types';
import { UsersController } from '../users.controller';
import { showSuccessTimer, showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
import SaveUserModal from '../components/SaveUserModal.vue';

export default Vue.extend({
    name: 'UsersView',
    components: { Header, SvgIcon, ConfirmationModal, SaveUserModal },
    data() {
        return {
            loading: false,
            searchValue: '',
            currentPage: 1,
            perPage: 3,
            totalRows: 0,
            fields: [
                { key: 'fullname', label: 'Nombre' },
                { key: 'email', label: 'Correo electrónico' },
                { key: 'phone', label: 'Teléfono' },
                { key: 'status', label: 'Estado' },
                { key: 'actions', label: 'Acciones' },
            ],
            config: {
                id: 'user-action-confirmation',
                isLoading: false,
            } as ConfirmationConfig
        };
    },
    methods: {
        reload() {
            this.$root.$emit("bv::refresh::table", "users-table");
        },
        async getUsers(ctx?: any) {
            try {
                this.loading = true;
                const filter = {
                    paginationDto: {
                        page: this.currentPage - 1,
                        size: ctx.perPage,
                        sort: 'id',
                        direction: 'desc'
                    },
                    dto: {
                        searchValue: this.searchValue
                    }
                } as FilterDto;
                const controller = new UsersController();
                const { status, entities, total } = await controller.getUsersPaged(filter);
                if (status === 200) {
                    this.totalRows = total!;
                    return entities! as Array<User>;
                }
            } catch (error) {

            } finally {
                this.loading = false;
            }
        },
        getAvatarText(name: string, lastname: string) {
            return `${name.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`;
        },
        setPopoverText(status: boolean) {
            return status ? 'Bloquear' : 'Activar';
        },
        showChangeUserStatusConfirmation(id: number, status: boolean) {
            this.config = {
                ...this.config,
                type: status ? 'danger' : 'question',
                title: status ? 'Bloquear administrador' : 'Activar administrador',
                message: status ? '¿Estás seguro de que deseas bloquear este administrador? Si procedes, el administrador no podrá acceder al sistema.' : '¿Estás seguro de que deseas activar este administrador?',
                confirmButtonText: status ? 'Bloquear' : 'Activar',
                loadingButtonText: status ? 'Bloqueando' : 'Activando',
                action: () => this.changeUserStatus(id, status)
            };
            this.$root.$emit('bv::show::modal', 'user-action-confirmation');
        },
        async changeUserStatus(id: number, status: boolean) {
            try {
                this.config.isLoading = true;
                const controller = new UsersController();
                const response = await controller.changeUserStatus(id);
                if (response.status === 200) {
                    showSuccessToast(status ? 'Administrador bloqueado' : 'Administrador activado');
                    this.reload();
                }
            } catch (error) {

            } finally {
                this.config.isLoading = false;
                this.$root.$emit('bv::hide::modal', 'user-action-confirmation');
            }
        },
        showResetUserPasswordConfirmation(id: number) {
            this.config = {
                ...this.config,
                type: 'danger',
                title: 'Resetear contraseña',
                message: '¿Estás seguro de que deseas resetear la contraseña de este administrador? Si procedes, se le generará y enviará por correo electrónico una nueva contraseña.',
                confirmButtonText: 'Resetear',
                loadingButtonText: 'Reseteando',
                action: () => this.resetUserPassword(id)
            };
            this.$root.$emit('bv::show::modal', 'user-action-confirmation');
        },
        async resetUserPassword(id: number) {
            try {
                this.config.isLoading = true;
                const controller = new UsersController();
                const response = await controller.resetUserPassword(id);
                if (response.status === 200) {
                    const newPassword = response.entity;
                    showSuccessTimer('Reseteo de contraseña exitoso', `<p style="font-size: 1.1rem;">La nueva contraseña del administrador es: </p><h5 class="text-darker-secondary my-3">${newPassword}</h5><p style="font-size: 0.9rem;">Se ha enviado la nueva contraseña al correo electrónico del administrador.</p>`);
                }
            } catch (error) {

            } finally {
                this.config.isLoading = false;
                this.$root.$emit('bv::hide::modal', 'user-action-confirmation');
            }
        },
    },
})
</script>
