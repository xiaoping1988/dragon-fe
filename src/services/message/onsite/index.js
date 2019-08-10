import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.message.be + '/api/onsite'

export const ApiUrl = {
    listMsg: {
        api: ApiBase + '/list',
        name: '获取站内消息列表'
    },
    getMsg: {
        api: ApiBase + '/get',
        name: '获取一条站内消息详情'
    },
    getUnReadCount: {
        api: ApiBase + '/unread-count',
        name: '获取未读消息数量'
    },
    markReadedAll: {
        api: ApiBase + '/mark-readed-all',
        name: '把所有消息标记已读'
    },
    markReadedByIds: {
        api: ApiBase + '/mark-readed-by-ids',
        name: '根据ID批量把消息标记已读'
    },
    deleteAll: {
        api: ApiBase + '/delete-all',
        name: '删除所有消息'
    },
    deleteByIds: {
        api: ApiBase + '/delete-by-ids',
        name: '根据ID批量删除消息'
    }
}

export const listMsg = (params) => {return post(ApiUrl.listMsg.api, params)}
export const getMsg = (params) => {return post(ApiUrl.getMsg.api, params)}
export const getUnReadCount = (params) => {return post(ApiUrl.getUnReadCount.api, params)}
export const markReadedAll = (params) => {return post(ApiUrl.markReadedAll.api, params)}
export const markReadedByIds = (params) => {return post(ApiUrl.markReadedByIds.api, params)}
export const deleteAll = (params) => {return post(ApiUrl.deleteAll.api, params)}
export const deleteByIds = (params) => {return post(ApiUrl.deleteByIds.api, params)}
