<template>
    <div class="d-dash-container">
        <div class="head">
            <h2 class="title">{{dash.name}}</h2>
            <div class="btn">
                <el-button type="text" size="mini" v-if="dash.editAuth">
                    <i class="fa fa-bar-chart-o d-icon"></i>添加图表
                </el-button>
                <el-button type="text" size="mini" v-if="dash.editAuth">
                    <i class="fa fa-bookmark-o d-icon"></i>添加页签
                </el-button>
                <el-button type="text" size="mini">
                    <i class="fa fa-expand d-icon"></i>全屏
                </el-button>
                <el-button type="text" size="mini" v-if="dash.editAuth">
                    <i class="fa fa-filter d-icon"></i>全局筛选
                </el-button>
                <el-button type="text" size="mini" title="更多操作" class="more">
                    <i class="fa fa-ellipsis-v d-icon"></i>
                    <ul class="d-btn-list">
                        <li>导出仪表盘</li>
                        <li>导出Word</li>
                        <li>导出PDF</li>
                    </ul>
                </el-button>
            </div>
        </div>
        <div class="filter" v-if="this.dash.globalFilterList && this.dash.globalFilterList.length">
            <i class="fa fa-filter d-icon"></i>
            <el-button type="primary" size="mini" icon="el-icon-search">查询</el-button>
        </div>
        <div class="d-dash-main" :style="dashMainStyle" :id="'main_' + dashId">
            <el-tabs v-if="hasTab" v-model="activeTabId" @tab-click="clickTab">
                <el-tab-pane v-for="tab in tabList" :label="tab.name" :name="tab.id + ''" :key="tab.id">
                    <div class="d-dash-chart" :id="'dash_chart_' + dashId + '_' + tab.id">
                        <ul class="d-chart-item-list" :id="'container_' + dashId + '_' + tab.id">
                            <DChartItem v-for="chart in tab.chartList"
                                        :key="chart.id"
                                        :chart="chart"
                                        :class="{active: chart.id + '' === activeChartId}"
                                        @resizeing="(x, y) => {resizeChart(chart, x, y)}"></DChartItem>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div v-else class="d-dash-chart" :id="'dash_chart_' + dashId + '_-1'">
                <ul class="d-chart-item-list" :id="'container_' + dashId + '_-1'">
                    <DChartItem v-for="chart in chartList"
                                :key="chart.id" :chart="chart"
                                :class="{active: chart.id + '' === activeChartId}"
                                @resizeing="(x, y) => {resizeChart(chart, x, y)}"></DChartItem>
                </ul>
            </div>

        </div>
        <DLoading :loading="loading"></DLoading>
    </div>
</template>

