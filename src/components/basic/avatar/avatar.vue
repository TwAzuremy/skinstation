<template>
    <div class="avatar">
        <img :src="url" :alt="`${name}_avatar`" :data-avatar-name="name" @click="changeImg">
        <div class="avatar__masker">
            <svg-camera></svg-camera>
        </div>
        <div class="avatar__name">
            <h2>{{ name }}</h2>
            <svg-edit></svg-edit>
        </div>
        <div class="avatar__profile">
            <span>{{ profile }}</span>
            <svg-edit></svg-edit>
        </div>
    </div>
</template>

<script setup name="avatar">
import SvgCamera from "@/components/svg/svg-camera.vue";
import SvgEdit from "@/components/svg/svg-edit.vue";

const props = defineProps({
    url: {
        type: String
    },
    name: String,
    profile: String
})
const emits = defineEmits(['imgClick'])

function changeImg() {
    emits('imgClick')
}
</script>

<style scoped lang="scss">
.avatar {
    position: relative;
    @include flex-layout(center, $direction: column, $gap: var(--margin-small));
    $img-size: 256px;

    img {
        width: $img-size;
        height: $img-size;
        border-radius: 50%;
        @include shadow(0, 0);
        user-select: none;
        cursor: pointer;
        transition: width var(--transition-duration-fast) ease-in-out,
        height var(--transition-duration-fast) ease-in-out;
    }

    &__name {
        position: relative;
        color: rgb(var(--text-color-light-mode));
        padding: 0 var(--margin-middle);
        margin-top: var(--margin-middle);

        h2 {
            font-family: var(--font-minecraft-precedence);
        }
    }

    &__masker {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: $img-size;
        height: $img-size;
        border-radius: 50%;
        background-color: rgba(var(--masker-background-color), var(--masker-background-opacity));
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--transition-duration-fast) ease-in-out,
        width var(--transition-duration-fast) ease-in-out,
        height var(--transition-duration-fast) ease-in-out;;

        svg {
            margin: auto;
            width: $img-size / 3;
            height: $img-size / 3;
            color: rgba(var(--masker-icon-color), var(--masker-background-opacity));
            transition: width var(--transition-duration-fast) ease-in-out,
            height var(--transition-duration-fast) ease-in-out;
        }
    }

    @media screen and (max-width: $width-phone) {
        img {
            width: $img-size / 2;
            height: $img-size / 2;
        }

        &__masker {
            width: $img-size / 2;
            height: $img-size / 2;

            svg {
                width: $img-size / 5;
                height: $img-size / 5;
            }
        }
    }

    img:hover + .avatar__masker {
        opacity: 1;
    }

    &__profile {
        position: relative;
        max-width: $img-size * 2;
        padding: 0 var(--margin-middle);

        span {
            display: block;
            font-size: 0.872em;
            color: rgb(var(--text-color-profile));
            word-break: break-word;
            text-align: center;
        }
    }

    &__name,
    &__profile {
        svg {
            width: 1.25em;
            height: 1.25em;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 100%;
            opacity: 0;
            color: rgba(var(--text-color-light-mode), var(--text-opacity-content));
            cursor: pointer;
            pointer-events: none;
            transition: color var(--transition-duration-fast) ease-in-out,
            opacity var(--transition-duration-fast) ease-in-out;

            &:hover {
                color: rgb(var(--secondary-color));
            }
        }

        &:hover {
            svg {
                pointer-events: auto;
                opacity: 1;
            }
        }
    }
}
</style>