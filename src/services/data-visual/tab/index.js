import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.dataVisual.be + '/api/tab'

export const ApiUrl = {
    addOrUpdateTab: {
        api: ApiBase + '/add-or-update',
        name: '新增或者修改一个仪表盘tab配置'
    },
    deleteTab: {
        api: ApiBase + '/delete',
        name: '删除一个仪表盘tab'
    },
    moveTab: {
        api: ApiBase + '/move',
        name: '移动一个仪表盘tab'
    }
}

export const addOrUpdateTab = (params) => {return post(ApiUrl.addOrUpdateTab.api, params)}
export const deleteTab = (params) => {return post(ApiUrl.deleteTab.api, params)}
export const moveTab = (params) => {return post(ApiUrl.moveTab.api, params)}
