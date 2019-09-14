import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'

import {ApiUrl} from '../../../services/data-visual/chart'
import {ChartType, SortType, ShowType, FilterControlType, TimeFreq, LargeChartType, Operator} from '../../../pages/data-visual/constants'
import {DataType} from '../../../services/data-map/col-manage'
import MetaDemo from './meta-demo'
import {mockChartData} from './mockChartData'
import {compareStr} from '../../../utils/assist'

let dateFilterColumn = {
    colLabel: '时间字段',
    colName: 'createtime',
    tbId: 1,
    dbName: 'dw',
    tbName: 'tb',
    dataType: DataType.date.code, // 数据类型
    colConfig: { // 筛选配置
        controlType: FilterControlType.date.code, // 筛选控件类型
        oper: Operator.between.code,
        defaultValue: 7, // 默认值
        timeFreq: TimeFreq.day.code // 日期类型
    }
}
let numberFilterColumn = {
    colLabel: '数字字段的所产生的',
    colName: 'amt',
    tbId: 1,
    dbName: 'dw',
    tbName: 'tb',
    dataType: DataType.num.code, // 数据类型
    colConfig: {
        controlType: FilterControlType.num.code,
        defaultValue: '1,5',
        oper: Operator.between.code
    }
}
let selectFilterColumn = {
    colLabel: '枚举字段',
    colName: 'state',
    tbId: 1,
    dbName: 'dw',
    tbName: 'tb',
    dataType: DataType.text.code, // 数据类型
    colConfig: {
        controlType: FilterControlType.select.code,
        oper: Operator.in.code,
        defaultValue: '北京'
    }
}
let textFilterColumn = {
    colLabel: '文本字段',
    colName: 'addr',
    tbId: 1,
    dbName: 'dw',
    tbName: 'tb',
    dataType: DataType.text.code, // 数据类型
    colConfig: {
        controlType: FilterControlType.text.code,
        defaultValue: 'xiao',
        oper: Operator.like.code
    }
}

function buildMeta(chartMeta, filterMeta) {
    if (!filterMeta) {
        filterMeta = [dateFilterColumn, numberFilterColumn, selectFilterColumn, textFilterColumn]
    }
    let meta = {
        chartMeta: chartMeta,
        filterMeta: filterMeta
    }
    return JSON.stringify(meta)
}

