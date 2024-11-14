import Vue from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import * as mdi from '@mdi/js';

// Registrar el componente SvgIcon globalmente
Vue.component('SvgIcon', SvgIcon);

// Registrar los íconos globalmente
Vue.prototype.$icons = mdi;