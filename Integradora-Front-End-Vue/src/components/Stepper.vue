<template>
    <div>
        <!-- Stepper horizontal para pantallas grandes -->
        <b-row class="my-4 d-none d-sm-flex align-items-center justify-content-between" ref="stepper">
            <b-col v-for="(option) in options" :key="option.step"
                class="d-flex justify-content-center position-relative step-wrapper">
                <div role="button" @click="moveTo(option.step)"
                    class="d-flex flex-column justify-content-center align-items-center">
                    <div :class="step === option.step ? 'stepper-btn-active' : 'stepper-btn'">
                        <h5>{{ option.step }}</h5>
                    </div>
                    <span :class="step === option.step ? 'step-title-active' : 'step-title'">
                        {{ option.title }}
                    </span>
                </div>
            </b-col>
        </b-row>

        <!-- Stepper vertical para pantallas pequeñas -->
        <b-row class="my-4 d-sm-none vertical-stepper-xs" ref="stepper">
            <b-col cols="12" v-for="(option) in options" :key="option.step" :class="option.step !== 1 ? 'mt-3' : ''">
                <div role="button" @click="moveTo(option.step)" class="d-flex align-items-center">
                    <div :class="step === option.step ? 'stepper-btn-active' : 'stepper-btn'">
                        <h5>{{ option.step }}</h5>
                    </div>
                    <span class="ml-3" :class="step === option.step ? 'step-title-active' : 'step-title'">
                        {{ option.title }}
                    </span>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

type StepperOption = {
    step: number,
    title: string
};

export default Vue.extend({
    name: 'Stepper',
    props: {
        step: {
            type: Number,
            required: true,
        },
        options: {
            type: Array as () => StepperOption[],
            required: true,
        },
    },
    methods: {
        moveTo(step: number) {
            this.$emit('moveTo', step);
            const stepper = this.$refs.stepper as HTMLElement;
            stepper.scrollIntoView({ behavior: 'smooth' });
        },
    },
});
</script>

<style scoped>
.step-wrapper {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.stepper-btn,
.stepper-btn-active {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.stepper-btn {
    background-color: #D9D9D9;
    color: #525252;
}

.stepper-btn-active {
    background-color: #809EA3;
    color: #000000;
}

.stepper-btn h5,
.stepper-btn-active h5 {
    margin-bottom: 0;
    font-size: 1rem;
}

.step-title,
.step-title-active {
    font-size: 1rem;
    font-weight: 500;
    color: #525252;
    transition: color 0.3s;
    text-align: center;
}

.step-title-active {
    color: #000000;
}

@media(min-width: 576px) {

    .stepper-btn,
    .stepper-btn-active {
        width: 40px;
        height: 40px;
    }

    .stepper-btn h5,
    .stepper-btn-active h5 {
        font-size: 1.2rem;
    }

    .step-title,
    .step-title-active {
        position: absolute;
        top: 50px;
        font-size: 0.9rem;
    }
    
    .step-wrapper::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #D9D9D9;
        z-index: -1;
    }

    .step-wrapper:first-child::before {
        left: 50%;
    }

    .step-wrapper:last-child::before {
        right: 50%;
    }
}

.vertical-stepper-xs {
    display: flex;
    flex-direction: column;
    position: relative;
}

.vertical-stepper-xs .step-wrapper {
    flex-direction: row;
    align-items: center;
    position: relative;
}

.vertical-stepper-xs .stepper-btn,
.vertical-stepper-xs .stepper-btn-active {
    width: 30px;
    height: 30px;
}

.vertical-stepper-xs::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 30px;
    width: 2px;
    background-color: #D9D9D9;
    z-index: -1;
}

.vertical-stepper-xs .step-title,
.vertical-stepper-xs .step-title-active {
    text-align: left;
}
</style>
