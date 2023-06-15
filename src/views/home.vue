<template>
    <div class="home layout-masonry">
        <div class="layout-masonry__item" style="--load-order: 1;">
            <home-card title="系统信息">
                <ul id="item__systemInfo">
                    <li>
                        <component class="system__icon" :is="icons[osInfo.icon]"></component>
                        <span>{{ osInfo.name }}</span>
                    </li>
                    <li>
                        <component class="browser__icon" :is="icons[browserInfo.icon]"></component>
                        <span>{{ browserInfo.name }}</span>
                    </li>
                </ul>
            </home-card>
        </div>
        <div class="layout-masonry__item" style="--load-order: 2;">
            <home-card title="项目状态">
                <p>项目正在施工中... 🚚</p>
                <p>当前正在制作"主页 / 关于"中</p>
                <p>'设置'页面设计中... ✍️</p>
            </home-card>
        </div>
    </div>
</template>

<script setup name="home">
import HomeCard from "@/components/basic/card/home-card.vue";
import platform from 'platform'
import SvgBrowser from "@/components/svg/svg-browser.vue";
import SvgEdge from "@/components/svg/svg-edge.vue";
import SvgChrome from "@/components/svg/svg-chrome.vue";
import SvgFirefox from "@/components/svg/svg-firefox.vue";
import SvgSafari from "@/components/svg/svg-safari.vue";
import {onMounted, ref} from "vue";
import SvgWindows from "@/components/svg/svg-windows.vue";
import SvgMacos from "@/components/svg/svg-macos.vue";
import SvgLinux from "@/components/svg/svg-linux.vue";
import SvgUbuntu from "@/components/svg/svg-ubuntu.vue";
import SvgAndroid from "@/components/svg/svg-android.vue";
import SvgSystem from "@/components/svg/svg-system.vue";

const icons = {
    'svg-browser': SvgBrowser,
    'svg-edge': SvgEdge,
    'svg-chrome': SvgChrome,
    'svg-firefox': SvgFirefox,
    'svg-safari': SvgSafari,
    'svg-windows': SvgWindows,
    'svg-macos': SvgMacos,
    'svg-linux': SvgLinux,
    'svg-ubuntu': SvgUbuntu,
    'svg-android': SvgAndroid,
    'svg-system': SvgSystem
}

const osInfo = ref({
    icon: 'svg-system',
    name: ''
})

const browserInfo = ref({
    icon: 'svg-browser',
    name: ''
})

function getBrowser() {
    const browserName = platform.name.toLowerCase()

    if (browserName.indexOf('edge') !== -1) {
        return 'edge'
    } else if (browserName.indexOf('chrome') !== -1) {
        return 'chrome'
    } else if (browserName.indexOf('firefox') !== -1) {
        return 'firefox'
    } else if (browserName.indexOf('safari') !== -1) {
        return 'safari'
    }

    return 'browser'
}

function getOS() {
    const osName = platform.os.family.toLowerCase()

    if (osName.indexOf('windows') !== -1) {
        return 'windows'
    } else if (osName.indexOf('linux') !== -1) {
        return 'linux'
    } else if (osName.indexOf('ubuntu') !== -1) {
        return 'ubuntu'
    } else if (osName.indexOf('mac') !== -1) {
        return 'macos'
    } else if (osName.indexOf('android') !== -1) {
        return 'android'
    }

    return 'system'
}

onMounted(() => {
    osInfo.value.name = platform.os.family + ' ' + (platform.os.version ?? '')
    osInfo.value.icon = 'svg-' + getOS()
    browserInfo.value.name = platform.name
    browserInfo.value.icon = 'svg-' + getBrowser()
})
</script>

<style scoped lang="scss">
.home {
    padding: calc(var(--margin-large) / 2) 0;

    &.layout-masonry {
        column-count: 4;
        column-gap: var(--margin-large);

        .layout-masonry__item {
            padding: calc(var(--margin-large) / 2) 0;
            opacity: 0;
            animation: fade-in var(--animation-duration-default) forwards calc(var(--load-order) * 0.1s);
        }

        @media screen and (max-width: $width-ipad) {
            & {
                column-count: 3;
            }
        }

        @media screen and (max-width: $width-phone) {
            & {
                column-count: 2;
            }
        }

        @media screen and (max-width: $width-ipad / 2) {
            & {
                column-count: 1;
            }
        }
    }

    &__card {
        width: 100%;
        break-inside: avoid;
        color: rgb(var(--text-color-light-mode));

        ul#item__systemInfo {
            width: 100%;
            @include flex-layout($direction: column);

            li {
                @include flex-layout();
            }

            span {
                font-size: 0.875em;
            }
        }
    }

    .browser__icon,
    .system__icon {
        width: 1.5em;
        height: 1.5em;
        color: rgba(var(--secondary-color), var(--text-opacity));
    }
}
</style>