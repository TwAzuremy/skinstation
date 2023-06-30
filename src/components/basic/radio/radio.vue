<template>
    <label class="radio" ref="dom_radio">
        <input type="radio" ref="dom_input" :checked="checked">
        <slot></slot>
    </label>
</template>

<script setup name="radio">
import {onMounted, ref} from "vue";

const props = defineProps({
    defaultChecked: {
        type: Boolean,
        default: false
    },
    showRoundDot: {
        type: Boolean,
        default: true
    }
})

const dom_radio = ref(null)
const dom_input = ref(null)

const checked = ref(props.defaultChecked)

onMounted(() => {
    dom_input.value.setAttribute('name', dom_radio.value.parentElement.dataset.name)
})
</script>

<style scoped lang="scss">
.radio {
    position: relative;
    padding: var(--margin-middle);
    background-color: transparent;
    color: rgb(var(--text-color-light-mode));
    border-radius: var(--radius-small);
    transition: background-color var(--transition-duration-fast) ease-in-out;
    @include flex-layout(center, center);

    ::v-deep(svg) {
        width: 1.5em;
        height: 1.5em;
        color: rgb(var(--secondary-color));
    }

    input[type=radio] {
        display: none;
    }

    &:hover {
        background-color: rgba(var(--secondary-color), var(--opacity-button-hover));
    }

    &:has(input[type=radio]:checked) {
        background-color: rgba(var(--secondary-color), var(--opacity-button-active));
    }
}
</style>