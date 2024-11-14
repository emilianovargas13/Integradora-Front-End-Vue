<template>
    <multiselect :placeholder="setPlaceholder(config.placeholder)" v-model="selectedValue" :options="config.options"
        :label="config.label" :trackBy="config.trackBy" :multiple="config.multiple" :taggable="false"
        :disabled="config.disabled" :loading="config.loading" :selectLabel="attributes.selectLabel"
        :selectedLabel="attributes.selectedLabel" :deselectLabel="attributes.deselectLabel" @close="handleClose" @input="updateValue">
        <template slot="noOptions">{{ attributes.noOptionsLabel }}</template>
        <template slot="noResult">{{ attributes.noResultLabel }}</template>
    </multiselect>
</template>


<script lang="ts">
import { MultiselectConfig } from '@/kernel/types';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "MultiSelectCustom",
    props: {
        config: {
            type: Object as () => MultiselectConfig,
            required: true
        },
    },
    data() {
        return {
            selectedValue: this.config.defaultValue,
            attributes: {
                selectLabel: "Presiona enter para seleccionar",
                deselectLabel: "Presiona enter para eliminar",
                selectedLabel: "Seleccionado",
                placeholder: "Selecciona una opción",
                noOptionsLabel: "No hay registros",
                noResultLabel: "No hay resultados para la búsqueda"
            },
        }
    },
    methods: {
        handleClose() {
            this.$emit('close');
            this.$emit('update:modelValue', this.selectedValue);
        },
        updateValue(value: any) {
            this.selectedValue = value;
            this.$emit('input', value);
        },
        setPlaceholder(placeholder?: string) {
            return placeholder || this.attributes.placeholder;
        }
    }
})

</script>

<style>
.multiselect__tags {
    padding: 0rem 0.75rem;
    border-radius: 4px;
    border: 1px solid #ced4da;
}

.multiselect__input {
    display: block;
    position: absolute;
    box-sizing: border-box;
    top: 25%;
    border: none;
    background: transparent;
    padding: 0 0 0 0;
    width: calc(100%);
    transition: border 0s ease;
    margin-bottom: 0px;
}

.multiselect__single {
    display: block;
    position: absolute;
    box-sizing: border-box;
    background: transparent;
    top: 24%;
    padding: 0rem 0.1rem;
}

.multiselect__placeholder {
    color: #6c757d;
    font-size: 1rem;
    font-weight: 400;
    line-height: 16px;
    display: block;
    position: absolute;
    box-sizing: border-box;
    top: 24%;
}

.valid .multiselect__tags {
    border: 1px solid;
    border-color: var(--success);
    border-radius: 4px;
}

.invalid .multiselect__tags {
    border: 1px solid;
    border-color: var(--danger);
    border-radius: 4px;
}

.multiselect__option--selected {
    background: #f3f3f3;
    color: #495057;
    font-weight: 500;
}

.multiselect__option--selected::after {
    content: attr(data-selected);
    color: silver;
    background: inherit;
}

.multiselect__option--selected.multiselect__option--highlight {
    background: var(--danger);
    color: #fff;
}

.multiselect__option--selected.multiselect__option--highlight::after {
    background: var(--danger);
    content: attr(data-deselect);
    color: #fff;
}

.multiselect__option--highlight {
    background: var(--success);
    outline: none;
    color: white;
}

.multiselect__option--highlight::after {
    content: attr(data-select);
    background: var(--success);
    color: white;
}
</style>