export let ChartList = [
    {id: 1, name: '订单量', remark: '订单数据分析', dashId: 1, tabId: 1, sizeX: 6, sizeY: 2, row: 0, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCard), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 2, name: '用户量', remark: '用户数据分析', dashId: 1, tabId: 2, sizeX: 6, sizeY: 2, row: 0, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCard), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 3, name: '交易量', remark: '交易数据分析', dashId: 1, tabId: 3, sizeX: 12, sizeY: 2, row: 0, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCard), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 4, name: '订单金额', remark: '财务数据分析', dashId: 1, tabId: 4, sizeX: 12, sizeY: 2, row: 0, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCard), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 5, name: 'GMV', remark: '财务数据分析', dashId: 1, tabId: 1, sizeX: 6, sizeY: 2, row: 0, col: 6, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCard), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 6, name: 'PV', remark: '财务数据分析', dashId: 1, tabId: 2, sizeX: 6, sizeY: 2, row: 0, col: 6, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCard), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 7, name: '表格数据', remark: '财务数据分析', dashId: 1, tabId: 3, sizeX: 12, sizeY: 6, row: 2, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.Table), chartType: ChartType.Table.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 8, name: '折线图数据', remark: '财务数据分析', dashId: 1, tabId: 4, sizeX: 6, sizeY: 4, row: 2, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.LineNotDate), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 9, name: '柱状图数据', remark: '财务数据分析', dashId: 1, tabId: 1, sizeX: 6, sizeY: 4, row: 2, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.Bar), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 10, name: '面积图数据', remark: '财务数据分析', dashId: 1, tabId: 2, sizeX: 6, sizeY: 4, row: 2, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.Area), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 11, name: '双轴图', remark: '财务数据分析', dashId: 1, tabId: 3, sizeX: 6, sizeY: 4, row: 8, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.LineBar), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 12, name: '饼图', remark: '财务数据分析', dashId: 1, tabId: 4, sizeX: 6, sizeY: 4, row: 2, col: 6, config: '{}', renderMeta: buildMeta(MetaDemo.Pie), chartType: ChartType.Pie.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 13, name: '漏斗图', remark: '财务数据分析', dashId: 1, tabId: 1, sizeX: 6, sizeY: 4, row: 2, col: 6, config: '{}', renderMeta: buildMeta(MetaDemo.FunnelDim), chartType: ChartType.Funnel.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 14, name: '条形图', remark: '财务数据分析', dashId: 1, tabId: 2, sizeX: 6, sizeY: 4, row: 2, col: 6, config: '{}', renderMeta: buildMeta(MetaDemo.BarTop), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 15, name: '地图', remark: '财务数据分析', dashId: 1, tabId: -1, sizeX: 12, sizeY: 6, row: 0, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.Map), chartType: ChartType.Map.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 16, name: '订单量', remark: '订单数据分析', dashId: 2, tabId: -1, sizeX: 4, sizeY: 2, row: 0, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCard), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 17, name: '用户量', remark: '用户数据分析', dashId: 2, tabId: -1, sizeX: 4, sizeY: 2, row: 0, col: 4, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCard), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 18, name: '交易量', remark: '交易数据分析', dashId: 2, tabId: -1, sizeX: 4, sizeY: 2, row: 0, col: 8, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCard), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 19, name: '订单金额', remark: '财务数据分析', dashId: 2, tabId: -1, sizeX: 4, sizeY: 2, row: 2, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCard), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 20, name: 'GMV', remark: '财务数据分析', dashId: 2, tabId: -1, sizeX: 4, sizeY: 2, row: 2, col: 4, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCard), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 21, name: 'PV', remark: '财务数据分析', dashId: 2, tabId: -1, sizeX: 4, sizeY: 2, row: 2, col: 8, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCard), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 22, name: '表格数据', remark: '财务数据分析', dashId: 2, tabId: -1, sizeX: 12, sizeY: 6, row: 4, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.Table), chartType: ChartType.Table.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 23, name: '折线图数据', remark: '财务数据分析', dashId: 2, tabId: -1, sizeX: 6, sizeY: 4, row: 10, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.Line), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 24, name: '柱状图数据', remark: '财务数据分析', dashId: 2, tabId: -1, sizeX: 6, sizeY: 4, row: 10, col: 6, config: '{}', renderMeta: buildMeta(MetaDemo.BarStack), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 25, name: '面积图数据', remark: '财务数据分析', dashId: 2, tabId: -1, sizeX: 6, sizeY: 4, row: 14, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.AreaNotDate), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 26, name: '双轴图', remark: '财务数据分析', dashId: 2, tabId: -1, sizeX: 6, sizeY: 4, row: 14, col: 6, config: '{}', renderMeta: buildMeta(MetaDemo.LineBarNotDate), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 27, name: '饼图', remark: '财务数据分析', dashId: 2, tabId: -1, sizeX: 6, sizeY: 4, row: 18, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.PieRing), chartType: ChartType.Pie.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 28, name: '漏斗图', remark: '财务数据分析', dashId: 2, tabId: -1, sizeX: 6, sizeY: 4, row: 18, col: 6, config: '{}', renderMeta: buildMeta(MetaDemo.Funnel), chartType: ChartType.Funnel.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 29, name: '条形图', remark: '财务数据分析', dashId: 2, tabId: -1, sizeX: 6, sizeY: 4, row: 22, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.BarStackTop), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 30, name: '地图', remark: '财务数据分析', dashId: 2, tabId: -1, sizeX: 6, sizeY: 6, row: 22, col: 6, config: '{}', renderMeta: buildMeta(MetaDemo.Map), chartType: ChartType.Map.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 31, name: '订单量', remark: '订单数据分析', dashId: 3, tabId: -1, sizeX: 2, sizeY: 2, row: 0, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCardOne), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 32, name: '嵌套报表百度', remark: '财务数据分析', dashId: 3, tabId: -1, sizeX: 8, sizeY: 4, row: 0, col: 2, config: '{}', largeChartType: LargeChartType.External.code,url: 'https://www.baidu.com', renderMeta: buildMeta(MetaDemo.Map), chartType: ChartType.Map.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 33, name: '用户量', remark: '用户数据分析', dashId: 3, tabId: -1, sizeX: 2, sizeY: 2, row: 0, col: 10, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCardOne), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 34, name: '交易量', remark: '交易数据分析', dashId: 3, tabId: -1, sizeX: 2, sizeY: 2, row: 2, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCardOne), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 35, name: '订单金额', remark: '财务数据分析', dashId: 3, tabId: -1, sizeX: 2, sizeY: 2, row: 2, col: 10, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCardOne), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 36, name: '表格数据', remark: '财务数据分析', dashId: 3, tabId: -1, sizeX: 12, sizeY: 6, row: 4, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.Table), chartType: ChartType.Table.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 37, name: '折线图数据', remark: '财务数据分析', dashId: 3, tabId: -1, sizeX: 6, sizeY: 4, row: 10, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.Line), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 38, name: '柱状图数据', remark: '财务数据分析', dashId: 3, tabId: -1, sizeX: 6, sizeY: 4, row: 10, col: 6, config: '{}', renderMeta: buildMeta(MetaDemo.BarStack), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 39, name: '面积图数据', remark: '财务数据分析', dashId: 3, tabId: -1, sizeX: 6, sizeY: 4, row: 14, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.AreaNotDate), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 40, name: '双轴图', remark: '财务数据分析', dashId: 3, tabId: -1, sizeX: 6, sizeY: 4, row: 14, col: 6, config: '{}', renderMeta: buildMeta(MetaDemo.LineBarNotDate), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 41, name: '订单量', remark: '订单数据分析', dashId: 4, tabId: -1, sizeX: 2, sizeY: 2, row: 0, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCardOne), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 42, name: '面积图', remark: '财务数据分析', dashId: 4, tabId: -1, sizeX: 8, sizeY: 4, row: 0, col: 2, config: '{}', renderMeta: buildMeta(MetaDemo.Area), chartType: ChartType.Map.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 43, name: '用户量', remark: '用户数据分析', dashId: 4, tabId: -1, sizeX: 2, sizeY: 2, row: 0, col: 10, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCardOne), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 44, name: '交易量', remark: '交易数据分析', dashId: 4, tabId: -1, sizeX: 2, sizeY: 2, row: 2, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCardOne), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 45, name: '订单金额', remark: '财务数据分析', dashId: 4, tabId: -1, sizeX: 2, sizeY: 2, row: 2, col: 10, config: '{}', renderMeta: buildMeta(MetaDemo.IndexCardOne), chartType: ChartType.IndexCard.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 47, name: 'top图数据', remark: '财务数据分析', dashId: 4, tabId: -1, sizeX: 6, sizeY: 4, row: 4, col: 0, config: '{}', renderMeta: buildMeta(MetaDemo.BarTop), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 0},
    {id: 48, name: 'top图数据', remark: '财务数据分析', dashId: 4, tabId: -1, sizeX: 6, sizeY: 4, row: 4, col: 6, config: '{}', renderMeta: buildMeta(MetaDemo.BarTop), chartType: ChartType.LineBar.code, creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
    {id: 49, name: '嵌套报表百度', remark: '财务数据分析', dashId: 9, tabId: -1, sizeX: 12, sizeY: 5, row: 0, col: 0, config: '{}', largeChartType: LargeChartType.External.code,url: 'https://www.baidu.com', renderMeta: '{}', chartType: '', creator: 'xiaoyi', creatorCn: '小一', departmentId: 1, departmentName: '数据智能-数据仓库', isCertified: 1},
]
export let ChartTagList = [
    {id: 1, chartId: 1, name: '订单'},
    {id: 2, chartId: 1, name: '用户'},
    {id: 3, chartId: 1, name: '交易'},
    {id: 4, chartId: 1, name: '财务'},
    {id: 5, chartId: 49, name: '百度'}
]
export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.getChart.name, ApiUrl.getChart.api, function (params) {
            let chart = ChartList.filter(c => c.id === params.id)[0]
            chart.tagList = ChartTagList.filter(t => t.chartId === chart.id)
            chart.editAuth = true
            return chart
        })

        Mock.post(mock, ApiUrl.addOrUpdateGeneralChart.name, ApiUrl.addOrUpdateGeneralChart.api, function (params) {
            let id = params.id
            let editConfig = JSON.parse(params.editConfig)
            if (id) { // 编辑
                let chart = ChartList.filter(c => c.id === Number(id))
                chart.name = editConfig.basicProperties.name
                chart.remark = editConfig.basicProperties.remark
                chart.dashId = editConfig.basicProperties.dashId
                chart.tabId = editConfig.basicProperties.tabId
                chart.editConfig = params.editConfig
                chart.renderMeta = params.renderMeta
                chart.largeChartType = LargeChartType.General.code
                chart.chartType = editConfig.chartStyle.type
            } else { // 新增
                id = new Date().getTime()
                let sizeX = editConfig.chartStyle.type === ChartType.IndexCard.code ? 4 : 6
                let sizeY = editConfig.chartStyle.type === ChartType.IndexCard.code ? 2 : 4
                let col = 0
                let row = 0
                ChartList.filter(c => c.dashId === Number(editConfig.basicProperties.dashId) && c.tabId === Number(editConfig.basicProperties.tabId)).forEach(c => {
                    if ((c.row + c.sizeY) > row) {
                        row = c.row + c.sizeY
                    }
                })
                ChartList.push({
                    id: id,
                    name: editConfig.basicProperties.name,
                    remark: editConfig.basicProperties.remark,
                    dashId: Number(editConfig.basicProperties.dashId),
                    tabId: Number(editConfig.basicProperties.tabId),
                    editConfig: params.editConfig,
                    renderMeta: params.renderMeta,
                    largeChartType: LargeChartType.General.code,
                    chartType: editConfig.chartStyle.type,
                    row: row,
                    col: col,
                    sizeX: sizeX,
                    sizeY: sizeY,
                    creator: 'xiaoyi',
                    creatorCn: '小一',
                    departmentId: 1,
                    departmentName: '数据智能-数据仓库',
                    isCertified: 1 // 是否认证
                })
            }
            return id
        })

        Mock.post(mock, ApiUrl.addOrUpdateExternalChart.name, ApiUrl.addOrUpdateExternalChart.api, function (params) {
            let id = params.id
            if (id) { // 修改
                let chart = ChartList.filter(c => c.id === id)[0]
                chart.name = params.name
                chart.remark = params.remark
                chart.url = params.url
                let tagIds = params.tagList.filter(t => t.id !== undefined).map(t => t.id)
                let delIndex = []
                ChartTagList.forEach((t, i) => {
                    if (!tagIds.includes(t.id)) {
                        delIndex.push(i)
                    }
                })
                delIndex.forEach((d, i) => {
                    ChartTagList.splice(d - i, 1)
                })
                params.tagList.filter(t => t.id === undefined).forEach((t, i) => {
                    ChartTagList.push({
                        id: new Date().getTime() + i,
                        chartId: id,
                        name: t.name
                    })
                })
            } else { // 新增
                id = new Date().getTime()
                let sizeX = 6
                let sizeY = 4
                let col = 0
                let row = 0
                ChartList.filter(c => c.dashId === Number(params.dashId) && c.tabId === Number(params.tabId)).forEach(c => {
                    if ((c.row + c.sizeY) > row) {
                        row = c.row + c.sizeY
                    }
                })
                ChartList.push({
                    id: id,
                    name: params.name,
                    remark: params.remark,
                    dashId: Number(params.dashId),
                    tabId: Number(params.tabId),
                    largeChartType: LargeChartType.External.code,
                    url: params.url,
                    row: row,
                    col: col,
                    sizeX: sizeX,
                    sizeY: sizeY,
                    creator: 'xiaoyi',
                    creatorCn: '小一',
                    departmentId: 1,
                    departmentName: '数据智能-数据仓库',
                    isCertified: 1 // 是否认证
                })
                params.tagList.forEach((t, i) => {
                    ChartTagList.push({
                        id: new Date().getTime() + i,
                        chartId: id,
                        name: t.name
                    })
                })
            }
            return id
        })

        Mock.post(mock, ApiUrl.queryData.name, ApiUrl.queryData.api, function (params) {
            let chart = ChartList.filter(c => c.id === Number(params.id))[0]
            let meta = JSON.parse(chart.renderMeta)
            let res = mockChartData(meta.chartMeta)
            if (params.sortFieldKey) {
                let isStr = false
                for (let i in meta.chartMeta.columns) {
                    if (meta.chartMeta.columns[i].key === params.sortFieldKey) {
                        isStr = meta.chartMeta.columns[i].showType === ShowType.text.code
                    }
                }
                res.sort((a, b) => {
                    if (isStr) {
                        if (params.sortType === SortType.asc.code) {
                            return compareStr(a[params.sortFieldKey], b[params.sortFieldKey])
                        }
                        return compareStr(b[params.sortFieldKey], a[params.sortFieldKey])
                    } else {
                        if (params.sortType === SortType.asc.code) {
                            return a[params.sortFieldKey] - b[params.sortFieldKey]
                        }
                        return b[params.sortFieldKey] - a[params.sortFieldKey]
                    }
                })
            }
            return res
        })

        Mock.post(mock, ApiUrl.previewData.name, ApiUrl.previewData.api, function (params) {
            let chartMeta = JSON.parse(params.chartMeta)
            let res = mockChartData(chartMeta)
            if (params.sortFieldKey) {
                let isStr = false
                for (let i in meta.chartMeta.columns) {
                    if (meta.chartMeta.columns[i].key === params.sortFieldKey) {
                        isStr = meta.chartMeta.columns[i].showType === ShowType.text.code
                    }
                }
                res.sort((a, b) => {
                    if (isStr) {
                        if (params.sortType === SortType.asc.code) {
                            return compareStr(a[params.sortFieldKey], b[params.sortFieldKey])
                        }
                        return compareStr(b[params.sortFieldKey], a[params.sortFieldKey])
                    } else {
                        if (params.sortType === SortType.asc.code) {
                            return a[params.sortFieldKey] - b[params.sortFieldKey]
                        }
                        return b[params.sortFieldKey] - a[params.sortFieldKey]
                    }
                })
            }
            return res
        })

        Mock.post(mock, ApiUrl.updateChartPosition.name, ApiUrl.updateChartPosition.api, function (params) {
            let res = ''
            let posArr = JSON.parse(params.positions)
            posArr.forEach(c => {
                let chart = ChartList.filter(cc => cc.id === c.id)[0]
                chart.row = c.row
                chart.col = c.col
                chart.sizeX = c.sizeX
                chart.sizeY = c.sizeY
            })
            return res
        })
    }
}