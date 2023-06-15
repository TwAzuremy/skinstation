<template>
    <div class="settings">
        <settings-panel title="语言">
            <settings-panel-item title="语言" description="设置全局语言">
                <dropdown :default-select="0" :data="language"></dropdown>
            </settings-panel-item>
        </settings-panel>
        <settings-panel title="外观">
            <settings-panel-item title="颜色" condition="3" description="设置全局颜色以及透明度" ref="custom_color">
                <dropdown :default-select="0" :data="['跟随系统', '浅色模式', '深色模式', '自定义模式']"
                    @change="needExtensions.selectColor"></dropdown>
                <template v-slot:extend>
                    自定义颜色
                </template>
            </settings-panel-item>
        </settings-panel>
        <settings-panel title="测试">
            <settings-panel-item title="测试 1" description="内容" :condition="true" ref="test">
                <switch-button @change="needExtensions.test"></switch-button>
                <template v-slot:extend>
                    Hello
                </template>
            </settings-panel-item>
            <settings-panel-item title="测试 2" description="内容" :condition="'b'" ref="test2">
                <dropdown :defaultSelect="0" :data="dropdownData" @change="needExtensions.test2"></dropdown>
                <template v-slot:extend>
                    World
                </template>
            </settings-panel-item>
            <settings-panel-item title="测试 3" description="内容" :condition="''" ref="test3">
                <custom-input placeholder="请输入"></custom-input>
                <template v-slot:extend>
                    Welcome
                </template>
            </settings-panel-item>
        </settings-panel>
    </div>
</template>

<script setup name="settings">
import SettingsPanel from "@/components/basic/card/settings-panel.vue";
import SettingsPanelItem from "@/components/basic/card/settings-panel-item.vue";
import SwitchButton from "@/components/basic/button/switch-button.vue";
import { computed, ref } from "vue";
import Dropdown from "@/components/basic/dropdown/dropdown.vue";
import { useStore } from "vuex";
import CustomInput from "@/components/basic/input/custom-input.vue";

const store = useStore()
const dropdownData = [
    {
        key: 'a',
        value: '选项 a'
    },
    {
        key: 'b',
        value: '选项 b'
    },
    {
        key: 'c',
        value: '选项 c'
    },
]
const language = computed(() => store.state.storeLanguage).value.language

const test = ref(null)
const test2 = ref(null)
const custom_color = ref(null)

const needExtensions = {
    test(value) {
        test.value.checkCondition(value)
    },
    test2(args) {
        test2.value.checkCondition(args[1])
    },
    selectColor(value) {
        custom_color.value.checkCondition(value[1])
    }
}
</script>

<style scoped lang="scss">
.settings {
    @include flex-layout($gap: var(--margin-large), $direction: column);
    padding: var(--margin-large) 0;
    height: 100%;
}
</style>