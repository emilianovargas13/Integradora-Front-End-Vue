<template>
    <b-container fluid>
        <b-row class="d-flex justify-content-center full-height-container">
            <b-col cols="12" sm="10" md="7" class="py-3 align-self-center">
                <b-card class="shadow custom-mx" no-body>
                    <b-card-body class="px-5">
                        <b-img :src="require('@/assets/img/logo.png')" class="w-30 d-block mx-auto"></b-img>
                        <h5 class="text-center mt-3">Recuperación de contraseña</h5>
                        <p class="text-small mt-3">
                            Ingresa tu correo electrónico para que te enviemos tu código de recuperación de contraseña.
                        </p>
                        <b-form class="mt-4">
                            <b-form-group>
                                <label for="email">Correo electrónico: <b class="text-danger">*</b></label>
                                <b-form-input data-cy="input-password-recovery-email" id="email" type="email" placeholder="Correo electrónico..."
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
                            <b-button variant="primary" class="d-block mx-auto" :disabled="$v.$invalid"
                                @click="getPasswordRecoveryCode" v-if="!loading">
                                Enviar correo
                            </b-button>
                            <b-button data-cy="button-password-recovery" variant="primary"
                                class="d-flex justified-content-center align-items-center mx-auto" disabled v-else>
                                Enviando correo
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
import { required, email } from 'vuelidate/lib/validators';
import { AuthController } from '../auth.controller';
import { showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
import { encryptRouteParam } from '@/config/cryptojs';

export default Vue.extend({
    name: 'PasswordRecoveryView',
    data() {
        return {
            email: '',
            loading: false,
        };
    },
    methods: {
        async getPasswordRecoveryCode() {
            try {
                this.loading = true;
                const controller = new AuthController();
                const response = await controller.getPasswordRecoveryCode(this.email);
                if (response.status === 200) {
                    showSuccessToast('Correo enviado', 'Te hemos enviado un correo con tu código de recuperación de contraseña');
                    this.$router.push({
                        name: 'passwordRecoveryCode',
                        params: { email: encryptRouteParam(this.email) },
                    });
                }
            } catch (error) {

            } finally {
                this.loading = false;
            }
        },
    },
    validations: {
        email: {
            required: required,
            email: email,
        },
    },
});
</script>
