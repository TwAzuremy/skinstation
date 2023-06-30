<template>
    <ul class="pagination-simply">
        <li class="pagination-simply__button pagination-simply__prev" @click="pageOperation.prevPage">
            <svg-left></svg-left>
        </li>
        <li class="pagination-simply__numberSelector">
            <input type="number" v-model="currentPage" placeholder="请输入页码" ref="dom_pageNumberInput"
                   @input="inputHandler" @blur="blurHandler" @focus="focusHandler">
        </li>
        <li>/</li>
        <li class="pagination-simply__totalPage">{{ totalPages }}</li>
        <li class="pagination-simply__button pagination-simply__next" @click="pageOperation.nextPage">
            <svg-right></svg-right>
        </li>
    </ul>
</template>

<script setup name="pagination-simply">
import SvgLeft from "@/components/svg/svg-left.vue";
import SvgRight from "@/components/svg/svg-right.vue";
import {onMounted, ref} from "vue";
import {debounce} from "@/assets/model/function";

const props = defineProps({
    initPage: {
        type: [Number, String],
        default: 1,
        validator(value) {
            return value >= 1
        }
    },
    totalPage: {
        type: [Number, String],
        default: 1,
        validator(value) {
            return value >= 1
        }
    }
})
const emits = defineEmits(['changePage'])

const currentPage = ref(Number(props.initPage))
const totalPages = ref(Number(props.totalPage))
const oldPageNumber = ref(currentPage.value)

const dom_pageNumberInput = ref(null)

function setPages(page) {
    if ((page + '').trim() === '' ||
        page > props.totalPage ||
        oldPageNumber.value === page) return

    currentPage.value = page
    oldPageNumber.value = page
    emits('changePage', page)
}

const pageOperation = {
    nextPage() {
        setPages(Math.min(currentPage.value + 1, props.totalPage))
    },
    prevPage() {
        setPages(Math.max(currentPage.value - 1, 1))
    }
}

const inputHandler = debounce(() => {
    if ((currentPage.value + '').trim() === '') return

    currentPage.value = Math.min(currentPage.value, props.totalPage)
}, 300)

const focusHandler = function () {
    oldPageNumber.value = currentPage.value
}

const blurHandler = function () {
    if ((currentPage.value + '').trim() === '' ||
        currentPage.value > props.totalPage ||
        oldPageNumber.value === currentPage.value) return

    setPages(currentPage.value)
}

onMounted(() => {
    currentPage.value = props.initPage
})

defineExpose({
    setPages
})
</script>

<style scoped lang="scss">
.pagination-simply {
    width: 100%;
    @include flex-layout(center);
    color: rgb(var(--text-pageination-notCurrent-color));
    user-select: none;

    li {
        min-width: 32px;
        height: 32px;
        font-weight: 600;
        @include flex-layout(center, center, $gap: 0);
    }

    input[type=number] {
        width: 100%;
    }

    &__numberSelector {
        flex: 1;
    }

    &__button {
        border-radius: var(--radius-small);
        transition: background-color var(--transition-duration-fast) ease-in-out;

        svg {
            width: 1.25em;
            height: 1.25em;
        }

        &:active {
            color: rgb(var(--secondary-color));
            background-color: rgba(var(--secondary-color), var(--opacity-button-active));
        }
    }
}
</style>