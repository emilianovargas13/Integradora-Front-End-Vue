<template>
    <b-container fluid>
        <b-row class="skeleton-card justify-content-center align-items-center p-4">
            <b-col cols="12" sm="10" md="8" lg="6" xl="5" class="justify-content-center">
                <div class="skeleton-image"></div>
            </b-col>
            <b-col cols="12" lg="6" xl="7" class="mt-4">
                <div class="skeleton-title"></div>
                <hr class="custom-divider">
                <b-row>
                    <b-col cols="12" md="6"
                        class="d-flex align-items-center justify-content-md-center text-dark-secondary">
                        <div class="skeleton-description"></div>
                    </b-col>
                    <b-col cols="12" md="6"
                        class="d-flex align-items-center justify-content-md-center text-dark-secondary mt-3 mt-md-0">
                        <div class="skeleton-description"></div>
                    </b-col>
                    <b-col cols="12" class="mt-3">
                        <div class="skeleton-description"></div>
                    </b-col>
                    <b-col cols="12" class="mt-3">
                        <div class="skeleton-description"></div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <hr class="custom-divider my-0">
        <b-row class="skeleton-card p-4">
            <b-col cols="12" class="d-flex align-items-center text-dark-secondary">
                <div class="skeleton-description"></div>
            </b-col>
            <b-col cols="12" class="d-flex text-dark-secondary mt-3">
                <div class="skeleton-description"></div>
            </b-col>
            <b-col cols="12" class="d-flex text-dark-secondary mt-3">
                <div class="skeleton-description"></div>
            </b-col>
            <b-col cols="12" class="mt-3">
                <div class="skeleton-description"></div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'SupplierCardSkeleton',
});
</script>

<style scoped>
.custom-divider {
    border-top: 1px solid #cfd4d8;
}

.skeleton-card {
    animation: pulsate 1.5s infinite ease-in-out;
}

.skeleton-image {
    width: 100%;
    height: 260px;
    background-color: #e0e0e0;
    border-radius: 10px;
    margin-bottom: 20px;
}

.skeleton-title,
.skeleton-description,
.skeleton-button {
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

.skeleton-button {
    width: 50%;
    height: 35px;
}

@keyframes pulsate {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}
</style>