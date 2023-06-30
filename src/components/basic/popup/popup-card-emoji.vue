<template>
    <popup-card :close-btn="false" ref="dom_popup__card">
        <template v-slot:container>
            <h1 class="emoji">{{ emoji }}️</h1>
            <h3 class="title">{{ title }}</h3>
            <p class="description">{{ description }}</p>
            <slot></slot>
        </template>
        <template v-slot:operation>
            <custom-button btn-style="fill" @click="close">
                <svg-x></svg-x>
                取消
            </custom-button>
            <custom-button btn-style="error">
                <svg-check></svg-check>
                确认
            </custom-button>
        </template>
    </popup-card>
</template>

<script setup name="popup-card-emoji">
import PopupCard from "@/components/basic/popup/popup-card.vue";
import CustomButton from "@/components/basic/button/custom-button.vue";
import SvgCheck from "@/components/svg/svg-check.vue";
import SvgX from "@/components/svg/svg-x.vue";
import {ref} from "vue";

const props = defineProps({
    title: String,
    emoji: String,
    description: String
})
const emits = defineEmits(['close'])

const dom_popup__card = ref(null)

function close() {
    dom_popup__card.value.close()
    emits('close', false)
}
</script>

<style scoped lang="scss">
.popup__card {
    $width: 320px;
    width: $width;
    height: $width * 4.5 / 3;

    @media screen and (max-width: $width-phone) {
        $width: 250px;
        width: $width;
        height: $width * 4.5 / 3;
    }
}

::v-deep(.popup__container) {
    @include flex-layout($direction: column, $gap: 0);
}

.emoji {
    width: 100%;
    text-align: center;
    font-size: 6em;
    margin-top: calc(0px - var(--margin-middle));
    user-select: none;
}

.title {
    width: 100%;
    text-align: center;
    font-size: 1.5em;
    margin-top: calc(0px - var(--margin-middle));
}

.description {
    width: 100%;
    text-align: center;
    font-size: 0.875em;
    color: rgba(var(--text-color-light-mode), var(--text-opacity-content));
    flex: 1;
    margin-top: var(--margin-middle);
}

::v-deep(.popup__operation) {
    @include flex-layout(center);

    .custom-button {
        //width: auto;
        justify-content: center;
    }
}
</style>