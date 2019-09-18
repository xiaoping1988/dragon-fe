import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.dataApi.be + '/api/api-dev'

export const ApiUrl = {
    listMyApi: {
        api: ApiBase + '/list-my',
        name: '获取我负责的所有API'
    },
    releaseApi: {
        api: ApiBase + '/release',
        name: '发布一个API'
    },
    deleteById: {
        api: ApiBase + '/delete-by-id',
        name: '删除一个API'
    },
    addOrUpdate: {
        api: ApiBase + '/add-or-update',
        name: '新增或者修改一个API'
    },
    getApi: {
        api: ApiBase + '/get',
        name: '获取一个API详情'
    },
    listApiCallTrendData: {
        api: ApiBase + '/list-call-trend-data',
        name: '获取一个API的调用趋势数据'
    }
}

export const listMyApi = (params) => {return post(ApiUrl.listMyApi.api, params)}
export const releaseApi = (params) => {return post(ApiUrl.releaseApi.api, params)}
export const addOrUpdateDevApi = (params) => {return post(ApiUrl.addOrUpdate.api, params)}
export const deleteById = (params) => {return post(ApiUrl.deleteById.api, params)}
export const getDevApi = (params) => {return post(ApiUrl.getApi.api, params)}
export const listApiCallTrendData = (params) => {return post(ApiUrl.listApiCallTrendData.api, params)}