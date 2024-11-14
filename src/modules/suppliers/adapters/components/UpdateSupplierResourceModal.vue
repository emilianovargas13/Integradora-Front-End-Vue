<template>
    <b-modal id="update-supplier-resource" ref="update-supplier-resource" title="Modificar recurso" size="lg" centered
        scrollable no-close-on-backdrop no-close-on-esc @close="cleanForm">
        <template v-slot:modal-header="{ close }">
            <h5 class="modal-title text-darker-secondary my-0">Modificar recurso</h5>
            <b-button aria-label="close" type="button" class="bg-transparent border-0" size="sm" @click="close">
                <svg-icon type="mdi" class="small-icon text-darker-secondary" :path="$icons.mdiClose" />
            </b-button>
        </template>
        <b-form class="px-2" v-if="!loading">
            <b-row class="justify-content-center">
                <b-col cols="12" lg="6" order="2" order-lg="1">
                    <b-row>
                        <b-col cols="12">
                            <b-form-group>
                                <label for="name">Nombre: <b class="text-danger">*</b></label>
                                <b-form-input id="name" data-cy="input-supplier-resource-name" type="text"
                                    placeholder="Nombre..." maxlength="50" v-model="$v.resource.name.$model"
                                    :state="$v.resource.name.$dirty ? !$v.resource.name.$error : null"
                                    @blur="$v.resource.name.$touch()">
                                </b-form-input>
                                <b-form-invalid-feedback v-if="!$v.resource.name.required">
                                    Campo obligatorio
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-else-if="!$v.resource.name.valid">
                                    Formato inválido
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-else-if="!$v.resource.name.minLength">
                                    Mínimo 3 caracteres
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                :class="$v.resource.resource.$dirty ? !$v.resource.resource.$error ? 'valid' : 'invalid' : ''">
                                <label for="resource">
                                    Recurso: <b class="text-danger">*</b>
                                </label>
                                <multiselect id="resource" data-cy="multiselect-supplier-resource-resource"
                                    :config="multiselectConfig"
                                    @update:modelValue="$v.resource.resource.$model = $event">
                                </multiselect>
                                <b-form-invalid-feedback v-if="!$v.resource.resource.required"
                                    :state="$v.resource.resource.$dirty ? !$v.resource.resource.$error : null">
                                    Campo obligatorio
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group>
                                <label for="unitPrice">Precio unitario: <b class="text-danger">*</b></label>
                                <b-form-input id="unitPrice" data-cy="input-supplier-resource-unit-price" maxlength="10"
                                    placeholder="Precio unitario..." v-model="$v.resource.unitPrice.$model"
                                    :state="$v.resource.unitPrice.$dirty ? !$v.resource.unitPrice.$error : null"
                                    @blur="$v.resource.unitPrice.$touch()">
                                </b-form-input>
                                <b-form-invalid-feedback v-if="!$v.resource.unitPrice.required">
                                    Campo obligatorio
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-else-if="!$v.resource.unitPrice.valid">
                                    Formato inválido
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-else-if="!$v.resource.unitPrice.minValue">
                                    Mínimo $1.00
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-else-if="!$v.resource.unitPrice.minDecimalLength">
                                    Máximo 2 decimales
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group>
                                <label for="unitMeasure">Unidad de medida: <b class="text-danger">*</b></label>
                                <b-form-input id="unitMeasure" data-cy="input-supplier-resource-unit-measure"
                                    placeholder="Unidad de medida..." maxlength="30"
                                    v-model="$v.resource.unitMeasure.$model"
                                    :state="$v.resource.unitMeasure.$dirty ? !$v.resource.unitMeasure.$error : null"
                                    @blur="$v.resource.unitMeasure.$touch()">
                                </b-form-input>
                                <b-form-invalid-feedback v-if="!$v.resource.unitMeasure.required">
                                    Campo obligatorio
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group>
                                <label for="description">Descripción:</label>
                                <b-form-textarea id="description" data-cy="textarea-supplier-resource-description"
                                    placeholder="Descripción..." rows="4" maxlength="250"
                                    v-model="$v.resource.description.$model"
                                    :state="$v.resource.description.$dirty ? !$v.resource.description.$error : null"
                                    @blur="$v.resource.description.$touch()">
                                </b-form-textarea>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="10" lg="6" class="align-self-center" order="1" order-lg="2">
                    <b-row>
                        <b-col cols="12">
                            <b-form-group>
                                <label for="main-image">Imagen principal: <b class="text-danger">*</b></label>
                                <div class="image-selector-container" @click="triggerMainImageFileInput"
                                    v-if="!resource.mainImage">
                                    <template>
                                        <b-row>
                                            <b-col cols="12"
                                                class="d-flex justify-content-center align-items-center text-center flex-column">
                                                <svg-icon type="mdi" size="2em" class="img-icon text-dark-secondary"
                                                    :path="$icons.mdiImage" />
                                                <span class="text-dark-secondary p-2">
                                                    Presiona para seleccionar una imagen
                                                </span>
                                                <small class="text-secondary">Tamaño máx. 5MB</small>
                                            </b-col>
                                        </b-row>
                                        <input data-cy="input-supplier-resource-image" type="file" id="main-image"
                                            ref="mainImage" class="d-none" accept="image/*" @change="selectMainImage" />
                                    </template>
                                </div>
                                <div v-else>
                                    <template>
                                        <div class="selected-image">
                                            <img :src="resource.mainImage" alt="Recurso" />
                                            <div class="icon-remove">
                                                <b-button data-cy="button-update-supplier-remove-image" variant="danger"
                                                    size="sm" class="btn btn-rounded" @click="removeMainImage"
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
                        <b-col cols="12">
                            <b-form-group>
                                <label for="secondary-images">Imágenes secundarias:</label>
                                <b-row>
                                    <b-col cols="6" v-for="(image, index) in resource.secondaryImages"
                                        :key="'selected-image-' + index">
                                        <div class="selected-secondary-image">
                                            <img :src="image" alt="Recurso" />
                                            <div class="icon-remove">
                                                <b-button data-cy="button-update-supplier-remove-secondary-image"
                                                    variant="danger" size="sm" class="btn btn-rounded"
                                                    @click="resource.secondaryImages.splice(index, 1)"
                                                    v-b-popover.hover.top="'Remover imagen'">
                                                    <svg-icon type="mdi" size="1em" class="text-white"
                                                        :path="$icons.mdiClose" />
                                                </b-button>
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col cols="6" v-for="index in 2 - resource.secondaryImages.length"
                                        :key="'empty-state-' + index">
                                        <div class="no-secondary-image">
                                            <img :src="require('@/assets/img/no-image-found.svg')" alt="empty-state" />
                                        </div>
                                    </b-col>
                                </b-row>
                                <b-button data-cy="button-update-supplier-resource-secondary-image"
                                    variant="outline-primary" class="d-flex justify-content-between align-items-center"
                                    @click="triggerSecondaryImageFileInput"
                                    :disabled="resource.secondaryImages.length >= 2" block>
                                    <span>Agregar imagen secundaria</span>
                                    <svg-icon type="mdi" size="1.2em" :path="$icons.mdiImage" />
                                </b-button>
                                <input data-cy="input-update-supplier-resource-secondary-image" type="file"
                                    id="secondary-images" ref="secondaryImages" class="d-none" accept="image/*"
                                    @change="selectSecondaryImage" :disabled="resource.secondaryImages.length >= 2" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-form>
        <template #modal-footer="{ close }">
            <div class="d-flex justify-content-end">
                <b-button data-cy="button-update-supplier-resource" variant="primary" type="button"
                    class="button-actions" :disabled="$v.$invalid"
                    @click="$bvModal.show('update-supplier-resource-confirmation')">
                    Modificar
                </b-button>
                <b-button data-cy="button-cancel-update-supplier-resource" variant="secondary"
                    class="ml-2 button-actions text-white" type="button" @click="close">
                    Cancelar
                </b-button>
            </div>
        </template>
        <confirmation-modal :config="confirmationConfig" @onConfirm="updateSupplierResource" />
    </b-modal>
