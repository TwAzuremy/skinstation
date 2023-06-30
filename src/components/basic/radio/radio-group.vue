<template>
    <div class="radio__group" ref="dom_radio__group" :class="`direction-${direction}`" :data-name="groupName" >
        <slot></slot>
    </div>
</template>

<script setup name="radio-group">

const props = defineProps({
    groupName: String,
    direction: {
        type: String,
        default: 'row',
        validator(value) {
            return ['row', 'col'].indexOf(value) !== -1
        }
    }
})
</script>

<style scoped lang="scss">
.radio__group {
    &.direction-row {
        @include flex-layout(center);
    }

    &.direction-col {
        @include flex-layout(center, $direction: column);
    }
}
</style>