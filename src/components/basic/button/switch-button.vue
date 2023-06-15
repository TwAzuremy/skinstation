<template>
    <label class="switch">
        <input type="checkbox" v-model="isChecked" @change="update">
    </label>
</template>

<script setup name="switch-button">
import {ref} from "vue";

const props = defineProps({
    checked: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['change'])

const isChecked = ref(props.checked)

function update() {
    emits('change', isChecked.value)
}
</script>

<style scoped lang="scss">
.switch {
    $switch-distance: 4px;
    $switch-height: 32px;
    $switch-width: ($switch-height - $switch-distance) * 2;
    $switch-circle: $switch-height - $switch-distance * 2;

    position: relative;
    width: $switch-width;
    height: $switch-height;
    background-color: rgb(var(--switch-background));
    border-radius: $switch-height / 2;
    cursor: pointer;
    transition: background-color var(--transition-duration-default) ease-in-out;

    &::before {
        content: '';
        position: absolute;
        top: $switch-distance;
        left: $switch-distance;
        width: $switch-circle;
        height: $switch-circle;
        background-color: rgb(var(--switch-circle-backgrond));
        border-radius: 50%;
        transition: left var(--transition-duration-default) ease-in-out;
    }

    input[type=checkbox] {
        display: none;
    }

    &:has(input[type=checkbox]:checked) {
        background-color: rgb(var(--switch-background-checked));

        &::before {
            left: $switch-width / 2;
        }
    }
}
</style>