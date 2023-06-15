<template>
    <header class="app__header">
        <title-bar @click="switchSidebar"></title-bar>
    </header>
    <nav class="app__sidebar" data-animation="computer" ref="dom_app__sidebar">
        <sidebar @back="switchSidebar"></sidebar>
    </nav>
    <main class="app__container">
        <router-view/>
    </main>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";

import Sidebar from "@/components/complex/sidebar.vue";
import TitleBar from "@/components/complex/titleBar.vue";
import {addSwipeListener} from "@/assets/model/function";

const width = ref(window.innerWidth)
// 设备: 1 - phone, 2 - ipad, 3 - computer
const state = ref(null)

const dom_app__sidebar = ref(null)

/**
 * 设置动画
 * @param animation
 */
function setAnimation(animation) {
    dom_app__sidebar.value.dataset.animation = animation
}

/**
 * 切换动画, 通过状态切换
 * @param state
 * @param prev
 */
function switchAnimations(state, prev) {
    switch (state) {
        case 1:
            setAnimation('phone')
            break
        case 3:
            setAnimation('computer')
            break
        case 2:
            if (prev === 1) setAnimation('phoneToIpad');
            else if (prev === 3) setAnimation('computerToIpad');
            break
        default:
            break;
    }
}

const handleResize = () => {
    width.value = window.innerWidth

    const prevState = state.value
    resetState() // 重置设备状态
    switchAnimations(state.value, prevState)
}

/**
 * 重置和初始化 state 设备状态 <br>
 * 1 - phone, 2 - ipad, 3 - computer
 */
function resetState() {
    if (width.value < 768) {
        state.value = 1
        return;
    }

    if (width.value >= 768 && width.value < 1024) {
        state.value = 2
        return;
    }

    state.value = 3
}

function switchSidebar() {
    dom_app__sidebar.value.classList.toggle('state-open')
}

// 存储滑动事件, 并在组件卸载后清除事件
let swipeListeners

/**
 * 初始化滑动事件, 并返回左滑和右滑, 以在组件卸载时将事件卸载
 * @returns {{swipeRight: {cleanup: cleanup}, swipeLeft: {cleanup: cleanup}}}
 */
function initSwipeFunction() {
    // 向右滑动
    const swipeRight = addSwipeListener('right', 80, function () {
        if (window.innerWidth <= 768) {
            // 滑出侧边栏
            dom_app__sidebar.value?.classList?.add('state-open')
        }
    })

    // 向左滑动
    const swipeLeft = addSwipeListener('left', 80, function () {
        dom_app__sidebar.value?.classList?.remove('state-open')
    })

    return {swipeRight, swipeLeft}
}

onMounted(() => {
    resetState()
    switchAnimations(state.value, 1) // 设置初始动画
    window.addEventListener('resize', handleResize)
    swipeListeners = initSwipeFunction()
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    const {swipeRight, swipeLeft} = swipeListeners
    swipeRight?.cleanup()
    swipeLeft?.cleanup()
})
</script>

<!--suppress CssInvalidPropertyValue -->
<style lang="scss" scoped>
.app {
    &__header {
        height: 48px;
        width: 100%;
        grid-row: 1;
        grid-column: 1 / 3;
        background-color: rgba(var(--secondary-color), 1);
        display: flex;
        align-items: center;

        @media screen and (max-width: $width-phone) {
            @include shadow(0, 2px);
        }
    }

    &__sidebar {
        //@include flex-layout($justify-content: space-between, $gap: 0, $direction: column);
        $sidebar-width-computer: 250px;
        $sidebar-width-ipad: 64px;
        $sidebar-transform-phone: - $sidebar-width-computer;

        width: $sidebar-width-computer;
        height: 100%;
        background-color: rgb(var(--card-background-color));
        @include shadow(2px, 0);

        &[data-animation="computer"] {
            @include flexible-animation($sidebar-width-ipad, $sidebar-width-computer, width, computer, true);
        }

        &[data-animation="phoneToIpad"] {
            @include flexible-animation(0, $sidebar-width-ipad, width, phoneToIpad, true);
        }

        &[data-animation="computerToIpad"] {
            @include flexible-animation($sidebar-width-computer, $sidebar-width-ipad, width, computerToIpad, true, true);
        }

        &[data-animation="phone"] {
            position: absolute;
            top: 0;
            left: $sidebar-transform-phone;
            @include flexible-animation($sidebar-transform-phone + $sidebar-width-ipad, $sidebar-transform-phone, left, phone, false, true);
            transition: left var(--transition-duration-fast) ease-in-out;
            z-index: 10;

            &.state-open {
                left: 0;
            }
        }
    }

    &__container {
        width: 100%;
        flex: 1;
        padding: 0 var(--margin-large);
        overflow-x: hidden;
        overflow-y: overlay;
        @include scrollbar-style();
    }
}
</style>
