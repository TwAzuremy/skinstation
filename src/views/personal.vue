<template>
    <div class="personal">
        <avatar :url="user.avatarImgPath" :name="user.nickname"
                :profile="user.personalizedSignature"></avatar>
        <div class="personal__container">
            <h2 class="personal__card__title">个人资料</h2>
            <divider></divider>
            <div class="personal__card personal__data style-unequalParts">
                <h4 class="personal__title">昵称</h4>
                <span class="personal__info">{{ user.nickname }}</span>
                <h4 class="personal__title">性别</h4>
                <span class="personal__info">{{ user.gender }}</span>
                <h4 class="personal__title">国家</h4>
                <span class="personal__info">{{ user.country }}</span>
                <h4 class="personal__title">邮箱</h4>
                <span class="personal__info">{{ user.email }}</span>
                <h4 class="personal__title">省份</h4>
                <span class="personal__info">{{ user.province }}</span>
                <h4 class="personal__title">生日</h4>
                <span class="personal__info">{{ user.birth }}</span>
            </div>
            <div class="personal__container__operation">
                <custom-button>
                    <svg-edit></svg-edit>
                    修改
                </custom-button>
            </div>
        </div>
        <div class="personal__container">
            <h2 class="personal__card__title">账号操作</h2>
            <divider></divider>
            <div class="personal__card style-equalParts">
                <custom-button btn-style="fill">
                    <svg-eye></svg-eye>
                    资料可见
                </custom-button>
                <custom-button btn-style="fill">
                    <svg-spanner></svg-spanner>
                    修改密码
                </custom-button>
                <custom-button btn-style="error">
                    <svg-trash2></svg-trash2>
                    删除账号
                </custom-button>
            </div>
        </div>
    </div>
</template>

<script setup name="personal">
import Avatar from "@/components/basic/avatar/avatar.vue";
import {useStore} from "vuex";
import {computed} from "vue";
import CustomButton from "@/components/basic/button/custom-button.vue";
import SvgEdit from "@/components/svg/svg-edit.vue";
import Divider from "@/components/basic/divider/divider.vue";
import SvgSpanner from "@/components/svg/svg-spanner.vue";
import SvgTrash2 from "@/components/svg/svg-trash-2.vue";
import SvgEye from "@/components/svg/svg-eye.vue";

const store = useStore()
const user = computed(() => store.state.storeUser.user)
</script>

<style scoped lang="scss">
.personal {
    width: 100%;
    padding: var(--margin-large) 0;
    @include flex-layout($direction: column);
    color: rgb(var(--text-color-light-mode));

    .avatar {
        width: 100%;
    }

    &__container {
        width: 100%;
        flex: 1;
        padding: var(--margin-large);
        @include flex-layout($direction: column);
        border-radius: var(--radius-middle);
        @include shadow(0, 0);
        background-color: rgba(var(--card-background-color), var(--card-background-opacity));

        .personal__card {
            width: 100%;
            display: grid;
            grid-gap: var(--margin-middle);
            align-items: center;

            &.style-unequalParts {
                grid-template-columns: repeat(4, 1fr 2fr);

                @media screen and (max-width: $width-ipad) {
                    grid-template-columns: repeat(2, 1fr 2fr);
                }

                @media screen and (max-width: $width-phone) {
                    grid-template-columns: 1fr 3fr;
                }

                @media screen and (max-width: ($width-phone / 2)) {
                    grid-template-columns: 1fr 2fr;
                }
            }

            &.style-equalParts {
                grid-template-columns: repeat(auto-fill, minmax(108px, 1fr));
            }

            .custom-button {
                min-width: 108px;
                max-width: 100%;
            }
        }

        &__operation {
            width: 100%;
            @include flex-layout($justify-content: flex-end);

            .custom-button {
                width: auto;
            }
        }

        h4.personal__title {
            position: relative;
            text-align-last: justify;
            font-size: 1.125em;

            &::after {
                position: absolute;
                top: 0;
                left: 103%;
                content: ':';
            }
        }

        span.personal__info {
            margin-left: var(--margin-middle);
            font-size: 1em;
        }
    }
}
</style>