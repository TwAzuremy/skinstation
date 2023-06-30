<template>
    <div class="titleBar">
        <p class="titleBar__sidebar" @click="openSidebar">
            <svg-menu></svg-menu>
        </p>
        <h2 class="titleBar__title">Skin Station</h2>
        <div class="titleBar__avatar">
            <div class="titleBar__avatar__container" v-if="isLogin">
                <img :src="userInfo?.avatarImgPath" alt="avatar">
                <bubble class="bubble-no-click" direction="bottom" sidelined="right" mode="click">
                    <custom-button btn-style="text" @click="to('/personal')">
                        <svg-user></svg-user>
                        个人资料
                    </custom-button>
                    <custom-button btn-style="text" @click="to('/favourites')">
                        <svg-star></svg-star>
                        收藏
                    </custom-button>
                    <divider class="bubble-no-click" margin="small"></divider>
                    <custom-button btn-style="text" @click="logout">
                        <svg-log-out></svg-log-out>
                        登出
                    </custom-button>
                </bubble>
            </div>
            <title-bar-button v-if="!isLogin" @click="login"></title-bar-button>
        </div>
    </div>
</template>

<script setup name="titleBar">
import SvgMenu from "@/components/svg/svg-menu.vue";
import TitleBarButton from "@/components/basic/button/titleBar-button.vue";
import {computed, ref} from "vue";
import Bubble from "@/components/basic/bubble/bubble.vue";
import CustomButton from "@/components/basic/button/custom-button.vue";
import SvgUser from "@/components/svg/svg-user.vue";
import SvgStar from "@/components/svg/svg-star.vue";
import Divider from "@/components/basic/divider/divider.vue";
import SvgLogOut from "@/components/svg/svg-log-out.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const store = useStore()
const user = computed(() => store.state.storeUser)
const isLogin = ref(user.value.isLogin)

const emits = defineEmits(['click'])
const router = useRouter()

const userInfo = ref({})

const openSidebar = () => {
    emits('click')
}

function to(path) {
    router.push({path})
}

function login() {
    store.commit('storeUser/setIsLogin', true)
    userInfo.value = user.value.user
    isLogin.value = user.value.isLogin
}

function logout() {
    store.commit('storeUser/setIsLogin', false)
    isLogin.value = user.value.isLogin
}
</script>

<style scoped lang="scss">
.titleBar {
    width: 100%;
    color: rgb(var(--text-color-dark-mode));
    margin: 0 var(--margin-large);
    @include flex-layout(center, space-between, $gap: 0);

    &__sidebar {
        display: none;
        height: 1.5em;
        cursor: pointer;

        svg {
            width: 1.5em;
            height: 1.5em;
        }

        @media screen and (max-width: $width-phone) {
            display: block;
        }
    }

    &__title {
        flex: 1;
        text-align: left;
        font-size: 1.5em;
        font-family: var(--font-minecraft);
        line-height: 1.5em;
        user-select: none;

        @media screen and (max-width: $width-phone) {
            & {
                text-align: center;
            }
        }
    }

    &__avatar {
        &__container {
            position: relative;
            height: 2.25em;

            img {
                width: 2.25em;
                height: 2.25em;
                border-radius: 50%;
                cursor: pointer;
            }

            .bubble {
                padding: var(--margin-middle);
                @include flex-layout($gap: var(--margin-small), $direction: column);
            }
        }
    }
}
</style>