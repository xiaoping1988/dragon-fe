import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'

import {ProjList, ProjTagList} from '../project'
import {ChartList, ChartTagList} from '../chart'
import {TabList} from '../tab'
import {ApiUrl} from '../../../services/data-visual/dashboard'

export let DashList = [
    {id: 1, name: '订单数据分析(有Tab)', remark: '订单数据分析', sortNum: 1, projId: 1},
    {id: 2, name: '用户数据分析(无Tab)', remark: '用户数据分析', sortNum: 1, projId: 1},
    {id: 3, name: '交易数据分析', remark: '交易数据分析', sortNum: 1, projId: 1},
    {id: 4, name: '财务数据分析', remark: '财务数据分析', sortNum: 1, projId: 1},
    {id: 5, name: '订单数据分析', remark: '订单数据分析', sortNum: 1, projId: 2},
    {id: 6, name: '用户数据分析', remark: '用户数据分析', sortNum: 1, projId: 2},
    {id: 7, name: '交易数据分析', remark: '交易数据分析', sortNum: 1, projId: 2},
    {id: 8, name: '财务数据分析', remark: '财务数据分析', sortNum: 1, projId: 2},
    {id: 9, name: '用户数据分析(无Tab)', remark: '用户数据分析', sortNum: 1, projId: 1},
    {id: 10, name: '交易数据分析', remark: '交易数据分析', sortNum: 1, projId: 1},
    {id: 11, name: '财务数据分析', remark: '财务数据分析', sortNum: 1, projId: 1},
    {id: 12, name: '订单数据分析', remark: '订单数据分析', sortNum: 1, projId: 2},
    {id: 13, name: '用户数据分析', remark: '用户数据分析', sortNum: 1, projId: 2},
    {id: 14, name: '交易数据分析', remark: '交易数据分析', sortNum: 1, projId: 2},
    {id: 15, name: '财务数据分析', remark: '财务数据分析', sortNum: 1, projId: 2},
    {id: 16, name: '用户数据分析(无Tab)', remark: '用户数据分析', sortNum: 1, projId: 1},
    {id: 17, name: '交易数据分析', remark: '交易数据分析', sortNum: 1, projId: 1},
    {id: 18, name: '财务数据分析', remark: '财务数据分析', sortNum: 1, projId: 1},
    {id: 19, name: '订单数据分析', remark: '订单数据分析', sortNum: 1, projId: 2},
    {id: 20, name: '用户数据分析', remark: '用户数据分析', sortNum: 1, projId: 2},
    {id: 21, name: '交易数据分析', remark: '交易数据分析', sortNum: 1, projId: 2},
    {id: 22, name: '财务数据分析', remark: '财务数据分析', sortNum: 1, projId: 2},
    {id: 23, name: '用户数据分析(无Tab)', remark: '用户数据分析', sortNum: 1, projId: 1},
    {id: 24, name: '交易数据分析', remark: '交易数据分析', sortNum: 1, projId: 1},
    {id: 25, name: '财务数据分析', remark: '财务数据分析', sortNum: 1, projId: 1},
    {id: 26, name: '订单数据分析', remark: '订单数据分析', sortNum: 1, projId: 2},
    {id: 27, name: '用户数据分析', remark: '用户数据分析', sortNum: 1, projId: 2},
    {id: 28, name: '交易数据分析', remark: '交易数据分析', sortNum: 1, projId: 2},
    {id: 29, name: '财务数据分析', remark: '财务数据分析', sortNum: 1, projId: 2}
]
export let DashTagList = [
    {id: 1, dashId: 1, name: '订单'},
    {id: 2, dashId: 2, name: '用户'},
    {id: 3, dashId: 3, name: '交易'},
    {id: 4, dashId: 4, name: '财务'},
    {id: 5, dashId: 5, name: '订单'},
    {id: 6, dashId: 6, name: '用户'},
    {id: 7, dashId: 7, name: '交易'},
    {id: 8, dashId: 8, name: '财务'}
]
export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.listUserDash.name, ApiUrl.listUserDash.api, function (params) {
            let res = []
            ProjList.forEach(p => {
                p.editAuth = p.id % 2 !== 0
                p.tagList = ProjTagList.filter(t => t.projId === p.id)
                p.dashList = DashList.filter(d => d.projId === p.id)
                p.dashList.forEach(d => {
                    d.chartList = ChartList.filter(c => c.dashId === d.id).map(c => {
                        return {
                            id: c.id,
                            name: c.name,
                            tabId: c.tabId
                        }
                    })
                    d.creator = 'xiaoyi'
                    d.creatorCn = '小一'
                    d.departmentName = '数据智能-数据仓库'
                    d.tagList = DashTagList.filter(t => t.dashId === d.id)
                    d.editAuth = d.id % 2 !== 0
                })
                res.push(p)
            })
            return res
        })

        Mock.post(mock, ApiUrl.addOrUpdateDash.name, ApiUrl.addOrUpdateDash.api, function (params) {
            let res = params.id
            if (res) { // 修改
                res = Number(params.id)
                let dash = DashList.filter(p => p.id === res)[0]
                dash.name = params.name
                dash.remark = params.remark
                dash.projId = Number(params.projId)
                if (params.delTagIdList) {
                    let delTagIds = params.delTagIdList.split(',')
                    let delIndex = []
                    DashTagList.forEach((a, i) => {
                        if (delTagIds.includes(a.id + '')) {
                            delIndex.push(i)
                        }
                    })
                    delIndex.forEach((d, i) => {
                        DashTagList.splice(d - i, 1)
                    })
                }
                let addTagList = JSON.parse(params.addTagList)
                let time = new Date().getTime()
                addTagList.forEach((t, i) => {
                    DashTagList.push({
                        id: time + i,
                        dashId: res,
                        name: t.name
                    })
                })
            } else { // 新增
                res = new Date().getTime()
                DashList.push({
                    id: res,
                    name: params.name,
                    remark: params.remark,
                    projId: params.projId,
                    sortNum: 1
                })
                let addTagList = JSON.parse(params.addTagList)
                addTagList.forEach((t, i) => {
                    DashTagList.push({
                        id: res + i,
                        dashId: res,
                        name: t.name
                    })
                })
            }
            return res
        })

        Mock.post(mock, ApiUrl.deleteDash.name, ApiUrl.deleteDash.api, function (params) {
            let i = DashList.findIndex(p => p.id === Number(params.id))
            DashList.splice(i, 1)
            return ''
        })

        Mock.post(mock, ApiUrl.getDashMetaForShow.name, ApiUrl.getDashMetaForShow.api, function (params) {
            let dash = DashList.filter(p => p.id === Number(params.id))[0]
            dash.editAuth = dash.id % 2 !== 0
            let tabList = TabList.filter(t => t.dashId === dash.id)
            let chartList = ChartList.filter(c => c.dashId === dash.id)
            if (!tabList.length) {
                tabList.push({
                    id: -1,
                    name: '其他',
                    chartList: []
                })
            }
            tabList.forEach(t => {
                t.chartList = chartList.filter(c => c.tabId === t.id).map(c => {
                    c.tagList = ChartTagList.filter(t => t.chartId === c.id)
                    c.editAuth = dash.editAuth
                    return c
                })
            })

            dash.tabList = tabList
            dash.globalFilterList = [{a: 1}]
            return dash
        })
    }
}