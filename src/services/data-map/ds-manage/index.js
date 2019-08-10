import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.dataMap.be + '/api/ds'

export const ApiUrl = {
    listDs: {
        api: ApiBase + '/list',
        name: '分页获取数据源列表'
    },
    listDsOwner: {
        api: ApiBase + '/list-owner',
        name: '获取数据源的owner'
    },
    deleteDsOwner: {
        api: ApiBase + '/delete-owner',
        name: '删除一个数据源owner'
    },
    addDsOwner: {
        api: ApiBase + '/add-owner',
        name: '新增一个数据源owner'
    },
    getDs: {
        api: ApiBase + '/get',
        name: '根据ID获取一条数据源记录详情'
    },
    deleteDs: {
        api: ApiBase + '/delete',
        name: '根据ID删除一条数据源记录'
    },
    addOrUpdateDs: {
        api: ApiBase + '/add-or-update',
        name: '新增或者修改一条数据源'
    },
    testDs: {
        api: ApiBase + '/test-connection',
        name: '测试数据源的连通性'
    }
}

export const DbType = {
    MYSQL: {
        code: 'MYSQL',
        name: 'MYSQL'
    },
    HIVE: {
        code: 'HIVE',
        name: 'HIVE'
    },
    MAXCOMPUTE: {
        code: 'MAXCOMPUTE',
        name: 'MaxCompute(Lightning)'
    },
    IMPALA: {
        code: 'IMPALA',
        name: 'IMPALA'
    },
    PRESTO: {
        code: 'PRESTO',
        name: 'PRESTO'
    },
    KYLIN: {
        code: 'KYLIN',
        name: 'KYLIN'
    }
}

export const listDs = (params) => {return post(ApiUrl.listDs.api, params)}
export const listDsOwner = (params) => {return post(ApiUrl.listDsOwner.api, params)}
export const deleteDsOwner = (params) => {return post(ApiUrl.deleteDsOwner.api, params)}
export const addDsOwner = (params) => {return post(ApiUrl.addDsOwner.api, params)}
export const getDs = (params) => {return post(ApiUrl.getDs.api, params)}
export const deleteDs = (params) => {return post(ApiUrl.deleteDs.api, params)}
export const addOrUpdateDs = (params) => {return post(ApiUrl.addOrUpdateDs.api, params)}
export const testDs = (params) => {return post(ApiUrl.testDs.api, params)}
