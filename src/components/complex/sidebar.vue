<template>
    <ul class="sidebar" ref="dom_sidebar">
        <li class="sidebar__back">
            <svg-x @click="closeSidebar"></svg-x>
        </li>
        <template v-for="(key, i) in sidebarKeys" :key="i">
            <sidebar-button v-for="(value, j) in sidebarList[key]" :key="j" :to="value[2]"
                            :text="value[1]" :data-route="value[2]">
                <component :is="icons[value[0]]"></component>
            </sidebar-button>
            <divider v-if="i + 1 !== sidebarKeys.length"></divider>
        </template>
    </ul>
</template>

<script setup name="sidebar">
import SidebarButton from "@/components/basic/button/sidebar-button.vue";
import {computed, onMounted, ref, watch} from "vue";
import SvgHome from "@/components/svg/svg-home.vue";
import SvgInfo from "@/components/svg/svg-info.vue";
import SvgSettings from "@/components/svg/svg-settings.vue";
import Divider from "@/components/basic/divider/divider.vue";
import {useStore} from "vuex";
import SvgUser from "@/components/svg/svg-user.vue";
import SvgStar from "@/components/svg/svg-star.vue";
import SvgPackage from "@/components/svg/svg-package.vue";
import {useRouter} from "vue-router";
import SvgX from "@/components/svg/svg-x.vue";

const router = useRouter()

const dom_sidebar = ref(null)
let dom_sidebar__buttons

const sidebarList = computed(() => useStore().state.storeSidebar)
const sidebarKeys = Object.keys(sidebarList.value)

const icons = {
    'svg-home': SvgHome,
    'svg-user': SvgUser,
    'svg-star': SvgStar,
    'svg-package': SvgPackage,
    'svg-info': SvgInfo,
    'svg-settings': SvgSettings
}

const emits = defineEmits(['back'])
const closeSidebar = () => {
    emits('back')
}

/**
 * 清除已选择的样式
 */
function clearSelect() {
    dom_sidebar.value.querySelector('.sidebar__button.select')?.classList.remove('select')
}

/**
 * 通过 path 匹配侧边栏按钮
 * @param route 路由 path
 */
function switchPages(route) {
    dom_sidebar__buttons.forEach(button => {
        if (route === button.dataset.route) {
            clearSelect()
            button.classList.add('select')
        }
    })
}

onMounted(() => {
    dom_sidebar__buttons = dom_sidebar.value.querySelectorAll('.sidebar__button')
    switchPages('/')
})

watch(() => router.currentRoute.value.path, (newValue) => {
    switchPages(newValue)
})
</script>

<style scoped lang="scss">
.sidebar {
    @include flex-layout($direction: column);
    padding: var(--margin-middle);
    width: 100%;

    &__back {
        width: 100%;
        padding: var(--margin-small) 0;
        color: rgb(var(--text-color-light-mode));
        display: none;

        svg {
            cursor: pointer;
        }

        @media screen and (max-width: $width-phone) {
            @include flex-layout(center, flex-end);
        }
    }
}
</style>