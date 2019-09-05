import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const GeneralChartEditConfig = function () {
    this.workTable = { // 工作表配置
        tbId: '', // 表ID
        tbName: '', // 表名
        dbName: '' // 库名
    }
    this.dimConfig = { // 维度配置
        main: {
            colList: [] // 字段
        }, // 主维度
        contrast: {
            colList: [] // 字段
        } // 对比维度
    }
    this.measureConfig = { // 指标配置
        main: {
            type: '', // 类型,折线还是柱状
            colList: [] // 字段集合
        }, // 主轴
        second: {
            type: '', // 类型,折线还是柱状
            colList: [] // 字段集合
        } // 次轴
    }
    this.basicProperties = {
        dashId: '', // 仪表盘ID
        tabId: '', // 页签ID
        chartId: '', // 图表ID
        name: '', // 图表名称
        remark: '' // 描述
    }
    this.chartStyle = {
        type: '', // 图表大类
        subType: '', // 图表样式类型
        topNum: '' // top数量
    }
    this.chartFilterMeta = [] // 图内筛选
    this.defaultFilterMeta = [] // 默认过滤器
}

// 普通报表设计页的存储
const GeneralChartDesign = {
    namespaced: true,
    state:{
        workTableColList: [], // 工作表的所有字段,包括计算字段
        configUpdateCount: 0, // 配置变化次数,图表自动渲染用
        editConfig: new GeneralChartEditConfig(),
        renderMeta: { // 图表渲染配置
            chartMeta: {}, // 图形渲染配置
            filterMeta: [] // 图内筛选配置
        }
    },
    mutations:{
        updateEditConfig (state, config) {
            state.editConfig = config
            console.log(state)
        },
        updateWorkTable (state, workTable) {
            if (state.editConfig.workTable.tbId !== workTable.id) { // 切换工作表
                let init = new GeneralChartEditConfig()
                state.editConfig.dimConfig = init.dimConfig
                state.editConfig.measureConfig = init.measureConfig
                state.editConfig.chartFilterMeta = init.chartFilterMeta
                state.editConfig.defaultFilterMeta = init.defaultFilterMeta
                state.editConfig.chartStyle = init.chartStyle
                state.configUpdateCount++
            }
            state.editConfig.workTable = {
                tbId: workTable.id,
                tbName: workTable.tbName,
                dbName: workTable.dbName
            }
            state.workTableColList = workTable.colList
            console.log(state)
        },
        updateWorkTableColList (state, colList) {
            state.workTableColList = colList
            console.log(state)
        },
        updateBasicProperties (state, basicProperties) {
            state.editConfig.basicProperties = basicProperties
            console.log(state)
        },
        updateDimConfig (state, dimConfig) {
            state.editConfig.dimConfig = dimConfig
            state.configUpdateCount++
            console.log(state)
        },
        updateMeasureConfig (state, measureConfig) {
            state.editConfig.measureConfig = measureConfig
            state.configUpdateCount++
            console.log(state)
        },
        updateChartMeta (state, chartMeta) {
            state.renderMeta.chartMeta = chartMeta
            state.editConfig.chartStyle.type = chartMeta.chartType
            state.editConfig.chartStyle.subType = chartMeta.chartSubType
            console.log(state)
        },
        updateChartFilterMeta (state, chartFilterMeta) {
            state.renderMeta.filterMeta = chartFilterMeta
            state.editConfig.chartFilterMeta = chartFilterMeta
            state.configUpdateCount++
            console.log(state)
        },
        updateDefaultFilterMeta (state, defaultFilterMeta) {
            state.editConfig.defaultFilterMeta = defaultFilterMeta
            state.configUpdateCount++
            console.log(state)
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