<template>
    <div class="warehouse">
        <div class="warehouse__search">
            <custom-input placeholder="请输入关键词" @change="getSuggestions" ref="dom_searchInput">
                <svg-search></svg-search>
            </custom-input>
            <div class="warehouse__searchSuggestions" ref="dom_warehouse__searchSuggestions">
                <ul>
                    <li v-for="searchResult in searchSuggestionsResult">
                        <custom-button @click="searchResultToSearchInput(searchResult)">
                            {{ searchResult }}
                        </custom-button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="warehouse__container">
            <div class="warehouse__filter">
                <div class="warehouse__filter__selection">
                    <dropdown :default-select="0" :data="skinModelSelectedData"></dropdown>
                    <dropdown :default-select="0" :data="skinOrderSelectedData"></dropdown>
                    <switch-icon-button btn-style="reverse" @change="switchOrderReverse">
                        <svg-arrow-down></svg-arrow-down>
                        <bubble direction="left" mode="hover" :is-event="false">{{
                                orderReverse ? '倒序' : '正序'
                            }}
                        </bubble>
                    </switch-icon-button>
                </div>
                <div class="warehouse__filter__pagination">
                    <pagination :init-page="currentPage" total-page="20" max-number-display="5" v-if="!isPhone"
                                @change-page="bindPaginationValue"></pagination>
                    <pagination-simply :init-page="currentPage" total-page="20" v-if="isPhone"
                                       @change-page="bindPaginationValue"></pagination-simply>
                </div>
            </div>
            <divider margin="small"></divider>
            <div class="warehouse__container__topAndBottomShadow leaveBottom" ref="dom_skinParentContainer">
                <div ref="dom_skinScrollbar">
                    <div class="warehouse__skinContainer">
                        <skin-display v-for="skin in skins" :skin-name="skin.skinName" :skin-author="skin.skinAuthor"
                                      :skin-model="skin.skinModel"
                                      :skin-location="skin.skinLocation"
                                      :skin-collections="skin.skinCollections"
                                      @img-click="incomingImgSrc(skin.skinLocation)"></skin-display>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <fixed-container>
        <custom-button class="backToTop" btn-style="fill" ref="dom_backToTop" @click="toTop">
            <svg-chevron-up></svg-chevron-up>
        </custom-button>
        <custom-button btn-style="fill">
            <svg-plus></svg-plus>
        </custom-button>
    </fixed-container>
    <mask-layer ref="dom_mask">
        <popup-skin class="use-skinPreview" :skin-location="skinImgSrc" @close="toggleMask"></popup-skin>
    </mask-layer>
</template>

<script setup name="warehouse">
import CustomInput from "@/components/basic/input/custom-input.vue";
import SvgSearch from "@/components/svg/svg-search.vue";
import CustomButton from "@/components/basic/button/custom-button.vue";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {debounce, eliminateScroll, getSearchSuggestions} from "@/assets/model/function";
import clickOutsideMixin from "@/assets/model/clickOutsideMixin";
import Dropdown from "@/components/basic/dropdown/dropdown.vue";
import Pagination from "@/components/basic/pagination/pagination.vue";
import PaginationSimply from "@/components/basic/pagination/pagination-simply.vue";
import Divider from "@/components/basic/divider/divider.vue";
import SwitchIconButton from "@/components/basic/button/switch-icon-button.vue";
import SvgArrowDown from "@/components/svg/svg-arrow-down.vue";
import FixedContainer from "@/components/basic/container/fixed-container.vue";
import SvgPlus from "@/components/svg/svg-plus.vue";
import SkinDisplay from "@/components/basic/card/skin-display.vue";
import {useStore} from "vuex";
import Bubble from "@/components/basic/bubble/bubble.vue";
import SvgChevronUp from "@/components/svg/svg-chevron-up.vue";
import MaskLayer from "@/components/basic/popup/mask-layer.vue";
import PopupSkin from "@/components/basic/popup/popup-skin.vue";

const store = useStore()
const skins = computed(() => store.state.storeSkin.skin)
const orderReverse = ref(false)

function switchOrderReverse() {
    orderReverse.value = !orderReverse.value
}

const skinModelSelectedData = [
    {
        key: 'all',
        value: '全部'
    },
    {
        key: 'steve',
        value: 'Steve 模型'
    },
    {
        key: 'alex',
        value: 'Alex 模型'
    }
]
const skinOrderSelectedData = ['上传时间', '收藏数量']

