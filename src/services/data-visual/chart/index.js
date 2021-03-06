import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.dataVisual.be + '/api/chart'

export const ApiUrl = {
    queryData: {
        api: ApiBase + '/query-data',
        name: '查询图表数据'
    },
    previewData: {
        api: ApiBase + '/preview-data',
        name: '预览图表数据'
    },
    getChart: {
        api: ApiBase + '/get',
        name: '获取一个图表的详情'
    },
    addOrUpdateGeneralChart: {
        api: ApiBase + '/add-or-update-general',
        name: '新增或者修改一个普通图表配置'
    },
    getGeneralChartEditConfig: {
        api: ApiBase + '/get-general-chart-edit-config',
        name: '获取一个普通报表的设计配置'
    },
    addOrUpdateGpsMap: {
        api: ApiBase + '/add-or-update-gpsmap',
        name: '新增或者修改一个经纬度地图配置'
    },
    addOrUpdateExternalChart: {
        api: ApiBase + '/add-or-update-external',
        name: '新增或者修改一个外部图表配置'
    },
    deleteChart: {
        api: ApiBase + '/delete',
        name: '删除一个图表'
    },
    moveChart: {
        api: ApiBase + '/move',
        name: '移动一个图表'
    },
    copyChart: {
        api: ApiBase + '/copy',
        name: '复制一个图表'
    },
    updateChartPosition: {
        api: ApiBase + '/update-position',
        name: '修改图标的位置'
    }
}

export const queryData = (params) => {return post(ApiUrl.queryData.api, params)}
export const previewData = (params) => {return post(ApiUrl.previewData.api, params)}
export const getChart = (params) => {return post(ApiUrl.getChart.api, params)}
export const addOrUpdateGeneralChart = (params) => {return post(ApiUrl.addOrUpdateGeneralChart.api, params)}
export const getGeneralChartEditConfig = (params) => {return post(ApiUrl.getGeneralChartEditConfig.api, params)}
export const addOrUpdateGpsMap = (params) => {return post(ApiUrl.addOrUpdateGpsMap.api, params)}
export const addOrUpdateExternalChart = (params) => {return post(ApiUrl.addOrUpdateExternalChart.api, params)}
export const deleteChart = (params) => {return post(ApiUrl.deleteChart.api, params)}
export const moveChart = (params) => {return post(ApiUrl.moveChart.api, params)}
export const copyChart = (params) => {return post(ApiUrl.copyChart.api, params)}
export const updateChartPosition = (params) => {return post(ApiUrl.updateChartPosition.api, params)}
