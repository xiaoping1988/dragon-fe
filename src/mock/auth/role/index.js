import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'

import {ApiUrl, RoleGrade, RoleType, OperPrivilege} from '../../../services/auth/role'
import {ProjList} from '../project'

export const RoleList = [
    {id: 1, name: '超级系统管理员', code: 'AUTH_SUPER_ADMIN', remark: '什么都能干', grade: RoleGrade.SUPER.code, type: RoleType.STATIC.code, operPrivilege: '', projId: 3, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 2, name: '数据权限管理员', code: 'AUTH_DATA_ADMIN', remark: '什么都能干', grade: RoleGrade.ORDINARY.code, type: RoleType.STATIC.code, operPrivilege: '', projId: 3, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 3, name: '运营', code: 'REPORT_YY', remark: '什么都能干', grade: RoleGrade.ORDINARY.code, type: RoleType.DATA.code, operPrivilege: OperPrivilege.READ_ONLY.code, projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 4, name: '人力', code: 'REPORT_HR', remark: '什么都能干', grade: RoleGrade.ORDINARY.code, type: RoleType.DATA.code, operPrivilege: OperPrivilege.READ_WRITE.code, projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 5, name: '管理员', code: 'REPORT_ADMIN', remark: '什么都能干', grade: RoleGrade.ADMIN.code, type: RoleType.STATIC.code, operPrivilege: '', projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 6, name: '市场部', code: 'REPORT_MARKET', remark: '什么都能干', grade: RoleGrade.ORDINARY.code, type: RoleType.DATA.code, operPrivilege: OperPrivilege.CREATE_TABLE.code, projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 7, name: '数据部', code: 'REPORT_MARKET', remark: '什么都能干', grade: RoleGrade.ORDINARY.code, type: RoleType.DATA.code, operPrivilege: OperPrivilege.CREATE_TABLE.code, projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 8, name: 'XXXX', code: 'DATA_SERVICE_MARKET', remark: '什么都能干', grade: RoleGrade.ORDINARY.code, type: RoleType.DATA.code, operPrivilege: OperPrivilege.CREATE_TABLE.code, projId: 4, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'}
]

const StaticRoleResourceList = [
    {id: 1, roleId: 5, resourceId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 2, roleId: 5, resourceId: 2, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 3, roleId: 5, resourceId: 3, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 4, roleId: 5, resourceId: 4, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 5, roleId: 5, resourceId: 5, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 6, roleId: 5, resourceId: 6, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'}
]

export const RoleUserList = [
    {id: 1, roleId: 3, userName: 'xiaoyi', userNameCn: '小一'},
    {id: 2, roleId: 3, userName: 'xiaoer', userNameCn: '小二'},
    {id: 3, roleId: 3, userName: 'xiaosan', userNameCn: '小三'},
    {id: 4, roleId: 3, userName: 'xiaosi', userNameCn: '小四'},
    {id: 5, roleId: 7, userName: 'xiaoyi', userNameCn: '小一'},
    {id: 6, roleId: 8, userName: 'xiaoyi', userNameCn: '小一'}
]

const DataRoleResourceList = [
    {id: 1, roleId: 3, dataResourceId: 1, resourceId: '1_db', pid: '', realId: '1', label: 'db_1', type: 'db'},
    {id: 2, roleId: 3, dataResourceId: 1, resourceId: '5_table', pid: '1_db', realId: '5', label: 'table_5', type: 'table'},
    {id: 3, roleId: 3, dataResourceId: 1, resourceId: '6_table', pid: '1_db', realId: '6', label: 'table_6', type: 'table'},
    {id: 4, roleId: 3, dataResourceId: 1, resourceId: '0_table', pid: '1_db', realId: '0', label: 'table_0', type: 'table'},
    {id: 5, roleId: 3, dataResourceId: 1, resourceId: '7_table', pid: '1_db', realId: '7', label: 'table_7', type: 'table'}
]

function valueOfCode(code, obj) {
    let res = {}
    Object.values(obj).forEach(v => {
        if (code === v.code) {
            res = v
        }
    })
    return res
}

export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.listRole.name, ApiUrl.listRole.api, function (params) {
            let res = RoleList.filter(r => r.projId === params.projId)
            res.forEach(r => {
                r.gradeName = valueOfCode(r.grade, RoleGrade).name
                r.typeName = valueOfCode(r.type, RoleType).name
                r.operPrivilegeName = valueOfCode(r.operPrivilege, OperPrivilege).name
            })
            return res
        })

        Mock.post(mock, ApiUrl.listProjRole.name, ApiUrl.listProjRole.api, function (params) {
            let res = {}
            RoleList.forEach(r => {
                if (!res[r.projId]) {
                    let proj = ProjList.filter(p => p.id === r.projId)[0]
                    res[r.projId] = {
                        projId: proj.id,
                        projName: proj.name,
                        roleList: []
                    }
                }
                if (r.id != 7) {
                    res[r.projId].roleList.push({
                        roleId: r.id,
                        roleName: r.name
                    })
                }
            })
            res = Object.values(res)
            return res
        })

        Mock.post(mock, ApiUrl.addStaticRole.name, ApiUrl.addStaticRole.api, function (params) {
            let res = new Date().getTime()
            RoleList.push({
                id: res,
                projId: params.projId,
                name: params.name,
                code: params.code.toUpperCase(),
                remark: params.remark,
                grade: params.grade,
                type: RoleType.STATIC.code,
                operPrivilege: '',
                creator: 'xiaoping',
                createTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                updator: 'xiaoping',
                updateTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
            })
            if (params.resourceIdList) {
                let ids = params.resourceIdList.split(',')
                ids.forEach((a, i) => {
                    StaticRoleResourceList.push({
                        id: new Date().getTime() + i,
                        roleId: res,
                        resourceId: a,
                        creator: 'xiaoping',
                        createTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                        updator: 'xiaoping',
                        updateTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
                    })
                })
            }
            return res
        })

        Mock.post(mock, ApiUrl.updateRoleBase.name, ApiUrl.updateRoleBase.api, function (params) {
            let res = params.id
            RoleList.forEach(r => {
                if (r.id === params.id) {
                    r.name = params.name
                    r.code = params.code.toUpperCase()
                    r.remark = params.remark
                    r.updator = 'sanshang'
                    r.updateTime = DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
                }
            })
            return res
        })

        Mock.post(mock, ApiUrl.listStaticRoleResourceRelation.name, ApiUrl.listStaticRoleResourceRelation.api, function (params) {
            let res = StaticRoleResourceList.filter(r => r.roleId === params.roleId)
            return res
        })

        Mock.post(mock, ApiUrl.grantStaticRoleAuth.name, ApiUrl.grantStaticRoleAuth.api, function (params) {
            let res = params.roleId
            RoleList.forEach(r => {
                if (r.id === params.roleId) {
                    r.grade = params.grade
                }
            })
            if (params.addResourceIdList) {
                let addResIds = params.addResourceIdList.split(',')
                addResIds.forEach((a, i) => {
                    StaticRoleResourceList.push({
                        id: new Date().getTime() + i,
                        roleId: params.roleId,
                        resourceId: Number(a)
                    })
                })
            }
            if (params.delRelationIdList) {
                let delIds = params.delRelationIdList.split(',')
                let delIndex = []
                StaticRoleResourceList.forEach((a, i) => {
                    if (delIds.includes(a.id + '')) {
                        delIndex.push(i)
                    }
                })
                delIndex.forEach((d, i) => {
                    StaticRoleResourceList.splice(d - i, 1)
                })
            }
            return res
        })

        Mock.post(mock, ApiUrl.deleteRole.name, ApiUrl.deleteRole.api, function (params) {
            let i = RoleList.findIndex(r => r.id === params.id)
            if (i > -1) {
                RoleList.splice(i, 1)
            }
            return ''
        })

        Mock.post(mock, ApiUrl.listRoleUser.name, ApiUrl.listRoleUser.api, function (params) {
            let res = RoleUserList.filter(r => r.roleId === params.id)
            return res
        })

        Mock.post(mock, ApiUrl.addRoleUser.name, ApiUrl.addRoleUser.api, function (params) {
            let res = new Date().getTime()
            RoleUserList.push({
                id: res,
                roleId: params.roleId,
                userName: params.userName,
                userNameCn: params.userNameCn
            })
            return res
        })

        Mock.post(mock, ApiUrl.deleteRoleUser.name, ApiUrl.deleteRoleUser.api, function (params) {
            let i = RoleUserList.findIndex(r => r.id === params.roleUserId)
            if (i > -1) {
                RoleUserList.splice(i, 1)
            }
            return ''
        })

        Mock.post(mock, ApiUrl.addDataRole.name, ApiUrl.addDataRole.api, function (params) {
            let res = new Date().getTime()
            RoleList.push({
                id: res,
                projId: params.projId,
                name: params.name,
                code: '',
                remark: params.remark,
                grade: RoleGrade.ORDINARY.code,
                type: RoleType.DATA.code,
                operPrivilege: params.operPrivilege,
                creator: 'xiaoping',
                createTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                updator: 'xiaoping',
                updateTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
            })
            if (params.resourceIdList) {
                let ids = JSON.parse(params.resourceIdList)
                let count = 0
                Object.keys(ids).forEach(dataId => {
                    ids[dataId].forEach(r => {
                        count += 1
                        DataRoleResourceList.push({
                            id: res + count,
                            roleId: res,
                            dataResourceId: Number(dataId),
                            resourceId: r.resourceId,
                            realId: r.realId,
                            label: r.label,
                            type: r.type,
                            pid: r.pid
                        })
                    })
                })
            }
            return res
        })

        Mock.post(mock, ApiUrl.listDataRoleResourceRelation.name, ApiUrl.listDataRoleResourceRelation.api, function (params) {
            let res = {}
            let drs = DataRoleResourceList.filter(r => r.roleId === params.roleId)
            drs.forEach(d => {
                if (!res[d.dataResourceId]) {
                    res[d.dataResourceId] = []
                }
                res[d.dataResourceId].push(d)
            })
            return res
        })

        Mock.post(mock, ApiUrl.grantDataRoleAuth.name, ApiUrl.grantDataRoleAuth.api, function (params) {
            let res = params.roleId
            RoleList.forEach(r => {
                if (r.id === params.roleId) {
                    r.operPrivilege = params.operPrivilege
                }
            })
            if (params.addResourceIdList) {
                let ids = JSON.parse(params.addResourceIdList)
                let count = 0
                Object.keys(ids).forEach(dataId => {
                    ids[dataId].forEach(r => {
                        count += 1
                        DataRoleResourceList.push({
                            id: res + count,
                            roleId: res,
                            dataResourceId: Number(dataId),
                            resourceId: r.resourceId,
                            realId: r.realId,
                            label: r.label,
                            type: r.type,
                            pid: r.pid
                        })
                    })
                })
            }
            if (params.delRelationIdList) {
                let delIds = params.delRelationIdList.split(',')
                let delIndex = []
                DataRoleResourceList.forEach((a, i) => {
                    if (delIds.includes(a.id + '')) {
                        delIndex.push(i)
                    }
                })
                delIndex.forEach((d, i) => {
                    DataRoleResourceList.splice(d - i, 1)
                })
            }
            return res
        })
    }
}