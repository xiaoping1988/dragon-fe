<template>
    <div class="d-chart-preview">
        <el-row class="d-row">
            <DFilterList :data="chartInsideFilterList"
                         @inited="initedFilterList"
                         @change="changeCondition"
                         horizontal></DFilterList>
        </el-row>
        <div class="chart-container d-chart-full-screen">
            <DChartFactory id="previewChart"
                           :meta="chartMeta"
                           :data="chartData"
                           @sort="sortData"></DChartFactory>
        </div>
    </div>
</template>

<script>
    import DChartFactory from '../../chart-factory'
    import DFilterList from '../../chart-filter/FilterList'
    import {previewData} from '../../../../services/data-visual/chart'
    export default {
        name: 'DChartPreviewModule',
        components: {DChartFactory, DFilterList},
        data () {
            return {
                loading: false,
                chartMeta: {}, // 预览图表的chartMeta,切换指标维度会改这个值
                chartData: [], // 图表数据
                lastUpdateTime: new Date().getTime(), // 上一次更新时间
                chartInsideFilterList: [],
                chartFilterValue: '[]'
            }
        },
        watch: {
            '$store.state.GeneralChart.chartMetaUpdateCount': function (newValue) {
                this.updateChart()
            },
            '$store.state.GeneralChart.chartInsideFilterUpdateCount': function (newValue) {
                this.chartInsideFilterList = this.$store.state.GeneralChart.editConfig.chartFilterMeta
            }
        },
        methods: {
            updateChart () {
                let vue = this
                let chartMeta = vue.$store.state.GeneralChart.renderMeta.chartMeta
                if (chartMeta && chartMeta.chartType) {
                    // 3秒后执行,防止用户操作太快,频繁刷新图表
                    vue.loading = true
                    let currentTime = new Date().getTime()
                    vue.lastUpdateTime = currentTime
                    let sTime = setTimeout(function () {
                        vue.handleMeta()
                        vue.setData(currentTime)
                        clearTimeout(sTime)
                    }, 3000)
                } else {
                    vue.clearData()
                }
            },
            handleMeta () {
                this.chartMeta = this.$store.state.GeneralChart.renderMeta.chartMeta
            },
            setData (updateTime) {
                if (updateTime !== this.lastUpdateTime) {
                    return
                }
                this.loading = true
                let params = {
                    editConfig: JSON.stringify(this.$store.state.GeneralChart.editConfig),
                    chartMeta: JSON.stringify(this.$store.state.GeneralChart.renderMeta.chartMeta),
                    chartFilterValue: this.chartFilterValue
                }
                previewData(params).then(res => {
                    this.chartData = res.data
                    this.loading = false
                }).catch(error => {
                    this.$handleError(error)
                    this.loading = false
                })
            },
            clearData () {
                this.meta = {}
                this.chartData = []
                this.loading = false
            },
            sortData () {

            },
            initedFilterList (conditionValueArr, showLabelArr) {
                this.chartFilterValue = JSON.stringify(conditionValueArr)
                this.updateChart()
            },
            changeCondition (conditionValueArr, showLabelArr) {
                this.chartFilterValue = JSON.stringify(conditionValueArr)
                this.updateChart()
            },
            initDataFromVuexStore () {
                this.chartInsideFilterList = this.$store.state.GeneralChart.editConfig.chartFilterMeta
            }
        },
        mounted () {
            this.initDataFromVuexStore()
        }
    }
</script>

<style>
    .d-chart-preview {
        width: calc(100% - 180px);
        height:100%;
        left: 180px;
        padding: 10px 0px 10px 10px;
        box-sizing: border-box;
        position: absolute;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        overflow: auto;
    }

    .d-chart-preview .chart-container {
        width: 100%;
        height: calc(100% - 48px);
        min-height: 400px;
        background: #ffffff;
    }
</style>