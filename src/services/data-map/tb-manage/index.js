import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.dataMap.be + '/api/tb'

export const ApiUrl = {
    searchTb: {
        api: ApiBase + '/search',
        name: '搜索工作表,分页展现'
    },
    listMyTbOwn: {
        api: ApiBase + '/list-own',
        name: '分页获取我拥有的工作表列表'
    },
    listMyTbManage: {
        api: ApiBase + '/list-manage',
        name: '分页获取我管理的工作表列表'
    },
    listTbUser: {
        api: ApiBase + '/list-user',
        name: '获取工作表被授予的用户列表'
    },
    getTb: {
        api: ApiBase + '/get',
        name: '获取一张表的详情'
    },
    previewTbData: {
        api: ApiBase + '/preview-data',
        name: '预览一张表的数据'
    },
    addTbUser: {
        api: ApiBase + '/add-user',
        name: '给某张表授权一个用户'
    },
    deleteTbUser: {
        api: ApiBase + '/delete-user',
        name: '给某张表删除一个用户'
    }
}

export const searchTb = (params) => {return post(ApiUrl.searchTb.api, params)}
export const listMyTbOwn = (params) => {return post(ApiUrl.listMyTbOwn.api, params)}
export const listMyTbManage = (params) => {return post(ApiUrl.listMyTbManage.api, params)}
export const listTbUser = (params) => {return post(ApiUrl.listTbUser.api, params)}
export const getTb = (params) => {return post(ApiUrl.getTb.api, params)}
export const previewTbData = (params) => {return post(ApiUrl.previewTbData.api, params)}
export const addTbUser = (params) => {return post(ApiUrl.addTbUser.api, params)}
export const deleteTbUser = (params) => {return post(ApiUrl.deleteTbUser.api, params)}
