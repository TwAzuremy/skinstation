<template>
    <div class="home__card" :style="`--color: ${color};`">
        <h3 class="home__card__title">{{ title }}</h3>
        <divider></divider>
        <div class="home__card__container">
            <slot></slot>
        </div>
    </div>
</template>

<script setup name="home-card">
import Divider from "@/components/basic/divider/divider.vue";

const props = defineProps({
    title: String,
    color: {
        type: String,
        default: '#4091ffff'
    }
})
</script>

<style lang="scss" scoped>
.home__card {
    background-color: rgb(var(--card-background-color));
    padding: var(--margin-large);
    border-radius: var(--radius-middle);
    border-top: 4px solid var(--color);
    @include shadow(0, 0);
    @include flex-layout($direction: column);

    &__title {
        color: rgb(var(--secondary-color));
        font-size: 1.5em;
        font-weight: 600;
    }

    &__container {
        width: 100%;
        font-size: 1em;
        line-height: 1.5em;
        color: rgb(var(--text-color-light-mode));
    }
}
</style>