<template>
    <ul class="pagination">
        <li class="pagination__button pagination__toFirst" @click="pageOperation.toFirstPage"
            v-if="!(currentPage <= median)">
            <svg-chevron-left></svg-chevron-left>
        </li>
        <li class="pagination__button pagination__prev" @click="pageOperation.prevPage"
            v-if="!(currentPage <= 1)">
            <svg-left></svg-left>
        </li>
        <li v-for="page in pageNumber" :class="{ 'currentPage': page === currentPage }"
            @click="pageOperation.setPage(page)">{{ page }}
        </li>
        <li class="pagination__button pagination__next" @click="pageOperation.nextPage"
            v-if="!(currentPage >= totalPages)">
            <svg-right></svg-right>
        </li>
        <li class="pagination__button pagination__toLast" @click="pageOperation.toLastPage"
            v-if="!(currentPage >= totalPages - median + 1)">
            <svg-chevron-right></svg-chevron-right>
        </li>
        <li class="pagination__totalPages">共 {{ totalPages }} 页</li>
    </ul>
</template>

<script setup name="pagination">
import SvgLeft from "@/components/svg/svg-left.vue";
import SvgChevronLeft from "@/components/svg/svg-chevron-left.vue";
import SvgRight from "@/components/svg/svg-right.vue";
import SvgChevronRight from "@/components/svg/svg-chevron-right.vue";
import {onMounted, ref} from "vue";
import {isEven} from "@/assets/model/function";

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
        validator(value) {
            return value >= 1
        }
    },
    maxNumberDisplay: {
        type: [Number, String],
        validator(value) {
            return value >= 1
        }
    }
})
const emits = defineEmits(['changePage'])

const currentPage = ref(Number(props.initPage))
const totalPages = ref(Number(props.totalPage))
const pageNumber = ref([])
const median = Math.ceil(props.maxNumberDisplay / 2) // 计算中位数, [1, 2, 3, 4] 为 2, [1, 2, 3, 4, 5] 为 3

const pageOperation = {
    nextPage() {
        if (currentPage.value === totalPages.value) return

        setPages(Math.min(currentPage.value + 1, totalPages.value))
    },
    prevPage() {
        if (currentPage.value === 1) return

        setPages(Math.max(currentPage.value - 1, 1))
    },
    toFirstPage() {
        if (currentPage.value === 1) return

        setPages(1)
    },
    toLastPage() {
        if (currentPage.value === totalPages.value) return

        setPages(totalPages.value)
    },
    setPage(page) {
        if (page === currentPage.value) return

        setPages(page)
    }
}

function setPages(page) {
    if (totalPages.value <= props.maxNumberDisplay || page > totalPages.value || page < 1) return

    currentPage.value = page
    emits('changePage', currentPage.value)

    const maxNumberDisplay = props.maxNumberDisplay;
    const totalPagesValue = totalPages.value;

    const increment = Math.floor(maxNumberDisplay / 2) // 计算需要增加的值
    pageNumber.value = [] // 页码数组

    let startPage = Math.max(isEven(maxNumberDisplay) ? page - increment + 1 : page - increment, 1);
    let endPage = Math.min(page + increment, totalPagesValue);

    if (page < median) {
        // 如果当前页小于中位数, 则将后面补齐
        endPage += median - page
    } else if (page > totalPagesValue - increment) {
        // 如果当前页大于最后一页到最后一页减去最大显示页码数量的中位数, 也就是最后一页减去增值, 则将前面补齐
        startPage += totalPagesValue - page - increment
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumber.value.push(i);
    }
}

onMounted(() => {
    setPages(currentPage.value)
})

defineExpose({
    setPages
})
</script>

<style scoped lang="scss">
.pagination {
    height: 32px;
    @include flex-layout();
    color: rgb(var(--text-pageination-notCurrent-color));
    user-select: none;

    li {
        @include flex-layout(center, center, $gap: 0);
        min-width: 32px;
        height: 32px;
        background-color: transparent;
        border-radius: var(--radius-small);
        cursor: pointer;
        white-space: nowrap;
        transition: background-color var(--transition-duration-fast) ease-in-out,
        color var(--transition-duration-fast) ease-in-out;

        &:hover {
            background-color: rgba(var(--secondary-color), var(--opacity-button-hover));
        }

        &:active {
            background-color: rgba(var(--secondary-color), var(--opacity-button-active));
        }

        &.currentPage {
            color: rgb(var(--secondary-color));
            background-color: rgba(var(--secondary-color), var(--opacity-pagination-currentPage-background));
        }

        &.pagination__button {
            svg {
                width: 1.25em;
                height: 1.25em;
            }

            &:hover {
                color: rgb(var(--secondary-color));
            }
        }

        &.pagination__totalPages {
            font-size: 0.875em;
            cursor: default;

            &:hover,
            &:active {
                background-color: transparent;
            }
        }
    }
}
</style>