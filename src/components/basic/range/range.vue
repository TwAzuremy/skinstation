<template>
    <div class="range" ref="dom_range">
        <input type="range" :min="min" :max="max" :step="step" v-model="value" @input="rangeHandler(); changeHandler();">
        <div class="range__container"></div>
        <bubble :direction="bubbleDirection" mode="hover" :is-event="false" v-if="openNumber">
            <span>{{ value }}</span>
        </bubble>
    </div>
</template>

<script setup name="range">
import {onMounted, ref} from "vue";
import Bubble from "@/components/basic/bubble/bubble.vue";

const props = defineProps({
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 10
    },
    step: {
        type: Number,
        default: 1,
        validator(value) {
            return value >= 0
        }
    },
    defaultValue: {
        type: Number,
        default: 0
    },
    openNumber: {
        type: Boolean,
        default: false
    },
    bubbleDirection: {
        type: String,
        default: 'top',
        validator(value) {
            return ['top', 'bottom'].indexOf(value) !== -1
        }
    }
})
const emits = defineEmits(['change'])

const value = ref(props.defaultValue)
const dom_range = ref(null)

function changeHandler() {
    emits('change', parseInt(value.value))
}

function rangeHandler() {
    dom_range.value.setAttribute('style', `--position: ${normalizeRangeValue(value.value, props.min, props.max)}%`)
}

/**
 * 计算百分比
 * @param value 当前值
 * @param min 最小值
 * @param max 最大值
 * @returns {number} 百分比 ( 不带百分号 )
 */
function normalizeRangeValue(value, min, max) {
    const offset = value - min;
    const mappedMax = Math.abs(max - min);
    const mappedValue = Math.abs(offset);
    return mappedValue / mappedMax * 100;
}

onMounted(() => {
    rangeHandler()
})
</script>

<style scoped lang="scss">
.range {
    position: relative;
    $range-height: 6px;
    width: $input-type-width;
    transition: width var(--transition-duration-fast) ease-in-out;
    user-select: none;

    input[type=range] {
        opacity: 0;
        width: 100%;

        &::-webkit-slider-thumb {
            color: green;
        }

        &::-webkit-slider-container {
            height: $range-height + 12px;
        }

        &::-webkit-slider-runnable-track {

        }
    }

    &__container {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 100%;
        height: $range-height;
        border-radius: $range-height / 2;
        background-color: rgb(var(--range-track-background));
        pointer-events: none;

        &::before {
            position: absolute;
            content: '';
            top: 50%;
            left: var(--position);
            transform: translate(-50%, -50%);
            width: $range-height + 12px;
            height: $range-height + 12px;
            background-color: rgb(var(--range-thumb-color));
            @include shadow(0, 0, $rgba: rgba(var(--shadow-color), 0.3));
            border-radius: 50%;
            transition: background-color var(--transition-duration-fast) ease-in-out,
            left var(--transition-duration-fast) ease-in-out;
        }

        &::after {
            position: absolute;
            content: '';
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            width: var(--position);
            height: $range-height;
            border-radius: $range-height / 2;
            background-color: rgb(var(--secondary-color));
            transition: width var(--transition-duration-fast) ease-in-out;
            z-index: -1;
        }
    }

    &:hover {
        .range__container {
            &::before {
                background-color: rgb(var(--range-thumb-color-hover));
            }
        }
    }

    &:active {
        .range__container {
            &::before {
                background-color: rgb(var(--range-thumb-color-active));
            }
        }
    }

    .bubble {
        left: var(--position) !important;
        border-radius: var(--radius-small);
        padding: var(--margin-small) 0;

        &::before {
            position: absolute;
            content: '';
            left: 50%;
            transform: translateX(-50%) rotate(45deg);
            height: 8px;
            width: 8px;
            background-color: rgb(var(--card-background-color));
        }

        &.direction-top::before {
            bottom: -4px;
            @include shadow(2px, 2px);
        }

        &.direction-bottom::before {
            top: -4px;
            @include shadow(-2px, -2px);
        }

        span {
            display: block;
            width: 32px;
            color: rgb(var(--secondary-color));
            text-align: center;
            font-size: 0.875em;
            line-height: 1.5em;
        }
    }
}
</style>