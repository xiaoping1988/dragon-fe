<template>
    <ul class="draggable-container">
        <DraggableItem v-for="(item, index) in value"
                       :key="index"
                       :index="index"
                       :item="item"
                       :itemRefs="itemRefs">
            <slot :item="item" :index="index"></slot>
        </DraggableItem>
    </ul>
</template>

<script>
    import DraggableItem from './DraggableItem'
    import {overLapArea} from './utils'
    export default {
        name: 'DraggableContainer', // 拖拽容器
        components: {DraggableItem},
        props: {
            value: { // 拖拽对象数组
                type: Array,
                required: true
            }
        },
        data () {
            return {
                itemRefs: [], // 容器内的拖拽元素element集合
                helper: null, // 拖拽时的图像
                placeholder: null, // 拖拽元素占位
                containerRef: null, // 拖拽容器的element对象
                mousedown: false,
                moving: false, // 是否正在拖动元素
                movingInContainer: false, // 是否是在容器内移动
                events: { // 鼠标事件
                    mousedown: 'handleStart',
                    mousemove: 'handleMove',
                    mouseup: 'handleUp'
                },
                activeNode: null, // 当前正在拖动的element对象
                activeNodeRect: null, // 当前正在拖动的element对象矩形
                activeNodeRectArea: 0 // 当前正在拖动的element对象矩形面积
            }
        },
        methods: {
            init () {
                this.containerRef = this.$el
                this.addEvents()
            },
            addEvents () {
                Object.keys(this.events).forEach(eventName => {
                    window.addEventListener(eventName, this[this.events[eventName]], false)
                })
            },
            removeEvents () {
                Object.keys(this.events).forEach(eventName => {
                    window.removeEventListener(eventName, this[this.events[eventName]])
                })
            },
            initHelper () { //
                this.helper = this.activeNode.cloneNode(true)
                let nodeRect = this.activeNode.getBoundingClientRect()
                this.activeNodeRect = nodeRect
                this.activeNodeRectArea = nodeRect.width * nodeRect.height
                this.helper.style.position = 'fixed'
                this.helper.style.top = nodeRect.top + 'px'
                this.helper.style.left = nodeRect.left + 'px'
                this.helper.style.width = this.activeNode.clientWidth + 'px'
                this.helper.style.height = this.activeNode.clientHeight + 'px'
                this.helper.style.opacity = 0.6
                this.helper.style.zIndex = 100
                document.body.appendChild(this.helper)
            },
            removeHelper () {
                if (this.helper) {
                    document.body.removeChild(this.helper)
                }
            },
            initPlaceholder () {
                let placeholder = document.createElement('li')
                placeholder.style.visibility = 'hidden'
                placeholder.style.width = this.activeNode.clientWidth + 'px'
                placeholder.style.height = this.activeNode.clientHeight + 'px'
                placeholder.classList = this.activeNode.classList
                this.placeholder = placeholder
                this.containerRef.insertBefore(placeholder, this.activeNode)
            },
            removePlaceholder () {
                if (this.placeholder) {
                    this.containerRef.removeChild(this.placeholder)
                }
            },
            handleStart (e) {
                this.mousedown = true
            },
            beginMove (e) { // 移动前的准备工作
                this.activeNode = this.getActiveNode(e.target)
                if (this.activeNode) {
                    this.initHelper()
                    this.initPlaceholder()
                    this.moving = true
                    this.movingInContainer = true
                    this.activeNode.style.display = 'none'
                    return true
                }
                return false
            },
            getActiveNode (el) {
                while (el) {
                    if (el.sortableInfo) return el
                    el = el.parentNode
                }
                return null
            },
            handleMove (e) {
                if (!this.mousedown) { // 鼠标未按下,不可移动
                    return
                }
                if (!this.moving) { // 开始移动
                    let canMove = this.beginMove(e)
                    if (!canMove) {
                        return
                    }
                }
                this.helper.style.top = (e.clientY - (this.helper.clientHeight / 2)) + 'px'
                this.helper.style.left = (e.clientX - (this.helper.clientWidth / 2)) + 'px'
                this.handleMovePlaceholder(e)
            },
            handleMovePlaceholder (e) { // 移动占位
                let maxArea = 0
                let targetPreIndex = -1
                for (let i = 0; i < this.itemRefs.length; i++) {
                    if (this.itemRefs[i].sortableInfo.oldIndex === this.activeNode.sortableInfo.oldIndex) {
                        continue
                    }
                    let nodeRect = this.itemRefs[i].getBoundingClientRect()
                    let activeNodeRect = this.activeNode.getBoundingClientRect()
                    let area = overLapArea(activeNodeRect, nodeRect)
                    if (area > 0) {
                        if (area > maxArea) {
                            maxArea = area
                            targetPreIndex = i
                        }
                    }
                }
                console.log('tttt: ' + targetPreIndex)
                if (targetPreIndex >= 0) {
                    this.containerRef.removeChild(this.placeholder)
                    this.containerRef.insertBefore(this.placeholder, this.itemRefs[targetPreIndex])
                }
            },
            handleUp (e) {
                this.handleSortEnd(e)
                this.moving = false
                this.mousedown = false
                this.activeNode = null
                this.removeHelper()
                this.removePlaceholder()
            },
            handleSortEnd (e) {

            }
        },
        mounted () {
            this.init()
        },
        beforeDestory () {
            this.removeEvents()
        }
    }
</script>