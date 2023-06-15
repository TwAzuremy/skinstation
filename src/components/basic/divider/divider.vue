<template>
    <div class="divider" :class="`margin-${margin} direction-${direction}`"></div>
</template>

<script setup>
const props = defineProps({
    margin: {
        type: String,
        default: 'none',
        validator(value) {
            return ['none', 'small', 'middle', 'large'].indexOf(value) !== -1
        }
    },
    direction: {
        type: String,
        default: 'h',
        validator(value) {
            return ['h', 'v'].indexOf(value) !== -1
        }
    }
})
</script>

<style scoped lang="scss">
.divider {
    background-color: rgba(var(--divider-color), var(--divider-opacity));

    &.direction-h {
        width: 100%;
        @include large-rounded-rectangle(height, 2px);
    }

    &.direction-v {
        height: 100%;
        @include large-rounded-rectangle(width, 2px);
    }

    $margin-sizes: (
        small: var(--margin-small),
        middle: var(--margin-middle),
        large: var(--margin-large)
    );

    @each $name, $size in $margin-sizes {
        &.direction-h.margin-#{$name} {
            margin: $size 0;
        }

        &.direction-v.margin-#{$name} {
            margin: 0 $size;
        }
    }
}
</style>