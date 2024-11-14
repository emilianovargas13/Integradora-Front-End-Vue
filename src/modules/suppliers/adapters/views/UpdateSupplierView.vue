<template>
    <b-container fluid>
        <b-row class="px-3 pt-3">
            <b-col>
                <b-breadcrumb :items="routes" class="shadow-sm bg-lighter px-3"></b-breadcrumb>
                <stepper :step="step" :options="stepperOptions" @moveTo="step = $event"></stepper>
            </b-col>
            <b-col cols="12" class="py-sm-4">
                <b-form>
                    <b-row>
                        <b-col cols="12" class="d-flex justify-content-between align-items-center">
                            <h5 class="my-3 text-dark-blue">{{ getStepTitle() }}</h5>
                            <b-button data-cy="button-update-supplier" class="step-button" v-b-popover.hover.left="'Guardar'" :disabled="$v.$invalid"
                                @click="$bvModal.show('update-supplier-confirmation')">
                                <svg-icon type="mdi" size="1.8em" :path="$icons.mdiCheckboxMarkedCircleOutline" />
                            </b-button>
                        </b-col>
                        <b-col cols="12" v-if="step === 1">
                            <b-card class="custom-form-card" no-body>
                                <b-row class="p-4 justify-content-center">
                                    <b-col cols="12" lg="7" order="2" order-lg="1">
                                        <b-form-group>
                                            <label for="name">Nombre: <b class="text-danger">*</b></label>
                                            <b-form-input data-cy="input-update-supplier-name" id="name" type="text" placeholder="Nombre..." maxlength="50"
                                                v-model="$v.supplier.name.$model"
                                                :state="$v.supplier.name.$dirty ? !$v.supplier.name.$error : null"
                                                @blur="$v.supplier.name.$touch()">
                                            </b-form-input>
                                            <b-form-invalid-feedback v-if="!$v.supplier.name.required">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.name.valid">
                                                Formato inválido
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.name.minLength">
                                                Mínimo 3 caracteres
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                        <b-form-group>
                                            <label for="description">
                                                Descripción: <b class="text-danger">*</b>
                                            </label>
                                            <b-form-textarea data-cy="input-update-supplier-description" id="description" placeholder="Descripción..." rows="4"
                                                maxlength="250" v-model="$v.supplier.description.$model"
                                                :state="$v.supplier.description.$dirty ? !$v.supplier.description.$error : null"
                                                @blur="$v.supplier.description.$touch()">
                                            </b-form-textarea>
                                            <b-form-invalid-feedback v-if="!$v.supplier.description.required">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.description.minLength">
                                                Mínimo 50 caracteres
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="10" sm="8" md="7" lg="5" order="1" order-lg="2">
                                        <b-form-group>
                                            <label for="image-selector-container">Logo: <b
                                                    class="text-danger">*</b></label>
                                            <div class="image-selector-container" @click="triggerFileInput"
                                                v-if="!supplier.image">
                                                <template>
                                                    <b-row>
                                                        <b-col cols="12"
                                                            class="d-flex justify-content-center align-items-center text-center flex-column">
                                                            <svg-icon type="mdi" size="2em"
                                                                class="img-icon text-dark-secondary"
                                                                :path="$icons.mdiImage" />
                                                            <span class="text-dark-secondary p-2">
                                                                Presiona para seleccionar una imagen
                                                            </span>
                                                            <small class="text-secondary">Tamaño máx. 5MB</small>
                                                        </b-col>
                                                    </b-row>
                                                    <input data-cy="input-update-supplier-image" type="file" id="image-selector-container" ref="fileInput"
                                                        class="d-none" accept="image/*" @change="onFileSelected" />
                                                </template>
                                            </div>
                                            <div v-else>
                                                <template>
                                                    <div class="selected-image">
                                                        <img :src="supplier.image" alt="Logo" />
                                                        <div class="icon-remove">
                                                            <b-button data-cy="button-update-supplier-remove-image" variant="danger" size="sm" class="btn btn-rounded"
                                                                @click="removeImage"
                                                                v-b-popover.hover.top="'Remover imagen'">
                                                                <svg-icon type="mdi" size="1em" class="text-white"
                                                                    :path="$icons.mdiClose" />
                                                            </b-button>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </b-col>
                        <b-col cols="12" v-else-if="step === 2">
                            <b-card class="custom-form-card" no-body>
                                <b-row class="p-4">
                                    <b-col cols="2" class="d-flex justify-content-center align-self-center">
                                        <div
                                            class="custom-icon-container d-flex align-items-center justify-content-center">
                                            <svg-icon type="mdi" size="1.5em" class="text-dark-blue"
                                                :path="$icons.mdiAccountOutline" />
                                        </div>
                                    </b-col>
                                    <b-col cols="10">
                                        <b-form-group>
                                            <label for="contactName">Nombre de contacto: <b
                                                    class="text-danger">*</b></label>
                                            <b-form-input data-cy="input-update-supplier-contact-name" id="contactName" type="text"
                                                placeholder="Nombre de contacto..." maxlength="50"
                                                v-model="$v.supplier.contactName.$model"
                                                :state="$v.supplier.contactName.$dirty ? !$v.supplier.contactName.$error : null"
                                                @blur="$v.supplier.contactName.$touch()">
                                            </b-form-input>
                                            <b-form-invalid-feedback v-if="!$v.supplier.contactName.required">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.contactName.valid">
                                                Formato inválido
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.contactName.minLength">
                                                Mínimo 3 caracteres
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="2" class="d-flex justify-content-center align-self-center">
                                        <div
                                            class="custom-icon-container d-flex align-items-center justify-content-center">
                                            <svg-icon type="mdi" size="1.5em" class="text-dark-blue"
                                                :path="$icons.mdiEmailOutline" />
                                        </div>
                                    </b-col>
                                    <b-col cols="10">
                                        <b-form-group>
                                            <label for="email">Correo electrónico: <b class="text-danger">*</b></label>
                                            <b-form-input data-cy="input-update-supplier-email" id="email" type="email" placeholder="Correo electrónico..."
                                                maxlength="50" v-model="$v.supplier.email.$model"
                                                :state="$v.supplier.email.$dirty ? !$v.supplier.email.$error : null"
                                                @blur="$v.supplier.email.$touch()">
                                            </b-form-input>
                                            <b-form-invalid-feedback v-if="!$v.supplier.email.required">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.email.email">
                                                Formato inválido
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="2" class="d-flex justify-content-center align-self-center">
                                        <div
                                            class="custom-icon-container d-flex align-items-center justify-content-center">
                                            <svg-icon type="mdi" size="1.5em" class="text-dark-blue"
                                                :path="$icons.mdiPhoneOutline" />
                                        </div>
                                    </b-col>
                                    <b-col cols="4" lg="2">
                                        <b-form-group>
                                            <label for="lada">Lada: <b class="text-danger">*</b></label>
                                            <b-form-input data-cy="input-update-supplier-contact-lada" id="lada" type="text" placeholder="Lada..." maxlength="3"
                                                v-model="$v.supplier.lada.$model"
                                                :state="$v.supplier.lada.$dirty ? !$v.supplier.lada.$error : null"
                                                @blur="$v.supplier.lada.$touch()">
                                            </b-form-input>
                                            <b-form-invalid-feedback v-if="!$v.supplier.lada.required">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.lada.numeric">
                                                Formato inválido
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="6" lg="8">
                                        <b-form-group>
                                            <label for="phone">Teléfono: <b class="text-danger">*</b></label>
                                            <b-form-input data-cy="input-update-supplier-phone" id="phone" type="text" placeholder="Teléfono..."
                                                maxlength="10" v-model="$v.supplier.phone.$model"
                                                :state="$v.supplier.phone.$dirty ? !$v.supplier.phone.$error : null"
                                                @blur="$v.supplier.phone.$touch()">
                                            </b-form-input>
                                            <b-form-invalid-feedback v-if="!$v.supplier.phone.required">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.phone.numeric">
                                                Formato inválido
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.phone.minLength">
                                                10 caracteres
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </b-col>
                        <b-col cols="12" v-else-if="step === 3">
                            <b-card class="custom-form-card" no-body>
                                <b-row class="p-4">
                                    <b-col cols="12" sm="6" lg="4">
                                        <b-form-group>
                                            <label for="country">País: <b class="text-danger">*</b></label>
                                            <b-form-input data-cy="input-update-supplier-country" id="country" type="text" placeholder="País..." maxlength="50"
                                                v-model="$v.supplier.address.country.$model"
                                                :state="$v.supplier.address.country.$dirty ? !$v.supplier.address.country.$error : null"
                                                @blur="$v.supplier.address.country.$touch()">
                                            </b-form-input>
                                            <b-form-invalid-feedback v-if="!$v.supplier.address.country.required">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.address.country.format">
                                                Formato inválido
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.address.country.minLength">
                                                Mínimo 3 caracteres
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" sm="6" lg="4">
                                        <b-form-group>
                                            <label for="state">Estado: <b class="text-danger">*</b></label>
                                            <b-form-input data-cy="input-update-supplier-state" id="state" type="text" placeholder="Estado..." maxlength="50"
                                                v-model="$v.supplier.address.state.$model"
                                                :state="$v.supplier.address.state.$dirty ? !$v.supplier.address.state.$error : null"
                                                @blur="$v.supplier.address.state.$touch()">
                                            </b-form-input>
                                            <b-form-invalid-feedback v-if="!$v.supplier.address.state.required">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.address.state.format">
                                                Formato inválido
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.address.state.minLength">
                                                Mínimo 3 caracteres
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" sm="6" lg="4">
                                        <b-form-group>
                                            <label for="city">Ciudad: <b class="text-danger">*</b></label>
                                            <b-form-input data-cy="input-update-supplier-city" id="city" type="text" placeholder="Ciudad..." maxlength="50"
                                                v-model="$v.supplier.address.city.$model"
                                                :state="$v.supplier.address.city.$dirty ? !$v.supplier.address.city.$error : null"
                                                @blur="$v.supplier.address.city.$touch()">
                                            </b-form-input>
                                            <b-form-invalid-feedback v-if="!$v.supplier.address.city.required">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.address.city.format">
                                                Formato inválido
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.address.city.minLength">
                                                Mínimo 3 caracteres
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" sm="6" lg="4">
                                        <b-form-group>
                                            <label for="colony">Colonia: <b class="text-danger">*</b></label>
                                            <b-form-input data-cy="input-update-supplier-colony" id="colony" type="text" placeholder="Colonia..."
                                                maxlength="50" v-model="$v.supplier.address.colony.$model"
                                                :state="$v.supplier.address.colony.$dirty ? !$v.supplier.address.colony.$error : null"
                                                @blur="$v.supplier.address.colony.$touch()">
                                            </b-form-input>
                                            <b-form-invalid-feedback v-if="!$v.supplier.address.colony.required">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.address.colony.valid">
                                                Formato inválido
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.address.colony.minLength">
                                                Mínimo 3 caracteres
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" sm="6" lg="4">
                                        <b-form-group>
                                            <label for="street">Calle: <b class="text-danger">*</b></label>
                                            <b-form-input data-cy="input-update-supplier-street" id="street" type="text" placeholder="Calle..." maxlength="50"
                                                v-model="$v.supplier.address.street.$model"
                                                :state="$v.supplier.address.street.$dirty ? !$v.supplier.address.street.$error : null"
                                                @blur="$v.supplier.address.street.$touch()">
                                            </b-form-input>
                                            <b-form-invalid-feedback v-if="!$v.supplier.address.street.required">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.address.street.valid">
                                                Formato inválido
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback v-else-if="!$v.supplier.address.street.minLength">
                                                Mínimo 3 caracteres
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" sm="6" lg="4">
                                        <b-form-group>
                                            <label for="postalCode">Código postal: <b class="text-danger">*</b></label>
                                            <b-form-input data-cy="input-update-supplier-postal-code" id="postalCode" type="text" placeholder="00000" maxlength="5"
                                                v-model="$v.supplier.address.postalCode.$model"
                                                :state="$v.supplier.address.postalCode.$dirty ? !$v.supplier.address.postalCode.$error : null"
                                                @blur="$v.supplier.address.postalCode.$touch()">
                                            </b-form-input>
                                            <b-form-invalid-feedback v-if="!$v.supplier.address.postalCode.required">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback
                                                v-else-if="!$v.supplier.address.postalCode.numeric">
                                                Formato inválido
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback
                                                v-else-if="!$v.supplier.address.postalCode.minLength">
                                                5 caracteres
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="6" lg="3">
                                        <b-form-group>
                                            <label for="exteriorNumber">
                                                Número exterior: <b class="text-danger">*</b>
                                            </label>
                                            <b-form-input data-cy="input-update-supplier-exterior-number" id="exteriorNumber" type="text" placeholder="0" maxlength="4"
                                                v-model="$v.supplier.address.exteriorNumber.$model"
                                                :state="$v.supplier.address.exteriorNumber.$dirty ? !$v.supplier.address.exteriorNumber.$error : null"
                                                @blur="$v.supplier.address.exteriorNumber.$touch()">
                                            </b-form-input>
                                            <b-form-invalid-feedback
                                                v-if="!$v.supplier.address.exteriorNumber.required">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback
                                                v-else-if="!$v.supplier.address.exteriorNumber.numeric">
                                                Formato inválido
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="6" lg="3">
                                        <b-form-group>
                                            <label for="interiorNumber">Número interior:</label>
                                            <b-form-input data-cy="input-update-supplier-interior-number" id="interiorNumber" type="text" placeholder="0" maxlength="4"
                                                v-model="$v.supplier.address.interiorNumber.$model"
                                                :state="$v.supplier.address.interiorNumber.$dirty ? !$v.supplier.address.interiorNumber.$error : null"
                                                @blur="$v.supplier.address.interiorNumber.$touch()">
                                            </b-form-input>
                                            <b-form-invalid-feedback v-if="!$v.supplier.address.interiorNumber.numeric">
                                                Formato inválido
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12" lg="6">
                                        <b-form-group
                                            :class="$v.supplier.address.buildingType.$dirty ? !$v.supplier.address.buildingType.$error ? 'valid' : 'invalid' : ''">
                                            <label for="buildingType">
                                                Tipo de edificación: <b class="text-danger">*</b>
                                            </label>
                                            <multiselect data-cy="multiselect-update-supplier-builiding-type" :config="multiselectConfig"
                                                @close="$v.supplier.address.buildingType.$touch()"
                                                @update:modelValue="$v.supplier.address.buildingType.$model = $event">
                                            </multiselect>
                                            <b-form-invalid-feedback v-if="!$v.supplier.address.buildingType.required"
                                                :state="$v.supplier.address.buildingType.$dirty ? !$v.supplier.address.buildingType.$error : null">
                                                Campo obligatorio
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="12">
                                        <b-form-group>
                                            <label for="referenceDetails">Referencias:</label>
                                            <b-form-textarea data-cy="input-update-supplier-reference-details" id="referenceDetails" placeholder="Referencias..." rows="3"
                                                maxlength="250" v-model="$v.supplier.address.referenceDetails.$model"
                                                :state="$v.supplier.address.referenceDetails.$dirty ? !$v.supplier.address.referenceDetails.$error : null"
                                                @blur="$v.supplier.address.referenceDetails.$touch()">
                                            </b-form-textarea>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </b-col>
                        <b-col cols="12" class="mt-3 d-flex justify-content-end">
                            <b-button data-cy="button-supplier-stepper-cancel2 " variant="secondary" class="button-actions"
                                @click="$router.push({ name: 'supplierDetails', params: { id: $route.params.id } })">
                                Cancelar
                            </b-button>
                            <b-button data-cy="button-supplier-stepper-previous2" variant="primary" class="button-actions ml-2" @click="step--" v-if="step > 1">
                                Anterior
                            </b-button>
                            <b-button data-cy="button-supplier-stepper-next2" variant="primary" class="button-actions ml-2" @click="step++"
                                v-if="step < stepperOptions.length">
                                Siguiente
                            </b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-col>
            <confirmation-modal :config="confirmationConfig" @onConfirm="updateSupplier" />
        </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { UpdateSupplierDto } from '../../entities';
