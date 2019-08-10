import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.dataMap.be + '/api/db'

export const ApiUrl = {
    listAllDb: {
        api: ApiBase + '/list-all',
        name: '获取所有数据库'
    },
    getDb: {
        api: ApiBase + '/get',
        name: '获取一个数据库的详情'
    }
}

export const listAllDb = (params) => {return post(ApiUrl.listAllDb.api, params)}
export const getDb = (params) => {return post(ApiUrl.getDb.api, params)}
