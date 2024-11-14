<template>
    <b-modal id="supplier-resource-details" ref="supplier-resource-details" size="lg" centered scrollable hide-footer>
        <template v-slot:modal-header="{ close }">
            <h5 class="modal-title text-darker-secondary my-0">Detalles del recurso</h5>
            <b-button aria-label="close" type="button" class="bg-transparent border-0" size="sm" @click="close">
                <svg-icon type="mdi" class="small-icon text-darker-secondary" :path="$icons.mdiClose" />
            </b-button>
        </template>
        <b-row class="justify-content-center" v-if="!loading">
            <b-col cols="10" lg="6">
                <b-img :src="resource.mainImage" class="custom-img main" alt="Imagen principal del recurso" />
                <b-row class="mt-3">
                    <b-col v-for="(image, index) in getSecondaryImages()" :key="index" cols="6">
                        <b-img :src="image" class="custom-img secondary" alt="Imagen secundaria del recurso" />
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="10" lg="6" class="align-self-center">
                <b-row class="py-4">
                    <b-col cols="12" class="d-flex align-items-center">
                        <svg-icon type="mdi" class="text-darker-secondary" size="1.6rem"
                            :path="getIconPath(resource.resourceTypeIcon)" />
                        <h6 class="ml-2 custom-subtitle text-darker-secondary">
                            {{ resource.resourceTypeName }}
                        </h6>
                    </b-col>
                    <b-col cols="12">
                        <h6 class="mt-3 custom-subtitle text-dark-secondary">{{ resource.resourceName }}</h6>
                        <h5 class="mt-2 custom-title text-dark">{{ resource.supplierResourceName }}</h5>
                        <div class="mt-3 callout d-flex align-items-center justify-content-center">
                            <h6 class="callout-title">${{ resource.price }} MXN</h6>
                            <span class="ml-1">({{ resource.measureUnit }})</span>
                        </div>
                        <h6 class="mt-4">Descripción:</h6>
                        <p class="mt-1">{{ resource.description ?? 'Sin descripción' }}</p>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="skeleton" v-else>
            <b-col cols="6">
                <div class="skeleton-main-image"></div>
                <b-row class="mt-3">
                    <b-col v-for="index in 2" :key="index" cols="6">
                        <div class="skeleton-secondary-image"></div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="6" class="align-self-center">
                <b-row class="py-2">
                    <b-col cols="12" class="d-flex align-items-center">
                        <div class="skeleton-icon"></div>
                        <div class="ml-2 skeleton-subtitle"></div>
                    </b-col>
                    <b-col cols="12">
                        <div class="mt-3 skeleton-subtitle"></div>
                        <div class="mt-2 skeleton-title"></div>
                        <div class="mt-3 skeleton-callout"></div>
                        <div class="mt-4 skeleton-description"></div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import * as mdi from '@mdi/js';
import { SupplierResourceDetails } from '../../entities';

export default Vue.extend({
    name: 'SupplierResourceDetailsModal',
    props: {
        resource: {
            type: Object as () => SupplierResourceDetails,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        getSecondaryImages() {
            const images = this.resource.images || [];
            while (images.length < 2) {
                images.push(require('@/assets/img/no-image-found.svg'));
            }
            return images.slice(0, 2);
        },
        getIconPath(iconName: string) {
            return mdi[iconName as keyof typeof mdi] || mdi.mdiHelpCircle;
        },
    },
});
</script>

<style scoped>
p,
h5,
h6 {
    margin-bottom: 0;
}

.custom-img {
    width: 100%;
    object-fit: cover;
    border-radius: 0.8rem;
}

.main {
    height: 200px;
}

.secondary {
    height: 150px;
}

.custom-subtitle {
    font-size: 1.2rem;
}

.custom-title {
    font-size: 1.6rem;
    font-weight: 645;
}

.callout {
    background-color: var(--light-primary);
    border-radius: 0.8rem;
    padding: 0.5rem 1rem;
}

/* skeleton styles */

.skeleton {
    animation: pulsate 1.5s infinite ease-in-out !important;
}

.skeleton-main-image {
    width: 100%;
    height: 200px;
    border-radius: 0.8rem;
    background-color: #e0e0e0;
}

.skeleton-secondary-image {
    width: 100%;
    height: 150px;
    border-radius: 0.8rem;
    background-color: #e0e0e0;
}

.skeleton-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #e0e0e0;
}

.skeleton-subtitle {
    width: 80%;
    height: 20px;
    border-radius: 0.8rem;
    background-color: #e0e0e0;
}

.skeleton-title {
    width: 100%;
    height: 30px;
    border-radius: 0.8rem;
    background-color: #e0e0e0;
}

.skeleton-callout {
    width: 100px;
    height: 20px;
    border-radius: 0.8rem;
    background-color: #e0e0e0;
}

.skeleton-description {
    width: 100%;
    height: 100px;
    border-radius: 0.8rem;
    background-color: #e0e0e0;
}

@keyframes pulsate {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.5;
    }
}
</style>