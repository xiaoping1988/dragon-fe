<template>
    <div class="d-dash-chart" :id="'dash_tab_' + tabId">
        <ul class="d-chart-item-list" :id="'container_tab_' + tabId">
            <DChartItem v-for="chart in data"
                        :ref="'chart_item_' + chart.id"
                        :key="chart.id"
                        :chart="chart"
                        :class="{active: chart.id + '' === activeChartId}"
                        :visibled="chart.visibled"
                        @resizing="(dom, x, y) => {resizeChart(chart, dom, x, y)}"
                        @resize-over="(dom, x, y) => {resizeChartOver(chart, dom, x, y)}"
                        @moving="(dom, x, y) => {moveChart(chart, dom, x, y)}"
                        @move-over="(dom, x, y) => {moveChartOver(chart, dom, x, y)}"></DChartItem>
        </ul>
    </div>
</template>

<script>
    import {updateChartPosition} from '../../../services/data-visual/chart'
    import DChartItem from './ChartItem.vue'
    export default {
        name: 'DChartList',
        components: {DChartItem},
        props: {
            containerWidth: Number, // 图表列表容器的实际宽度
            tabId: Number,
            data: Array,
            activeTabId: [Number, String],
            activeChartId: [Number, String]
        },
        data () {
            return {
                chartMargin: 4, // 图表之间的间隔
                minContainerWidth: 980, // 图表列表容器的最小宽度
                datumWidth: 0, // 计算chart样式的基准仪表盘容器宽度
                lastScrollTop: 0 // 上一次滚动条的位置，用来判断向上滚还是向下滚
            }
        },
        methods: {
            setStyle () {
                this.$nextTick(function () {
                    if (this.data) {
                        this.datumWidth = this.minContainerWidth > this.containerWidth ? this.minContainerWidth : this.containerWidth
                        this.setContainerHeight()
                        this.data.forEach(c => {
                            this.setChartItemStyle(c)
                        })
                        this.scrollToActiveChart()
                        this.setChartVisibled()
                    }
                })
            },
            setChartItemStyle (chart) { // 设置chart的width，height，left，top四个样式
                let tmpW = this.datumWidth
                let width = (tmpW - this.chartMargin * (Math.round(12/chart.sizeX) - 1)) * chart.sizeX/12
                let left = 0
                if (chart.col > 0) {
                    left = (tmpW - this.chartMargin * (Math.round(12/chart.col) - 1)) * chart.col/12 + this.chartMargin
                }
                let height = (tmpW/14)*chart.sizeY + ((chart.sizeY - 1) * this.chartMargin)
                let top = (tmpW/14)*chart.row + (chart.row * this.chartMargin)
                let chartDom = document.getElementById('chart_' + chart.id)
                chartDom.style.width = width + 'px'
                chartDom.style.height = height + 'px'
                chartDom.style.top = top + 'px'
                chartDom.style.left = left + 'px'
            },
            buildOtherChartNewPoisitionFromResize (resizingChart, newWidth, newHeight, newLeft, newTop) { // 根据拖动的新位置设置resizingChart以外的chart的样式
                let pos = this.getChartNewPosition(resizingChart, newWidth, newHeight, newLeft, newTop)
                let tmpSizeX = pos.newSizeX
                let tmpSizeY = pos.newSizeY
                let tmpRow = pos.newRow
                let tmpCol = pos.newCol
                // 与当前resize图表下挨着或者右挨着的图表
                let rightAndDownCharts = this.findRightAndDown(resizingChart, tmpRow, tmpCol, tmpSizeX, tmpSizeY)
                let allCharts = {}
                rightAndDownCharts.forEach(c => {
                    allCharts[c.id] = c
                })
                rightAndDownCharts.forEach(c => {
                    this.recursionFindDown(c, allCharts)
                })
                Object.values(allCharts).forEach(c => {
                    c.row = c.row + c.addRow
                    this.setChartItemStyle(c)
                })
            },
            getChartNewPosition (chart, newWidth, newHeight, newLeft, newTop) { // 根据width,height,left,top计算出chart的sizeX,sizeY,col,row
                let tmpSizeX = chart.sizeX
                let tmpSizeY = chart.sizeY
                let tmpW = this.datumWidth
                if (newWidth > 0) {
                    tmpSizeX = Math.round((12 * (newWidth + this.chartMargin))/(tmpW + this.chartMargin))
                    if (tmpSizeX < 2) {
                        tmpSizeX = 2
                    }
                }
                if (newHeight > 0) {
                    tmpSizeY = Math.round((newHeight + this.chartMargin)/(tmpW/14 + this.chartMargin))
                    if (tmpSizeY < 2) {
                        tmpSizeY = 2
                    }
                }
                let tmpRow = chart.row
                let tmpCol = chart.col
                if (newLeft >= 0 ) {
                    tmpCol = Math.round((12 * (newLeft + 2*this.chartMargin))/(tmpW + this.chartMargin))
                }
                if (newTop >= 0 ) {
                    tmpRow = Math.round(newTop/(tmpW/14 + this.chartMargin))
                }
                return {
                    newRow: tmpRow,
                    newCol: tmpCol,
                    newSizeX: tmpSizeX,
                    newSizeY: tmpSizeY
                }
            },
            recursionFindDown (upChart, allChart) { // 递归查找上下挨着的chart
                this.data.forEach(c => {
                    if (this.checkChartUpDownOneByOne(upChart, c)) {
                        if (upChart.addRow > 0) { // 下降
                            if (!allChart[c.id]) {
                                allChart[c.id] = c
                                c.addRow = upChart.addRow
                                this.recursionFindDown(c, allChart)
                            } else {
                                c.addRow = upChart.addRow > c.addRow ? upChart.addRow : c.addRow
                            }
                        } else { // 上升
                            if ((upChart.col >= c.col && upChart.col < c.col + c.sizeX) ||
                                (upChart.col + upChart.sizeX > c.col && upChart.col + upChart.sizeX <= c.col + c.sizeX) ||
                                (upChart.col <= c.col && upChart.col + upChart.sizeX >= c.col + c.sizeX)) { // 上chart 宽度包含下chart
                                if (!allChart[c.id]) {
                                    allChart[c.id] = c
                                    c.addRow = upChart.addRow
                                    this.recursionFindDown(c, allChart)
                                } else {
                                    c.addRow = upChart.addRow < c.addRow ? upChart.addRow : c.addRow
                                }
                            }
                        }
                    }
                })
            },
            checkChartUpDownOneByOne (upChart, downChart){ // 判断两个chart是否上下挨着
                if (downChart.row === upChart.row + upChart.sizeY) { // 上chart的下宽和下chart的上宽在同一水平线
                    if (downChart.col < upChart.col + upChart.sizeX && downChart.col >= upChart.col) { // 下chart的右高在上chart中间
                        return true
                    }
                    if (upChart.col < downChart.col + downChart.sizeX && upChart.col >= downChart.col) { // 上chart的右高在下chart中间
                        return true
                    }
                }
                return false
            },
            checkChartLeftRightOneByOne (leftChart, rightChart){ // 判断两个chart是否左右挨着
                if (rightChart.col === leftChart.col + leftChart.sizeX) { // 左chart的右高和右chart的左宽在同一垂直线
                    if (rightChart.row < leftChart.row + leftChart.sizeY && rightChart.row >= leftChart.row) { // 右chart的上宽在左chart中间
                        return true
                    }
                    if (leftChart.row < rightChart.row + rightChart.sizeY && leftChart.row >= rightChart.row) { // 左chart的上宽在右chart中间
                        return true
                    }
                }
                return false
            },
            checkChartVerticalCross (downChart, upChart) { // 判断两个chart垂直线上否有交叉
                return (downChart.col >= upChart.col && downChart.col < upChart.col + upChart.sizeX) ||
                    (downChart.col + downChart.sizeX > upChart.col && downChart.col + downChart.sizeX <= upChart.col + upChart.sizeX) ||
                    (downChart.col <= upChart.col && downChart.col + downChart.sizeX >= upChart.col + upChart.sizeX)
            },
            findRightAndDown (resizingChart, newRow, newCol, newSizeX, newSizeY) { // 查找正在拖动大小的chart的下挨着和右挨着的所有chart
                let res = []
                // 高度增加还是减少
                let heightIncreaseSize = newSizeY - resizingChart.sizeY

                this.data.forEach(c => {
                    if (this.checkChartUpDownOneByOne(resizingChart, c)) { // 下宽挨着
                        if (newSizeY > resizingChart.sizeY) { // 高度增加,则会挤压下方
                            c.addRow = heightIncreaseSize
                            res.push(c)
                        } else if (newSizeY < resizingChart.sizeY || newSizeX < resizingChart.sizeX) { // 高度减少或者宽度减少
                            let recentChart = {row: 0, col: c.col, sizeX: c.sizeX, sizeY: 0} // 最近的chart
                            this.data.forEach(cc => {
                                if (cc.row + cc.sizeY <= c.row) { //
                                    if (cc.id !== resizingChart.id) {
                                        if (this.checkChartVerticalCross(c, cc)) {
                                            if (recentChart.row + recentChart.sizeY < cc.row + cc.sizeY) {
                                                recentChart = cc
                                            }
                                        }
                                    } else {
                                        let up = {row: newRow, col: newCol, sizeX: newSizeX, sizeY: newSizeY}
                                        if (this.checkChartVerticalCross(c, up)) {
                                            if (recentChart.row + recentChart.sizeY < cc.row + cc.sizeY) {
                                                recentChart = {row: newRow, col: newCol, sizeX: newSizeX, sizeY: newSizeY}
                                            }
                                        }
                                    }
                                }
                            })
                            c.addRow = recentChart.row + recentChart.sizeY - c.row
                            if (c.addRow !== 0) {
                                res.push(c)
                            }
                        }
                    }
                    if (this.checkChartLeftRightOneByOne(resizingChart, c)) { // 右高挨着
                        if (newSizeX > resizingChart.sizeX) { // 宽度增加,则会挤压右方
                            c.addRow = resizingChart.row + newSizeY - c.row
                            res.push(c)
                        }
                    }
                })
                return res
            },
            setContainerHeight () {
                let tmpChartList = this.data
                let maxRowChart
                tmpChartList.forEach(c => {
                    if (!maxRowChart) {
                        maxRowChart = c
                    } else if ((maxRowChart.row + maxRowChart.sizeY) < (c.row + c.sizeY)) {
                        maxRowChart = c
                    }
                })
                let dom = document.getElementById('container_tab_' + this.tabId)
                let tmpW = this.datumWidth
                if (maxRowChart) {
                    let row =  maxRowChart.row + maxRowChart.sizeY
                    let height = (tmpW/14)*row + ((row - 1) * this.chartMargin)
                    dom.style.height = height + 'px'
                }
            },
            scrollToActiveChart () { // 通过搜索找到的chart,滚动条要定位到目标chart
                if (this.activeChartId) {
                    let dashContainer = document.getElementById('dash_tab_' + this.tabId)
                    let activeChart = document.getElementById('chart_' + this.activeChartId)
                    if (activeChart) {
                        dashContainer.scrollTo(0, activeChart.offsetTop)
                    }
                }
            },
            setChartVisibled () { // 设置图表是否可见
                let dashContainer = document.getElementById('dash_tab_' + this.tabId) // chart list的父容器
                this.data.forEach(c => {
                    let chartDom = document.getElementById('chart_' + c.id) // chart item 对象
                    let offsetTopIn = 0
                    if (dashContainer.scrollTop >= this.lastScrollTop) { // 向下滚动
                        offsetTopIn = (chartDom.offsetTop + 50) - dashContainer.offsetTop
                    } else { // 向上滚动
                        offsetTopIn = (chartDom.offsetTop + chartDom.clientHeight - 50) - dashContainer.offsetTop
                    }
                    let _scrollTop = dashContainer.scrollTop
                    let _height = dashContainer.clientHeight
                    if(this.tabId === Number(this.activeTabId) && offsetTopIn >= _scrollTop && offsetTopIn <= _scrollTop + _height){
                        c.visibled = true
                    }
                })
                this.lastScrollTop = dashContainer.scrollTop
                this.$forceUpdate()
            },
            resizeChart (chart, chartDom, x, y) {
                let newStyle = this.getResizeChartNewStyle(chart, chartDom, x, y)
                chartDom.style.width = newStyle.width + 'px'
                chartDom.style.height = newStyle.height + 'px'
                this.buildOtherChartNewPoisitionFromResize(chart, newStyle.width, newStyle.height, newStyle.left, newStyle.top)
                this.setContainerHeight()
                this.$nextTick(function () {
                    chart.resizeX = x
                    chart.resizeY = y
                })
            },
            getResizeChartNewStyle (chart, chartDom, x, y) { // 获取resizing chart的新样式,width,height,left,top
                let width = (chartDom.clientWidth - (chart.resizeX - x))
                let height = (chartDom.clientHeight - (chart.resizeY - y))
                let left = chartDom.offsetLeft
                let top = chartDom.offsetTop
                return {
                    width: width,
                    height: height,
                    left: left,
                    top: top
                }
            },
            resizeChartOver (chart, chartDom, x, y) {
                let newStyle = this.getResizeChartNewStyle(chart, chartDom, x, y)
                let pos = this.getChartNewPosition(chart, newStyle.width, newStyle.height, newStyle.left, newStyle.top)
                chart.row = pos.newRow
                chart.col = pos.newCol
                chart.sizeX = pos.newSizeX
                chart.sizeY = pos.newSizeY
                this.setChartItemStyle(chart)
                let re = this.$refs['chart_item_' + chart.id][0]
                re.addResizeCount()
                this.setContainerHeight()
                this.updateChartPositions()
            },
            getMoveChartNewStyle (chart, chartDom, x, y) {
                let newLeft = (x - chart.dragStartX + chart.dragStartLeft)
                if (newLeft < 0) {
                    newLeft = 0
                } else if (newLeft > this.datumWidth - chartDom.clientWidth) {
                    newLeft = this.datumWidth - chartDom.clientWidth
                }
                let newTop = (y - chart.dragStartY + chart.dragStartTop)
                if (newTop < 0) {
                    newTop = 0
                }
                return {
                    width: chartDom.clientWidth,
                    height: chartDom.clientHeight,
                    left: newLeft,
                    top: newTop
                }
            },
            moveChart (chart, chartDom, x, y) {
                let newStyle = this.getMoveChartNewStyle(chart, chartDom, x, y)
                chartDom.style.left = newStyle.left + 'px'
                chartDom.style.top = newStyle.top + 'px'
                // let dashContainer = document.getElementById('dash_tab_' + this.tabId)
                // dashContainer.scrollTo(0, newStyle.top)
                // this.buildOtherChartNewPoisitionFromResize(chart, width, height, left, top)
                // this.setContainerHeight()
            },
            moveChartOver (chart, chartDom, x, y) {
                let newStyle = this.getMoveChartNewStyle(chart, chartDom, x, y)
                let pos = this.getChartNewPosition(chart, newStyle.width, newStyle.height, newStyle.left, newStyle.top)
                chart.row = pos.newRow
                chart.col = pos.newCol
                chart.sizeX = pos.newSizeX
                chart.sizeY = pos.newSizeY
                this.setChartItemStyle(chart)
                this.setContainerHeight()
                this.updateChartPositions()
            },
            updateChartPositions () { // 修改chart list容器里所有图表的位置,row,col,sizeX,sizeY
                let params = []
                this.data.forEach(c => {
                    params.push({
                        id: c.id,
                        row: c.row,
                        col: c.col,
                        sizeX: c.sizeX,
                        sizeY: c.sizeY
                    })
                })
                updateChartPosition({
                    positions: JSON.stringify(params)
                }).catch(this.$handleError)
            },
            scrollListener () { // 滚动条事件监听
                this.setChartVisibled()
            },
            resizeWindowListener () { // 浏览器屏幕resize事件监听
                this.setChartVisibled()
            }
        },
        watch: {
            activeTabId () {
                this.setChartVisibled()
            },
            data () {
                this.setStyle()
            },
            containerWidth () {
                this.setStyle()
            }
        },
        mounted () {
            let vm = this
            vm.setStyle()
            document.getElementById('dash_tab_' + vm.tabId).addEventListener('scroll', vm.scrollListener)
            window.addEventListener('resize', vm.resizeWindowListener)
        },
        beforeDestroy () {
            let vm = this
            let dashContainer = document.getElementById('dash_tab_' + vm.tabId)
            if (dashContainer) {
                dashContainer.removeEventListener('scroll', vm.scrollListener)
            }
            window.removeEventListener('resize', vm.resizeWindowListener)
        }
    }
</script>

<style>
    .d-dash-chart {
        height: 100%;
        width: 100%;
        overflow: auto;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 10px;
        box-sizing: border-box;
        position: relative;
    }

    .d-chart-item-list {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>