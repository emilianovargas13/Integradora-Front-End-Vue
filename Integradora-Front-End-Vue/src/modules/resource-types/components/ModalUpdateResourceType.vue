<template>
    <b-modal
        id="modal-update-resource-type"
        no-close-on-backdrop
        centered
        no-close-on-esc
        size="lg"
    >
        <template v-slot:modal-header="{}">
            <h5 class="modal-title text-dark-secondary mt-1">Modificar tipo de recurso</h5>
            <b-button
                aria-label="close"
                type="button"
                class="bg-transparent border-0"
                @click="close"
                data-cy="button-close-modal-update-resource-type"
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
                <b-form-group id="fieldset-resource-type-name">
                    <label
                        for="input-resource-type-name" 
                        class="required-field text-dark-secondary"
                    >
                        Nombre:
                    </label>
                    <b-form-input
                        id="input-resource-type-name"
                        type="text"
                        trim
                        v-model="$v.name.$model"
                        :state="$v.name.$dirty ? !$v.name.$error : null"
                        maxlength="100"
                        minlength="1"
                        @blur="$v.name.$touch()"
                        data-cy="input-resource-type-name"
                    />
                    <b-form-invalid-feedback class="error-message" v-if="$v.name.$error">
                        <span v-if="!$v.name.required">Campo obligatorio</span>
                        <span v-else-if="!$v.name.minLength">Mínimo 1 caracter</span>
                        <span v-else-if="!$v.name.maxLength">Máximo 100 caracteres</span>
                        <span v-else-if="!$v.name.valid">Nombre inválido</span>
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col cols="12">
                <b-form-group id="fieldset-resource-type-description">
                    <label
                        for="input-resource-type-description" 
                        class="required-field text-dark-secondary"
                    >
                        Descripción:
                    </label>
                    <b-textarea
                        id="input-resource-type-description"
                        type="text"
                        trim
                        rows="3"
                        v-model="$v.description.$model"
                        :state="$v.description.$dirty ? !$v.description.$error : null"
                        maxlength="200"
                        minlength="5"
                        @blur="$v.description.$touch()"
                        data-cy="input-resource-type-description"
                    >
                    </b-textarea>
                    <b-form-invalid-feedback class="error-message" v-if="$v.description.$error">
                        <span v-if="!$v.description.minLength">Mínimo 5 caracteres</span>
                        <span v-else-if="!$v.description.maxLength">Máximo 200 caracteres</span>
                        <span v-else-if="!$v.description.valid">Descripción inválida</span>
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col cols="12">
                <b-form-group id="fieldset-resource-type-icon">
                    <label class="required-field text-dark-secondary">
                        Icono:
                    </label>
                    <div class="icon-container">
                        <div 
                            v-for="icon in iconList()" 
                            @click="setIcon(icon)" 
                            :class="`icon-item  ${iconName === icon ? 'icon-selected' : ''}`"
                            :data-cy="`icon-item-${icon}`"
                        >
                            <svg-icon 
                                type="mdi" 
                                class="icon-customized text-dark-secondary"  
                                :path="getIconPath(icon)"
                            />
                        </div>
                    </div>
                </b-form-group>
            </b-col>
        </b-row>
        <template #modal-footer>
            <b-row>
                <b-col cols="12" class="d-flex justify-content-end">
                    <b-button
                        variant="primary"
                        type="button"
                        class="button-actions"
                        :disabled="$v.$invalid"
                        @click="$bvModal.show('update-resource-type-confirmation')"
                        data-cy="button-update-resource-type"
                    >
                        Modificar
                    </b-button>
                    <b-button
                        variant="secondary"
                        class="ml-2 button-actions text-white"
                        type="button"
                        @click="close"
                        data-cy="button-cancel-resource-type"
                    >
                        Cancelar
                    </b-button>
                </b-col>
            </b-row>
            <ConfirmationModal
                :config="config"
                @onConfirm="updateResourceType"
            />
        </template>
    </b-modal>
</template>

<script lang="ts">
    import Vue from 'vue'
    import * as mdi from '@mdi/js';
    import { getIconList } from '../utils/functions';
    import { maxLength, minLength, required } from 'vuelidate/lib/validators';
    import { isInvalidDescription, isInvalidName } from '@/kernel/functions';
    import { UpdateResourceTypeDto } from '../entities/update-resource-type.dto';
    import { ResourceTypeController } from '../adapters/resource-types.controller';
    import { showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
    import ConfirmationModal from '@/components/ConfirmationModal.vue';
    import { ConfirmationConfig } from '@/kernel/types';
    export default Vue.extend({
        name: "ModalUpdateResourceType",
        props: {
            resourceTypeSelected: {
                type: Object,
                required: true
            }
        },
        components: {
            ConfirmationModal
        },
        data(){
            return {
                name: '',
                description: '',
                iconName: '',
                config: {
                    id: 'update-resource-type-confirmation',
                    type: 'question',
                    title: 'Modificar tipo de recurso',
                    message: '¿Estás seguro de modificar este tipo de recurso?',
                    confirmButtonText: 'Modificar',
                    loadingButtonText: 'Modificando',
                    isLoading: false
                } as ConfirmationConfig
            }
        },
        methods: {
            close(){
                this.$bvModal.hide("modal-update-resource-type");
                this.$v.$reset();
            },
            async updateResourceType(){
                try {
                    this.config.isLoading = true;
                    const dto: UpdateResourceTypeDto = {
                        id: this.resourceTypeSelected.id,
                        name: this.name,
                        description: this.description,
                        iconName: this.iconName
                    }
                    const controller = new ResourceTypeController();
                    const {status} = await controller.updateResourceType(dto);
                    if(status === 200){
                        showSuccessToast('Tipo de recurso modificado');
                        this.close();
                        this.$emit("refreshTable");
                    }
                } catch (error) {
                    
                } finally {
                    this.config.isLoading = false;
                    this.$bvModal.hide('update-resource-type-confirmation');
                }
             },
            getIconPath(iconName: string) {
                return mdi[iconName as keyof typeof mdi] || mdi.mdiHelpCircle;
            },
            setIcon(iconName: string){
                if(this.iconName !== iconName){
                    this.iconName = iconName;
                }
            },
            iconList(){
                return getIconList();
            },
        },
        watch: {
            resourceTypeSelected: {
                handler(){
                    this.name = this.resourceTypeSelected.name;
                    this.description = this.resourceTypeSelected.description;
                    this.iconName = this.resourceTypeSelected.iconName;
                },
                immediate: true,
                deep: true
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(100),
                valid:isInvalidName
            },
            description: {
                minLength: minLength(5),
                maxLength: maxLength(200),
                valid: isInvalidDescription
            }
        }
    })
</script>

<style scoped>
.icon-container {
    width: 100%;
    height: auto;
    border: 1px solid #ced4da;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 10px; 
    gap: 10px;
    overflow-y: auto;
    max-height: 210px;
}

.icon-item {
    width: calc((100% / 10) - 10px); 
    height: 40px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    margin-right: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
}

.icon-item:hover {
    cursor: pointer;
    transition: all 0.3s;
    background-color:  #cbcfd0;
    transform: translateY(-4px);
}

.icon-selected {
    background-color: #cbcfd0
}
</style>