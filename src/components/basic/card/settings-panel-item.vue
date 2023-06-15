<template>
    <div class="settings__panel__item">
        <div class="settings__panel__item__setting">
            <h3 class="settings__panel__item__title">{{ title }}</h3>
            <span class="settings__panel__item__description" v-if="description">{{ description }}</span>
            <div class="settings__panel__item__component">
                <slot></slot>
            </div>
        </div>
        <div class="settings__panel__item__extend" v-if="$slots['extend']" ref="dom_item__extend">
            <slot name="extend"></slot>
        </div>
    </div>
</template>

<script setup name="settings-panel-item">
import {ref} from "vue";

const props = defineProps({
    title: String,
    description: String,
    condition: {}
})

const dom_item__extend = ref(null)

function checkCondition(value) {
    if (value === props.condition) {
        dom_item__extend.value.style.height = dom_item__extend.value.scrollHeight + 'px'
    } else {
        dom_item__extend.value?.removeAttribute('style')
    }
}

defineExpose({
    checkCondition
})
</script>

<style scoped lang="scss">
.settings__panel__item {
    width: 100%;
    padding: var(--margin-large);
    border-radius: var(--radius-middle);
    background-color: rgba(var(--card-background-color), var(--card-background-opacity));
    color: rgb(var(--text-color-light-mode));
    @include shadow(0, 0);

    &__setting {
        width: 100%;
        @include flex-layout(center, $gap: var(--margin-small));

        &:has(.settings__panel__item__description) {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: var(--margin-small);
        }
    }

    &__title {
        flex: 1;
        grid-row: 1;
        font-size: 1.125em;
        transition: color var(--transition-duration-fast) ease-in-out;
    }

    &:hover {
        .settings__panel__item__title {
            color: rgb(var(--secondary-color));
        }
    }

    &__description {
        grid-row: 2;
        color: rgba(var(--text-color-light-mode), var(--text-opacity-content));
        font-size: 0.875em;
    }

    &__component {
        grid-row: 1 / 3;
        @include flex-layout(center, center, $gap: 0);
    }

    &__extend {
        overflow-y: hidden;
        height: 0;
        transition: height var(--transition-duration-default) ease-in-out;
    }
}
</style>