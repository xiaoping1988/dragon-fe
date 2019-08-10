import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.dataVisual.be + '/api/chart'

export const ApiUrl = {
    queryData: {
        api: ApiBase + '/query-data',
        name: '查询数据'
    },
    addOrUpdateChart: {
        api: ApiBase + '/add-or-update',
        name: '新增或者修改一个图表配置'
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
export const addOrUpdateChart = (params) => {return post(ApiUrl.addOrUpdateChart.api, params)}
export const deleteChart = (params) => {return post(ApiUrl.deleteChart.api, params)}
export const moveChart = (params) => {return post(ApiUrl.moveChart.api, params)}
export const copyChart = (params) => {return post(ApiUrl.copyChart.api, params)}
export const updateChartPosition = (params) => {return post(ApiUrl.updateChartPosition.api, params)}
