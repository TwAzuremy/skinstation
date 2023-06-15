<template>
    <div class="about">
        <accordion :expanded="0" load-style="order">
            <accordion-item title="开发人员" :order="1">
                开发: 天蔚
            </accordion-item>
            <accordion-item title="素材来源" :order="2">
                素材: 一堆
            </accordion-item>
        </accordion>
    </div>
</template>

<script setup name="about">
import Accordion from "@/components/basic/accordion/accordion.vue";
import AccordionItem from "@/components/basic/accordion/accordion-item.vue";

</script>

<style scoped lang="scss">
.about {
    margin: var(--margin-large) 0;
}
</style>