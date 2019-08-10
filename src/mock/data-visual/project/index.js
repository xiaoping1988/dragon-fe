import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'

import {ApiUrl} from '../../../services/data-visual/project'

export let ProjList = [
    {id: 1, name: '集团核心数据', remark: '集团核心数据', sortNum: 1},
    {id: 2, name: '业务线核心数据', remark: '业务线核心数据', sortNum: 1}
]
export let ProjTagList = [
    {id: 1, projId: 1, name: '订单'},
    {id: 2, projId: 1, name: '用户'},
    {id: 3, projId: 1, name: '交易'},
    {id: 4, projId: 1, name: '财务'},
    {id: 5, projId: 2, name: '订单'},
    {id: 6, projId: 2, name: '用户'},
    {id: 7, projId: 2, name: '交易'},
    {id: 8, projId: 2, name: '财务'}
]
export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.addOrUpdateProj.name, ApiUrl.addOrUpdateProj.api, function (params) {
            let res = params.id
            if (res) { // 修改
                res = Number(params.id)
                let proj = ProjList.filter(p => p.id === res)[0]
                proj.name = params.name
                proj.remark = params.remark
                if (params.delTagIdList) {
                    let delTagIds = params.delTagIdList.split(',')
                    let delIndex = []
                    ProjTagList.forEach((a, i) => {
                        if (delTagIds.includes(a.id + '')) {
                            delIndex.push(i)
                        }
                    })
                    delIndex.forEach((d, i) => {
                        ProjTagList.splice(d - i, 1)
                    })
                }
                let addTagList = JSON.parse(params.addTagList)
                let time = new Date().getTime()
                addTagList.forEach((t, i) => {
                    ProjTagList.push({
                        id: time + i,
                        projId: res,
                        name: t.name
                    })
                })
            } else { // 新增
                res = new Date().getTime()
                ProjList.push({
                    id: res,
                    name: params.name,
                    remark: params.remark,
                    sortNum: 1
                })
                let addTagList = JSON.parse(params.addTagList)
                addTagList.forEach((t, i) => {
                    ProjTagList.push({
                        id: res + i,
                        projId: res,
                        name: t.name
                    })
                })
            }
            return res
        })

        Mock.post(mock, ApiUrl.deleteProj.name, ApiUrl.deleteProj.api, function (params) {
            let i = ProjList.findIndex(p => p.id === Number(params.id))
            ProjList.splice(i, 1)
            return ''
        })
    }
}