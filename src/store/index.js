import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 普通报表设计页的存储
const GeneralChartDesign = {
    namespaced: true,
    state:{
        workTableColList: [], // 工作表的所有字段,包括计算字段
        configUpdateCount: 0, // 配置变化次数,图表自动渲染用
        editConfig: { // 所有配置
            workTable: { // 工作表配置
                tbId: '', // 表ID
                tbName: '', // 表名
                dbName: '' // 库名
            },
            dimConfig: { // 维度配置
                main: [], // 主维度
                contrast: [] // 对比维度
            },
            measureConfig: { // 指标配置
                main: [], // 主轴
                second: [] // 次轴
            },
            basicProperties:{
                dashId: '', // 仪表盘ID
                tabId: '', // 页签ID
                chartId: '', // 图表ID
                name: '', // 图表名称
                remark: '' // 描述
            },
            chartStyle: {
                type: '', // 图表大类
                subType: '', // 图表样式类型
                topNum: '' // top数量
            },
            chartFilterMeta: [], // 图内筛选
            defaultFilterMeta: [] // 默认过滤器
        },
        renderMeta: { // 图表渲染配置
            chartMeta: {}, // 图形渲染配置
            filterMeta: [] // 图内筛选配置
        }
    },
    mutations:{
        updateEditConfig (state, config) {
            state.editConfig = config
        },
        updateWorkTable (state, workTable) {
            if (state.editConfig.workTable.tbId !== workTable.id) { // 切换工作表
                state.editConfig.dimConfig = {
                    main: [],
                    contrast: []
                }
                state.editConfig.measureConfig = {
                    main: [],
                    second: []
                }
                state.editConfig.chartFilterMeta = []
                state.editConfig.defaultFilterMeta = []
                state.configUpdateCount++
            }
            state.editConfig.workTable = {
                tbId: workTable.id,
                tbName: workTable.tbName,
                dbName: workTable.dbName
            }
            state.workTableColList = workTable.colList
        },
        updateWorkTableColList (state, colList) {
            state.workTableColList = colList
        },
        updateBasicProperties (state, basicProperties) {
            state.basicProperties = basicProperties
        },
        updateDimConfig (state, dimConfig) {
            state.dimConfig = dimConfig
            state.configUpdateCount++
            console.log(dimConfig)
        },
        updateMeasureConfig (state, measureConfig) {
            state.measureConfig = measureConfig
            state.configUpdateCount++
        },
        updateChartMeta (state, chartMeta) {
            state.renderMeta.chartMeta = chartMeta
            state.editConfig.chartStyle.type = chartMeta.chartType
            state.editConfig.chartStyle.subType = chartMeta.chartSubType
        },
        updateChartFilterMeta (state, chartFilterMeta) {
            state.renderMeta.filterMeta = chartFilterMeta
            state.editConfig.chartFilterMeta = chartFilterMeta
            state.configUpdateCount++
        },
        updateDefaultFilterMeta (state, defaultFilterMeta) {
            state.editConfig.defaultFilterMeta = defaultFilterMeta
            state.configUpdateCount++
        }
    },
    getters:{

    }
}

// 经纬度地图设计页的存储
const GpsMapDesign = {
    namespaced: true,
    state:{
       
    },
    mutations:{
        updateDimConfig (state, dimConfig) {
            console.log('gpsmap')
        }
    },
    getters:{}
}

const store = new Vuex.Store({
    modules: {
        GeneralChart: GeneralChartDesign,
        GpsMap: GpsMapDesign
    }
})

export default store