<script>
    import {
        getDashMetaForShow
    } from '../../../services/data-visual/dashboard'
    import DChartItem from '../chart-panel/ChartItem.vue'
    import ChartDemo from '../chart-demo'
    import {getElPos} from '../../../utils/assist'
    // chart-item width=dash-panel.width*sizeX/12
    // chart-item height=width*sizeY/12
    // sizeX
    // sizeY
    // W是ul的宽度
    // chartMargin=4
    // width=(W-chartMargin*((12/sizeX) -1))*sizeX/12
    // height=(W/14)*sizeY + (sizeY-1)*chartMargin
    // top=(W/14)*row + (row-1)*chartMargin
    // left=(W-chartMargin*((12/col) -1))*col/12
    export default {
        name: 'DDashContainer',
        components: {DChartItem},
        data () {
            return {
                projId: '',
                dashId: '',
                activeChartId: '',
                activeTabId: '',
                dash: {},
                loading: false,
                hasTab: false,
                chartList: [], // 仪表盘没分tab, 仪表盘内展现的图表
                tabList: [], // 仪表盘分了tab, 仪表盘的所有tab及tab下的图表
                chartMargin: 4, // 图表之间的间隔
                containerWidth: 980, // 图表列表容器的实际宽度
                minContainerWidth: 980 // 图表列表容器的最小宽度
            }
        },
        computed: {
            dashMainStyle () {
                let headHeight = 45
                if (this.dash.globalFilterList && this.dash.globalFilterList.length) {
                    headHeight = headHeight + 40
                }
                return {
                    height: 'calc(100% - ' + headHeight + 'px)'
                }
            }
        },
        methods: {
            renderDash () {
                let vue = this
                vue.projId = vue.$route.params.projId
                vue.dashId = vue.$route.params.dashId
                vue.activeChartId = vue.$route.query.chartId
                vue.activeTabId = vue.$route.query.tabId
                vue.loading = true
                vue.hasTab = false
                vue.chartList = []
                vue.tabList = []
                getDashMetaForShow({
                    id: vue.dashId
                }).then(res => {
                    vue.loading = false
                    vue.dash = res.data
                    if (vue.dash.tabList && (vue.dash.tabList.length > 1 || (vue.dash.tabList.length === 1 && vue.dash.tabList[0].id !== -1))) {
                        vue.hasTab = true
                        vue.tabList = vue.dash.tabList
                        if (!vue.activeTabId) {
                            vue.activeTabId = vue.tabList[0].id + ''
                        }
                    } else if (vue.dash.tabList && vue.dash.tabList.length) {
                        vue.chartList = vue.dash.tabList[0].chartList
                    }
                    vue.$nextTick(function () {
                        let dom = document.getElementById('main_' + this.dashId)
                        this.containerWidth = dom.clientWidth - 30
                        vue.dash.tabList.forEach(t => {
                            vue.setContainerHeight(t.id)
                            t.chartList.forEach(c => {
                                vue.setChartItemStyle(c)
                            })
                            vue.scrollToActiveChart()
                        })
                    })
                }).catch(vue.$handleError)
            },
            clickTab () {

            },
            setChartItemStyle (chart) {
                let tmpW = this.minContainerWidth > this.containerWidth ? this.minContainerWidth : this.containerWidth;
                let width = (tmpW - this.chartMargin * (Math.round(12/chart.sizeX) - 1)) * chart.sizeX/12
                let height = (tmpW/14)*chart.sizeY + ((chart.sizeY - 1) * this.chartMargin)
                let top = (tmpW/14)*chart.row + (chart.row * this.chartMargin)
                let left = (tmpW - this.chartMargin * (Math.round(12/chart.col) - 1)) * chart.col/12 + this.chartMargin
                let chartDom = document.getElementById(chart.id + '')
                chartDom.style.width = width + 'px'
                chartDom.style.height = height + 'px'
                chartDom.style.top = top + 'px'
                chartDom.style.left = left + 'px'
            },
            setContainerHeight (tabId) {
                let tmpChartList = []
                if (this.hasTab) {
                    let tab = this.tabList.filter(t => t.id === tabId)[0]
                    tmpChartList = tab.chartList
                } else {
                    tmpChartList = this.chartList
                }
                let maxRowChart
                tmpChartList.forEach(c => {
                    if (!maxRowChart) {
                        maxRowChart = c
                    } else if ((maxRowChart.row + maxRowChart.sizeY) < (c.row + c.sizeY)) {
                        maxRowChart = c
                    }
                })
                let dom = document.getElementById('container_' + this.dashId + '_' + tabId)
                let tmpW = this.minContainerWidth > this.containerWidth ? this.minContainerWidth : this.containerWidth
                if (maxRowChart) {
                    let row =  maxRowChart.row + maxRowChart.sizeY
                    let height = (tmpW/14)*row + ((row - 1) * this.chartMargin)
                    dom.style.height = height + 'px'
                }
            },
            scrollToActiveChart () {
                if (this.activeChartId) {
                    let dashContainer = document.getElementById('dash_chart_' + this.dashId + '_' + this.activeTabId)
                    let activeChart = document.getElementById(this.activeChartId)
                    dashContainer.scrollTo(0, activeChart.offsetTop)
                }
            },
            resizeChart (chart, x, y) {
                let chartDom = document.getElementById(chart.id + '')
                chartDom.style.width = (chartDom.clientWidth - (chart.resizeX - x)) + 'px'
                chartDom.style.height = (chartDom.clientHeight - (chart.resizeY - y)) + 'px'
                this.$nextTick(function () {
                    chart.resizeX = x
                    chart.resizeY = y
                })
            }
        },
        watch: {
            '$route.path': function () {
                this.renderDash()
            }
        },
        mounted () {
            this.renderDash()
        }
    }
</script>

<style>
    .d-dash-container {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
    }

    .d-dash-container .head {
        height: 30px;
        padding-left: 15px;
        padding-top: 15px;
        padding-right: 15px;
    }

    .d-dash-container .filter {
        height: 30px;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 10px;
    }

    .d-dash-container .head .title {
        color: rgba(10,18,32,.64);
        font-weight: 400;
        float: left;
    }

    .d-dash-container .head .btn {
        float: right;
    }

    .d-dash-container .head .btn .more {
        position: relative;
    }

    .d-dash-container .head .btn .more .d-btn-list{
        right: 0px;
        top: 25px;
        display: none;
        text-align: left;
    }

    .d-dash-container .head .btn .more:hover .d-btn-list{
        display: block;
    }

    .d-dash-main {
        width: 100%;
        position: relative;
    }

    .d-dash-main .el-tabs {
        height: 100%;
        width: 100%;
    }

    .d-dash-main .el-tabs .el-tabs__header {
        padding-left: 15px;
        padding-right: 15px;
    }
    .d-dash-main .el-tabs .el-tabs__content{
        height: calc(100% - 55px);
        width: 100%;
    }

    .d-dash-main .el-tabs .el-tabs__content .el-tab-pane {
        height: 100%;
        width: 100%;
    }

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