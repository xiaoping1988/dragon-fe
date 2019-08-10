import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.dataVisual.be + '/api/dashboard'

export const ApiUrl = {
    listUserDash: {
        api: ApiBase + '/list-by-user',
        name: '获取登录用户有权限的仪表盘,最菜单展现用'
    },
    addOrUpdateDash: {
        api: ApiBase + '/add-or-update',
        name: '新增或者修改一个仪表盘基本信息'
    },
    deleteDash: {
        api: ApiBase + '/delete',
        name: '删除一个仪表盘'
    },
    moveDash: {
        api: ApiBase + '/move',
        name: '移动一个仪表盘'
    },
    copyDash: {
        api: ApiBase + '/copy',
        name: '复制一个仪表盘'
    },
    getDashMetaForShow: {
        api: ApiBase + '/get-for-show',
        name: '获取一个渲染用的仪表盘元数据'
    }
}

export const listUserDash = (params) => {return post(ApiUrl.listUserDash.api, params)}
export const addOrUpdateDash = (params) => {return post(ApiUrl.addOrUpdateDash.api, params)}
export const deleteDash = (params) => {return post(ApiUrl.deleteDash.api, params)}
export const moveDash = (params) => {return post(ApiUrl.moveDash.api, params)}
export const copyDash = (params) => {return post(ApiUrl.copyDash.api, params)}
export const getDashMetaForShow = (params) => {return post(ApiUrl.getDashMetaForShow.api, params)}
