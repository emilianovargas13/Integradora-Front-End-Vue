<template>
    <b-modal
        id="modal-save-event-type"
        no-close-on-backdrop
        centered
        no-close-on-esc
        size="lg"
        scrollable
    >
        <template v-slot:modal-header="{}">
            <h5 class="modal-title text-dark-secondary mt-1">Guardar nuevo tipo de evento</h5>
            <b-button
                aria-label="close"
                type="button"
                class="bg-transparent border-0" 
                @click="close"
                data-cy="button-close-modal"
            >
                <svg-icon 
                    type="mdi" 
                    class="icon-customized text-dark-secondary"  
                    :path="$icons.mdiClose" 
                />
            </b-button> 
        </template>
        <b-row>
            <b-col cols="12" lg="6">
                <b-row>
                    <b-col cols="12">
                        <b-form-group id="fieldset-event-type-name">
                            <label
                                for="input-event-type-name" 
                                class="required-field text-dark-secondary"
                            >
                                Nombre:
                            </label>
                            <b-form-input
                                id="input-event-type-name"
                                trim
                                v-model="$v.name.$model"
                                :state="$v.name.$dirty ? !$v.name.$error : null"
                                maxlength="100"
                                minlength="1"
                                @blur="$v.name.$touch()"
                                data-cy="input-event-type-name"
                            />
                            <b-form-invalid-feedback class="error-message" v-if="$v.name.$error">
                                <span v-if="!$v.name.required">
                                    Campo obligatorio
                                </span>
                                <span v-else-if="!$v.name.minLength">
                                    Mínimo 1 caracter
                                </span>
                                <span v-else-if="!$v.name.maxLength">
                                    Máximo 100 caracteres
                                </span>
                                <span v-else-if="!$v.name.valid">
                                    Nombre inválido
                                </span>
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group id="fieldset-event-type-description">
                            <label for="input-event-type-description" class="text-dark-secondary required-field">
                                Descripción:
                            </label>
                            <b-form-textarea
                                id="input-event-type-description"
                                class="text-dark-secondary description-input"
                                trim
                                rows="4"
                                v-model="$v.description.$model"
                                :state="$v.description.$dirty ? !$v.description.$error : null"
                                maxlength="200"
                                minlength="5"
                                @blur="$v.description.$touch()"
                                data-cy="input-event-type-description"
                            />
                            <b-form-invalid-feedback class="error-message" v-if="$v.description.$error">
                                <span v-if="!$v.description.required">
                                    Campo obligatorio
                                </span>
                                <span v-if="!$v.description.minLength">
                                    Mínimo 5 caracteres
                                </span>
                                <span v-else-if="!$v.description.maxLength">
                                    Máximo 200 caracteres
                                </span>
                                <span v-else-if="!$v.description.valid">
                                    Descripción inválida
                                </span>
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="12" lg="6">
                <b-form-group id="fieldset-event-type-image">
                    <label for="updload-img-container" class="required-field text-dark-secondary">
                        Imagen:
                    </label>
                    <div class="image-selector-container" @click="triggerFileInput" v-if="!image">
                        <template>
                            <b-row>
                                <b-col cols="12" class="d-flex justify-content-center align-items-center text-center flex-column">
                                    <svg-icon 
                                        type="mdi" 
                                        size="2em"
                                        class="image-icon text-dark-secondary"  
                                        :path="$icons.mdiImage" 
                                    />
                                    <span class="text-dark-secondary">Presiona para seleccionar una imagen</span>
                                    <small class="text-secondary">Tamaño max. 5MB</small>
                                </b-col>
                            </b-row>
                            <input 
                                type="file" 
                                id="updload-img-container"
                                ref="fileInput" 
                                class="d-none" 
                                @change="onFileSelected" 
                                accept="image/*"
                                data-cy="input-event-type-image"
                            />
                        </template>
                    </div>
                    <div v-else>
                        <template>
                            <div class="selected-image">
                                <img :src="imageUrl">
                                <div class="icon-remove">
                                    <b-button
                                        variant="danger"
                                        size="sm"
                                        class="btn btn-rounded"
                                        @click="removeImage"                                    
                                        v-b-popover.hover.left="'Remover imagen'"
                                        data-cy="button-remove-image"
                                    >
                                        <svg-icon 
                                            type="mdi" 
                                            size="1em"
                                            class="text-white"  
                                            :path="$icons.mdiClose" 
                                        />
                                    </b-button>
                                </div>
                            </div>
                            <label
                                class="error-message text-danger mb-1" 
                                v-if="$v.image.$error"
                            >
                                <span v-if="!$v.image.valid">
                                    Formato de imagen inválido
                                </span>
                                <span v-else-if="!$v.image.validSize">
                                    Tamaño máximo 5MB
                                </span>
                            </label>
                        </template>
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
                        :disabled="$v.$invalid || loading"
                        @click="$bvModal.show('confirmation-save-event-type')"
                        data-cy="button-save-event-type"
                    >
                        Guardar
                    </b-button>
                    <b-button
                        variant="secondary"
                        class="ml-2 button-actions text-white"
                        type="button"
                        @click="close"
                        data-cy="button-cancel-event-type"
                    >
                        Cancelar
                    </b-button>
                </b-col>
            </b-row>
            <ConfirmationModal
                :config="config"
                @onConfirm="saveEventType"
            />
        </template>
    </b-modal>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { convertImageToBase64, isValidSize } from '@/kernel/functions';
    import { required, minLength, maxLength } from 'vuelidate/lib/validators';
    import { isInvalidName, isInvalidDescription, isValidImage } from '@/kernel/functions';
    import ConfirmationModal from '@/components/ConfirmationModal.vue';
    import { SaveEventTypeDto } from '../entities/save-event-type.dto';
    import { EventTypeController } from '../adapters/event-types.controller';
    import { showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
    import { ConfirmationConfig } from '@/kernel/types';

    export default Vue.extend({
        name: 'ModalSaveEventType',
        components: {
            ConfirmationModal
        },
        data(){
            return {
                name: '',
                description: '',
                image: null as File | null,
                loading: false,
                showInvalidImage: false,
                imageUrl: '',
                config: {
                    id: 'confirmation-save-event-type',
                    type: 'question',
                    title: 'Guardar nuevo tipo de evento',
                    message: 'Se agregará un nuevo tipo de evento a la lista',
                    confirmButtonText: 'Registrar',
                    loadingButtonText: 'Registrando',
                    isLoading: false
                } as ConfirmationConfig
            }
        },
        methods: {
            close(){
                this.$bvModal.hide("modal-save-event-type");
                this.removeImage()
                this.name = '';
                this.description = '';
                this.$v.$reset();
            },
            async saveEventType(){
                this.config.isLoading = true;
                const eventType: SaveEventTypeDto = {
                    name: this.name,
                    description: this.description,
                    image: await convertImageToBase64(this.image as File)
                }
                const eventTypeController = new EventTypeController();
                const {status} = await eventTypeController.saveEventType(eventType);
                if(status === 201){
                    this.close()
                    showSuccessToast('Tipo de evento guardado correctamente');
                    this.$emit('eventTypeProvider')
                }
                this.config.isLoading = false;
                this.$bvModal.hide('confirmation-save-event-type');
            },
            triggerFileInput() {
                (this.$refs.fileInput as HTMLInputElement).click();
            },
            async onFileSelected(event: Event) {
                const target = event.target as HTMLInputElement;
                const file = target.files?.[0];
                if (!file) {return}
                this.showInvalidImage = false;
                this.image = file;
                this.imageUrl = URL.createObjectURL(file);
            },
            removeImage(){
                this.image = null;
                this.imageUrl = '';
            },
            
        },
        validations:{
            name: {
                required,
                maxLength: maxLength(100),
                minLength: minLength(1),
                valid: isInvalidName
            },
            description: {
                required,
                maxLength: maxLength(200),
                minLength: minLength(5),
                valid: isInvalidDescription
            },
            image: {
                required,
                valid: (file: File)=> isValidImage(file),
                validSize: (file: File) => isValidSize(file)
            }
        },
        watch: {
            image(){
                this.$v.image.$touch();
            }
        }
    })
</script>

<style scoped>
.description-input {
    resize: none !important;
}

.image-selector-container {
    width: 100%;
    height: 195px;
    border: 1px dashed #ced4da;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
}

.image-icon {
    margin-bottom: 5px;
}

.selected-image {
    position: relative;
    width: 100%;
    height: 195px;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    
}

.selected-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.icon-remove {
    position: absolute;
    background-color: rgba(252, 252, 252, 0.5) !important;
    border-radius: 20%;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
}

.error-message{
    font-size: 12px;
}

.danger-border{
    border: 1px dashed red;
}
</style>