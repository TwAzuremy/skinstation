<template>
    <div class="settings__panel">
        <h3 class="settings__panel__title">{{ title }}</h3>
        <slot></slot>
    </div>
</template>

<script setup name="settings-panel">
const props = defineProps({
    title: String
})
</script>

<style scoped lang="scss">
.settings__panel {
    width: 100%;
    @include flex-layout($direction: column);

    &__title {
        font-size: 1.5em;
        font-weight: 600;
        color: rgb(var(--text-color-light-mode));
    }
}
</style>