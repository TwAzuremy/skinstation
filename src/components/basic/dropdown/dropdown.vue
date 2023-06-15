<template>
    <div class="dropdown">
        <input type="text" placeholder="请选择" :value="value" readonly ref="dom_inputContainer" @change="update">
        <svg-down></svg-down>
        <div class="dropdown__data" ref="dom__dropdownData">
            <ul>
                <li v-for="(value, index) in data" @click="auto(); select(index)" :data-key="value?.key ?? index"
                    :data-value="value?.value ?? value">
                    <custom-button>{{ value?.value ?? value }}</custom-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import SvgDown from "@/components/svg/svg-down.vue";
import CustomButton from "@/components/basic/button/custom-button.vue";
import {onMounted, ref} from "vue";
import clickOutsideMixin from "@/assets/model/clickOutsideMixin";
import {getCSSRootValue} from "@/assets/model/function";

const props = defineProps({
    defaultValue: String,
    defaultSelect: Number,
    data: Array
})
const emits = defineEmits(['change'])

const dom_inputContainer = ref(null)
const dom__dropdownData = ref(null)
const value = ref(props.defaultValue)
const key = ref(null)
let dropdownData

function update() {
    emits('change', [value.value, key.value])
}

function updateDropdownData() {
    return dom__dropdownData.value.querySelectorAll('li')
}

function eliminateScroll(func) {
    dom__dropdownData.value.classList.add('noScroll')

    func()

    const transitionTime = Math.floor(parseFloat(getCSSRootValue('--transition-duration-default')) * 1000)

    setTimeout(() => {
        dom__dropdownData.value.classList.remove('noScroll')
    }, transitionTime)
}

function unfold() {
    eliminateScroll(() => {
        const scrollHeight = Math.min(dom__dropdownData.value.scrollHeight, 200)
        dom__dropdownData.value.style.height = scrollHeight + 'px'
        dom__dropdownData.value.classList.add('unfold')
    })
}

function collapse() {
    eliminateScroll(() => {
        dom__dropdownData.value.removeAttribute('style')
        dom__dropdownData.value.classList.remove('unfold')
    })
}

function auto() {
    dom__dropdownData.value.classList.contains('unfold') ? collapse() : unfold()
}

clickOutsideMixin(dom__dropdownData, '.dropdown', 'unfold', collapse)

function select(index) {
    dom__dropdownData.value.querySelector('.selected')?.classList.remove('selected')

    const nowSelectedData = dropdownData[index]

    if (nowSelectedData && !nowSelectedData.classList.contains('selected')) {
        nowSelectedData.classList.add('selected')
        value.value = nowSelectedData.dataset.value
        key.value = nowSelectedData.dataset.key
    }

    dom_inputContainer.value.dispatchEvent(new Event('change'))
}

onMounted(() => {
    dropdownData = updateDropdownData()
    if (!isNaN(props.defaultSelect)) {
        select(props.defaultSelect)
    }
    dom_inputContainer.value.event_on('click', () => auto())
})
</script>

<style scoped lang="scss">
.dropdown {
    position: relative;
    color: rgb(var(--text-color-light-mode));

    input[type=text] {
        padding: 0 calc(var(--margin-middle) * 2 + 1.25em) 0 var(--margin-middle);
        cursor: pointer;

        &:hover {
            & + svg {
                color: rgba(var(--secondary-color), var(--opacity-input-hover));
            }
        }

        &:focus {
            & + svg {
                color: rgba(var(--secondary-color), var(--opacity-input-focus));
            }
        }
    }

    svg {
        position: absolute;
        width: 1.25em;
        height: 1.25em;
        top: calc((100% - 1.25em) / 2);
        right: var(--margin-middle);
        pointer-events: none;
        transition: color var(--transition-duration-fast) ease-in-out,
        rotate var(--transition-duration-fast) ease-in-out;

        &:has(+.dropdown__data.unfold) {
            rotate: 180deg;
        }
    }

    &__data {
        position: absolute;
        top: 110%;
        left: 0;
        width: 100%;
        background-color: rgba(var(--card-background-color), var(--card-background-opacity));
        border-radius: var(--radius-middle);
        @include shadow(0, 0);
        overflow-x: hidden;
        overflow-y: auto;
        height: 0;
        opacity: 0;
        transition: height var(--transition-duration-default) ease-in-out,
        opacity var(--transition-duration-fast) ease-in-out var(--transition-duration-default);
        @include scrollbar-style();
        z-index: 10;

        &.noScroll {
            &::-webkit-scrollbar {
                display: none;
            }
        }

        ul {
            padding: var(--margin-middle);

            li {
                border-radius: var(--margin-small);
                transition: background-color var(--transition-duration-fast) ease-in-out;

                &.selected {
                    background-color: rgba(var(--secondary-color), var(--opacity-button-hover));
                }

                &:not(:first-child) {
                    margin-top: var(--margin-middle);
                }
            }
        }

        &.unfold {
            opacity: 1;
            transition: height var(--transition-duration-default) ease-in-out,
            opacity var(--transition-duration-fast) ease-in-out;
        }
    }
}
</style>