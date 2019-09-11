import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'
import {pageSearch} from '../../../utils/assist'
import {ColList, LogicColList} from '../col-manage'
import {DbList} from '../db-manage'
import {DsList, DsOwnerList} from '../ds-manage'
import {ApiUrl} from '../../../services/data-map/tb-manage'
import {DataType} from '../../../services/data-map/col-manage'

export let TbList = [
    {id: 1, tbName: 'tb_1', tbNameCn: '订单表1', dbId: 1, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 2, tbName: 'tb_2', tbNameCn: '用户表1', dbId: 1, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 3, tbName: 'tb_3', tbNameCn: '订单表2', dbId: 1, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 4, tbName: 'tb_4', tbNameCn: '用户表2', dbId: 1, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 5, tbName: 'tb_5', tbNameCn: '订单表3', dbId: 2, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 6, tbName: 'tb_6', tbNameCn: '用户表3', dbId: 2, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 7, tbName: 'tb_7', tbNameCn: '订单表4', dbId: 2, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 8, tbName: 'tb_8', tbNameCn: '用户表4', dbId: 2, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 9, tbName: 'tb_9', tbNameCn: '订单表5', dbId: 3, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 10, tbName: 'tb_10', tbNameCn: '用户表5', dbId: 3, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 11, tbName: 'tb_11', tbNameCn: '订单表6', dbId: 3, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 12, tbName: 'tb_12', tbNameCn: '用户表6', dbId: 4, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 13, tbName: 'tb_13', tbNameCn: '订单表7', dbId: 4, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 14, tbName: 'tb_14', tbNameCn: '用户表7', dbId: 5, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 15, tbName: 'tb_15', tbNameCn: '订单表8', dbId: 6, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 16, tbName: 'tb_16', tbNameCn: '用户表8', dbId: 7, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 17, tbName: 'tb_17', tbNameCn: '订单表9', dbId: 7, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 18, tbName: 'tb_18', tbNameCn: '用户表9', dbId: 8, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 19, tbName: 'tb_19', tbNameCn: '订单表10', dbId: 9, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 20, tbName: 'tb_20', tbNameCn: '用户表10', dbId: 10, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 21, tbName: 'tb_21', tbNameCn: '订单表11', dbId: 11, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 22, tbName: 'tb_22', tbNameCn: '用户表11', dbId: 12, isLogical: 0, remark: '大家撒离开的风景线'},
    {id: 23, tbName: 'tb_23', tbNameCn: '订单表13', dbId: 12, isLogical: 0, remark: '大家撒离开的风景线'}
]

export let TbTagList = [
    {id: 1, name: '订单', tbId: 1},
    {id: 2, name: '用户', tbId: 1},
    {id: 3, name: '订单', tbId: 2},
    {id: 4, name: '用户', tbId: 2},
    {id: 5, name: '订单', tbId: 3},
    {id: 6, name: '用户', tbId: 3},
    {id: 7, name: '订单', tbId: 4},
    {id: 8, name: '用户', tbId: 4},
    {id: 9, name: '订单', tbId: 5},
    {id: 10, name: '用户', tbId: 5},
    {id: 11, name: '订单', tbId: 6},
    {id: 12, name: '用户', tbId: 6},
    {id: 13, name: '订单', tbId: 7},
    {id: 14, name: '用户', tbId: 7},
    {id: 15, name: '订单', tbId: 8},
    {id: 16, name: '用户', tbId: 8},
    {id: 17, name: '订单', tbId: 9},
    {id: 18, name: '用户', tbId: 9},
    {id: 19, name: '订单', tbId: 10},
    {id: 20, name: '用户', tbId: 10},
    {id: 21, name: '订单', tbId: 11},
    {id: 22, name: '用户', tbId: 11},
    {id: 23, name: '订单', tbId: 12},
    {id: 24, name: '用户', tbId: 12},
    {id: 25, name: '订单', tbId: 13},
    {id: 26, name: '用户', tbId: 13},
    {id: 27, name: '订单', tbId: 14},
    {id: 28, name: '用户', tbId: 14},
    {id: 29, name: '订单', tbId: 15},
    {id: 30, name: '用户', tbId: 15},
    {id: 31, name: '订单', tbId: 16},
    {id: 32, name: '用户', tbId: 16},
    {id: 33, name: '订单', tbId: 17},
    {id: 34, name: '用户', tbId: 17},
    {id: 35, name: '订单', tbId: 18},
    {id: 36, name: '用户', tbId: 18},
    {id: 37, name: '订单', tbId: 19},
    {id: 38, name: '用户', tbId: 19},
    {id: 39, name: '订单', tbId: 20},
    {id: 40, name: '用户', tbId: 20},
    {id: 41, name: '订单', tbId: 21},
    {id: 42, name: '用户', tbId: 21},
    {id: 43, name: '订单', tbId: 22},
    {id: 44, name: '用户', tbId: 22},
    {id: 45, name: '订单', tbId: 23},
    {id: 46, name: '用户', tbId: 23},
    {id: 47, name: '支付', tbId: 23},
    {id: 48, name: '交易', tbId: 23}
]

