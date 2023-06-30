<template>
    <div class="favourites">
        <div class="favourites__filter">
            <dropdown :default-select="0" :data="skinModelSelectedData"></dropdown>
            <pagination :init-page="currentPage" total-page="20" max-number-display="5"
                        @change-page="bindPaginationValue" v-if="!isPhone"></pagination>
            <pagination-simply :init-page="currentPage" total-page="20" @change-page="bindPaginationValue"
                               v-if="isPhone"></pagination-simply>
        </div>
        <div class="favourites__container__topAndBottomShadow leaveBottom" ref="dom_skinParentContainer">
            <div ref="dom_scrollbar">
                <div class="favourites__container">
                    <SkinDisplayCollections v-for="skin in skins"
                                            :skin-nick-name="skin.skinNickName === '' ? skin.skinName : skin.skinNickName"
                                            :skin-model="skin.skinModel"
                                            :skin-location="skin.skinLocation"
                                            @edit="toggleMask(true); showPopupCard('use-editName'); setInputSkinNickName(skin.skinNickName)">
                    </SkinDisplayCollections>
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
        <popup-card-emoji class="use-editName" title="修改名称" emoji="✍️" description="修改您所收藏的皮肤昵称."
                          @close="toggleMask">
            <custom-input placeholder="请输入昵称" ref="dom_editSkinNickName" style="width: 100%;">
                <svg-edit></svg-edit>
            </custom-input>
        </popup-card-emoji>
    </mask-layer>
</template>

<script setup name="favourites">
import Dropdown from "@/components/basic/dropdown/dropdown.vue";
import Pagination from "@/components/basic/pagination/pagination.vue";
import {computed, onMounted, onUnmounted, ref} from "vue";
import PaginationSimply from "@/components/basic/pagination/pagination-simply.vue";
import CustomButton from "@/components/basic/button/custom-button.vue";
import FixedContainer from "@/components/basic/container/fixed-container.vue";
import SvgPlus from "@/components/svg/svg-plus.vue";
import SkinDisplayCollections from "@/components/basic/card/skin-display-collections.vue";
import {useStore} from "vuex";
import SvgChevronUp from "@/components/svg/svg-chevron-up.vue";
import {debounce} from "@/assets/model/function";
import MaskLayer from "@/components/basic/popup/mask-layer.vue";
import PopupCard from "@/components/basic/popup/popup-card.vue";
import PopupCardEmoji from "@/components/basic/popup/popup-card-emoji.vue";
import CustomInput from "@/components/basic/input/custom-input.vue";
import SvgEdit from "@/components/svg/svg-edit.vue";

const store = useStore()
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
    },
    {
        key: 'local',
        value: '本地上传'
    }
]
const isPhone = ref(window.innerWidth < 768)
const currentPage = ref(1)
const skins = computed(() => store.state.storeFavSkin.skin)

const dom_skinParentContainer = ref(null)
const dom_scrollbar = ref(null)
const dom_backToTop = ref(null)
const dom_mask = ref(null)
const dom_editSkinNickName = ref(null)

const bindPaginationValue = (value) => {
    currentPage.value = value
}

function toggleMask(value = null) {
    dom_mask.value.autoMask(value)
}

function setInputSkinNickName(name) {
    dom_editSkinNickName.value.setInputValue(name)
}

function showPopupCard(cardClassName) {
    dom_mask.value.$el.querySelector('.' + cardClassName)?.classList.add('show')
}

function skinContainerScrollHandler() {
    function isScrollToBottom() {
        // 获取 skinContainer 的总高度
        const totalHeight = dom_scrollbar.value.scrollHeight;
        // 获取 skinContainer 容器的高度
        const containerHeight = dom_scrollbar.value.clientHeight;
        // 获取当前滚动的位置
        const currentPosition = dom_scrollbar.value.scrollTop;
        // 判断是否已经滚动到底部
        return totalHeight - (containerHeight + currentPosition) === 0;
    }

    function isScrollToTop() {
        // 获取当前滚动的位置
        const currentPosition = dom_scrollbar.value.scrollTop;
        // 判断是否已经滚动到顶部
        return currentPosition === 0;
    }

    dom_skinParentContainer.value.classList.toggle('leaveTop', !isScrollToTop());
    dom_skinParentContainer.value.classList.toggle('leaveBottom', !isScrollToBottom());
}

const isScrollLeaveTop = debounce(function () {
    const top = dom_scrollbar.value.scrollTop

    dom_backToTop.value.$el.classList.toggle('fade-out', (top > 0))
}, 250)

const toTop = () => {
    dom_scrollbar.value.scrollTop = 0
}

onMounted(() => {
    window.addEventListener('resize', function () {
        isPhone.value = window.innerWidth < 768;
    });

    dom_scrollbar.value.event_on('scroll', () => {
        skinContainerScrollHandler()
        isScrollLeaveTop()
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', function () {
        isPhone.value = window.innerWidth < 768;
    });

    dom_scrollbar.value?.event_off('scroll', () => {
        skinContainerScrollHandler()
        isScrollLeaveTop()
    })
})
</script>

<style scoped lang="scss">
.favourites {
    width: 100%;
    height: 100%;
    padding: var(--margin-large) 0;
    @include flex-layout($direction: column, $gap: var(--margin-large));

    &__container__topAndBottomShadow {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: var(--margin-middle);

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
            background-image: linear-gradient(to bottom, rgba(var(--card-background-color), 0.7), transparent);
        }

        &::after {
            bottom: 0;
            background-image: linear-gradient(to top, rgba(var(--card-background-color), 0.7), transparent);
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

    &__container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: var(--margin-large);
        @include scrollbar-style();

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

    &__filter {
        width: 100%;
        @include flex-layout($justify-content: space-between, $gap: 0);
        background-color: rgba(var(--card-background-color), var(--card-background-opacity));
        @include shadow(0, 0);
        border-radius: var(--margin-middle);
        padding: var(--margin-large);

        @media screen and (max-width: $width-phone) {
            & {
                flex-direction: column;
                gap: var(--margin-middle);
            }

            .dropdown {
                width: 100%;
            }
        }
    }
}

.fixed__container {
    $fixed-position: calc(var(--margin-large) + var(--margin-middle));

    bottom: calc($fixed-position * 3.5);
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