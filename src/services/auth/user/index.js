import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.auth.be + '/api/user'

export const ApiUrl = {
    searchUser: {
        api: ApiBase + '/search',
        name: '搜索用户'
    },
    getUserBase: {
        api: ApiBase + '/get-base',
        name: '获取一个用户的基本信息'
    },
    listUserRole: {
        api: ApiBase + '/list-role',
        name: '获取一个用户的角色权限'
    },
    listUserCity: {
        api: ApiBase + '/list-city',
        name: '获取一个用户的城市权限'
    },
    grantUserRole: {
        api: ApiBase + '/grant-role',
        name: '给用户授权角色'
    },
    grantUserCity: {
        api: ApiBase + '/grant-city',
        name: '给用户授权城市'
    }
}

export const searchUser = (params) => {return post(ApiUrl.searchUser.api, params)}
export const getUserBase = (params) => {return post(ApiUrl.getUserBase.api, params)}
export const listUserRole = (params) => {return post(ApiUrl.listUserRole.api, params)}
export const listUserCity = (params) => {return post(ApiUrl.listUserCity.api, params)}
export const grantUserRole = (params) => {return post(ApiUrl.grantUserRole.api, params)}
export const grantUserCity = (params) => {return post(ApiUrl.grantUserCity.api, params)}
