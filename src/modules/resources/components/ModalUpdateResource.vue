<template>
    <b-modal
        id="modal-update-resource"
        ref="modal"
        no-close-on-backdrop
        centered
        no-close-on-esc
        size="lg"
        @shown="getResourceTypelist"
    >
        <template v-slot:modal-header>
            <h5 class="modal-title text-dark-secondary mt-1">Modificar recurso</h5>
            <b-button
                aria-label="close"
                type="button"
                class="bg-transparent border-0"
                @click="close"
                data-cy="close-update-resource-modal"
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
                        id="select-resource-type"
                        :config="typeConfig"
                        @close="$v.type.$touch()"
                        data-cy="select-resource-type"
                        @update:modelValue="$v.type.$model = $event"
                    >
                    </CustomMultiselect>
                    <div v-if="$v.type.$error" class="error-message pt-1">
                        <span v-if="!$v.type.required">Campo obligatorio</span>
                    </div>
                </b-form-group>
            </b-col>

            <b-col cols="12">
                <b-form-group id="fieldset-resource-type-description">
                    <label for="input-resource-description" class="text-dark-secondary">
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
                @click="$bvModal.show('update-resource-confirmation')"
            >
                Modificar
            </b-button>
            <b-button 
                class="button-actions"
                variant="secondary text-white" 
                @click="close"
            >Cancelar</b-button>
            <ConfirmationModal 
                :config="configConfirmation"
                @onConfirm="updateResource"
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
import { GetResourceTypeListDto } from "@/modules/resource-types/entities/get-resource-type-list.dto";
import { ResourceController } from "../adapters/resource.controller";
import { showSuccessToast } from "@/kernel/sweet-alert/sweet-alert";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import { UpdateResourceDto } from "../entities/update-resource-type.dto";

export default Vue.extend({
    name: "ModalUpdateResource",
    components: {
        CustomMultiselect,
        ConfirmationModal
    },
    props: {
        resourceSelected: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            name: '',
            type: {} as MultiselectOption,
            description: '',
            typeConfig: {
                options: [] as MultiselectOption[],
                label: 'label',
                trackBy: 'label',
                multiple: false,
                disabled: false,
                loading: false
            } as MultiselectConfig,
            configConfirmation: {
                id: 'update-resource-confirmation',
                type: 'question',
                title: 'Modificar recurso',
                message: '¿Estás seguro de modificar este recurso?',
                confirmButtonText: 'Modificar',
                loadingButtonText: 'Modificando',
                isLoading: false
            } as ConfirmationConfig
        };
    },
    methods: {
        close() {
            this.$bvModal.hide("modal-update-resource");
            this.$v.$reset();
        },
        async updateResource() { 
            try {
                this.configConfirmation.isLoading = true;
                const preparedResource = this.prepareResource();
                const resourceController = new ResourceController();
                const { status } = await resourceController.updateResource(preparedResource);
                if (status === 200) {
                    showSuccessToast('Recurso modificado correctamente');
                    this.$emit('refreshTable');
                    this.close();
                }
            } catch (error) {}
            finally {
                this.configConfirmation.isLoading = false;
            }
        },
        prepareResource() {
            return {
                id: this.resourceSelected.id,
                name: this.name,
                resourceTypeId: this.type.id,
                description: this.description
            } as UpdateResourceDto;
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
                        }))
                    };
                }
            } catch (error) {}
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
    watch: {
        resourceSelected:{
            handler(){
                const { name, resourceType, description } = this.resourceSelected;
                this.name = name;
                this.description = description;
                this.type = resourceType;
                this.typeConfig.defaultValue = resourceType;
            }
        }
    }
});
</script>

<style scoped>
.icon-customized {
    font-size: 24px;
}

.error-message {
    color: #dc3545;
    font-size: 0.8rem;
}
</style>
