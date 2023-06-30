<template>
    <div class="maskLayer" ref="dom_maskLayer">
        <slot></slot>
    </div>
</template>

<script setup name="mask-layer">
import {ref} from "vue";

const dom_maskLayer = ref(null)

function showMask() {
    dom_maskLayer.value.classList.add('show')
}

function hideMask() {
    dom_maskLayer.value.classList.remove('show')
}

function autoMask(isShow = null) {
    dom_maskLayer.value.classList.toggle('show', isShow === null || isShow);
}

defineExpose({
    showMask,
    hideMask,
    autoMask
})
</script>

<style scoped lang="scss">
.maskLayer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(var(--masking-background), var(--opacity-masking));
    backdrop-filter: blur(var(--blur-masking));
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition-duration-default) ease-in-out;

    &.show {
        opacity: 1;
        pointer-events: auto;
    }
}
</style>