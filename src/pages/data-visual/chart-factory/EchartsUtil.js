import echarts from 'echarts'
import 'echarts/theme/shine.js'
import {formatThousandth} from '../../../utils/assist'

const MaxLegendWidth = 100
/**
 * 图例,默认最多选中10个图例
 * @param data
 * @constructor
 */
const Legend = function (data, orient) {
    this.type = 'scroll'
    if (!orient || orient === 'vertical') {
        this.orient = 'vertical'
        this.right = 10
        this.formatter = function (name) {
            return echarts.format.truncateText(name, MaxLegendWidth, '14px Microsoft Yahei', '...')
        }
    }
    this.top = 20
    this.bottom = 20
    this.data = data
    this.selected = {}
    if (data && data.length) {
        data.forEach((name, i) => {
            this.selected[name] = i < 10
        })
    }
    this.tooltip = {
        show: true,
        formatter: function (params, ticket, callback) {
            return '<span style="color: #606266;">' + params.name + '</span>'
        }
    }
}

/**
 * 直角系grid
 * @param right
 * @constructor
 */
const Grid = function (legendMaxWidth) {
    let right
    if (legendMaxWidth) {
        legendMaxWidth = legendMaxWidth < 2 ? 2 : legendMaxWidth
        // right = legendMaxWidth * Math.floor(Math.log(50) / Math.log(legendMaxWidth)) * 10 + 20
        right = legendMaxWidth * 16 + 30
    }
    let maxRight = MaxLegendWidth + 30
    this.left = '3%'
    this.right = (right !== undefined ? (right < maxRight ? right : maxRight) : '3%')
    this.bottom = '40'
    this.containLabel = true
}

/**
 * 面积图样式
 * @constructor
 */
const AreaStyle = function () {}

/**
 * chart图的提示
 * @param trigger
 * @param formatter
 * @constructor
 */
const Tooltip = function (trigger, formatter) {
    this.trigger = trigger
    this.backgroundColor = '#fff'
    this.extraCssText = 'box-shadow: 1px 2px 5px 2px #cccccc;'
    this.axisPointer = {
        type: 'cross',
        label: {
            backgroundColor: '#6a7985'
        }
    }
    this.formatter = function (params, ticket, callback) {
        return formatter(params, ticket, callback)
    }
}

/**
 * 直角系坐标轴
 * @type {{LeftY: string, RightY: string, DownX: string, UpX: string}}
 */
const GridAxis = {
    LeftY: 'LeftY', // 左Y轴
    RightY: 'RightY', // 右Y轴
    DownX: 'DownX', // 底X轴
    UpX: 'UpX' // 上X轴
}

/**
 * 初始化chart
 * @param vue vue对象
 * @param buildOption 获取option的回调方法
 */
const initChart = function (vue, buildOption) {
    let dom = document.getElementById(vue.domId)
    if (!dom) {
        return
    }
    vue.chartInstance = echarts.getInstanceByDom(dom)
    if (!vue.chartInstance) {
        vue.chartInstance = echarts.init(dom, 'shine')
    }
    vue.chartInstance.clear()
    window.addEventListener('resize', function () {
        vue.chartInstance.resize()
    })
    let option = buildOption()
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('id:', vue.id)
    //   console.log(JSON.stringify(option))
    // }
    vue.chartInstance.setOption(option)
    vue.chartInstance.resize()
}

/**
 * 获取chart的dom id
 * @param chartId 图表ID
 * @returns {string}
 */
function getChartDomId (chartId) {
    return (chartId && chartId !== '') ? ('echarts_' + chartId) : ('echarts_' + new Date().getTime())
}

/**
 * 获取某个chart的echart实例
 * @param chartId 图表ID
 * @returns {*}
 */
function getEchartsInstance (chartId) {
    let dom = document.getElementById(getChartDomId(chartId))
    if (!dom) {
        return
    }
    return echarts.getInstanceByDom(dom)
}

/**
 * 格式化
 * @param value
 * @param showType
 * @param unit
 * @param divisor
 * @returns {*}
 */
function formatTooltipValue (value, showType, unit, divisor) {
    let tempVal = value
    if (!unit) {
        unit = ''
    }
    if (isNaN(tempVal)) {
        tempVal = '--'
    } else {
        if (isNaN(divisor) || divisor.toString().trim() === '' || divisor === 0) {
            divisor = 1
        }
        if (showType === 'amt') {
            tempVal = formatThousandth(parseFloat((tempVal / divisor).toFixed(2)))
        } else if (showType === 'rate') {
            tempVal = parseFloat(Number(tempVal).toFixed(2))
        } else {
            tempVal = formatThousandth(parseFloat((tempVal / divisor).toFixed(2)))
        }
    }
    if (showType === 'amt') {
        tempVal = '￥' + tempVal + unit
    } else if (showType === 'rate') {
        tempVal = tempVal + '%'
    } else {
        tempVal = tempVal + unit
    }
    return tempVal
}

function exportImg(chartId, chartName) {
    let chart = getEchartsInstance(chartId)
    let option
    if (chart && (option = chart.getOption())) {
        // 标题为空时，设置标题属性
        if (!option.title) {
            option.OriginalTitle = ''
            option.title = {
                text: chartName
            }
        } else if (!option.title[0].text || option.title[0].text === '') {
            option.OriginalTitle = option.title[0].text
            option.title[0].text = chartName
        }
        option.series.forEach(serie => {
            if (serie.type !== 'funnel') {
                serie.label.OriginalShow = serie.label.show
                if (serie.type === 'pie') {
                    serie.label.formatter = '{b}: {d}%\n{c}'
                }
                if (!serie.labelLine) {
                    serie.labelLine = {
                        show: false
                    }
                }
                serie.labelLine.OriginalShow = serie.labelLine.show
                serie.label.show = true
                serie.labelLine.show = true
            }
        })

        chart.setOption(option)
        let imgUrl = chart.getDataURL({
            pixelRatio: 2,
            backgroundColor: '#fff'
        })

        // 还原显示
        if (option.title.text) {
            option.title.text = option.OriginalTitle
        } else {
            option.title[0].text = option.OriginalTitle
        }
        option.series.forEach(serie => {
            if (serie.type !== 'funnel') {
                serie.label.show = serie.label.OriginalShow
                serie.labelLine.show = serie.labelLine.OriginalShow
            }
        })

        chart.setOption(option)
        // 下载图片
        let a = document.createElement('a')
        a.href = imgUrl
        a.download = chartName + '.png'
        let evt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: false
        })
        a.dispatchEvent(evt)
    }
}

export default {
    Legend: Legend,
    Grid: Grid,
    GridAxis: GridAxis,
    AreaStyle: AreaStyle,
    Tooltip: Tooltip,
    initChart: initChart,
    getChartDomId: getChartDomId,
    getEchartsInstance: getEchartsInstance,
    formatTooltipValue: formatTooltipValue,
    exportImg: exportImg
}
