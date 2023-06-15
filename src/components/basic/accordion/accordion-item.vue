<template>
    <div class="accordion__item"
         :style="`--color: ${color}; ${order ? '--load-order: ' + (order > 15 ? 15 : order) : ''};`"
         :data-loadorder="order">
        <div class="accordion__item__titleBar">
            <svg-plus class="accordion__item__svg-plus"></svg-plus>
            <span>{{ title }}</span>
            <svg-down class="accordion__item__svg-down"></svg-down>
        </div>
        <div class="accordion__item__container">
            <div class="accordion__item__slot">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup name="accordion-item">
import SvgPlus from "@/components/svg/svg-plus.vue";
import SvgDown from "@/components/svg/svg-down.vue";
import {onMounted, ref} from "vue";

const props = defineProps({
    title: String,
    color: {
        type: String,
        default: '#4091ffff'
    },
    order: Number
})
</script>

<style scoped lang="scss">
.accordion__item {
    width: 100%;
    background-color: rgb(var(--card-background-color));
    padding: var(--margin-large);
    border-radius: var(--radius-middle);
    @include shadow(0, 0);
    color: rgb(var(--text-color-light-mode));
    border-left: 4px solid var(--color);

    &__titleBar {
        width: 100%;
        @include flex-layout(center);
        cursor: pointer;
        transition: color var(--transition-duration-fast) ease-in-out;

        svg {
            transition: transform var(--transition-duration-default) ease-in-out;
        }

        span {
            font-size: 1em;
            font-weight: 600;
            flex: 1;
        }
    }

    &.checked {
        .accordion__item__svg-plus {
            transform: rotate(45deg);
        }

        .accordion__item__svg-down {
            transform: rotate(-180deg);
        }
    }

    &__container {
        padding: 0 var(--margin-large) 0 calc(var(--margin-large) + var(--flex-gap-default));
        overflow: hidden;
        height: 0;
        transition: opacity var(--transition-duration-fast) ease-in-out,
        height var(--transition-duration-fast) ease-in-out;
    }

    &__slot {
        padding: var(--margin-large);
    }

    &:hover {
        .accordion__item__titleBar {
            color: rgb(var(--secondary-color));
        }
    }
}

.accordion.load__style-order {
    .accordion__item {
        opacity: 0;
        animation: fade-in var(--transition-duration-default) ease-in-out forwards calc(var(--load-order) * 0.1s);
    }
}
</style>