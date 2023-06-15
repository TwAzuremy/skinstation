<template>
    <div class="accordion" ref="dom_accordion" :class="`load__style-${loadStyle}`">
        <slot></slot>
    </div>
</template>

<script setup name="accordion">
import {onMounted, ref} from "vue";
import {getCSSRootValue} from "@/assets/model/function";

const props = defineProps({
    name: String,
    expanded: Number,
    loadStyle: String
})

const dom_accordion = ref(null)

function getAccordionItem() {
    return dom_accordion.value.querySelectorAll('.accordion__item')
}

/**
 * 设置手风琴 item 的展开高度
 * @param accordionItem
 */
function setAccordionItemContainerHeight(accordionItem) {
    const container = accordionItem?.querySelector('.accordion__item__container')

    if (!accordionItem || accordionItem?.classList.contains('checked')) {
        accordionItem?.classList.remove('checked')
        container?.removeAttribute('style')
    } else {
        accordionItem.classList.add('checked')
        container.style.height = `${container.scrollHeight}px`
    }
}

/**
 * 初始化手风琴 item 的点击事件
 * @param accordionItems
 */
function setAccordionEventListener(accordionItems) {
    accordionItems.forEach((item) => {
        item.querySelector('.accordion__item__titleBar').event_on('click', () => {
            const itemChecked = dom_accordion.value.querySelector('.accordion__item.checked');
            setAccordionItemContainerHeight(item);

            if (itemChecked && itemChecked !== item) {
                setAccordionItemContainerHeight(itemChecked);
            }
        });
    });
}

onMounted(() => {
    const accordions = getAccordionItem()
    if (props.expanded !== undefined) {
        setAccordionItemContainerHeight(accordions[props.expanded])
    }
    setAccordionEventListener(accordions)
})
</script>

<style scoped lang="scss">
.accordion {
    @include flex-layout($direction: column);
}
</style>