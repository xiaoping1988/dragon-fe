import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.auth.be + '/api/role'

export const ApiUrl = {
    listRole: {
        api: ApiBase + '/list',
        name: '获取某个项目的角色列表'
    },
    listProjRole: {
        api: ApiBase + '/group-by-proj',
        name: '获取所有角色列表,根据项目分组'
    },
    addStaticRole: {
        api: ApiBase + '/add-static',
        name: '新增一个功能角色'
    },
    addDataRole: {
        api: ApiBase + '/add-data',
        name: '新增一个数据角色'
    },
    updateRoleBase: {
        api: ApiBase + '/update-base',
        name: '修改角色的基本信息'
    },
    listStaticRoleResourceRelation: {
        api: ApiBase + '/list-static-resource-relation',
        name: '获取某个功能角色的资源权限关系'
    },
    grantStaticRoleAuth: {
        api: ApiBase + '/grant-auth-static',
        name: '给功能角色配置权限'
    },
    grantDataRoleAuth: {
        api: ApiBase + '/grant-auth-data',
        name: '给数据角色配置权限'
    },
    deleteRole: {
        api: ApiBase + '/delete',
        name: '删除一个角色'
    },
    listRoleUser: {
        api: ApiBase + '/list-user',
        name: '获取拥有某个角色的所有用户'
    },
    addRoleUser: {
        api: ApiBase + '/add-user',
        name: '给某个角色添加一个用户'
    },
    deleteRoleUser: {
        api: ApiBase + '/delete-user',
        name: '给某个角色删除一个用户'
    },
    listDataRoleResourceRelation: {
        api: ApiBase + '/list-data-resource-relation',
        name: '获取某个数据角色的资源权限关系'
    }
}

/**
 * 角色等级
 * @type {{SUPER: {code: number, name: string}, ADMIN: {code: number, name: string}, ORDINARY: {code: number, name: string}}}
 */
export const RoleGrade = {
    SUPER: {
        code: 1,
        name: '超管角色'
    },
    ADMIN: {
        code: 2,
        name: '管理员角色'
    },
    ORDINARY: {
        code: 3,
        name: '普通角色'
    }
}

/**
 * 角色类型
 * @type {{STATIC: {code: number, name: string}, DATA: {code: number, name: string}}}
 */
export const RoleType = {
    STATIC: {
        code: 1,
        name: '功能角色'
    },
    DATA: {
        code: 2,
        name: '数据角色'
    }
}

/**
 * 操作权限
 * @type {{READ_ONLY: {code: string, name: string}, READ_WRITE: {code: string, name: string}, CREATE_TABLE: {code: string, name: string}, EXPORT: {code: string, name: string}}}
 */
export const OperPrivilege = {
    READ_ONLY: {
        code: 'READ_ONLY',
        name: '只读'
    },
    READ_WRITE: {
        code: 'READ_WRITE',
        name: '读写'
    },
    CREATE_TABLE: {
        code: 'CREATE_TABLE',
        name: '建表'
    },
    EXPORT: {
        code: 'EXPORT',
        name: '导出'
    }
}

export const listRole = (params) => {return post(ApiUrl.listRole.api, params)}
export const listProjRole = (params) => {return post(ApiUrl.listProjRole.api, params)}
export const addStaticRole = (params) => {return post(ApiUrl.addStaticRole.api, params)}
export const addDataRole = (params) => {return post(ApiUrl.addDataRole.api, params)}
export const updateRoleBase = (params) => {return post(ApiUrl.updateRoleBase.api, params)}
export const listStaticRoleResourceRelation = (params) => {return post(ApiUrl.listStaticRoleResourceRelation.api, params)}
export const grantStaticRoleAuth = (params) => {return post(ApiUrl.grantStaticRoleAuth.api, params)}
export const grantDataRoleAuth = (params) => {return post(ApiUrl.grantDataRoleAuth.api, params)}
export const deleteRole = (params) => {return post(ApiUrl.deleteRole.api, params)}
export const listRoleUser = (params) => {return post(ApiUrl.listRoleUser.api, params)}
export const addRoleUser = (params) => {return post(ApiUrl.addRoleUser.api, params)}
export const deleteRoleUser = (params) => {return post(ApiUrl.deleteRoleUser.api, params)}
export const listDataRoleResourceRelation = (params) => {return post(ApiUrl.listDataRoleResourceRelation.api, params)}
