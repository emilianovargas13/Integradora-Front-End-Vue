<template>
    <div>
        <b-card no-body class="skeleton-custom-card bg-lighter shadow-sm d-none d-sm-block">
            <b-row class="p-3">
                <b-col cols="12" class="d-flex justify-content-end">
                    <div class="skeleton-custom-button mr-1"></div>
                    <div class="skeleton-custom-button mr-1"></div>
                    <div class="skeleton-custom-button mr-1"></div>
                </b-col>
                <b-col cols="12">
                    <b-row>
                        <b-col cols="5" class="skeleton-image-container">
                            <div class="skeleton-image"></div>
                        </b-col>
                        <b-col cols="7" class="align-self-center">
                            <b-row>
                                <b-col cols="12" class="d-flex align-items-center mt-3">
                                    <div class="skeleton-description"></div>
                                </b-col>
                                <b-col cols="12">
                                    <div class="skeleton-description"></div>
                                    <div class="mt-2 skeleton-title"></div>
                                    <div class="mt-3 skeleton-callout d-flex align-items-center justify-content-center">
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-card>
        <b-card no-body class="skeleton-custom-card bg-lighter shadow-sm d-block d-sm-none">
            <b-row class="p-3">
                <b-col cols="12">
                    <b-row>
                        <b-col cols="12" class="skeleton-image-container">
                            <div class="small-card-skeleton-image"></div>
                        </b-col>
                        <b-col cols="12" class="align-self-center">
                            <b-row>
                                <b-col cols="12" class="d-flex align-items-center">
                                    <div class="skeleton-description"></div>
                                </b-col>
                                <b-col cols="12">
                                    <div class="skeleton-description"></div>
                                    <div class="mt-2 skeleton-title"></div>
                                    <div class="mt-3 skeleton-callout d-flex align-items-center justify-content-center">
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'SupplierResourceCardSkeleton',
});
</script>

<style scoped>
.skeleton-custom-card {
    min-width: 340px;
    border: 1px solid #e9ecef;
    border-radius: 0.8rem;
    animation: pulsate 1.5s infinite ease-in-out !important;
}

.skeleton-custom-button {
    width: 34px;
    height: 34px;
    background-color: #e0e0e0;
    border-radius: 5px;
}

.skeleton-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.skeleton-image {
    width: 260px;
    height: 160px;
    background-color: #e0e0e0;
    border-radius: 10px;
    margin-bottom: 20px;
}

.small-card-skeleton-image {
    width: 100%;
    height: 160px;
    background-color: #e0e0e0;
    border-radius: 10px;
    margin-bottom: 10px;
}

.skeleton-title,
.skeleton-description {
    background-color: #e0e0e0;
    border-radius: 5px;
    margin-top: 10px;
}

.skeleton-title {
    width: 60%;
    height: 20px;
}

.skeleton-description {
    width: 80%;
    height: 15px;
}

.skeleton-callout {
    width: 100%;
    height: 30px;
    background-color: #e0e0e0;
    border-radius: 5px;
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
