<template>
    <div class="popup__card" ref="dom_popupCard">
        <div class="popup__card__title">
            <h3 v-if="title">{{ title }}</h3>
            <custom-button btn-style="error-hover" @click="close" v-if="closeBtn">
                <svg-x></svg-x>
            </custom-button>
        </div>
        <divider v-if="title || closeBtn"></divider>
        <div class="popup__container">
            <slot name="container"></slot>
        </div>
        <divider margin="small"></divider>
        <div class="popup__operation">
            <slot name="operation"></slot>
        </div>
    </div>
</template>

<script setup name="popup-card">
import Divider from "@/components/basic/divider/divider.vue";
import CustomButton from "@/components/basic/button/custom-button.vue";
import SvgX from "@/components/svg/svg-x.vue";
import {ref} from "vue";

const props = defineProps({
    title: String,
    show: {
        type: Boolean,
        default: false
    },
    closeBtn: {
        type: Boolean,
        default: true
    }
})
const emits = defineEmits(['close', 'open'])

const dom_popupCard = ref(null)

function close() {
    dom_popupCard.value.classList.remove('show')
    emits('close', false)
}

function open() {
    dom_popupCard.value.classList.remove('show')
    emits('open', true)
}

defineExpose({
    close,
    open
})
</script>

<style scoped lang="scss">
.popup {
    color: rgb(var(--text-color-light-mode));

    &__card {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background-color: rgba(var(--card-background-color), var(--card-background-opacity));
        @include shadow(0, 0);
        border-radius: var(--radius-middle);
        padding: var(--margin-large);
        @include flex-layout($direction: column);
        min-width: 250px;
        transition: transform var(--transition-duration-default) ease-in-out;

        &.show {
            transform: translate(-50%, -50%) scale(1);
        }
    }

    &__card__title {
        width: 100%;
        @include flex-layout(center, $gap: 0);

        h3 {
            flex: 1;
        }

        .custom-button {
            width: auto;
            padding: var(--margin-middle);
        }
    }

    &__container,
    &__operation{
        width: 100%;
    }

    &__container {
        flex: 1;
    }
}
</style>