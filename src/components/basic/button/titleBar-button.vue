<template>
    <div class="titleBar__button titleBar__login">
        <svg-log-in></svg-log-in>
        <span class="titleBar__button__text">登录</span>
    </div>
</template>

<script setup name="titleBar-button">
import SvgLogIn from "@/components/svg/svg-log-in.vue";
</script>

<style scoped lang="scss">
.titleBar__button {
    @include flex-layout(center, center);
    padding: var(--margin-middle);
    border-radius: var(--radius-small);
    cursor: pointer;
    transition: background-color var(--transition-duration-fast) ease-in-out;
    user-select: none;

    &:hover {
        background-color: rgba(var(--button-background), var(--opacity-button-hover));
    }

    &:active {
        background-color: rgba(var(--button-background), var(--opacity-button-active));
    }

    ::v-deep(svg) {
        width: 1.25em;
        height: 1.25em;
    }

    &__text {
        font-size: 0.875em;

        @media screen and (max-width: $width-phone) {
            & {
                display: none;
            }
        }
    }
}
</style>