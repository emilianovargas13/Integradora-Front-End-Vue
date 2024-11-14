<template>
    <b-modal :id="config.id" centered :no-close-on-backdrop="config.isLoading" :no-close-on-esc="config.isLoading">
        <template #modal-header>
            <div class="d-flex">
                <svg-icon type="mdi" :path="getAttribute('iconPath')" :class="getAttribute('iconClass')"></svg-icon>
                <h5 class="ml-2 text-darker-secondary">{{ config.title }}</h5>
            </div>
        </template>
        <template #default>
            <span class="text-dark-secondary">{{ config.message }}</span>
        </template>
        <template #modal-footer="{ ok, cancel }">
            <b-button data-cy="button-confirm" size="sm" :variant="getAttribute('okBtnVariant')" class="text-white button-actions"
                @click="handleAction(ok)" v-if="!config.isLoading">
                {{ config.confirmButtonText }}
            </b-button>
            <b-button size="sm" variant="secondary"
                class="d-flex justified-content-center align-items-center text-white button-actions" disabled v-else>
                {{ config.loadingButtonText }}
                <b-spinner class="ml-2" small></b-spinner>
            </b-button>
            <b-button data-cy="button-cancel" size="sm" variant="secondary" class="text-white button-actions" @click="cancel()">
                Cancelar
            </b-button>
        </template>
    </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import * as mdi from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import { ConfirmationConfig } from '@/kernel/types';

export default Vue.extend({
    name: 'ConfirmationModal',
    components: {
        SvgIcon
    },
    props: {
        config: {
            type: Object as () => ConfirmationConfig,
            required: true,
        },
    },
    methods: {
        getAttribute(attribute: string) {
            const attributes = {
                question: {
                    iconPath: mdi.mdiHelpCircle,
                    iconClass: 'text-primary',
                    okBtnVariant: 'primary',
                },
                info: {
                    iconPath: mdi.mdiInformation,
                    iconClass: 'text-primary',
                    okBtnVariant: 'primary',
                },
                warning: {
                    iconPath: mdi.mdiAlert,
                    iconClass: 'text-warning',
                    okBtnVariant: 'warning',
                },
                danger: {
                    iconPath: mdi.mdiAlertCircle,
                    iconClass: 'text-danger',
                    okBtnVariant: 'danger',
                },
            } as Record<string, Record<string, string>>;
            return attributes[this.config.type][attribute];
        },
        handleAction(ok: Function) {
            this.config.action ? this.config.action() : this.$emit('onConfirm');
            if (!this.config.isLoading) ok();
        },
    },
});
</script>
