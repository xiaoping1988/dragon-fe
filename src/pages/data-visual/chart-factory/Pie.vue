<template>
    <div :id="domId" class="d-echarts"></div>
</template>

<script>
    import EchartsUtil from './EchartsUtil'
    export default {
        name: 'DPie',
        props: {
            meta: {
                required: true,
                type: Object
            },
            data: {
                type: Array,
                default: function () {
                    return []
                }
            },
            id: [Number, String],
            resizeCount: { // resize标识
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                chartInstance: null,
                domId: EchartsUtil.getChartDomId(this.id),
                showType: '',
                unit: '',
                divisor: '',
                measureName: '数值',
                legendData: [],
                seriesData: [],
                measureColList: []
            }
        },
        methods: {
            initChart () {
                this.handleData()
                EchartsUtil.initChart(this, this.getOption)
            },
            handleData () {
                let vue = this
                if (!vue.data || !vue.data.length) {
                    vue.legendData = []
                    vue.seriesData = []
                    return
                }
                let dimCol = null
                let measureColArr = []
                vue.meta.columns.forEach(col => {
                    if (col.dim) {
                        dimCol = col
                    } else {
                        measureColArr.push(col)
                    }
                })
                vue.measureColList = measureColArr
                if (dimCol) { // 一维度一指标
                    let measure = vue.measureColList[0]
                    vue.data.forEach(d => {
                        let name = !d[dimCol.key] ? '(空)' : d[dimCol.key]
                        vue.legendData.push(name)
                        vue.seriesData.push({value: d[measure.key], name: name})
                    })
                    vue.measureName = measure.name
                } else { // 零维度多指标
                    let rowData = this.data[0]
                    vue.measureColList.forEach(m => {
                        vue.legendData.push(m.name)
                        vue.seriesData.push({value: rowData[m.key], name: m.name})
                    })
                    vue.measureName = '数值'
                }
                vue.showType = vue.measureColList[0].showType
                vue.unit = vue.measureColList[0].unit
            },
            getOption () {
                let vue = this
                let legend = vue.legendData
                let series = {
                    type: 'pie',
                    radius: [vue.meta.ring ? '24%' : '0', '62%'],
                    center: ['42%', '50%'],
                    label: {
                        show: false,
                        formatter: function (params) {
                            return vue.formatTooltipValue(params.value) + '\n' + params.percent + '%'
                        }
                    },
                    data: vue.seriesData
                }
                let option = {
                    tooltip: new EchartsUtil.Tooltip('item', function (params) {
                        let text = '<ul style="color: ' + params.color + '">' +
                            '<li>' + params.name + '</li><li>' + vue.measureName + ' : ' + vue.formatTooltipValue(params.value) + '</li><li>占比 : ' + params.percent + '%</li></ul>'
                        return text
                    }),
                    legend: new EchartsUtil.Legend(legend),
                    series: [series]
                }
                return option
            },
            formatTooltipValue (value) {
                return EchartsUtil.formatTooltipValue(value, this.showType, this.unit)
            }
        },
        mounted () {
            this.initChart()
        },
        watch: {
            meta () {
                this.initChart()
            },
            data () {
                this.initChart()
            },
            resizeCount (newValue, oldValue) {
                if (this.chartInstance) {
                    this.chartInstance.resize()
                }
            }
        },
        beforeDestroy () {
            this.chartInstance.clear()
        }
    }
</script>

<style>
</style>