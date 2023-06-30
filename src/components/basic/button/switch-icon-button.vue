<template>
    <label class="switchIconButton" :class="`style-${btnStyle}`">
        <input type="checkbox" v-model="isChecked" @change="update">
        <slot></slot>
    </label>
</template>

<script setup name="switch-icon-button">
import {ref} from "vue";

const props = defineProps({
    checked: {
        type: Boolean,
        default: false
    },
    btnStyle: {
        type: String
    }
})
const emits = defineEmits(['change'])

const isChecked = ref(props.checked)

function update() {
    emits('change', isChecked.value)
}
</script>

<style scoped lang="scss">
.switchIconButton {
    color: rgb(var(--secondary-color));
    padding: var(--margin-small);
    border-radius: var(--margin-small);
    transition: background-color var(--transition-duration-fast) ease-in-out;
    @include flex-layout(center, center);

    input[type=checkbox] {
        display: none;
    }

    ::v-deep(svg) {
        transform: rotate(0);
        transition: transform var(--transition-duration-fast) ease-in-out;
    }

    &:hover {
        background-color: rgba(var(--secondary-color), var(--opacity-button-fill));
    }

    &:active {
        background-color: rgba(var(--secondary-color), var(--opacity-button-active));
    }

    &.style-selected {
        background-color: transparent;
        padding: var(--margin-middle);

        &:has(input[type=checkbox]:checked) {
            background-color: rgba(var(--secondary-color), var(--opacity-button-active));
        }
    }

    &.style-reverse {
        background-color: rgba(var(--secondary-color), var(--opacity-button-hover));

        input[type=checkbox]:checked + ::v-deep(svg) {
            transform: rotate(-180deg);
        }
    }
}
</style>