<template>
    <b-container fluid class="header" :style="{ backgroundImage: 'url(' + image + ')' }">
        <b-row class="full-height">
            <b-col class="d-flex justify-content-center align-items-center align-self-end">
                <b-card class="custom-wdth custom-card text-center" no-body>
                    <h3 class="my-4 text-darker-secondary">{{ title }}</h3>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Header',
    props: {
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
});
</script>

<style scoped>
.full-height {
    height: 100%;
}

.header {
    background-size: cover;
    background-position: center;
    height: 210px;
}

.custom-card {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border-end-start-radius: 0;
    border-end-end-radius: 0;
    border-bottom: white;
}

.custom-wdth {
    width: 80%;
}

@media (min-width: 992px) {
    .custom-wdth {
        width: 65%;
    }
}
</style>
