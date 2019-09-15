import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.dataApi.be + '/api/app'

export const ApiUrl = {
    listMyApp: {
        api: ApiBase + '/list-my',
        name: '获取我负责的所有应用'
    },
    addOrUpdate: {
        api: ApiBase + '/add-or-update',
        name: '新增或者编辑一个应用'
    },
    deleteById: {
        api: ApiBase + '/delete-by-id',
        name: '删除一个应用'
    },
    deleteOwner: {
        api: ApiBase + '/delete-owner',
        name: '删除应用的一个负责人'
    },
    addOwner: {
        api: ApiBase + '/add-owner',
        name: '增加应用的一个负责人'
    },
    getApp: {
        api: ApiBase + '/get',
        name: '获取一个应用详情'
    }
}

export const listMyApp = (params) => {return post(ApiUrl.listMyApp.api, params)}
export const addOrUpdate = (params) => {return post(ApiUrl.addOrUpdate.api, params)}
export const deleteById = (params) => {return post(ApiUrl.deleteById.api, params)}
export const deleteOwner = (params) => {return post(ApiUrl.deleteOwner.api, params)}
export const addOwner = (params) => {return post(ApiUrl.addOwner.api, params)}
export const getApp = (params) => {return post(ApiUrl.getApp.api, params)}