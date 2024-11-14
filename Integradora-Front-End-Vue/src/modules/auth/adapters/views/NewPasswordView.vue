<template>
    <b-container fluid>
        <b-row class="d-flex justify-content-center full-height-container">
            <b-col cols="12" sm="10" md="7" class="py-3 align-self-center">
                <b-card class="shadow custom-mx" no-body>
                    <b-card-body class="px-5">
                        <b-img :src="require('@/assets/img/logo.png')" class="w-30 d-block mx-auto"></b-img>
                        <h5 class="text-center mt-3">Recuperación de contraseña</h5>
                        <b-form class="mt-4">
                            <b-form-group>
                                <label for="newPassword">Nueva contraseña: <b class="text-danger">*</b></label>
                                <b-input-group>
                                    <b-form-input data-cy="input-recovery-new-password" id="newPassword" :type="showNewPassword ? 'text' : 'password'"
                                        placeholder="Nueva contraseña..." v-model="$v.newPassword.$model"
                                        :state="$v.newPassword.$dirty ? !$v.newPassword.$error : null"
                                        @blur="$v.newPassword.$touch()">
                                    </b-form-input>
                                    <template #append>
                                        <b-button data-cy="button-recovery-show-password" @click="togglePassword(1)" variant="outline-primary">
                                            <b-icon :icon="showNewPassword ? 'eye' : 'eye-slash'"></b-icon>
                                        </b-button>
                                    </template>
                                </b-input-group>
                                <b-form-invalid-feedback v-if="!$v.newPassword.required"
                                    :state="$v.newPassword.$dirty ? !$v.newPassword.$error : null">
                                    Campo obligatorio
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-else-if="!$v.newPassword.minLength"
                                    :state="$v.newPassword.$dirty ? !$v.newPassword.$error : null">
                                    Mínimo 6 caracteres
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-else-if="!$v.newPassword.valid"
                                    :state="$v.newPassword.$dirty ? !$v.newPassword.$error : null">
                                    Mínimo una letra mayúscula, una minúscula, un número y un carácter especial
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group>
                                <label for="passwordConfirmation">Confirmación de contraseña: <b
                                        class="text-danger">*</b></label>
                                <b-input-group>
                                    <b-form-input data-cy="input-recovery-password-confirmation" id="passwordConfirmation"
                                        :type="showPasswordConfirmation ? 'text' : 'password'"
                                        placeholder="Confirmación de contraseña..."
                                        v-model="$v.passwordConfirmation.$model"
                                        :state="$v.passwordConfirmation.$dirty ? !$v.passwordConfirmation.$error : null"
                                        @blur="$v.passwordConfirmation.$touch()">
                                    </b-form-input>
                                    <template #append>
                                        <b-button data-cy="button-recovery-show-password2" @click="togglePassword(2)" variant="outline-primary">
                                            <b-icon :icon="showPasswordConfirmation ? 'eye' : 'eye-slash'"></b-icon>
                                        </b-button>
                                    </template>
                                </b-input-group>
                                <b-form-invalid-feedback v-if="!$v.passwordConfirmation.required"
                                    :state="$v.passwordConfirmation.$dirty ? !$v.passwordConfirmation.$error : null">
                                    Campo obligatorio
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-else-if="!$v.passwordConfirmation.sameAsNewPassword"
                                    :state="$v.passwordConfirmation.$dirty ? !$v.passwordConfirmation.$error : null">
                                    Las contraseñas no coinciden
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-button data-cy="button-recovery-password-form" variant="primary" class="d-block mx-auto" :disabled="$v.$invalid"
                                @click="recoverPassword" v-if="!loading">
                                Guardar contraseña
                            </b-button>
                            <b-button variant="primary"
                                class="d-flex justified-content-center align-items-center mx-auto" disabled v-else>
                                Guardando contraseña
                                <b-spinner class="ml-2" small></b-spinner>
                            </b-button>
                            <b-button data-cy="link-navigate-login" variant="link" class="d-block mx-auto mt-3 text-secondary"
                                :to="{ name: 'login' }">
                                ¿Quieres iniciar sesión?
                            </b-button>
                        </b-form>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col cols="5" class="px-0 d-none d-md-block">
                <b-img :src="require('@/assets/img/loginImage.jpg')" class="full-height-image" fluid></b-img>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { minLength, required, sameAs } from 'vuelidate/lib/validators';
import { isPasswordValid } from '@/kernel/functions';
import { AuthController } from '../auth.controller';
import { showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
import { RecoverPasswordDto } from '../../entities';
import { decryptRouteParam } from '@/config/cryptojs';

export default Vue.extend({
    name: 'NewPasswordView',
    data() {
        return {
            email: this.$route.params.email,
            token: this.$route.params.token,
            newPassword: '',
            passwordConfirmation: '',
            showNewPassword: false,
            showPasswordConfirmation: false,
            loading: false,
        };
    },
    methods: {
        togglePassword(type: number) {
            if (type === 1) this.showNewPassword = !this.showNewPassword;
            else this.showPasswordConfirmation = !this.showPasswordConfirmation;
        },
        async recoverPassword() {
            try {
                this.loading = true;
                const payload = {
                    email: decryptRouteParam(this.email),
                    token: decryptRouteParam(this.token),
                    newPassword: this.newPassword
                } as RecoverPasswordDto;
                const controller = new AuthController();
                const response = await controller.recoverPassword(payload);
                if (response.status === 200) {
                    showSuccessToast('Contraseña modificada correctamente');
                    this.$router.push({ name: 'login' });
                }
            } catch (error) {

            } finally {
                this.loading = false;
            }
        },
    },
    validations: {
        newPassword: {
            required: required,
            minLength: minLength(6),
            valid: isPasswordValid,
        },
        passwordConfirmation: {
            required: required,
            sameAsNewPassword: sameAs('newPassword'),
        },
    },
    created() {
        if (!this.$route.params.email || !this.$route.params.token) this.$router.push({ name: 'passwordRecovery' });
    }
});
</script>
