<template>
    <div class="skinDisplayCollections">
        <h3 class="skinDisplayCollections__skinNickName">{{ skinNickName }}</h3>
        <img :src="skinImgSrc" :alt="skinNickName + 'skin'">
        <div class="skinDisplayCollections__operation">
            <span class="skinDisplayCollections__skinModel">{{ skinModel }}</span>
            <custom-button>
                <svg-more></svg-more>
                <bubble direction="left" mode="click" sidelined="bottom">
                    <custom-button @click="editInfo">
                        <svg-edit></svg-edit>
                        修改昵称
                    </custom-button>
                    <custom-button>
                        <svg-info></svg-info>
                        查看信息
                    </custom-button>
                    <divider></divider>
                    <custom-button btn-style="error">
                        <svg-trash2></svg-trash2>
                        删除
                    </custom-button>
                </bubble>
            </custom-button>
        </div>
    </div>
</template>

<script setup name="skin-display-collections">
import CustomButton from "@/components/basic/button/custom-button.vue";
import SvgMore from "@/components/svg/svg-more.vue";
import {onMounted, ref} from "vue";
import {canvasToImg} from "@/assets/model/canvasToImg";
import Bubble from "@/components/basic/bubble/bubble.vue";
import SvgEdit from "@/components/svg/svg-edit.vue";
import SvgInfo from "@/components/svg/svg-info.vue";
import Divider from "@/components/basic/divider/divider.vue";
import SvgTrash2 from "@/components/svg/svg-trash-2.vue";

const props = defineProps({
    skinNickName: String,
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
    }
})
const emits = defineEmits(['edit', 'check', 'delete'])

const skinImgSrc = ref('')

function editInfo() {
    emits('edit')
}

onMounted(() => {
    canvasToImg(224, 248, props.skinLocation, props.skinModel).then(base64 => skinImgSrc.value = base64)
})
</script>

<style scoped lang="scss">
.skinDisplayCollections {
    background-color: rgba(var(--card-background-color), var(--card-background-opacity));
    @include flex-layout($direction: column, $gap: 0);
    @include shadow(0, 0);
    border-radius: var(--radius-middle);
    user-select: none;

    img {
        cursor: pointer;
        margin: auto;
    }

    &__skinNickName {
        padding: var(--margin-small) 0;
        width: 100%;
        text-align: center;
        background-color: rgba(var(--skin-title-color), var(--opacity-button-hover));
        border-radius: var(--radius-small) var(--radius-small) 0 0;
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
        padding: 0 var(--margin-middle) var(--margin-middle);
        @include flex-layout(center, space-between);

        >.custom-button {
            position: relative;
            width: auto;
            padding: var(--margin-middle);

            &.button__mode-click {
                background-color: rgba(var(--secondary-color), var(--opacity-button-hover));
            }

            ::v-deep(svg) {
                pointer-events: none;
            }
        }

        .bubble {
            border-radius: var(--radius-small);
            padding: var(--margin-middle);
            @include flex-layout($direction: column);
            cursor: default;

            .custom-button {
                width: 100%;
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