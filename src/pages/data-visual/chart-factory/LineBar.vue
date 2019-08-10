<template>
    <div class="d-echarts" :id="domId"></div>
</template>

<script>
    import EchartsUtil from './EchartsUtil'
    import DateUtils from '../../../utils/dateUtils'
    export default {
        name: 'DLineBar',
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
            },
            rate100: Boolean // 百分比是否要乘以100
        },
        data () {
            return {
                domId: EchartsUtil.getChartDomId(this.id),
                chartInstance: null,
                legendData: [], // 图例
                columnsObj: {}, // 字段信息,key/value形式,key就是字段中文
                dimColumns: [], // 维度字段集合
                indexColumns: [], // 指标字段集合
                category_1: [], // 类目集合1, 底X轴或者左Y轴的类目
                category_2: [], // 类目集合2,上X轴或者右Y轴的类目
                hasBar: false, // 是否包含柱状图
                xAxisDouble: false, // x轴是否有双轴
                yAxisDouble: false, // y轴是否有双轴
                series: [], // 系列数据
                axisRate: { // 0,底X轴或者左Y轴 1,上X轴或者有Y轴 数值轴是否是比率类的轴
                    0: true,
                    1: true
                },
                dataZoom: {
                    thickness: 16, // 粗细大小
                    defaultSerisDataLenth: 100 // 默认展现的数据量的最大值
                }
            }
        },
        methods: {
            initChart () { // 初始化chart
                this.resetDataProperty()
                this.handleMetaData() // 处理元数据
                this.$nextTick(function () {
                    EchartsUtil.initChart(this, this.getOption) // 调echarts实例化chart图
                })
            },
            resetDataProperty () {
                this.chartInstance = null
                this.legendData = [] // 图例
                this.columnsObj = {} // 字段信息,key/value形式,key就是字段中文
                this.dimColumns = [] // 维度字段集合
                this.indexColumns = [] // 指标字段集合
                this.category_1 = [] // 类目集合1, 底X轴或者左Y轴的类目
                this.category_2 = [] // 类目集合2,上X轴或者右Y轴的类目
                this.hasBar = false // 是否包含柱状图
                this.xAxisDouble = false // x轴是否有双轴
                this.yAxisDouble = false // y轴是否有双轴
                this.series = [] // 系列数据
                this.axisRate = { // 0,底X轴或者左Y轴 1,上X轴或者有Y轴 数值轴是否是比率类的轴
                    0: true,
                    1: true
                }
            },
            handleMetaData () { // 处理元数据
                this.handleColumns()
                this.handleSeriesData()
                this.$forceUpdate()
            },
            getOption () {
                let vue = this
                let maxWidth = 0
                if (vue.meta.legendOrient !== 'horizontal') {
                    vue.legendData.forEach(l => {
                        maxWidth = l.length > maxWidth ? l.length : maxWidth
                    })
                }
                let slideDataZoom = {
                    type: 'slider',
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#2d8cf0',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }
                // 控制缩放条位置
//                if (vue.series[0] && vue.series[0].data.length > vue.dataZoom.defaultSerisDataLenth) {
//                    let len = vue.series[0].data.length
//                    slideDataZoom.start = Math.round((len - vue.dataZoom.defaultSerisDataLenth) * 100 / len)
//                }
                if (vue.meta.category === 'y') {
                    slideDataZoom.yAxisIndex = [0]
                    slideDataZoom.width = vue.dataZoom.thickness
                } else {
                    slideDataZoom.xAxisIndex = [0]
                    slideDataZoom.height = vue.dataZoom.thickness
                }
                let option = {
                    title: {
                        text: vue.meta.title
                    },
                    tooltip: new EchartsUtil.Tooltip('axis', function (params) {
                        let _name = '' // 类目名称
                        let series = []
                        if (params.name) { // Object
                            _name = params.name
                            series.push({seriesName: params.seriesName, value: vue.formatTooltipValue(params.seriesName, params.value), color: params.color})
                        } else { // Array
                            _name = params[0].name
                            params.forEach(p => {
                                if (p.value || p.value === 0) {
                                    series.push({seriesName: p.seriesName, value: vue.formatTooltipValue(p.seriesName, p.value), color: p.color})
                                }
                            })
                        }
                        let text = '<ul class="d-echarts-tooltip"><li class="d-echarts-tooltip-name">' + _name + '</li>'
                        series.forEach((s, i) => {
                            text = text + '<li style="color: ' + s.color + '">' + s.seriesName + ' : ' + s.value + '</li>'
                        })
                        text = text + '</ul>'
                        return text
                    }),
                    legend: new EchartsUtil.Legend(vue.legendData, vue.meta.legendOrient),
                    grid: new EchartsUtil.Grid(maxWidth),
                    xAxis: vue.getXAxis(),
                    yAxis: vue.getYAxis(),
                    series: vue.series,
                    dataZoom: [
                        slideDataZoom
                    ]
                }
                return option
            },
            formatTooltipValue (seriesName, value) {
                let tempVal = value
                let showType = ''
                let unit = ''
                let divisor = 1
                if (this.columnsObj[seriesName]) {
                    showType = this.columnsObj[seriesName].showType ? this.columnsObj[seriesName].showType : ''
                    unit = this.columnsObj[seriesName].unit ? this.columnsObj[seriesName].unit : ''
                    divisor = this.columnsObj[seriesName].unit ? Number(this.columnsObj[seriesName].divisor) : 1
                } else {
                    showType = this.meta.showType ? this.meta.showType : ''
                    unit = this.meta.unit ? this.meta.unit : ''
                    divisor = this.meta.unit ? Number(this.meta.divisor) : 1
                }
                return EchartsUtil.formatTooltipValue(tempVal, showType, unit, divisor)
            },
            getXAxis () {
                return this.getAxis(this.xAxisDouble, 'x', this.meta.downXName, this.meta.upXName)
            },
            getYAxis () {
                return this.getAxis(this.yAxisDouble, 'y', this.meta.leftYName, this.meta.rightYName)
            },
            abridgeValue (value) {
                let tempVal = Number(value)
                if (tempVal > 1000000) {
                    tempVal = (tempVal / 1000000).toFixed(1) * 1 + 'M'
                } else if (tempVal > 10000) {
                    tempVal = (tempVal / 10000).toFixed(1) * 1 + 'W'
                } else if (tempVal > 1000) {
                    tempVal = (tempVal / 1000).toFixed(1) * 1 + 'K'
                } else {
                    tempVal = tempVal.toFixed(1) * 1
                }
                return tempVal
            },
            getAxis (axisDouble, axisType, name1, name2) { // 是否双轴,轴类型(x/y),轴1标签,轴2标签
                let vue = this
                let axisValueType = vue.getAxisValueType(axisType)
                // axisIndex=0,底X轴或者左Y轴 axisIndex=1,上X轴或者有Y轴
                let labelFormatter = function (value, index, axisIndex) {
                    let tempVal = vue.axisRate[axisIndex] && vue.rate100 ? value * 100 : value
                    return vue.axisRate[axisIndex] ? (vue.abridgeValue(tempVal) + '%') : vue.abridgeValue(tempVal)
                }
                let pointerLabelFormatter = function (params, axisIndex) {
                    let tempVal = vue.axisRate[axisIndex] && vue.rate100 ? params.value * 100 : params.value
                    return vue.axisRate[axisIndex] ? (vue.abridgeValue(tempVal) + '%') : vue.abridgeValue(tempVal)
                }
                let axis = [ // 底X轴或者左Y轴
                    {
                        type: axisValueType,
                        name: name1,
                        boundaryGap: axisValueType === 'category' ? vue.hasBar : '',
                        data: axisValueType === 'category' ? vue.category_1 : [],
                        axisLabel: {
                            formatter: axisValueType === 'category' ? null : (value, index) => labelFormatter(value, index, 0)
                        },
                        axisPointer: {
                            label: {
                                formatter: axisValueType === 'category' ? null : (params) => pointerLabelFormatter(params, 0)
                            }
                        }
                    }
                ]
                if (axisDouble) { // 是否有双轴,配置轴2
                    axis.push({
                        type: axisValueType,
                        name: name2, // 上X轴或者有Y轴
                        boundaryGap: axisValueType === 'category' ? vue.hasBar : '',
                        data: axisValueType === 'category' ? vue.category_2 : [],
                        axisLabel: {
                            formatter: axisValueType === 'category' ? null : (value, index) => labelFormatter(value, index, 1)
                        },
                        axisPointer: {
                            label: {
                                formatter: axisValueType === 'category' ? null : (params) => pointerLabelFormatter(params, 1)
                            }
                        }
                    })
                }
                return axis
            },
            getAxisValueType (axisType) { // 获取轴的值类型,类目还是数值
                if (!this.meta.category || this.meta.category === '') {
                    return axisType === 'x' ? 'category' : 'value'
                }
                return this.meta.category === axisType ? 'category' : 'value'
            },
            handleColumns () { // 处理元数据中的字段信息,将columns数组转成key/value的对象
                this.$nextTick(function () {
                    this.legendData = []
                    this.dimColumns = []
                    this.indexColumns = []
                    this.hasBar = false
                    this.xAxisDouble = false
                    this.yAxisDouble = false
                    if (this.meta.columns) {
                        this.meta.columns.forEach(c => {
                            if (!c.axis) { // 参考轴类型
                                c.axis = c.dim ? EchartsUtil.GridAxis.DownX : EchartsUtil.GridAxis.LeftY
                            }
                            if (this.meta.stack) {
                                c.stack = 'all'
                            }
                            if (c.type === 'stackBar') { // 双轴图添加堆积柱状图，用stackBar做标识
                                c.stack = 'typeA';
                                c.type = 'bar';
                            }
                            if (c.type === 'stackBarSecond') { // 双轴图添加堆积柱状图，用stackBar做标识
                                c.stack = 'typeB';
                                c.type = 'bar';
                            }
                            if (!c.dim && !this.meta.dynamicLegend) { // 固定图例
                                this.legendData.push(c.name)
                                this.indexColumns.push(c)
                            }
                            if (c.dim) {
                                this.dimColumns.push(c)
                            }
                            if (!c.dim && c.type === 'bar') {
                                this.hasBar = true
                            }
                            if (c.axis === EchartsUtil.GridAxis.UpX) {
                                this.xAxisDouble = true
                            }
                            if (c.axis === EchartsUtil.GridAxis.RightY) {
                                this.yAxisDouble = true
                            }
                            if (c.axis === EchartsUtil.GridAxis.UpX || c.axis === EchartsUtil.GridAxis.RightY) { // 上X轴,右Y轴
                                if (!c.dim && (!c.showType || c.showType !== 'rate')) {
                                    this.axisRate[1] = false
                                }
                            } else { // 底X轴,左Y轴
                                if (!c.dim && (!c.showType || c.showType !== 'rate')) {
                                    this.axisRate[0] = false
                                }
                            }
                            this.columnsObj[c.name] = c
                        })
                    }
                    if (this.meta.dynamicLegend) {
                        let i = this.meta.columns.findIndex(c => !c.dim)
                        if (i <= 0) {
                            this.axisRate[0] = false
                            this.axisRate[1] = false
                        }
                    }
                    if (this.meta.dynamicLegend && this.data && this.data.length) { // 动态图例
                        this.hasBar = this.meta.type === 'bar'
                        if (this.data) {
                            this.data.forEach(d => {
                                Object.keys(d).forEach(key => {
                                    let name = !key ? '(空)' : key
                                    if (this.dimColumns.findIndex(c => c.key === key) === -1 && !this.legendData.includes(name)) {
                                        this.legendData.push(name)
                                        this.indexColumns.push({key: key, name: name, axis: EchartsUtil.GridAxis.LeftY, type: this.meta.type, stack: (this.meta.stack ? 'all' : '')})
                                    }
                                })
                            })
                        }
                    }
                })
            },
            handleSeriesData () { // 处理chart data数据
                let vue = this
                vue.$nextTick(function () {
                    let seriesObj = {} // 系列值
                    vue.category_1 = []
                    vue.category_2 = []
                    if (vue.data) {
                        let tempData = JSON.parse(JSON.stringify(vue.data))
                        let firstRow = tempData[0]
                        let dateStr = firstRow[vue.dimColumns[0].key]
                        let categoryIsDate = DateUtils.testStrDate(dateStr)
                        if (vue.meta.category === 'y' || !categoryIsDate) { // 类目轴为y轴,则一般是top类型,根据指标值总和排序
                            tempData = tempData.sort((a, b) => {
                                let sumA = 0
                                let sumB = 0
                                vue.indexColumns.forEach(indexCol => {
                                    if (a[indexCol.key]) {
                                        sumA += Number(a[indexCol.key])
                                    }
                                    if (b[indexCol.key]) {
                                        sumB += Number(b[indexCol.key])
                                    }
                                })
                                return sumA >= sumB ? 1 : -1
                            })
                        } else { // 类目轴为x轴,则一般是时间趋势,根据维度值排序
                            tempData = tempData.sort((a, b) => a[vue.dimColumns[0].key] >= b[vue.dimColumns[0].key] ? 1 : -1)
                        }
                        tempData.forEach(d => {
                            // 设置类目值
                            vue.dimColumns.forEach(dimCol => {
                                if (dimCol.axis === EchartsUtil.GridAxis.DownX || dimCol.axis === EchartsUtil.GridAxis.LeftY) { // 轴1的类目
                                    vue.category_1.push(d[dimCol.key])
                                } else {
                                    vue.category_2.push(d[dimCol.key])
                                }
                            })
                            // 设置series系列数据
                            vue.indexColumns.forEach(indexCol => {
                                if (!seriesObj[indexCol.key]) {
                                    seriesObj[indexCol.key] = {
                                        name: indexCol.name,
                                        type: indexCol.type ? indexCol.type : 'line',
                                        xAxisIndex: indexCol.axis === EchartsUtil.GridAxis.DownX || indexCol.axis === EchartsUtil.GridAxis.LeftY || indexCol.axis === EchartsUtil.GridAxis.RightY ? 0 : 1,
                                        yAxisIndex: indexCol.axis === EchartsUtil.GridAxis.LeftY || indexCol.axis === EchartsUtil.GridAxis.DownX || indexCol.axis === EchartsUtil.GridAxis.UpX ? 0 : 1,
                                        data: []
                                    }
                                    // 设置面积
                                    if (vue.meta.area) {
                                        seriesObj[indexCol.key].areaStyle = new EchartsUtil.AreaStyle() // 设置面积图样式
                                    }

                                    // 设置堆积
                                    if (indexCol.stack) {
                                        seriesObj[indexCol.key].stack = indexCol.stack
                                    }

                                    // 设置最大值、最小值
                                    let markPointData = []
                                    if (vue.meta.max) {
                                        markPointData.push({type: 'max', name: '最大值'})
                                    }

                                    if (vue.meta.min) {
                                        markPointData.push({type: 'min', name: '最小值'})
                                    }

                                    if (markPointData.length > 0) {
                                        seriesObj[indexCol.key].markPoint = {
                                            data: markPointData
                                        }
                                    }

                                    // 设置平均值
                                    let markLineData = []
                                    if (vue.meta.avg) {
                                        markLineData.push({type: 'average', name: '平均值'})
                                    }

                                    if (markLineData.length > 0) {
                                        seriesObj[indexCol.key].markLine = {
                                            data: markLineData
                                        }
                                    }

                                    // 设置标签显示
                                    seriesObj[indexCol.key].label = {
                                        show: false,
                                        formatter: function (params) {
                                            return vue.formatTooltipValue(params.seriesName, params.value)
                                        }
                                    }
                                }
                                seriesObj[indexCol.key].data.push(d[indexCol.key] ? d[indexCol.key] : 0)
                            })
                        })
                    }
                    vue.series = Object.values(seriesObj)
                })
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
            //  this.chart.dispose()  dispose会导致resize报错，用clear
            this.chartInstance.clear()
        }
    }
</script>
