<template>
    <b-modal
        id="modal-update-event-type"
        no-close-on-backdrop
        centered
        no-close-on-esc
        size="lg"
        scrollable
    >
        <template v-slot:modal-header="{}">
            <h5 class="modal-title text-dark-secondary mt-1">Modificar tipo de evento</h5>
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
                                class="required-field description-input"
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
                    <div>
                        <template v-if="image">
                            <div class="selected-image">
                                <img :src="image">
                                <div class="icon-remove">
                                    <b-button
                                        variant="transparent"
                                        v-b-popover.hover.top="'Remover'"
                                        size="sm"
                                        class="btn btn-rounded"
                                        @click="removeImage"
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
                        </template>
                        <template v-else>
                            <div :class="`image-selector-container ${showInvalidImage ? 'danger-border' : ''}`" @click="triggerFileInput">
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
                            </div>
                        </template>
                        <div v-if="showInvalidImage" :class="`error-message text-danger mb-1`">
                            <span v-if="!isImageValid">El archivo debe ser una imagen</span>
                            <span v-else-if="!isSizeValid">La imagen no puede superar los 5MB</span>
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
                        id="button-save-event-type"
                        type="button"
                        class="button-actions"
                        :disabled="$v.$invalid || loading"
                        @click="$bvModal.show('confirmation-update-event-type')"
                        data-cy="button-update-event-type"
                    >
                        Modificar
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
                @onConfirm="updateResourceType"
            />
        </template>
    </b-modal>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { convertImageToBase64 } from '@/kernel/functions';
    import { required, minLength, maxLength } from 'vuelidate/lib/validators';
    import { isInvalidName, isInvalidDescription, isValidImage, isValidSize } from '@/kernel/functions';
    import ConfirmationModal from '@/components/ConfirmationModal.vue';
    import { EventTypeController } from '../adapters/event-types.controller';
    import { showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
    import { UpdateEventTypeDto } from '../entities/update-event-type.dto';
    import { ConfirmationConfig } from '@/kernel/types';

    export default Vue.extend({
        name: 'ModalUpdateEventType',
        props: {
            eventTypeSelected: {
                type: Object
            }
        },
        components: {
            ConfirmationModal
        },
        data(){
            return {
                name: '',
                description: '',
                image: null as string | null,
                loading: false,
                config: {
                    id: 'confirmation-update-event-type',
                    type: 'question',
                    title: 'Modificar información de tipo de evento',
                    message: 'Se modificarán este tipo de evento a la lista',
                    confirmButtonText: 'Modificar',
                    loadingButtonText: 'Modificando',
                    isLoading: false,
                } as ConfirmationConfig,
                MAX_FILE_SIZE : 5 * 1024 * 1024,
                imageUrl: '',
                newImage: null as File | null,
                showInvalidImage: false,
                isImageValid: true,
                isSizeValid: true
            } 
        },
        methods:{
            close(){
                this.$bvModal.hide("modal-update-event-type");
                this.$v.$reset(); 
                this.resetImageValidation()
            },
            async updateResourceType(){
                this.config.isLoading = true;
                const prepareUpdateDto = await this.prepareEventTypeDto();
                const controller = new EventTypeController();
                const {status} = await controller.updateEventType(prepareUpdateDto);
                if(status === 200){
                    showSuccessToast('Tipo de evento actualizado correctamente');
                    this.close();
                    this.$emit('eventTypeProvider')
                }
                this.config.isLoading = false;
                this.$bvModal.hide('confirmation-update-event-type');
            },
            async prepareEventTypeDto (): Promise<UpdateEventTypeDto> {
                let updateEventTypeDto: UpdateEventTypeDto = {}
                if(!this.newImage){
                    updateEventTypeDto = {
                        name: this.name,
                        description: this.description,
                        url: this.eventTypeSelected.image,
                        id: this.eventTypeSelected.id
                    }
                }else{
                    updateEventTypeDto = {
                        name: this.name,
                        description: this.description,
                        url: this.eventTypeSelected.image,
                        id: this.eventTypeSelected.id,
                        image : await convertImageToBase64(this.newImage)
                    }
                }
                return updateEventTypeDto;
            },
            triggerFileInput() {
                (this.$refs.fileInput as HTMLInputElement).click();
            },
            async onFileSelected(event: Event) {
                const target = event.target as HTMLInputElement;
                const file = target.files?.[0];
                if (!file) return;

                this.isImageValid = file.type.startsWith("image/");
                this.isSizeValid = file.size <= this.MAX_FILE_SIZE;

                if (!this.isImageValid || !this.isSizeValid) {
                    this.showInvalidImage = true;
                    this.newImage = null;
                    this.image = null;
                    return;
                }

                this.showInvalidImage = false;
                this.newImage = file;
                this.image = URL.createObjectURL(file);
            },
            resetImageValidation() {
                this.showInvalidImage = false;
                this.isImageValid = true;
                this.isSizeValid = true;
            },
            removeImage(){
                this.image = null;
                this.resetImageValidation();
            },
            returnImage():string{
                return this.image as string;
            }
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
            }
        },
        watch:{
            eventTypeSelected:{
                handler(){
                    this.name = this.eventTypeSelected.name
                    this.description = this.eventTypeSelected.description
                    this.image = this.eventTypeSelected.image
                }
            }
        }
    })
</script>

<style scoped>
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
    background-color: rgba(138, 138, 138, 0.5) !important;
    border-radius: 20%;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
}

.button-test.disabled {
    cursor: not-allowed;
}

.error-message{
    font-size: 12px;
}

.danger-border{
    border: 1px dashed red;
}
</style>