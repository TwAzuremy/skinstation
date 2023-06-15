<template>
    <div class="custom-input">
        <slot name="before"></slot>
        <input :type="type" :placeholder="placeholder">
        <slot name="after"></slot>
    </div>
</template>

<script setup name="custom-input">
const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    placeholder: String
})
</script>

<style scoped lang="scss">

</style>