<template>
    <b-container fluid>
        <b-row class="d-flex justify-content-center full-height-container">
            <b-col cols="12" sm="10" md="7" class="py-3 align-self-center">
                <b-card class="shadow custom-mx" no-body>
                    <b-card-body class="px-5">
                        <b-img :src="require('@/assets/img/logo.png')" class="w-30 d-block mx-auto"></b-img>
                        <h5 class="text-center mt-3">Recuperación de contraseña</h5>
                        <h6 class="text-center text-dark-secondary mt-3">Código de recuperación</h6>
                        <p class="text-small mt-3">
                            Ingresa el código de recuperación de contraseña que recibiste por correo electrónico.
                        </p>
                        <b-form class="mt-4">
                            <b-form-group>
                                <label for="code">Código de recuperación: <b class="text-danger">*</b></label>
                                <b-form-input data-cy="input-validate-code" id="code" type="text" placeholder="XXXXXX" maxlength="6"
                                    v-model="$v.code.$model" :state="$v.code.$dirty ? !$v.code.$error : null"
                                    @blur="$v.code.$touch()">
                                </b-form-input>
                                <b-form-invalid-feedback v-if="!$v.code.required">
                                    Campo obligatorio
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-button data-cy="button-validate-code" variant="primary" class="d-block mx-auto" :disabled="$v.$invalid"
                                @click="verifyPasswordRecoveryCode" v-if="!loading">
                                Siguiente
                            </b-button>
                            <b-button variant="primary"
                                class="d-flex justified-content-center align-items-center mx-auto" disabled v-else>
                                Verificando código
                                <b-spinner class="ml-2" small></b-spinner>
                            </b-button>
                            <b-button data-cy="link-navigate-password-recovery" variant="link" class="d-block mx-auto mt-3 text-secondary"
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
import { required } from 'vuelidate/lib/validators';
import { AuthController } from '../auth.controller';
import { showErrorToast, showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
import { ValidatePwRecoveryCodeDto } from '../../entities';
import { decryptRouteParam, encryptRouteParam } from '@/config/cryptojs';

export default Vue.extend({
    name: 'CodeView',
    data() {
        return {
            code: '',
            email: this.$route.params.email,
            loading: false,
        };
    },
    methods: {
        async verifyPasswordRecoveryCode() {
            try {
                this.loading = true;
                const payload = {
                    email: decryptRouteParam(this.email),
                    token: this.code,
                } as ValidatePwRecoveryCodeDto;
                const controller = new AuthController();
                const response = await controller.validatePasswordRecoveryCode(payload);
                if (response.status === 200 && response.entity) {
                    showSuccessToast('Código de recuperación de contraseña válido');
                    this.$router.push({
                        name: 'newPassword',
                        params: { email: this.email, token: encryptRouteParam(this.code) },
                    });
                } else if (response.status === 200 && !response.entity) {
                    showErrorToast('Código de recuperación de contraseña inválido');
                }
            } catch (error) {

            } finally {
                this.loading = false;
            }
        },
    },
    validations: {
        code: {
            required: required,
        },
    },
    created() {
        if (!this.$route.params.email) this.$router.push({ name: 'passwordRecovery' });
    }

});
</script>
