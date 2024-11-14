<template>
    <b-modal id="save-user" ref="save-user" centered scrollable no-close-on-backdrop no-close-on-esc @close="cleanForm">
        <template v-slot:modal-header="{ close }">
            <h5 class="modal-title text-darker-secondary my-0">Registrar administrador</h5>
            <b-button aria-label="close" type="button" class="bg-transparent border-0" size="sm" @click="close">
                <svg-icon type="mdi" class="small-icon text-darker-secondary" :path="$icons.mdiClose" />
            </b-button>
        </template>
        <b-form class="px-2">
            <section class="title-section d-flex align-items-center mb-3 pb-2">
                <svg-icon type="mdi" class="text-primary" :path="$icons.mdiCardAccountDetailsOutline" size="20" />
                <h6 class="my-0 ml-2 text-primary">Información personal</h6>
            </section>
            <b-row>
                <b-col cols="12">
                    <b-form-group>
                        <label for="name">Nombre: <b class="text-danger">*</b></label>
                        <b-form-input data-cy="input-admin-name" id="name" type="text" placeholder="Nombre..." maxlength="50"
                            v-model="$v.name.$model" :state="$v.name.$dirty ? !$v.name.$error : null"
                            @blur="$v.name.$touch()">
                        </b-form-input>
                        <b-form-invalid-feedback v-if="!$v.name.required">
                            Campo obligatorio
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.name.valid">
                            Formato inválido
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.name.minLength">
                            Mínimo 3 caracteres
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group>
                        <label for="lastname">Apellido paterno: <b class="text-danger">*</b></label>
                        <b-form-input data-cy="input-admin-lastname" id="lastname" type="text" placeholder="Apellido paterno..." maxlength="50"
                            v-model="$v.lastname.$model" :state="$v.lastname.$dirty ? !$v.lastname.$error : null"
                            @blur="$v.lastname.$touch()">
                        </b-form-input>
                        <b-form-invalid-feedback v-if="!$v.lastname.required">
                            Campo obligatorio
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.lastname.valid">
                            Formato inválido
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.lastname.minLength">
                            Mínimo 3 caracteres
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group>
                        <label for="surname">Apellido materno:</label>
                        <b-form-input data-cy="input-admin-surname" id="surname" type="text" placeholder="Apellido materno..." maxlength="50"
                            v-model="$v.surname.$model" :state="$v.surname.$dirty ? !$v.surname.$error : null"
                            @blur="$v.surname.$touch()">
                        </b-form-input>
                        <b-form-invalid-feedback v-if="!$v.surname.valid">
                            Formato inválido
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.surname.minLength">
                            Mínimo 3 caracteres
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
            </b-row>
            <section class="title-section d-flex align-items-center my-3 pb-2">
                <svg-icon type="mdi" class="text-primary" :path="$icons.mdiEmailOutline" size="20" />
                <h6 class="my-0 ml-2 text-primary">Información de contacto</h6>
            </section>
            <b-row>
                <b-col cols="12">
                    <b-form-group>
                        <label for="email">Correo electrónico: <b class="text-danger">*</b></label>
                        <b-form-input data-cy="input-admin-email" id="email" type="email" placeholder="Correo electrónico..."
                            v-model="$v.email.$model" :state="$v.email.$dirty ? !$v.email.$error : null"
                            @blur="$v.email.$touch()">
                        </b-form-input>
                        <b-form-invalid-feedback v-if="!$v.email.required">
                            Campo obligatorio
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.email.email">
                            Formato inválido
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group>
                        <label for="lada">Lada: <b class="text-danger">*</b></label>
                        <b-form-input data-cy="input-admin-lada" id="lada" type="text" placeholder="Lada..." v-model="$v.lada.$model" maxlength="3"
                            :state="$v.lada.$dirty ? !$v.lada.$error : null" @blur="$v.lada.$touch()">
                        </b-form-input>
                        <b-form-invalid-feedback v-if="!$v.lada.required">
                            Campo obligatorio
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.lada.numeric">
                            Formato inválido
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
                <b-col cols="8">
                    <b-form-group>
                        <label for="phone">Teléfono: <b class="text-danger">*</b></label>
                        <b-form-input data-cy="input-admin-phone" id="phone" type="text" placeholder="Teléfono..." v-model="$v.phone.$model"
                            maxlength="10" :state="$v.phone.$dirty ? !$v.phone.$error : null" @blur="$v.phone.$touch()">
                        </b-form-input>
                        <b-form-invalid-feedback v-if="!$v.phone.required">
                            Campo obligatorio
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.phone.numeric">
                            Formato inválido
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else-if="!$v.phone.minLength">
                            Mínimo 10 caracteres
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <template #modal-footer="{ close }">
            <div class="d-flex justify-content-end">
                <b-button data-cy="button-save-admin" variant="primary" type="button" class="button-actions" :disabled="$v.$invalid"
                    @click="$bvModal.show('save-user-confirmation')">
                    Registrar
                </b-button>
                <b-button data-cy="button-cancel-save-admin" variant="secondary" class="ml-2 button-actions text-white" type="button" @click="close">
                    Cancelar
                </b-button>
            </div>
        </template>
        <confirmation-modal :config="config" @onConfirm="saveUser" />
    </b-modal>
</template>

<script lang="ts">
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { isUserNameValid } from '@/kernel/functions';
import { ConfirmationConfig } from '@/kernel/types';
import Vue from 'vue';
import { required, email, minLength, numeric } from 'vuelidate/lib/validators';
import { SaveUserDto } from '../../entities';
import { UsersController } from '../users.controller';
import { showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';

export default Vue.extend({
    name: 'SaveUserModal',
    components: { ConfirmationModal },
    data() {
        return {
            name: '',
            lastname: '',
            surname: '',
            email: '',
            lada: '',
            phone: '',
            config: {
                id: 'save-user-confirmation',
                type: 'question',
                title: 'Registrar administrador',
                message: '¿Estás seguro de registrar este administrador?',
                confirmButtonText: 'Registrar',
                loadingButtonText: 'Registrando',
                isLoading: false
            } as ConfirmationConfig
        };
    },
    methods: {
        async saveUser() {
            try {
                this.config.isLoading = true;
                const payload = {
                    name: this.name,
                    lastname: this.lastname,
                    surname: this.surname === '' ? null : this.surname,
                    email: this.email,
                    lada: this.lada,
                    phone: this.phone
                } as SaveUserDto;
                const controller = new UsersController();
                const response = await controller.saveUser(payload);
                if (response.status == 201) {
                    showSuccessToast('Administrador registrado');
                    this.$bvModal.hide('save-user');
                    this.cleanForm();
                    this.$emit('reload');
                }
            } catch (error) {

            } finally {
                this.config.isLoading = false;
                this.$bvModal.hide('save-user-confirmation');
            }
        },
        cleanForm() {
            this.name = '';
            this.lastname = '';
            this.surname = '';
            this.email = '';
            this.lada = '';
            this.phone = '';
            this.$v.$reset();
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(3),
            valid: isUserNameValid
        },
        lastname: {
            required,
            minLength: minLength(3),
            valid: isUserNameValid
        },
        surname: {
            minLength: minLength(3),
            valid(value: string) {
                return value === '' || isUserNameValid(value);
            }
        },
        email: { required, email },
        lada: { required, numeric },
        phone: {
            required,
            numeric,
            minLength: minLength(10)
        }
    }
});
</script>

<style scoped>
.title-section {
    border-bottom: 1px solid #577E85;
}

.title-section h6 {
    font-size: 1.1rem;
}
</style>