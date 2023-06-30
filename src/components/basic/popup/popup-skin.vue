<template>
    <div class="popup__skin" ref="dom_popup__skin">
        <div class="popup__skin__title">
            <h3>皮肤预览</h3>
            <custom-button btn-style="error-hover" @click="close">
                <svg-x></svg-x>
            </custom-button>
        </div>
        <divider></divider>
        <div class="popup__container">
            <div class="canvas__container" ref="dom_canvas__container">
                <canvas ref="dom_canvas__skinView3d"></canvas>
                <div class="canvas__operation">
                    <radio-group group-name="skin-animation">
                        <radio @click="selectedAnimation('idle')" :default-checked="true" :show-round-dot="false">
                            <svg-stand></svg-stand>
                            <bubble direction="top" mode="hover" sidelined="center" :is-event="false">站立</bubble>
                        </radio>
                        <radio @click="selectedAnimation('walk')" :show-round-dot="false">
                            <svg-walk></svg-walk>
                            <bubble direction="top" mode="hover" sidelined="center" :is-event="false">走路</bubble>
                        </radio>
                        <radio @click="selectedAnimation('run')" :show-round-dot="false">
                            <svg-run></svg-run>
                            <bubble direction="top" mode="hover" sidelined="center" :is-event="false">跑步</bubble>
                        </radio>
                        <radio @click="selectedAnimation('fly')" :show-round-dot="false">
                            <svg-swim></svg-swim>
                            <bubble direction="top" mode="hover" sidelined="center" :is-event="false">游泳</bubble>
                        </radio>
                    </radio-group>
                    <divider direction="v" margin="small"></divider>
                    <custom-button btn-style="fill" @click="switchAnimation">
                        <svg-play v-if="animationPaused"></svg-play>
                        <svg-pause v-if="!animationPaused"></svg-pause>
                        <bubble direction="top" mode="hover" :is-event="false" sidelined="center">
                            {{ animationPaused ? '播放' : '暂停' }}
                        </bubble>
                    </custom-button>
                    <divider direction="v" margin="small"></divider>
                    <switch-icon-button btn-style="selected" @change="switchRotate" ref="dom_rotateController">
                        <svg-rotate-ccw></svg-rotate-ccw>
                        <bubble direction="top" mode="hover" :is-event="false" sidelined="center">
                            {{ rotatePlay ? '暂停旋转' : '开启旋转' }}
                        </bubble>
                    </switch-icon-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup name="popup-skin">
import CustomButton from "@/components/basic/button/custom-button.vue";
import SvgX from "@/components/svg/svg-x.vue";
import {onMounted, onUnmounted, ref, watch} from "vue";
import Divider from "@/components/basic/divider/divider.vue";
import RadioGroup from "@/components/basic/radio/radio-group.vue";
import Radio from "@/components/basic/radio/radio.vue";
import SvgWalk from "@/components/svg/svg-walk.vue";
import SvgRun from "@/components/svg/svg-run.vue";
import SvgSwim from "@/components/svg/svg-swim.vue";
import SvgStand from "@/components/svg/svg-stand.vue";
import Bubble from "@/components/basic/bubble/bubble.vue";
import SvgPlay from "@/components/svg/svg-play.vue";
import SvgPause from "@/components/svg/svg-pause.vue";
import SvgRotateCcw from "@/components/svg/svg-rotate-ccw.vue";
import SwitchIconButton from "@/components/basic/button/switch-icon-button.vue";

const props = defineProps({
    skinLocation: String
})
const emits = defineEmits(['close', 'open'])

const dom_popup__skin = ref(null)
const dom_canvas__container = ref(null)
const dom_canvas__skinView3d = ref(null)
const dom_rotateController = ref(null)

const skin3d = ref(props.skinLocation)
const animationPaused = ref(false)
const rotatePlay = ref(false)
let skinViewer

const availableAnimations = {
    idle: new skinview3d.IdleAnimation(),
    walk: new skinview3d.WalkingAnimation(),
    run: new skinview3d.RunningAnimation(),
    fly: new skinview3d.FlyingAnimation()
};