export let UserTbList = [
    {id: 1, userName: 'xiaoyi', userNameCn: '小一', tbId: 18},
    {id: 2, userName: 'xiaoyi', userNameCn: '小一', tbId: 22},
    {id: 3, userName: 'xiaoyi', userNameCn: '小一', tbId: 23},
    {id: 4, userName: 'xiaoer', userNameCn: '小二', tbId: 1},
    {id: 5, userName: 'xiaoer', userNameCn: '小二', tbId: 2},
    {id: 6, userName: 'xiaoer', userNameCn: '小二', tbId: 3}
]

export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.searchTb.name, ApiUrl.searchTb.api, function (params) {
            let pageNo = params.pageNo
            let pageSize = params.pageSize
            let data = TbList.filter(t => {
                if (params.dbId) {
                    if (t.dbId === params.dbId) {
                        if (params.tbName) {
                            if (t.tbName.includes(params.tbName.toLowerCase()) || t.remark.includes(params.tbName)) {
                                return true
                            }
                            return false
                        }
                        return true
                    }
                    return false
                } else {
                    if (params.tbName) {
                        if (t.tbName.includes(params.tbName.toLowerCase()) || t.remark.includes(params.tbName)) {
                            return true
                        }
                        return false
                    }
                }
                return true
            })
            let pageData = pageSearch(data, pageNo, pageSize)
            pageData.forEach(tb => {
                let db = DbList.filter(d => d.id === tb.dbId)[0]
                tb.dbName = db.dbName
                tb.tagList = TbTagList.filter(tt => tt.tbId === tb.id)
                let i = DsOwnerList.findIndex(d => d.dsId === db.dsId && d.ownerName === 'xiaoyi')
                if (i === -1) {
                    let j = UserTbList.findIndex(ut => ut.tbId === tb.id && ut.userName === 'xiaoyi')
                    tb.hasAuth = j !== -1
                } else {
                    tb.hasAuth = true
                }
            })
            let res = {
                total: data.length,
                data: pageData
            }
            return res
        })

        Mock.post(mock, ApiUrl.getTb.name, ApiUrl.getTb.api, function (params) {
            let tb = TbList.filter(t => t.id === Number(params.id))[0]
            let res = JSON.parse(JSON.stringify(tb))
            res.colList = ColList.filter(c => c.tbId === res.id)
            res.logicColList = LogicColList.filter(c => c.tbId === res.id)
            res.lastDataModifiedTime = DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
            let db = DbList.filter(d => d.id === res.dbId)[0]
            res.dbName = db.dbName
            let baseDs = DsList.filter(d => d.id === db.dsId)[0]
            res.dsName = baseDs.name
            let queryEngines = DsList.filter(d => d.baseDsId === baseDs.id).sort((a, b) => b.priority - a.priority)
            let types = ''
            queryEngines.forEach(d => {
                types = types + ',' + d.type
            })
            types = types + ',' + baseDs.type
            types = types.replace(',' , '')
            res.queryEngineTypeList = types
            res.readCount = 100
            let i = DsOwnerList.findIndex(d => d.dsId === baseDs.id && d.ownerName === 'xiaoyi')
            if (i === -1) {
                let j = UserTbList.findIndex(ut => ut.tbId === tb.id && ut.userName === 'xiaoyi')
                res.hasAuth = j !== -1
            } else {
                res.hasAuth = true
            }
            res.tagList = TbTagList.filter(t => t.tbId === res.id)
            return res
        })

        Mock.post(mock, ApiUrl.previewTbData.name, ApiUrl.previewTbData.api, function (params) {
            let tb = TbList.filter(t => t.id === Number(params.id))[0]
            let res = JSON.parse(JSON.stringify(tb))
            let db = DbList.filter(d => d.id === res.dbId)[0]
            res.dbName = db.dbName
            res.colList = ColList.filter(c => c.tbId === res.id)
            res.lastDataModifiedTime = DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
            res.data = []
            for (let i = 0; i < 50; i++) {
                let d = {}
                res.colList.forEach(c => {
                    if (c.dataType === DataType.date.code) {
                        d[c.colName] = DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
                    } else if (c.dataType === DataType.text_day_10.code) {
                        d[c.colName] = DateUtils.formatDate(new Date(), 'yyyy-MM-dd')
                    } else if (c.dataType === DataType.text_day_8.code) {
                        d[c.colName] = DateUtils.formatDate(new Date(), 'yyyyMMdd')
                    } else if (c.dataType === DataType.text_month_7.code) {
                        d[c.colName] = DateUtils.formatDate(new Date(), 'yyyy-MM')
                    } else if (c.dataType === DataType.text_month_6.code) {
                        d[c.colName] = DateUtils.formatDate(new Date(), 'yyyyMM')
                    } else if (c.dataType === DataType.text_year.code) {
                        d[c.colName] = DateUtils.formatDate(new Date(), 'yyyy')
                    } else if (c.dataType === DataType.num.code) {
                        d[c.colName] = Math.round(Math.random() * 10000)
                    } else if (c.dataType === DataType.text.code) {
                        d[c.colName] = 'xxxx'
                    }
                })
                res.data.push(d)
            }
            return res
        })

        Mock.post(mock, ApiUrl.listMyTbOwn.name, ApiUrl.listMyTbOwn.api, function (params) {
            let res = {}
            let allAuthTbList = []
            let ownDsIdList = DsOwnerList.filter(d => d.ownerName === 'xiaoyi').map(d => d.dsId)
            let authTbIdList = UserTbList.filter(ut => ut.userName === 'xiaoyi').map(d => d.tbId)
            let ownDbList = DbList.filter(d => ownDsIdList.includes(d.dsId))
            ownDbList.forEach(d => {
                let dbTbList = TbList.filter(t => t.dbId === d.id)
                dbTbList.forEach(t => {
                    let tb = JSON.parse(JSON.stringify(t))
                    tb.authSource = '数据源Owner'
                    tb.dbName = d.dbName
                    tb.tagList = TbTagList.filter(tt => tt.tbId === tb.id)
                    allAuthTbList.push(tb)
                })
            })
            authTbIdList.forEach(tbId => {
                if (allAuthTbList.findIndex(d => d.id === tbId) === -1) {
                    let tempTb = TbList.filter(tt => tt.id === tbId)[0]
                    let tb = JSON.parse(JSON.stringify(tempTb))
                    tb.authSource = '他人授权'
                    tb.dbName = DbList.filter(d => d.id === tb.dbId)[0].dbName
                    tb.tagList = TbTagList.filter(tt => tt.tbId === tb.id)
                    allAuthTbList.push(tb)
                }
            })
            let searchTbList = []
            if (params.dbId) {
                if (params.tbName) {
                    searchTbList = allAuthTbList.filter(t => {
                        if (t.dbId === Number(params.dbId)) {
                            if (t.tbName.includes(params.tbName.toLowerCase())) {
                                return true
                            } else if (t.tbNameCn.includes(params.tbName)) {
                                return true
                            } else if (t.remark.includes(params.tbName)) {
                                return true
                            } else if (TbTagList.findIndex(t => t.tbId === t.id && t.name.includes(params.tbName)) > -1) {
                                return true
                            } else {
                                return false
                            }
                        } else {
                            return false
                        }
                    })
                } else {
                    searchTbList = allAuthTbList.filter(t => t.dbId === params.dbId && t.tbName.includes(params.tbName.toLowerCase()))
                }
            } else {
                searchTbList = allAuthTbList.filter(t => {
                    if (t.tbName.includes(params.tbName.toLowerCase())) {
                        return true
                    } else if (t.tbNameCn.includes(params.tbName)) {
                        return true
                    } else if (t.remark.includes(params.tbName)) {
                        return true
                    } else if (TbTagList.findIndex(tt => tt.tbId === t.id && tt.name.includes(params.tbName)) > -1) {
                        return true
                    } else {
                        return false
                    }
                })
            }
            res = {
                total: searchTbList.length,
                data: pageSearch(searchTbList, params.pageNo, params.pageSize)
            }
            return res
        })

        Mock.post(mock, ApiUrl.listMyTbManage.name, ApiUrl.listMyTbManage.api, function (params) {
            let res = {}
            let allAuthTbList = []
            let ownDsIdList = DsOwnerList.filter(d => d.ownerName === 'xiaoyi').map(d => d.dsId)
            let ownDbList = DbList.filter(d => ownDsIdList.includes(d.dsId))
            ownDbList.forEach(d => {
                let dbTbList = TbList.filter(t => t.dbId === d.id)
                dbTbList.forEach(t => {
                    let tb = JSON.parse(JSON.stringify(t))
                    tb.dbName = d.dbName
                    tb.tagList = TbTagList.filter(tt => tt.tbId === tb.id)
                    allAuthTbList.push(tb)
                })
            })
            let searchTbList = []
            if (params.dbId) {
                if (params.tbName) {
                    searchTbList = allAuthTbList.filter(t => {
                        if (t.dbId === Number(params.dbId)) {
                            if (t.tbName.includes(params.tbName.toLowerCase())) {
                                return true
                            } else if (t.tbNameCn.includes(params.tbName)) {
                                return true
                            } else if (t.remark.includes(params.tbName)) {
                                return true
                            } else if (TbTagList.findIndex(t => t.tbId === t.id && t.name.includes(params.tbName)) > -1) {
                                return true
                            } else {
                                return false
                            }
                        } else {
                            return false
                        }
                    })
                } else {
                    searchTbList = allAuthTbList.filter(t => t.dbId === params.dbId && t.tbName.includes(params.tbName.toLowerCase()))
                }
            } else {
                searchTbList = allAuthTbList.filter(t => {
                    if (t.tbName.includes(params.tbName.toLowerCase())) {
                        return true
                    } else if (t.tbNameCn.includes(params.tbName)) {
                        return true
                    } else if (t.remark.includes(params.tbName)) {
                        return true
                    } else if (TbTagList.findIndex(tt => tt.tbId === t.id && tt.name.includes(params.tbName)) > -1) {
                        return true
                    } else {
                        return false
                    }
                })
            }
            res = {
                total: searchTbList.length,
                data: pageSearch(searchTbList, params.pageNo, params.pageSize)
            }
            return res
        })

        Mock.post(mock, ApiUrl.listTbUser.name, ApiUrl.listTbUser.api, function (params) {
            let res = UserTbList.filter(ut => ut.tbId === params.id)
            return res
        })

        Mock.post(mock, ApiUrl.addTbUser.name, ApiUrl.addTbUser.api, function (params) {
            let res = new Date().getTime()
            UserTbList.push({
                id: res,
                tbId: params.tbId,
                userName: params.userName,
                userNameCn: params.userNameCn
            })
            return res
        })

        Mock.post(mock, ApiUrl.deleteTbUser.name, ApiUrl.deleteTbUser.api, function (params) {
            let i = UserTbList.findIndex(r => r.id === params.tbUserId)
            if (i > -1) {
                UserTbList.splice(i, 1)
            }
            return ''
        })

        Mock.post(mock, ApiUrl.listTbAppData.name, ApiUrl.listTbAppData.api, function (params) {
            let res = [
                {appName: '报表系统', appCarrier: '报表：集团核心数据>订单数据分析>订单量'},
                {appName: '报表系统', appCarrier: '报表：集团核心数据>订单数据分析>订单量'},
                {appName: '报表系统', appCarrier: '报表：集团核心数据>订单数据分析>订单量'},
                {appName: '数据API', appCarrier: 'API：获取用户数据>用户画像'},
                {appName: '数据API', appCarrier: 'API：获取用户数据>风控中心'},
                {appName: '数据API', appCarrier: 'API：获取订单数据>用户画像'},
                {appName: '数据API', appCarrier: 'API：获取订单数据>风控中心'}
            ]
            return res
        })
    }
}