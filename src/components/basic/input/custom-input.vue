<template>
    <div class="custom-input">
        <slot></slot>
        <input ref="dom_input" :type="type" v-model="value" :placeholder="placeholder" @input="inputHandler">
        <svg-x class="custom-input__clear" @click="clearInput"></svg-x>
    </div>
</template>

<script setup name="custom-input">
import SvgX from "@/components/svg/svg-x.vue";
import {ref} from "vue";
import {debounce} from "@/assets/model/function";

const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    placeholder: String,
    defaultValue: {
        type: String,
        default: ''
    }
})
const emits = defineEmits(['change'])

const value = ref(props.defaultValue)
const dom_input = ref(null)

function clearInput() {
    value.value = ''
    dom_input.value.focus()
    inputHandler()
}

const inputHandler = debounce(() => {
    emits('change', value.value)
}, 300)

function setInputValue(val) {
    value.value = val
}

defineExpose({
    setInputValue
})
</script>

<style scoped lang="scss">
.custom-input {
    position: relative;
    width: $input-type-width;
    transition: width var(--transition-duration-fast) ease-in-out;

    ::v-deep(svg) {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 1.25em;
        height: 1.25em;
        color: rgba(var(--input-border-color-default), var(--text-opacity));
        transition: color var(--transition-duration-fast) ease-in-out,
        opacity var(--transition-duration-fast) ease-in-out;
    }

    ::v-deep(svg:not(.custom-input__clear)) {
        left: var(--margin-middle);
        pointer-events: none;
    }

    &:has(input:hover) {
        ::v-deep(svg:not(.custom-input__clear)) {
            color: rgba(var(--secondary-color), var(--opacity-input-hover));
        }
    }

    &:has(input:focus) {
        ::v-deep(svg:not(.custom-input__clear)) {
            color: rgba(var(--secondary-color), var(--opacity-input-focus));
        }
    }

    svg + input {
        padding-left: calc(var(--margin-middle) * 2 + 1.25em);
    }


    &__clear {
        opacity: 1;
        right: var(--margin-middle);
        cursor: pointer;

        &:hover {
            color: rgb(var(--text-color-error));
        }
    }

    input:placeholder-shown + .custom-input__clear {
        opacity: 0;
    }

    input:has(+ .custom-input__clear:hover) {
        background-color: rgba(var(--secondary-color), var(--opacity-input-background-hover));
        border-color: rgba(var(--secondary-color), var(--opacity-input-hover));
    }
}
</style>