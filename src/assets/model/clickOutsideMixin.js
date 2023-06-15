import {onMounted, onUnmounted} from "vue";

/**
 * 点击其他地方
 * @param ref 节点 Ref, 控制开关的节点, 需要验证这个节点是否有 @param conditionClassname 类名
 * @param classname 需要识别的类名, 点击除了这个类名外的其他地方会执行 @param func
 * @param conditionClassname 控制开关的类名, 控制组件变化的类名
 * @param func 需要执行的方法, 当 @param ref 存在 @param conditionClassname 类名时, 并且是点击 classname (以及其子元素) 以外的地方会执行
 */
export default function clickOutsideMixin(ref, classname, conditionClassname, func) {
    function handleClickOutside(event) {
        ref.value.classList.contains(conditionClassname) && !event.target.closest(classname) ? func() : null
    }

    onMounted(() => {
        document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside)
    })
}