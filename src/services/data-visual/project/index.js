import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.dataVisual.be + '/api/project'

export const ApiUrl = {
    addOrUpdateProj: {
        api: ApiBase + '/add-or-update',
        name: '新增或者修改一个文件夹基本信息'
    },
    deleteProj: {
        api: ApiBase + '/delete',
        name: '删除一个文件夹'
    },
    moveProj: {
        api: ApiBase + '/move',
        name: '移动一个文件夹'
    }
}

export const addOrUpdateProj = (params) => {return post(ApiUrl.addOrUpdateProj.api, params)}
export const deleteProj = (params) => {return post(ApiUrl.deleteProj.api, params)}
export const moveProj = (params) => {return post(ApiUrl.moveProj.api, params)}
