import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'

import {ApiUrl} from '../../../services/auth/user'
import {RoleList, RoleUserList} from '../role'
import {ProjList} from '../project'

const UserList = [
    {userName: 'xiaoyi', userNameCn: '小一', phone: '13800000001', email: 'xiaoyi@xxx.com', departmentName: '总裁办-秘书室', position: '秘书', city: '北京', headPic: ''},
    {userName: 'xiaoer', userNameCn: '小二', phone: '13800000002', email: 'xiaoer@xxx.com', departmentName: '总裁办-秘书室', position: '秘书', city: '北京', headPic: ''},
    {userName: 'xiaosan', userNameCn: '小三', phone: '13800000003', email: 'xiaosan@xxx.com', departmentName: '总裁办-秘书室', position: '秘书', city: '北京', headPic: ''},
    {userName: 'xiaosi', userNameCn: '小四', phone: '13800000004', email: 'xiaosi@xxx.com', departmentName: '总裁办-秘书室', position: '秘书', city: '北京', headPic: ''},
    {userName: 'xiaowu', userNameCn: '小五', phone: '13800000005', email: 'xiaowu@xxx.com', departmentName: '总裁办-秘书室', position: '秘书', city: '北京', headPic: ''},
    {userName: 'xiaoliu', userNameCn: '小六', phone: '13800000006', email: 'xiaoliu@xxx.com', departmentName: '总裁办-秘书室', position: '秘书', city: '北京', headPic: ''},
    {userName: 'xiaoqi', userNameCn: '小七', phone: '13800000007', email: 'xiaoqi@xxx.com', departmentName: '总裁办-秘书室', position: '秘书', city: '北京', headPic: ''},
    {userName: 'xiaoba', userNameCn: '小八', phone: '13800000008', email: 'xiaoba@xxx.com', departmentName: '总裁办-秘书室', position: '秘书', city: '北京', headPic: ''},
    {userName: 'xiaojiu', userNameCn: '小九', phone: '13800000009', email: 'xiaojiu@xxx.com', departmentName: '总裁办-秘书室', position: '秘书', city: '北京', headPic: ''},
    {userName: 'xiaoshi', userNameCn: '小十', phone: '13800000010', email: 'xiaoshi@xxx.com', departmentName: '总裁办-秘书室', position: '秘书', city: '北京', headPic: ''},
]

const UserCityList = [
    {id: 1, userName: 'xiaoyi', cityId: -99, cityName: '全国'},
    {id: 2, userName: 'xiaoer', cityId: 1, cityName: '北京'},
    {id: 3, userName: 'xiaoer', cityId: 2, cityName: '上海'},
    {id: 4, userName: 'xiaoer', cityId: 3, cityName: '广州'}
]

export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.searchUser.name, ApiUrl.searchUser.api, function (params) {
            let res = UserList.filter(r => {
                return r.userName.includes(params.keyword.toLowerCase()) ||
                        r.userNameCn.includes(params.keyword)
            })
            return res
        })

        Mock.post(mock, ApiUrl.getUserBase.name, ApiUrl.getUserBase.api, function (params) {
            if (!params) {
                params = {
                    userName: 'xiaoyi'
                }
            }
            let res = UserList.filter(r => r.userName === params.userName)[0]
            return res
        })

        Mock.post(mock, ApiUrl.listUserRole.name, ApiUrl.listUserRole.api, function (params) {
            if (!params) {
                params = {
                    userName: 'xiaoyi'
                }
            }
            let res = {}
            let roleIdList = RoleUserList.filter(r => r.userName === params.userName)
            roleIdList.forEach(ru => {
                let role = RoleList.filter(r => ru.roleId === r.id)[0]
                if (!res[role.projId]) {
                    let proj = ProjList.filter(p => p.id === role.projId)[0]
                    res[role.projId] = {
                        projId: proj.id,
                        projName: proj.name,
                        roleList: []
                    }
                }
                res[role.projId].roleList.push({
                    roleUserId: ru.id,
                    roleId: role.id,
                    roleName: role.name
                })
            })
            res = Object.values(res)
            return res
        })

        Mock.post(mock, ApiUrl.listUserCity.name, ApiUrl.listUserCity.api, function (params) {
            if (!params) {
                params = {
                    userName: 'xiaoyi'
                }
            }
            let res = UserCityList.filter(r => r.userName === params.userName)
            return res
        })

        Mock.post(mock, ApiUrl.grantUserRole.name, ApiUrl.grantUserRole.api, function (params) {
            let delRelationIdList = params.delRelationIdList
            if (delRelationIdList) {
                let delIds = delRelationIdList.split(',')
                let delIndex = []
                RoleUserList.forEach((a, i) => {
                    if (delIds.includes(a.id + '')) {
                        delIndex.push(i)
                    }
                })
                delIndex.forEach((d, i) => {
                    RoleUserList.splice(d - i, 1)
                })
            }
            let userName = params.userName
            let userNameCn = params.userNameCn
            let addRoleIdList = params.addRoleIdList
            if (addRoleIdList) {
                let roleIds = addRoleIdList.split(',')
                let id = new Date().getTime()
                roleIds.forEach((roleId, i) => {
                    RoleUserList.push({
                        id: id + i,
                        roleId: Number(roleId),
                        userName: userName,
                        userNameCn: userNameCn
                    })
                })
            }
            return ''
        })

        Mock.post(mock, ApiUrl.grantUserCity.name, ApiUrl.grantUserCity.api, function (params) {
            let delRelationIdList = params.delRelationIdList
            if (delRelationIdList) {
                let delIds = delRelationIdList.split(',')
                let delIndex = []
                UserCityList.forEach((a, i) => {
                    if (delIds.includes(a.id + '')) {
                        delIndex.push(i)
                    }
                })
                delIndex.forEach((d, i) => {
                    UserCityList.splice(d - i, 1)
                })
            }
            let userName = params.userName
            let addCityList = JSON.parse(params.addCityList)
            addCityList.forEach((c, i) => {
                let id = new Date().getTime()
                UserCityList.push({
                    id: id + i,
                    cityId: Number(c.cityId),
                    cityName: c.cityName,
                    userName: userName
                })
            })
            return ''
        })
    }
}