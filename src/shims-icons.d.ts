import Vue from 'vue';
import * as mdi from '@mdi/js';

declare module 'vue/types/vue' {
    interface Vue {
        $icons: typeof mdi;
    }
}