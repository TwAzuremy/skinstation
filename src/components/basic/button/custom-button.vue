<template>
    <div class="custom-button" :class="`custom-button__style-${btnStyle}`" @click="handler">
        <slot></slot>
    </div>
</template>

<script setup name="custom-button">
const props = defineProps({
    btnStyle: {
        type: String,
        default: 'text',
        validator(value) {
            return ['fill', 'border', 'text', 'error', 'error-hover'].indexOf(value) !== -1
        }
    }
})
const emits = defineEmits(['click'])

const handler = function () {
    emits('click')
}
</script>

<style scoped lang="scss">
.custom-button {
    cursor: pointer;
    width: 100%;
    @include flex-layout(center, flex-start);
    padding: var(--margin-middle) var(--margin-large);
    border-radius: var(--radius-small);
    color: rgb(var(--text-color-light-mode));
    font-size: 0.875em;
    user-select: none;
    transition: background-color var(--transition-duration-fast) ease-in-out,
    width var(--transition-duration-fast) ease-in-out;

    &.custom-button__style-text {
        background-color: transparent;

        &:hover {
            background-color: rgba(var(--secondary-color), var(--opacity-button-hover));
        }

        &:active {
            background-color: rgba(var(--secondary-color), var(--opacity-button-active));
        }
    }

    &.custom-button__style-fill {
        background-color: rgba(var(--secondary-color), var(--opacity-button-hover));

        &:hover {
            background-color: rgba(var(--secondary-color), var(--opacity-button-fill));
        }

        &:active {
            background-color: rgba(var(--secondary-color), var(--opacity-button-active));
        }
    }

    &.custom-button__style-error {
        background-color: rgba(var(--error-color), var(--opacity-button-hover));

        &:hover {
            background-color: rgba(var(--error-color), var(--opacity-button-fill));
        }

        &:active {
            background-color: rgba(var(--error-color), var(--opacity-button-active));
        }

        ::v-deep(svg) {
            color: rgb(var(--error-color));
        }
    }

    &.custom-button__style-error-hover {
        background-color: transparent;

        &:hover {
            background-color: rgba(var(--error-color), var(--opacity-button-hover));
        }

        &:active {
            background-color: rgba(var(--error-color), var(--opacity-button-active));
        }

        ::v-deep(svg) {
            color: rgb(var(--error-color));
        }
    }

    ::v-deep(svg) {
        color: rgb(var(--secondary-color));
        width: 1.4285em;
        height: 1.4285em;
    }
}
</style>