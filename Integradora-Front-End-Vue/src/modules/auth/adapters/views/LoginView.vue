<template>
    <b-container fluid>
        <b-row class="d-flex justify-content-center full-height-container">
            <b-col cols="12" sm="10" md="7" class="align-self-center">
                <b-card class="shadow custom-mx" no-body>
                    <b-card-body class="px-5">
                        <b-img :src="require('@/assets/img/logo.png')" class="w-30 d-block mx-auto"></b-img>
                        <h4 class="text-center mt-3">Inicio de sesión</h4>
                        <b-form class="mt-4">
                            <b-form-group>
                                <label for="email">Correo electrónico: <b class="text-danger">*</b></label>
                                <b-form-input data-cy="input-login-email" id="email" type="email" placeholder="Correo electrónico..."
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
                            <b-form-group>
                                <label for="password">Contraseña: <b class="text-danger">*</b></label>
                                <b-input-group>
                                    <b-form-input data-cy="input-login-password" id="password" :type="showPassword ? 'text' : 'password'"
                                        placeholder="Contraseña..." v-model="$v.password.$model"
                                        :state="$v.password.$dirty ? !$v.password.$error : null"
                                        @blur="$v.password.$touch()">
                                    </b-form-input>
                                    <template #append>
                                        <b-button @click="togglePassword" variant="outline-primary">
                                            <b-icon :icon="showPassword ? 'eye' : 'eye-slash'"></b-icon>
                                        </b-button>
                                    </template>
                                </b-input-group>
                                <b-form-invalid-feedback v-if="!$v.password.required"
                                    :state="$v.password.$dirty ? !$v.password.$error : null">
                                    Campo obligatorio
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-button data-cy="button-login" variant="primary" class="d-block mx-auto" :disabled="$v.$invalid" @click="login"
                                v-if="!loading">
                                Iniciar sesión
                            </b-button>
                            <b-button variant="primary"
                                class="d-flex justified-content-center align-items-center mx-auto" disabled v-else>
                                Iniciando sesión
                                <b-spinner class="ml-2" small></b-spinner>
                            </b-button>
                            <b-button data-cy="link-navigate-password-recovery" variant="link" class="d-block mx-auto mt-3 text-secondary"
                                :to="{ name: 'passwordRecovery' }">
                                ¿Olvidaste tu contraseña?
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
import { LoginDto, UserDto } from '../../entities';
import { AuthController } from '../auth.controller';
import { showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
import { encrypt } from '@/config/cryptojs';

export default Vue.extend({
    name: 'LoginView',
    data() {
        return {
            showPassword: false,
            email: '',
            password: '',
            loading: false,
        };
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        async login() {
            try {
                this.loading = true;
                const payload: LoginDto = {
                    email: this.email,
                    password: this.password,
                };
                const controller = new AuthController();
                const response = await controller.login(payload);
                if (response.status === 200) {
                    const user: UserDto = response.entity!;
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('user', encrypt(user.userId.toString()));
                    localStorage.setItem('role', encrypt(user.role));
                    localStorage.setItem('name', encrypt(`${user.name} ${user.lastname}`));
                    showSuccessToast(`Bienvenido, ${user.name}`);
                    this.$router.push({ name: 'home' });
                }
            } catch (error) {

            } finally {
                this.loading = false;
            }
        }
    },
    validations: {
        email: {
            required: required,
            email: email,
        },
        password: {
            required: required,
        },
    },
});
</script>
