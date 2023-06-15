<template>
    <div class="bubble" :class="`direction-${direction} mode-${mode} sidelined-${sidelined} event-${isEvent}`"
         ref="dom_bubble" :style="`z-index: ${zIndex};`">
        <slot></slot>
    </div>
</template>

<script setup name="bubble">
import {onMounted, ref} from "vue";

const props = defineProps({
    direction: {
        type: String,
        default: 'top',
        validator(value) {
            return ['top', 'bottom', 'left', 'right'].indexOf(value) !== -1
        }
    },
    mode: {
        type: String,
        default: 'hover',
        validator(value) {
            return ['hover', 'click'].indexOf(value) !== -1
        }
    },
    sidelined: {
        type: String,
        default: 'center',
        validator(value) {
            return ['top', 'bottom', 'left', 'right', 'center'].indexOf(value) !== -1
        }
    },
    isEvent: {
        type: Boolean,
        default: true
    },
    zIndex: {
        type: Number,
        default: 10
    }
})

const dom_bubble = ref(null)

onMounted(() => {
    const parentElement = dom_bubble.value.parentElement

    if (props.mode === 'hover') {
        parentElement.classList.add('bubble__mode-hover')
    } else if (props.mode === 'click') {
        parentElement.event_on('click', (e) => {
            if (!e.target.className.includes('bubble-no-click'))
                parentElement.classList.toggle('button__mode-click')
        })
    }
})
</script>

<style scoped lang="scss">
$directions-and-sidelines: 'top', 'bottom', 'left', 'right';

.bubble {
    position: absolute;
    white-space: nowrap;
    color: rgb(var(--text-color-light-mode));
    background-color: rgb(var(--card-background-color));
    border-radius: var(--radius-middle);
    @include shadow(0, 0, $rgba: rgba(var(--shadow-color), 0.2));
    pointer-events: none;
    opacity: 0;
    transition: top var(--transition-duration-fast) ease-in-out,
    bottom var(--transition-duration-fast) ease-in-out,
    left var(--transition-duration-fast) ease-in-out,
    right var(--transition-duration-fast) ease-in-out,
    opacity var(--transition-duration-fast) ease-in-out;

    @each $direction in $directions-and-sidelines {
        &.direction-#{$direction} {
            #{opposite-direction($direction)}: 100%;

            @each $sideline in $directions-and-sidelines {
                @if ($direction != $sideline) {
                    &.sidelined-#{$sideline} {
                        #{$sideline}: 0;
                    }
                }
            }

            &.sidelined-center {
                @if ($direction == 'left' or $direction == 'right') {
                    top: 50%;
                    transform: translateY(-50%);
                } @else if ($direction == 'top' or $direction == 'bottom') {
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }
    }
}

.bubble__mode-hover:hover .mode-hover,
.button__mode-click .mode-click {
    pointer-events: auto;
    opacity: 1;

    @each $direction in $directions-and-sidelines {
        &.direction-#{$direction} {
            #{opposite-direction($direction)}: 140%;
        }
    }

    &.event-false {
        pointer-events: none;
    }
}
</style>