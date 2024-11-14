<template>
    <b-modal
        id="modal-save-resource"
        ref="modal"
        no-close-on-backdrop
        centered
        no-close-on-esc
        size="lg"
        @shown="getResourceTypelist"
    >
        <template v-slot:modal-header>
            <h5 class="modal-title text-dark-secondary mt-1">Registrar nuevo recurso</h5>
            <b-button
                aria-label="close"
                type="button"
                class="bg-transparent border-0"
                @click="close"
                data-cy="close-resource-modal"
            >
                <svg-icon 
                    type="mdi" 
                    class="icon-customized text-dark-secondary"  
                    :path="$icons.mdiClose" 
                />
            </b-button>
        </template>

        <b-row>
            <b-col cols="12">
                <b-form-group id="fieldset-resource-name">
                    <label for="input-resource-name" class="required-field text-dark-secondary">
                        Nombre:
                    </label>
                    <b-form-input
                        id="input-resource-name"
                        type="text"
                        trim
                        v-model="$v.name.$model"
                        :state="$v.name.$dirty ? !$v.name.$error : null"
                        maxlength="100"
                        minlength="1"
                        @blur="$v.name.$touch()"
                        data-cy="input-resource-name"
                    ></b-form-input>
                    <b-form-invalid-feedback class="error-message" v-if="$v.name.$error">
                        <span v-if="!$v.name.required">Campo obligatorio</span>
                        <span v-else-if="!$v.name.minLength">Mínimo 1 caracter</span>
                        <span v-else-if="!$v.name.maxLength">Máximo 100 caracteres</span>
                        <span v-else-if="!$v.name.valid">Nombre inválido</span>
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-col>

            <b-col cols="12">
                <b-form-group id="fieldset-resource-type-select" :class="$v.type.$dirty ? !$v.type.$error ? 'valid' : 'invalid' : ''">
                    <label for="select-resource-type" class="required-field text-dark-secondary">
                        Tipo de recurso:
                    </label>
                    <CustomMultiselect
                        :config="typeConfig"
                        v-model="$v.type.$model"
                        :state="$v.type.$dirty ? !$v.type.$error : null"
                        @blur="$v.type.$touch()"
                        data-cy="select-resource-type"
                    >
                    </CustomMultiselect>
                </b-form-group>
            </b-col>

            <b-col cols="12">
                <b-form-group id="fieldset-resource-type-description">
                    <label for="input-resource-type-description" class="text-dark-secondary">
                        Descripción:
                    </label>
                    <b-form-textarea
                        id="input-resource-description"
                        v-model="$v.description.$model"
                        type="text"
                        trim
                        rows="3"
                        :state="$v.description.$dirty ? !$v.description.$error : null"
                        @blur="$v.description.$touch()"
                        :max-rows="5"
                        maxlength="200"
                        minlength="5"
                        data-cy="input-resource-description"
                    >
                    </b-form-textarea>
                    <b-form-invalid-feedback class="error-message" v-if="$v.description.$error">
                        <span v-if="!$v.description.minLength">Mínimo 5 caracteres</span>
                        <span v-else-if="!$v.description.maxLength">Máximo 200 caracteres</span>
                        <span v-else-if="!$v.description.valid">Descripción inválida</span>
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-row>
        <template v-slot:modal-footer>
            <b-button 
                variant="primary" 
                class="button-actions"
                :disabled="$v.$invalid"
                @click="$bvModal.show('save-resource-confirmation')"
            >
                Guardar
            </b-button>
            <b-button 
                class="button-actions"
                variant="secondary text-white" 
                @click="close"
            >Cancelar</b-button>
            <ConfirmationModal 
                :config="configConfirmation"
                @onConfirm="saveResourceType"
            />
        </template>
    </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { isInvalidName, isInvalidDescription } from "@/kernel/functions";
import CustomMultiselect from '@/components/CustomMultiselect.vue';
import { ConfirmationConfig, MultiselectConfig, MultiselectOption } from '@/kernel/types';
import { findResourceTypeList } from "@/modules/resource-types/boundary.module";
import { ResourceType } from "@/modules/resource-types/entities/ResourceType";
import { GetResourceTypeListDto } from "@/modules/resource-types/entities/get-resource-type-list.dto";
import { ResourceController } from "../adapters/resource.controller";
import { SaveResourceDto } from "../entities/save-resource-dto";
import { showSuccessToast } from "@/kernel/sweet-alert/sweet-alert";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
export default Vue.extend({
    name: "ModalSaveResource",
    components: {
        CustomMultiselect,
        ConfirmationModal
    },
    data() {
        return {
            name: '',
            type: {} as ResourceType,
            description: '',
            typeConfig: {
                options: [] as MultiselectOption[],
                label: 'label',
                trackBy: 'value',
                multiple: false,
                disabled: false,
                loading: false
            } as MultiselectConfig,
            configConfirmation: {
                id: 'save-resource-confirmation',
                type: 'question',
                title: 'Registrar recurso',
                message: '¿Estás seguro de registrar este recurso?',
                confirmButtonText: 'Registrar',
                loadingButtonText: 'Registrando',
                isLoading: false
            } as ConfirmationConfig
        };
    },
    methods: {
        close() {
            this.$bvModal.hide("modal-save-resource");
            this.$v.$reset();
            this.name = '';
            this.type = {} as ResourceType;
            this.description = '';
        },
        async saveResourceType() { 
            try {
                this.configConfirmation.isLoading = true;
                const preparedResourceType = this.prepareResourceType();
                const resourceController = new ResourceController();
                const {status} = await resourceController.saveResource(preparedResourceType);
                if(status === 201){
                    showSuccessToast('Recurso registrado exitosamente');
                    this.close();
                    this.$emit('refreshTable')
                }
            } catch (error) {}
            finally {
                this.configConfirmation.isLoading = false;
            }
        },
        prepareResourceType() {
            return {
                name: this.name,
                resourceTypeId: this.type.id,
                description: this.description
            } as SaveResourceDto;
        },
        async getResourceTypelist() {
            try {
                const { status, entities } = await findResourceTypeList();
                if (status === 200) {
                    this.typeConfig = {
                        ...this.typeConfig,
                        options: entities!.map((entity: GetResourceTypeListDto) => ({
                            id: entity.id,
                            label: entity.name,
                            value: entity.iconName,
                        }))
                    };
                }
            } catch (error) {
                console.error("Error fetching resource type list:", error);
            }
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(1),
            maxLength: maxLength(100),
            valid: isInvalidName
        },
        type: {
            required
        },
        description:{
            minLength: minLength(5),
            maxLength: maxLength(200),
            valid: isInvalidDescription
        }
    },
});
</script>

<style scoped>
.icon-customized {
    font-size: 24px;
}
</style>