function close() {
    dom_popup__skin.value.classList.remove('show')
    emits('close', false)
}

function open() {
    dom_popup__skin.value.classList.remove('show')
    emits('open', true)
}

function drawSkin3d() {
    skinViewer.loadSkin(skin3d.value)
}

function changeCanvasSize() {
    if (window.innerWidth < 768) {
        skinViewer.width = dom_canvas__container.value.clientWidth
        skinViewer.height = dom_canvas__container.value.clientHeight
    }
}

function switchAnimation(play = null) {
    if (rotatePlay.value && (play ?? !animationPaused.value)) {
        dom_rotateController.value.$el.click()
    }

    animationPaused.value = play ?? !animationPaused.value
    skinViewer.animation.paused = animationPaused.value
}

function switchRotate(play = null) {
    rotatePlay.value = play ?? !rotatePlay.value
    skinViewer.autoRotate = rotatePlay.value
}

function selectedAnimation(animation) {
    skinViewer.animation = availableAnimations[animation]
    switchAnimation(false)
}

function initSkinView3dOption() {
    skinViewer = new skinview3d.SkinViewer({
        canvas: dom_canvas__skinView3d.value,
        width: dom_canvas__container.value.clientWidth,
        height: dom_canvas__container.value.clientHeight,
        skin: skin3d.value ?? 'img/skin/Steve.png'
    })

    skinViewer.animation = availableAnimations.idle
}

onMounted(() => {
    initSkinView3dOption()
})

onUnmounted(() => {
    skinViewer.dispose()
})

watch(() => props.skinLocation, (newValue) => {
    skin3d.value = newValue
    drawSkin3d()
})

defineExpose({
    close,
    open
})
</script>

<style scoped lang="scss">
.popup {
    color: rgb(var(--text-color-light-mode));

    &__skin {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background-color: rgba(var(--card-background-color), var(--card-background-opacity));
        @include shadow(0, 0);
        border-radius: var(--radius-middle);
        padding: var(--margin-large);
        @include flex-layout($direction: column);
        min-width: 250px;
        transition: transform var(--transition-duration-default) ease-in-out;
        $width: 500px;
        width: $width;
        height: $width * 3 / 4;

        &.show {
            transform: translate(-50%, -50%) scale(1);
        }

        @media screen and (max-width: $width-phone) {
            $width: 250px;
            width: $width;
            height: $width * 4 / 3;
        }
    }

    &__skin__title {
        width: 100%;
        @include flex-layout(center, $gap: 0);

        h3 {
            flex: 1;
        }

        .custom-button {
            width: auto;
            padding: var(--margin-middle);
        }
    }

    &__container {
        flex: 1;
        width: 100%;

        .canvas__container {
            position: relative;
            height: 100%;
        }

        .canvas__operation {
            position: absolute;
            bottom: var(--margin-middle);
            left: 50%;
            transform: translateX(-50%);
            @include flex-layout(center, $gap: var(--margin-small));
            height: 56px;
            padding: var(--margin-middle);
            background-color: rgba(var(--card-background-black), var(--opacity-button-hover));
            border-radius: var(--radius-middle);

            .bubble {
                border-radius: var(--radius-small);
                padding: var(--margin-small) var(--margin-middle);
                color: rgb(var(--secondary-color));
                font-size: 0.875em;
            }

            .custom-button {
                position: relative;
                width: auto;
                padding: var(--margin-middle);
                bottom: 0;

                ::v-deep(svg) {
                    width: 1.714285em;
                    height: 1.714285em;
                }

                .bubble {
                    font-size: 1em;
                }
            }

            .switchIconButton {
                position: relative;
            }

            @media screen and (max-width: $width-phone) {
                height: 48px;
                padding: var(--margin-small);

                ::v-deep(svg) {
                    width: 1em;
                    height: 1em;
                }

                .radio__group {
                    gap: var(--margin-small);
                }

                .custom-button,
                .radio,
                .switchIconButton {
                    width: 32px;
                    height: 32px;
                }
            }
        }
    }
}
</style>