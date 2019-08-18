<template>
    <li class="d-chart-item"
        v-clickoutside="clickOutside"
        :id="'chart_' + chart.id"
        :class="{'edit-chart': chart.editAuth}"
        @mousedown="mouseDownDrag">
        <DChartContainer :chart="chart"
                         :globalFilterValue="globalFilterValue"
                         :resizeCount="resizeCount"
                         :visibled="visibled"></DChartContainer>
        <div class="d-chart-size-btn"
             v-if="chart.editAuth"
             :id="'size_btn_' + chart.id"
             @mousedown="mouseDownResize">
            <i class="fa fa-arrow-right"></i>
        </div>
    </li>
</template>

<script>
    import DChartContainer from './ChartContainer.vue'
    import clickoutside from '../../../directives/clickoutside'
    export default {
        name: 'DChartItem',
        components: {DChartContainer},
        directives: {clickoutside},
        props: {
            chart: Object,
            globalFilterValue: String,
            visibled: Boolean // 是否可见过了
        },
        data () {
            return {
                count: 0,
                resizeCount: 0, //
                dom: null,
                isResizing: false, // 是否正在resize
                isMoved: false // 图表是否有移动过
            }
        },
        methods: {
            clickOutside () { // 取消图表的聚焦
                this.count = this.count + 1
                if (this.count > 1) {
                    document.getElementById('chart_' + this.chart.id).classList.remove('active')
                }
            },
            mouseMoveResize (e) { // resize图表的鼠标移动事件
                let vue = this
                vue.resizeCount = vue.resizeCount + 1
                vue.$emit('resizing', vue.dom, e.clientX, e.clientY)
            },
            mouseUpResize (e) { // resize图表的鼠标释放事件
                let vue = this
                vue.isResizing = false
                vue.$emit('resize-over', vue.dom, e.clientX, e.clientY)
                document.documentElement.removeEventListener('mousemove', vue.mouseMoveResize)
                document.documentElement.removeEventListener('mouseup', vue.mouseUpResize)
            },
            mouseDownResize (e) { // resize图表的鼠标按下事件
                let vue = this
                vue.isResizing = true
                vue.dom = document.getElementById('chart_' + this.chart.id)
                vue.chart.resizeX = e.clientX
                vue.chart.resizeY = e.clientY
                document.documentElement.addEventListener('mousemove', vue.mouseMoveResize)
                document.documentElement.addEventListener('mouseup', vue.mouseUpResize)
            },
            mouseDownDrag (e) { // 拖动图表的鼠标按下事件
                let vue = this
                if (vue.isResizing || !vue.chart.editAuth) {
                    return
                }
                vue.chart.dragStartX = e.clientX // 鼠标按下拖动时的位置 x
                vue.chart.dragStartY = e.clientY // 鼠标按下拖动时的位置 y
                vue.dom = document.getElementById('chart_' + this.chart.id)
                vue.chart.dragStartLeft = vue.dom.offsetLeft // 鼠标按下拖动时,图表的left位置
                vue.chart.dragStartTop = vue.dom.offsetTop // 鼠标按下拖动时,图表的top位置
                document.documentElement.addEventListener('mousemove', vue.mouseMoveDrag)
                document.documentElement.addEventListener('mouseup', vue.mouseUpDrag)
            },
            mouseUpDrag (e) { // 拖动图表的鼠标释放事件
                let vue = this
                if (vue.isMoved) {
                    vue.$emit('move-over', vue.dom, e.clientX, e.clientY)
                }
                vue.isMoved = false
                document.documentElement.removeEventListener('mousemove', vue.mouseMoveDrag)
                document.documentElement.removeEventListener('mouseup', vue.mouseUpDrag)
            },
            mouseMoveDrag (e) { // 拖动图表的鼠标移动事件
                let vue = this
                if (vue.chart.dragStartX !== e.clientX || vue.chart.dragStartY !== e.clientY) {
                    vue.isMoved = true
                }
                vue.$emit('moving', vue.dom, e.clientX, e.clientY)
            },
            addResizeCount () {
                this.resizeCount = this.resizeCount + 1
            }
        },
        mounted () {
        }
    }
</script>

<style>
    .d-chart-item {
        padding: 0px!important;
        position: absolute;
        background: #fff;
    }

    .edit-chart {
        cursor: move;
    }

    .d-chart-item.active {
        border: 3px solid #409eff;
        box-sizing: border-box;
    }

    .d-chart-item:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    .d-chart-item:hover .d-chart-size-btn {
        display: block;
    }

    .d-chart-size-btn {
        position: absolute;
        display: none;
        text-align: center;
        right: 0px;
        bottom: 0px;
        width: 14px;
        height: 14px;
        color: rgba(10,18,32,.64);
        cursor: se-resize!important;
    }

    .d-chart-size-btn i {
        transform: rotate(45deg);
        cursor: se-resize!important;
    }
</style>