<template>
    <div :id="domId" class="d-echarts"></div>
</template>

<script>
    import EchartsUtil from './EchartsUtil'

    export default {
        name: 'DFunnel',
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
                legendData: [],
                seriesData: [],
                measureName: '数值'
            }
        },
        methods: {
            initChart () {
                this.handleMetaData()
                this.$nextTick(function () {
                    EchartsUtil.initChart(this, this.getOption)
                })
            },
            handleMetaData () {
                let vue = this
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
                    let funnelData = this.data[0]
                    vue.seriesData = []
                    vue.legendData = []
                    vue.meta.columns.forEach(c => {
                        vue.legendData.push(c.name)
                        if (funnelData) {
                            vue.seriesData.push({value: !funnelData[c.key] || funnelData[c.key] === '' ? 0 : funnelData[c.key], name: c.name})
                        }
                    })
                    vue.measureName = '数值'
                }

            },
            getOption () {
                let vue = this
                let option = {
                    tooltip: new EchartsUtil.Tooltip('item', function (params) {
                        let text = '<ul style="color: ' + params.color + '">' +
                            '<li>' + params.name + '</li><li>' + vue.measureName + ' : ' + vue.formatTooltipValue(params.value) + '</li>'
                        let cr = ''
                        if ((cr = vue.getConvertRate(params)) !== '') {
                            text = text + '<li>转化率 : ' + cr + '%</li>'
                        }
                        text = text + '</ul>'
                        return text
                    }),
                    legend: {show: false},
                    series: [ // 弄三个一样系列,是为了提供多个标签
                        vue.getSerie(), // 默认标签样式,展现图例名称在右边
                        vue.getSerie({ // 将数值展现在图中间
                            normal: {
                                position: 'inside',
                                formatter: '{c}'
                            }
                        }),
                        vue.getSerie({ // 将转化率展现在左边
                            normal: {
                                position: 'left',
                                formatter: function (params) {
                                    let text = ''
                                    let cr = ''
                                    if ((cr = vue.getConvertRate(params)) !== '') {
                                        text = '转化率 : ' + cr + '%'
                                    }
                                    return text
                                }
                            }
                        })
                    ]
                }
                return option
            },
            formatTooltipValue (value) {
                return EchartsUtil.formatTooltipValue(value, this.meta.showType, this.meta.unit, this.meta.divisor)
            },
            getSerie (label) {
                let vue = this
                let serie = {
                    name: '漏斗图',
                    type: 'funnel',
                    sort: 'none',
                    left: '10%',
                    width: '80%',
                    maxSize: '80%',
                    data: vue.seriesData
                }
                if (label) {
                    serie.label = label
                }
                return serie
            },
            getConvertRate (params) { // 计算转化率,最后一个没有转化率,返回空串,除数为0返回'-'
                let vue = this
                if (params.dataIndex < vue.seriesData.length - 1) {
                    if (vue.seriesData[params.dataIndex + 1].value === 0 || Number.isNaN(vue.seriesData[params.dataIndex + 1].value)) {
                        return '-'
                    } else {
                        let convertRate = vue.seriesData[params.dataIndex + 1].value * 100 / params.value
                        convertRate = Number.isInteger(convertRate) ? convertRate : convertRate.toFixed(2)
                        return convertRate
                    }
                }
                return ''
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