import { decryptRouteParam } from '@/config/cryptojs';
import Stepper from '@/components/Stepper.vue';
import { email, minLength, numeric, required } from 'vuelidate/lib/validators';
import { convertImageToBase64, hasOnlyLetters, isAddressLineNameValid, isSupplierNameValid, isUserNameValid, isValidImage, isValidSize } from '@/kernel/functions';
import { showErrorToast, showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
import CustomMultiselect from '@/components/CustomMultiselect.vue';
import { Address, ConfirmationConfig, MultiselectConfig, MultiselectOption } from '@/kernel/types';
import buildingTypes from '@/kernel/data/buildingTypes';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { SuppliersController } from '../suppliers.controller';

export default Vue.extend({
    name: 'UpdateSupplierView',
    components: { Stepper, Multiselect: CustomMultiselect, ConfirmationModal },
    created() {
        if (!this.$route.params.supplier || !this.$route.params.id) {
            this.$router.push({ name: 'suppliers' });
        } else {
            const supplier = JSON.parse(decryptRouteParam(this.$route.params.supplier));
            const mappedBuildingType = buildingTypes.find(type => type.value === supplier.buildingType) || null;
            if (mappedBuildingType) this.multiselectConfig.defaultValue = mappedBuildingType;
            this.supplier = {
                ...supplier,
                id: decryptRouteParam(this.$route.params.id),
                url: supplier.image,
                address: {
                    country: supplier.country,
                    state: supplier.state,
                    city: supplier.city,
                    colony: supplier.colony,
                    street: supplier.street,
                    postalCode: supplier.postalCode,
                    exteriorNumber: supplier.exteriorNumber,
                    interiorNumber: supplier.interiorNumber || '',
                    referenceDetails: supplier.referenceDetails,
                    buildingType: mappedBuildingType
                } as Address
            } as UpdateSupplierDto;
        }
    },
    data() {
        return {
            routes: [
                { text: 'Proveedores', to: { name: 'suppliers' } },
                { text: 'Detalles del proveedor', to: { name: 'supplierDetails', params: { id: this.$route.params.id } } },
                { text: 'Modificar proveedor', active: true }
            ],
            step: 1,
            stepperOptions: [
                { step: 1, title: 'Información general' },
                { step: 2, title: 'Contacto' },
                { step: 3, title: 'Dirección' },
            ],
            supplier: {} as UpdateSupplierDto,
            multiselectConfig: {
                options: buildingTypes as MultiselectOption[],
                label: 'label',
                trackBy: 'value',
                loading: false,
                multiple: false,
                disabled: false,
            } as MultiselectConfig,
            confirmationConfig: {
                id: 'update-supplier-confirmation',
                type: 'question',
                title: 'Modificar proveedor',
                message: '¿Estás seguro de modificar este proveedor?',
                confirmButtonText: 'Modificar',
                loadingButtonText: 'Modificando',
                isLoading: false
            } as ConfirmationConfig
        }
    },
    methods: {
        getStepTitle() {
            return this.stepperOptions.find(option => option.step === this.step)?.title;
        }, triggerFileInput() {
            (this.$refs.fileInput as HTMLInputElement).click();
        },
        validateImage(file: File) {
            if (!isValidImage(file)) {
                showErrorToast('Archivo inválido', 'El archivo seleccionado no es una imagen');
                return false;
            }
            if (!isValidSize(file)) {
                showErrorToast('Archivo inválido', 'El archivo seleccionado supera los 5MB');
                return false;
            }
            return true;
        },
        async onFileSelected(event: Event) {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file && this.validateImage(file)) {
                try {
                    const base64 = await convertImageToBase64(file);
                    this.supplier.image = base64;
                } catch (error) {
                    showErrorToast('Error', 'Ocurrió un error al cargar la imagen');
                }
            }
        },
        removeImage() {
            this.supplier.image = '';
            const fileInput = this.$refs.fileInput as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        },
        async updateSupplier() {
            try {
                this.confirmationConfig.isLoading = true;
                const controller = new SuppliersController();
                if (this.supplier.image === this.supplier.url) this.supplier.image = "";
                const response = await controller.updateSupplier(this.supplier);
                if (response.status == 200) {
                    showSuccessToast('Proveedor modificado');
                    this.$router.push({ name: 'supplierDetails', params: { id: this.$route.params.id } });
                }
            } catch (error) {

            } finally {
                this.confirmationConfig.isLoading = false;
                this.$bvModal.hide('update-supplier-confirmation');
            }
        }
    },
    validations: {
        supplier: {
            name: {
                required,
                minLength: minLength(3),
                valid: isSupplierNameValid
            },
            description: {
                required,
                minLength: minLength(50)
            },
            image: { required },
            contactName: {
                required,
                minLength: minLength(3),
                valid: isUserNameValid
            },
            email: {
                required,
                email: email
            },
            lada: { required, numeric },
            phone: {
                required,
                numeric,
                minLength: minLength(10)
            },
            address: {
                country: {
                    required,
                    minLength: minLength(3),
                    format: hasOnlyLetters
                },
                state: {
                    required,
                    minLength: minLength(3),
                    format: hasOnlyLetters
                },
                city: {
                    required,
                    minLength: minLength(3),
                    format: hasOnlyLetters
                },
                colony: {
                    required,
                    minLength: minLength(3),
                    valid: isAddressLineNameValid
                },
                street: {
                    required,
                    minLength: minLength(3),
                    valid: isAddressLineNameValid
                },
                postalCode: {
                    required,
                    minLength: minLength(5),
                    numeric
                },
                exteriorNumber: {
                    required,
                    numeric
                },
                interiorNumber: {
                    numeric
                },
                buildingType: { required },
                referenceDetails: {}
            }
        }
    },
});
</script>

<style scoped>
.custom-icon-container {
    background-color: transparent;
    border: 1.5px solid var(--dark-blue);
    border-radius: 50%;
    padding: 10px;
    margin: 0;
}
</style>