const dom_searchInput = ref(null)
const dom_warehouse__searchSuggestions = ref(null)
const dom_skinParentContainer = ref(null)
const dom_skinScrollbar = ref(null)
const dom_backToTop = ref(null)
const dom_mask = ref(null)

const searchSuggestions = ["搜索建议1", "搜索建议2", "搜索建议3", "搜索建议4", "搜索建议5", "搜索建议6", "搜索建议7", "搜索建议8", "建议3", "不相关建议"]
const searchSuggestionsResult = ref([])
const isPhone = ref(window.innerWidth < 768)
const currentPage = ref(1)
const skinImgSrc = ref(null)

const bindPaginationValue = (value) => {
    currentPage.value = value
}

function toggleMask(value = null) {
    dom_mask.value.autoMask(value)
}

function showPopupCard(cardClassName) {
    dom_mask.value.$el.querySelector('.' + cardClassName)?.classList.add('show')
}

function incomingImgSrc(src) {
    toggleMask(null)
    showPopupCard('use-skinPreview')
    skinImgSrc.value = src
}

function getSuggestions(searchValue) {
    searchSuggestionsResult.value = getSearchSuggestions(searchValue, searchSuggestions)
    openSuggestions()
}

function searchResultToSearchInput(value) {
    dom_searchInput.value.setInputValue(value)
    clearSuggestions()
}

function clearSuggestions() {
    searchSuggestionsResult.value = []
    openSuggestions()
}

function openSuggestions() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(searchSuggestionsResult.value.length !== 0 ? Math.min(dom_warehouse__searchSuggestions.value.querySelector('ul').scrollHeight, 250) + 'px' : '')
        })
    })

    promise.then((resolve) => {
        eliminateScroll(dom_warehouse__searchSuggestions, '--transition-duration-default', () => {
            dom_warehouse__searchSuggestions.value.style.height = resolve;

            resolve ? dom_warehouse__searchSuggestions.value.classList.add('unfold') : dom_warehouse__searchSuggestions.value.classList.remove('unfold')
        })
    })
}

clickOutsideMixin(dom_warehouse__searchSuggestions, 'warehouse__searchSuggestions', 'warehouse__searchSuggestions', clearSuggestions)

function skinContainerScrollHandler() {
    function isScrollToBottom() {
        // 获取 skinContainer 的总高度
        const totalHeight = dom_skinScrollbar.value.scrollHeight;
        // 获取 skinContainer 容器的高度
        const containerHeight = dom_skinScrollbar.value.clientHeight;
        // 获取当前滚动的位置
        const currentPosition = dom_skinScrollbar.value.scrollTop;
        // 判断是否已经滚动到底部
        return totalHeight - (containerHeight + currentPosition) === 0;
    }

    function isScrollToTop() {
        // 获取当前滚动的位置
        const currentPosition = dom_skinScrollbar.value.scrollTop;
        // 判断是否已经滚动到顶部
        return currentPosition === 0;
    }

    dom_skinParentContainer.value.classList.toggle('leaveTop', !isScrollToTop());
    dom_skinParentContainer.value.classList.toggle('leaveBottom', !isScrollToBottom());
}

const isScrollLeaveTop = debounce(function () {
    const top = dom_skinScrollbar.value.scrollTop

    dom_backToTop.value.$el.classList.toggle('fade-out', (top > 0))
}, 250)

const toTop = () => {
    dom_skinScrollbar.value.scrollTop = 0
}

onMounted(() => {
    window.addEventListener('resize', function () {
        isPhone.value = window.innerWidth < 768;
    });

    dom_skinScrollbar.value.event_on('scroll', () => {
        skinContainerScrollHandler()
        isScrollLeaveTop()
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', function () {
        isPhone.value = window.innerWidth < 768;
    });
    dom_skinScrollbar.value?.event_off('scroll', () => {
        skinContainerScrollHandler()
        isScrollLeaveTop()
    })
})
</script>

