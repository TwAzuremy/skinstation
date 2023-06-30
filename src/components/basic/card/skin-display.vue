<template>
    <div class="skinDisplay">
        <h3 class="skinDisplay__skinName">{{ skinName }}</h3>
        <img :src="skinImgSrc" :alt="skinName + ' skin'" @click="imgClick">
        <span class="skinDisplay__skinAuthor">{{ skinAuthor }}</span>
        <div class="skinDisplay__operation">
            <span class="skinDisplay__skinModel">{{ skinModel }}</span>
            <custom-button>
                <svg-star-fill></svg-star-fill>
                {{ collections }}
            </custom-button>
        </div>
    </div>
</template>

<script setup name="skin-display">
import CustomButton from "@/components/basic/button/custom-button.vue";
import {onMounted, ref} from "vue";
import {canvasToImg} from "@/assets/model/canvasToImg";
import SvgStarFill from "@/components/svg/svg-star-fill.vue";

const props = defineProps({
    skinName: String,
    skinLocation: {
        type: String,
        default: 'img/skin/Steve.png'
    },
    skinModel: {
        type: String,
        default: 'Alex',
        validator(value) {
            return value === 'Alex' || value === 'Steve'
        }
    },
    skinAuthor: String,
    skinCollections: {
        type: [String, Number],
        default: 0
    }
})
const emits = defineEmits(['imgClick'])

const skinImgSrc = ref('')
const collections = ref(Number(props.skinCollections))

function imgClick() {
    emits('imgClick', skinImgSrc.value)
}

onMounted(() => {
    canvasToImg(224, 248, props.skinLocation, props.skinModel).then(base64 => skinImgSrc.value = base64)
})
</script>

<style scoped lang="scss">
.skinDisplay {
    min-width: 224px;
    @include flex-layout($direction: column, $gap: 0);
    color: rgb(var(--text-color-light-mode));
    @include shadow(0, 0);
    border-radius: var(--radius-small);
    user-select: none;

    img {
        cursor: pointer;
        margin: auto;
    }

    &__skinName {
        padding: var(--margin-small) 0;
        width: 100%;
        text-align: center;
        background-color: rgba(var(--skin-title-color), var(--opacity-button-hover));
        border-radius: var(--radius-small) var(--radius-small) 0 0;
        transition: color var(--transition-duration-fast) ease-in-out;
    }

    &:hover {
        .skinDisplay__skinName {
            color: rgb(var(--secondary-color));
        }
    }

    &__skinAuthor {
        margin: 0 var(--margin-middle);
        padding: var(--margin-small) var(--margin-middle);
        color: rgb(var(--secondary-color));
        border-radius: var(--radius-small);
        background-color: rgba(var(--secondary-color), var(--opacity-button-hover));
        font-size: 0.875em;
    }

    &__operation {
        width: 100%;
        margin-top: var(--margin-middle);
        padding: 0 var(--margin-middle) var(--margin-middle);
        @include flex-layout(center, space-between, $gap: 0);

        .custom-button {
            width: auto;

            svg {
                color: rgb(var(--star-color));
            }
        }
    }

    &__skinModel {
        padding: var(--margin-small) var(--margin-middle);
        color: rgb(var(--skin-model-color));
        background-color: rgba(var(--skin-model-color), var(--opacity-button-hover));
        border-radius: var(--radius-small);
        font-size: 0.875em;
    }
}
</style>