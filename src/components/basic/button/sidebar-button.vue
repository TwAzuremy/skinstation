<template>
    <li class="sidebar__button" ref="dom_sidebar__button">
        <slot></slot>
        <span class="sidebar__button__text">{{ text }}</span>
    </li>
</template>

<script setup name="sidebar-button">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const props = defineProps({
    to: {
        type: String,
        default: '/'
    },
    text: String
})

const dom_sidebar__button = ref(null)
const router = useRouter()

onMounted(() => {
    dom_sidebar__button.value.event_on('click', () => {
        router.push({path: props.to})
    })
})
</script>

<style scoped lang="scss">
.sidebar__button {
    @include flex-layout($align-items: center);
    position: relative;
    cursor: pointer;
    width: 100%;
    border-radius: var(--radius-small);
    line-height: 1.5em;
    padding: var(--margin-middle) var(--margin-large);
    color: rgb(var(--text-color-light-mode));
    transition: background-color var(--transition-duration-fast) ease-in-out;
    overflow-x: hidden;

    @media screen and (min-width: $width-phone) and (max-width: $width-ipad - 1) {
        gap: 0;
    }

    &:hover {
        background-color: rgba(var(--sidebar-button-background), var(--sidebar-button-opacity));
    }

    &::before {
        position: absolute;
        content: '';
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        height: 0;
        @include large-rounded-rectangle(width, 4px);
        transition: background-color var(--transition-duration-fast) ease-in-out, height var(--transition-duration-fast) ease-in-out;
    }

    &.select {
        background-color: rgba(var(--sidebar-button-background), var(--sidebar-button-opacity));

        &:hover {
            background-color: rgba(var(--sidebar-button-background), var(--sidebar-button-select-hover-opactiy));

            @media screen and (max-width: $width-ipad) {
                &:hover {
                    background-color: rgba(var(--sidebar-button-background), var(--sidebar-button-opacity));
                }

                &:active {
                    background-color: rgba(var(--sidebar-button-background), var(--sidebar-button-select-hover-opactiy));
                }
            }
        }

        &::before {
            height: 50%;
            background-color: rgba(var(--sidebar-button-background), var(--sdiebar-button-before-opacity));
        }
    }

    ::v-deep(svg) {
        @include limit-property(width, 1.5em);
        @include limit-property(height, 1.5em);
        color: rgb(var(--secondary-color));
        transition: transform var(--transition-duration-default) ease-in-out;
    }

    &__text {
        font-size: 1em;
        white-space: nowrap;
        transition: opacity var(--transition-duration-fast) ease-in-out;
        user-select: none;

        @media screen and (min-width: $width-phone) and (max-width: $width-ipad - 1) {
            width: 0;
            opacity: 0;
        }
    }
}
</style>