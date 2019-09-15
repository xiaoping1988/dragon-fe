import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'
import {guid} from '../../../utils/assist'

import {ApiUrl} from '../../../services/data-api/app'

export const AppList = [
    {id: 1, name: '风控中心', code: 'FK_CENTER', remark: '风控中心', accessKey: 'asedqd123adsfa2313gdsd123sdaf', creator: 'xiaoping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 2, name: '订单中心', code: 'ORDER_CENTER', remark: '订单中心', accessKey: 'asedqd123adsfa2313gdsd123sdaf', creator: 'xiaoping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 3, name: '用户中心', code: 'USER_CENTER', remark: '用户中心', accessKey: 'asedqd123adsfa2313gdsd123sdaf', creator: 'xiaoping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 4, name: '支付中心', code: 'PAY_CENTER', remark: '支付中心', accessKey: 'asedqd123adsfa2313gdsd123sdaf', creator: 'xiaoping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'}
]
export const AppOwnerList = [
    {id: 1, appId: 1, userName: 'xiaoping', userNameCn: '小平'},
    {id: 2, appId: 1, userName: 'xiaoyi', userNameCn: '小一'},
    {id: 3, appId: 1, userName: 'xiaoer', userNameCn: '小二'},
    {id: 4, appId: 1, userName: 'xiaosan', userNameCn: '小三'},
    {id: 5, appId: 1, userName: 'xiaosi', userNameCn: '小四'},
    {id: 6, appId: 2, userName: 'xiaoping', userNameCn: '小平'},
    {id: 7, appId: 3, userName: 'xiaoping', userNameCn: '小平'},
    {id: 8, appId: 4, userName: 'xiaoping', userNameCn: '小平'}
]

export default {
    bootstrap (mock) {
        let loginUser = 'xiaoping'
        let loginUserCn = '小平'
        Mock.post(mock, ApiUrl.listMyApp.name, ApiUrl.listMyApp.api, function (params) {
            let appIdList = AppOwnerList.filter(o => o.userName === loginUser).map(o => o.appId)
            let myAppList = AppList.filter(a => {
                if (appIdList.includes(a.id)) {
                    a.ownerList = AppOwnerList.filter(o => o.appId === a.id)
                    return true
                }
                return false
            }).sort((a, b) => b.id - a.id)
            return myAppList
        })

        Mock.post(mock, ApiUrl.addOrUpdate.name, ApiUrl.addOrUpdate.api, function (params) {
            let id = params.id
            if (id) { // 编辑
                let app = AppList.filter(a => a.id === Number(id))[0]
                app.name = params.name
                app.remark = params.remark
                app.updateTime = DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
            } else { // 新增
                id = new Date().getTime()
                AppList.push({
                    id: id,
                    name: params.name,
                    code: params.code,
                    remark: params.remark,
                    accessKey: guid().replace(/-/g, ''),
                    creator: 'xiaoping',
                    updator: 'xiaoping',
                    createTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    updateTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
                })
                AppOwnerList.push({
                    id: id,
                    appId: id,
                    userName: loginUser,
                    userNameCn: loginUserCn
                })
            }
            return id
        })

        Mock.post(mock, ApiUrl.deleteById.name, ApiUrl.deleteById.api, function (params) {
            let id = params.id
            let i = AppList.findIndex(a => a.id === Number(id))
            AppList.splice(i, 1)
            return ''
        })

        Mock.post(mock, ApiUrl.deleteOwner.name, ApiUrl.deleteOwner.api, function (params) {
            let id = params.appOwnerId
            let i = AppOwnerList.findIndex(a => a.id === Number(id))
            AppOwnerList.splice(i, 1)
            return ''
        })

        Mock.post(mock, ApiUrl.addOwner.name, ApiUrl.addOwner.api, function (params) {
            let id = new Date().getTime()
            AppOwnerList.push({
                id: id,
                appId: Number(params.appId),
                userName: params.userName,
                userNameCn: params.userNameCn
            })
            return id
        })

        Mock.post(mock, ApiUrl.getApp.name, ApiUrl.getApp.api, function (params) {
            let app = AppList.filter(a => a.id === Number(params.id))[0]
            app.ownerList = AppOwnerList.filter(a => a.appId === app.id)
            app.apiList = []
            return app
        })
    }
}