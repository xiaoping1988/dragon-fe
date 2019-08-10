import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ProjApiBase = Domain.auth.be + '/api/proj'

export const ApiUrl = {
    listProjectAuth: {
        api: ProjApiBase + '/list-auth',
        name: '查询有权限的项目列表'
    },
    getProjectById: {
        api: ProjApiBase + '/get-by-id',
        name: '根据ID查询项目详情'
    },
    saveOrUpdateProj: {
        api: ProjApiBase + '/save-or-update',
        name: '新增或者修改项目基本信息'
    },
    deleteProj: {
        api: ProjApiBase + '/delete',
        name: '删除一个项目'
    }
}

export const listProjectAuth = () => {return get(ApiUrl.listProjectAuth.api)}
export const getProjectById = (params) => {return post(ApiUrl.getProjectById.api, params)}
export const saveOrUpdateProj = (params) => {return post(ApiUrl.saveOrUpdateProj.api, params)}
export const deleteProj = (params) => {return post(ApiUrl.deleteProj.api, params)}
