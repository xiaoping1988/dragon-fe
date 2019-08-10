import {get, post} from '@/axios'
import Domain from '../domainSetting'

const ApiBase = Domain.sso.be + '/api'

export const ApiUrl = {
    login: {
        api: ApiBase + '/login',
        name: '登录'
    },
    logout: {
        api: ApiBase + '/logout',
        name: '退出登录'
    }
}

export const login = (params) => {return post(ApiUrl.login.api, params)}
export const logout = (params) => {return post(ApiUrl.logout.api, params)}
