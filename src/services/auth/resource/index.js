import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ResourceApiBase = Domain.auth.be + '/api/resource'

export const ApiUrl = {
    listStaticResourceTree: {
        api: ResourceApiBase + '/static-tree',
        name: '获取某个项目的功能资源树'
    },
    getStaticResource: {
        api: ResourceApiBase + '/get-static',
        name: '获取某个功能资源详情'
    },
    saveOrUpdateStaticResource: {
        api: ResourceApiBase + '/save-or-update-static',
        name: '新增或者某个功能资源'
    },
    deleteStaticResource: {
        api: ResourceApiBase + '/delete-static',
        name: '删除某个功能资源'
    },
    listDataResource: {
        api: ResourceApiBase + '/list-data',
        name: '获取某个项目的数据资源大类列表'
    },
    saveOrUpdateDataResource: {
        api: ResourceApiBase + '/save-or-update-data',
        name: '新增或者某个数据资源大类'
    },
    deleteDataResource: {
        api: ResourceApiBase + '/delete-data',
        name: '删除某个数据资源大类'
    },
    listWhiteListResource: {
        api: ResourceApiBase + '/list-white',
        name: '获取某个项目的白名单资源'
    },
    saveOrUpdateWhiteListResource: {
        api: ResourceApiBase + '/save-or-update-white',
        name: '新增或者某个白名单资源'
    },
    deleteWhiteListResource: {
        api: ResourceApiBase + '/delete-white',
        name: '删除某个白名单资源'
    }
}

export const listStaticResourceTree = (params) => {return post(ApiUrl.listStaticResourceTree.api, params)}
export const getStaticResource = (params) => {return post(ApiUrl.getStaticResource.api, params)}
export const saveOrUpdateStaticResource = (params) => {return post(ApiUrl.saveOrUpdateStaticResource.api, params)}
export const deleteStaticResource = (params) => {return post(ApiUrl.deleteStaticResource.api, params)}
export const listDataResource = (params) => {return post(ApiUrl.listDataResource.api, params)}
export const saveOrUpdateDataResource = (params) => {return post(ApiUrl.saveOrUpdateDataResource.api, params)}
export const deleteDataResource = (params) => {return post(ApiUrl.deleteDataResource.api, params)}
export const listWhiteListResource = (params) => {return post(ApiUrl.listWhiteListResource.api, params)}
export const saveOrUpdateWhiteListResource = (params) => {return post(ApiUrl.saveOrUpdateWhiteListResource.api, params)}
export const deleteWhiteListResource = (params) => {return post(ApiUrl.deleteWhiteListResource.api, params)}