<style scoped lang="scss">
.warehouse {
    height: 100%;
    padding: var(--margin-large) 0;
    @include flex-layout($direction: column, $gap: var(--margin-large));

    &__search {
        position: relative;
        width: 50%;
        background-color: rgba(var(--card-background-color), var(--card-background-opacity));
        padding: var(--margin-large);
        margin: 0 auto;
        border-radius: var(--radius-middle);
        @include shadow(0, 0);
        transition: width var(--transition-duration-fast) ease-in-out;

        .custom-input {
            width: 100%;
        }

        &Suggestions {
            position: absolute;
            top: calc(100% + var(--margin-middle));
            left: 0;
            width: 100%;
            height: 0;
            opacity: 0;
            background-color: rgba(var(--card-background-color), var(--card-background-opacity));
            @include shadow(0, 0);
            border-radius: var(--radius-middle);
            overflow-x: hidden;
            overflow-y: auto;
            transition: height var(--transition-duration-default) ease-in-out,
            opacity var(--transition-duration-fast) ease-in-out var(--transition-duration-default);
            @include scrollbar-style(6px);
            z-index: 10;

            &.noScroll::-webkit-scrollbar {
                display: none;
            }

            &.unfold {
                opacity: 1;
                transition: width var(--transition-duration-fast) ease-in-out,
                height var(--transition-duration-default) ease-in-out,
                opacity var(--transition-duration-fast) ease-in-out;
            }

            ul {
                padding: var(--margin-large);

                li:not(:first-child) {
                    margin-top: var(--margin-small);
                }
            }
        }

        @media screen and (max-width: $width-phone) {
            & {
                width: 100%;
            }
        }
    }

    &__container {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
        flex: 1;
        @include flex-layout($direction: column);
        background-color: rgba(var(--card-background-color), var(--card-background-opacity));
        @include shadow(0, 0);
        border-radius: var(--radius-middle);

        .divider {
            padding: 0 var(--margin-large);
        }
    }

    &__filter {
        padding: var(--margin-large) var(--margin-large) 0;
        width: 100%;
        @include flex-layout($justify-content: space-between);

        &__selection,
        &__pagination {
            @include flex-layout();
        }

        &__selection .switchIconButton {
            position: relative;

            .bubble {
                padding: var(--margin-small) var(--margin-middle);
                border-radius: var(--radius-small);
                font-size: 0.875em;
                color: rgb(var(--secondary-color));
                user-select: none;
            }
        }

        @media screen and (max-width: $width-ipad) {
            &__selection .dropdown {
                width: $input-type-width / 2;
            }
        }

        @media screen and (max-width: $width-phone + 30) {
            & {
                flex-direction: column;
            }

            &__selection,
            &__pagination {
                width: 100%;
                justify-content: flex-end;
            }

            &__selection .dropdown {
                width: 100%;
            }
        }
    }

    &__container__topAndBottomShadow {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        &::before, &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 80px;
            left: 0;
            opacity: 0;
            transition: opacity var(--transition-duration-default) ease-in-out;
            pointer-events: none;
        }

        &::before {
            top: 0;
            background-image: linear-gradient(to bottom, rgba(var(--card-background-color), var(--card-background-opacity)), transparent);
        }

        &::after {
            bottom: 0;
            background-image: linear-gradient(to top, rgba(var(--card-background-color), var(--card-background-opacity)), transparent);
        }

        &.leaveTop::before {
            opacity: 1;
        }

        &.leaveBottom::after {
            opacity: 1;
        }

        > div {
            height: 100%;
            overflow-y: auto;
            scroll-behavior: smooth;
            @include scrollbar-style();
        }
    }

    &__skinContainer {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: var(--margin-large);
        padding: 0 var(--margin-large) var(--margin-large);

        @media screen and (min-width: 1664px) {
            grid-template-columns: repeat(5, 1fr);
        }

        @media screen and (max-width: 1408px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media screen and (max-width: 896px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media screen and (max-width: 640px) {
            grid-template-columns: 1fr;
        }
    }
}

.fixed__container {
    $fixed-position: calc(var(--margin-large) * 2 + var(--margin-small));

    bottom: calc($fixed-position * 2.7);
    right: $fixed-position;

    .custom-button {
        padding: var(--margin-middle);
        @include shadow(0, 0);
    }

    .custom-button:not(:first-child) {
        margin-top: var(--margin-middle);
    }

    .backToTop {
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--transition-duration-fast) ease-in-out;

        &.fade-out {
            opacity: 1;
            pointer-events: auto;
        }
    }
}
</style>