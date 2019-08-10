<template>
    <div :id="domId" class="d-echarts"></div>
</template>

<script>
    import EchartsUtil from './EchartsUtil'
    import './map'
    export default {
        name: 'DMap',
        props: {
            id: [String, Number],
            meta: Object,
            data: {
                type: Array,
                default: function () {
                    return []
                }
            },
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
                divisor: ''
            }
        },
        methods: {
            initChart () {
                this.$nextTick(function () {
                    EchartsUtil.initChart(this, this.getOption)
                })
            },
            getOption () {
                let vue = this
                let legendData = []
                let series = {
                    name: vue.meta.title,
                    type: 'map',
                    mapType: vue.meta.mapType,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: []
                }
                let max = 0
                if (vue.data && vue.data.length) {
                    let dimCol = {}
                    let measureCol = {}
                    vue.meta.columns.forEach(col => {
                        if (col.dim) {
                            dimCol = col
                        } else {
                            measureCol = col
                        }
                    })
                    legendData.push(measureCol.name)
                    vue.data.forEach(d => {
                        if (d[measureCol.key] > max) {
                            max = Math.round(d[measureCol.key])
                        }
                        series.data.push({value: d[measureCol.key], name: d[dimCol.key]})
                    })
                    vue.showType = measureCol.showType
                    vue.unit = measureCol.unit
                    vue.divisor = measureCol.divisor
                    series.name = measureCol.name
                }
                let option = {
                    tooltip: new EchartsUtil.Tooltip('item', function (params) {
                        let text = '<ul>' +
                            '<li class="d-echarts-tooltip-name">' + params.name + '</li><li class="d-echarts-tooltip-value">' + params.seriesName + ' : ' + vue.formatTooltipValue(params.value) + '</li></ul>'
                        return text
                    }),
                    legend: new EchartsUtil.Legend(legendData),
                    visualMap: {
                        min: 0,
                        max: max,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'],
                        calculable: true
                    },
                    series: [series]
                }
                return option
            },
            formatTooltipValue (value) {
                return EchartsUtil.formatTooltipValue(value, this.showType, this.unit, this.divisor)
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
