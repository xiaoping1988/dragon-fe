import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'

import {ApiUrl} from '../../../services/auth/project'

export const ProjList = [
    {id: 2, name: '地图平台', code: 'MAP', creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 3, name: '统一权限', code: 'AUTH', creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 4, name: '数据服务', code: 'DATA_SERVICE', creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 1, name: '报表平台', code: 'REPORT', creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'}
]

export default {
    bootstrap (mock) {
        let obj = this
        Mock.get(mock, ApiUrl.listProjectAuth.name, ApiUrl.listProjectAuth.api, function () {
            let res = []
            ProjList.forEach(p => {
                res.push({
                    id: p.id,
                    name: p.name,
                    code: p.code
                })
            })
            res = res.reverse()
            return res
        })

        Mock.post(mock, ApiUrl.getProjectById.name, ApiUrl.getProjectById.api, function (params) {
            let res = {}
            ProjList.forEach(p => {
                if (p.id === params.id) {
                    res = p
                }
            })
            return res
        })

        Mock.post(mock, ApiUrl.saveOrUpdateProj.name, ApiUrl.saveOrUpdateProj.api, function (params) {
            let res
            if (params.id) { // 修改
                res = params.id
                ProjList.forEach(p => {
                    if (p.id === params.id) {
                        p.name = params.name
                        p.code = params.code.toUpperCase()
                        p.updator = 'sanshang'
                        p.updateTime = DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
                    }
                })
            } else { // 新增
                res = new Date().getTime()
                ProjList.push({
                    id: res,
                    name: params.name,
                    code: params.code.toUpperCase(),
                    creator: 'xiaoping',
                    updator: 'xiaoping',
                    createTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    updateTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
                })
            }
            return res
        })

        Mock.post(mock, ApiUrl.deleteProj.name, ApiUrl.deleteProj.api, function (params) {
            let i = ProjList.findIndex(p => params.id === p.id)
            ProjList.splice(i, 1)
            return ''
        })
    }
}