</template>

<script lang="ts">
import CustomMultiselect from '@/components/CustomMultiselect.vue';
import { convertImageToBase64, hasOnlyLetters, hasOnlyTwoDecimals, isValidImage, isValidSize } from '@/kernel/functions';
import { ConfirmationConfig, Image, MultiselectConfig, MultiselectOption } from '@/kernel/types';
import { getResourceList } from '@/modules/resources/boundary.module';
import { GetResourceListDto } from '@/modules/resources/entities';
import Vue from 'vue';
import { decimal, minLength, minValue, required } from 'vuelidate/lib/validators';
import { SupplierResourceDetails, UpdateSupplierResourceDto } from '../../entities';
import { showErrorToast, showSuccessToast } from '@/kernel/sweet-alert/sweet-alert';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { SuppliersController } from '../suppliers.controller';

export default Vue.extend({
    name: 'UpdateSupplierResourceModal',
    components: { Multiselect: CustomMultiselect, ConfirmationModal },
    props: {
        resourceDetails: {
            type: Object as () => SupplierResourceDetails,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            resource: {
                name: '',
                resource: {} as MultiselectOption,
                unitPrice: 0,
                unitMeasure: '',
                description: '',
                mainImage: '',
                secondaryImages: [] as string[],
            },
            multiselectConfig: {
                options: [] as MultiselectOption[],
                label: 'label',
                trackBy: 'label',
                loading: false,
                multiple: false,
                disabled: false,
            } as MultiselectConfig,
            confirmationConfig: {
                id: 'update-supplier-resource-confirmation',
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
        async getResourceList() {
            try {
                this.multiselectConfig.loading = true;
                const { status, entities } = await getResourceList();
                if (status === 200) {
                    this.multiselectConfig.options = entities!.map((entity: GetResourceListDto) => ({
                        id: entity.id,
                        label: entity.name,
                    }));
                }
            } catch (error) {
                this.multiselectConfig.options = [];
            } finally {
                this.multiselectConfig.loading = false;
            }
        },
        triggerMainImageFileInput() {
            (this.$refs.mainImage as HTMLInputElement).click();
        },
        triggerSecondaryImageFileInput() {
            if (this.resource.secondaryImages.length < 2) (this.$refs.secondaryImages as HTMLInputElement).click();
            else showErrorToast('Máximo 2 imágenes secundarias');
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
        isDuplicateImage(base64: string, type: string) {
            if (type === 'mainImage') return this.resource.secondaryImages.includes(base64);
            if (type === 'secondaryImages') return this.resource.mainImage === base64 || this.resource.secondaryImages.includes(base64);
            return false;
        },
        async selectMainImage(event: Event) {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file && this.validateImage(file)) {
                try {
                    const base64 = await convertImageToBase64(file);
                    if (this.isDuplicateImage(base64, 'mainImage')) {
                        showErrorToast('Imagen duplicada');
                        return;
                    }
                    this.resource.mainImage = base64;
                } catch (error) {
                    showErrorToast('Ocurrió un error al cargar la imagen');
                }
            }
        },
        async selectSecondaryImage(event: Event) {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file && this.validateImage(file)) {
                try {
                    const base64 = await convertImageToBase64(file);
                    if (this.isDuplicateImage(base64, 'secondaryImages')) {
                        showErrorToast('Imagen duplicada');
                        return;
                    }
                    this.resource.secondaryImages.push(base64);
                } catch (error) {
                    showErrorToast('Ocurrió un error al cargar la imagen');
                }
            }
            const fileInput = this.$refs.secondaryImages as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        },
        removeMainImage() {
            this.resource.mainImage = '';
            const fileInput = this.$refs.fileInput as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        },
        cleanForm() {
            this.$v.$reset();
        },
        async updateSupplierResource() {
            try {
                this.confirmationConfig.isLoading = true;
                const payload = {
                    id: this.resourceDetails.supplierResourceId,
                    supplierId: this.resourceDetails.supplierId,
                    resourceId: this.resource.resource.id,
                    name: this.resource.name,
                    description: this.resource.description,
                    unitPrice: this.resource.unitPrice,
                    unitMeasure: this.resource.unitMeasure,
                    images: {
                        secondaryImages: []
                    }
                } as UpdateSupplierResourceDto;
                const controller = new SuppliersController();
                const { status } = await controller.updateSupplierResource(payload);
                if (status === 200) {
                    showSuccessToast('Recurso modificado');
                    this.$bvModal.hide('update-supplier-resource');
                    this.cleanForm();
                    this.$emit('reload');
                }
            } catch (error) {

            } finally {
                this.confirmationConfig.isLoading = false;
                this.$bvModal.hide('update-supplier-resource-confirmation');
            }
        },
    },
    watch: {
        resourceDetails: {
            handler() {
                this.getResourceList();
                if (this.resourceDetails) {
                    const resourceMapped = this.multiselectConfig.options.find((option) => option.id === this.resourceDetails.resourceId) as MultiselectOption;
                    this.multiselectConfig.defaultValue = resourceMapped;
                    const secondaryImages = (this.resourceDetails.images && this.resourceDetails.images.length > 0) ? this.resourceDetails.images : [];
                    this.resource = {
                        name: this.resourceDetails.supplierResourceName,
                        resource: resourceMapped,
                        unitPrice: this.resourceDetails.price,
                        unitMeasure: this.resourceDetails.measureUnit,
                        description: this.resourceDetails.description,
                        mainImage: this.resourceDetails.mainImage,
                        secondaryImages: secondaryImages.filter((image) => image !== '/img/no-image-found.f13f3b14.svg')
                    };
                }
            },
            immediate: true,
            deep: true,
        },
    },
    validations: {
        resource: {
            name: {
                required,
                minLength: minLength(5),
                valid: hasOnlyLetters
            },
            resource: { required },
            unitPrice: {
                required,
                valid: decimal,
                minValue: minValue(1),
                minDecimalLength: hasOnlyTwoDecimals,
            },
            unitMeasure: { required },
            description: {},
            mainImage: { required }
        }
    }
});
</script>