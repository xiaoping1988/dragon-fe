<template>
    <li class="draggable-item">
        <slot></slot>
    </li>
</template>

<script>
    export default {
        name: 'DraggableItem', // 拖拽单元对象
        props: {
            index: Number,
            item: [String, Number, Object, Array],
            itemRefs: Array
        },
        data () {
            return {

            }
        },
        methods: {
            initItem () {
                const node = this.$el
                node.sortableInfo = {
                    oldIndex: this.index,
                    item: this.item
                }
                this.itemRefs.push(node)
            }
        },
        mounted () {
            this.initItem()
        }
    }
</script>

<style>
    .draggable-item {
        cursor: pointer;
        padding: 0px;
        margin: 5px 0px 0px;
    }
</style>