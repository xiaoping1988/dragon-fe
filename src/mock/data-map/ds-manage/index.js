import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'
import {DbList} from '../db-manage'
import {TbList} from '../tb-manage'
import {ApiUrl, DbType} from '../../../services/data-map/ds-manage'

export let DsList = [
    {
        id: 1,
        name: '支付交易库',
        host: 'pay.dragon-inc.com',
        port: '3306',
        type: DbType.MYSQL.code,
        dbName: 'dg_pay',
        userName: 'dg_read',
        password: '000',
        remark: '会计师考虑价格打卡',
        isBaseDs: 1,
        baseDsId: 0,
        isAutoMeta: 0,
        priority: 0,
        creator: 'sanshang',
        updator: 'sanshang'
    },
    {
        id: 2,
        name: '阿里云数据仓库',
        host: 'lightning.cn-hangzhou.maxcompute.aliyun-inc.com',
        port: '',
        type: DbType.MAXCOMPUTE.code,
        dbName: 'dg_maxc',
        userName: 'dg_read',
        password: '000',
        remark: '会计师考虑价格打卡',
        isBaseDs: 1,
        baseDsId: 0,
        isAutoMeta: 0,
        priority: 0,
        creator: 'sanshang',
        updator: 'sanshang'
    },
    {
        id: 3,
        name: 'hive数据仓库',
        host: 'hive.dragon-inc.com',
        port: '3306',
        type: DbType.HIVE.code,
        dbName: 'default',
        userName: 'dg_read',
        password: '000',
        remark: '会计师考虑价格打卡',
        isBaseDs: 1,
        baseDsId: 0,
        isAutoMeta: 0,
        priority: 0,
        creator: 'sanshang',
        updator: 'sanshang'
    },
    {
        id: 4,
        name: 'KYLIN引擎',
        host: 'kylin.dragon-inc.com',
        port: '3306',
        type: DbType.KYLIN.code,
        dbName: 'proj_pay',
        userName: 'dg_read',
        password: '000',
        remark: '会计师考虑价格打卡',
        isBaseDs: 0,
        baseDsId: 3,
        isAutoMeta: 0,
        priority: 1,
        creator: 'sanshang',
        updator: 'sanshang'
    },
    {
        id: 5,
        name: 'IMPALA引擎',
        host: 'impala.dragon-inc.com',
        port: '3306',
        type: DbType.IMPALA.code,
        dbName: 'default',
        userName: 'dg_read',
        password: '000',
        remark: '会计师考虑价格打卡',
        isBaseDs: 0,
        baseDsId: 3,
        isAutoMeta: 1,
        priority: 3,
        creator: 'sanshang',
        updator: 'sanshang'
    },
    {
        id: 6,
        name: 'PRESTO引擎',
        host: 'presto.dragon-inc.com',
        port: '3306',
        type: DbType.PRESTO.code,
        dbName: 'default',
        userName: 'dg_read',
        password: '000',
        remark: '会计师考虑价格打卡',
        isBaseDs: 0,
        baseDsId: 3,
        isAutoMeta: 1,
        priority: 2,
        creator: 'sanshang',
        updator: 'sanshang'
    },
    {
        id: 7,
        name: '用户中心库',
        host: 'userName.dragon-inc.com',
        port: '3306',
        type: DbType.MYSQL.code,
        dbName: 'dg_user',
        userName: 'dg_read',
        password: '000',
        remark: '会计师考虑价格打卡',
        isBaseDs: 1,
        baseDsId: 0,
        isAutoMeta: 0,
        priority: 0,
        creator: 'sanshang',
        updator: 'sanshang'
    },
    {
        id: 8,
        name: 'kylin库',
        host: 'kylin.dragon-inc.com',
        port: '3306',
        type: DbType.KYLIN.code,
        dbName: 'proj_kylin',
        userName: 'dg_read',
        password: '000',
        remark: '会计师考虑价格打卡',
        isBaseDs: 1,
        baseDsId: 0,
        isAutoMeta: 0,
        priority: 0,
        creator: 'sanshang',
        updator: 'sanshang'
    }
]

export const DsOwnerList = [
    {id: 1, dsId: 1, ownerName: 'xiaoyi', ownerNameCn: '小一'},
    {id: 2, dsId: 1, ownerName: 'xiaosan', ownerNameCn: '小三'},
    {id: 3, dsId: 2, ownerName: 'xiaoyi', ownerNameCn: '小一'},
    {id: 4, dsId: 3, ownerName: 'xiaoyi', ownerNameCn: '小一'},
    {id: 5, dsId: 3, ownerName: 'xiaoer', ownerNameCn: '小二'},
    {id: 6, dsId: 7, ownerName: 'xiaoyi', ownerNameCn: '小一'},
    {id: 7, dsId: 8, ownerName: 'xiaosi', ownerNameCn: '小四'}
]
export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.listDs.name, ApiUrl.listDs.api, function (params) {
            let data = DsList.filter(d => {
                if (d.isBaseDs === 1) {
                    d.password = '000'
                    d.children = DsList.filter(c => c.isBaseDs === 0 && c.baseDsId === d.id).sort((a, b) => b.priority - a.priority)
                    let ret = false
                    if (!params.type && !params.name) {
                        ret = true
                    } else if (params.type && params.name) {
                        ret = d.type === params.type && (d.name.includes(params.name) || d.dbName.includes(params.name))
                    } else if (params.type) {
                        ret = d.type === params.type
                    } else {
                        ret = d.name.includes(params.name) || d.dbName.includes(params.name)
                    }

                    if (ret) {
                        return d
                    }
                }
            }).sort((a, b) => b.id - a.id)
            let res = {
                total: 130,
                data: data
            }
            return res
        })

        Mock.post(mock, ApiUrl.listDsOwner.name, ApiUrl.listDsOwner.api, function (params) {
            let res = DsOwnerList.filter(d => d.dsId === params.id)
            return res
        })

        Mock.post(mock, ApiUrl.addOrUpdateDs.name, ApiUrl.addOrUpdateDs.api, function (params) {
            let id
            if (params.id) { // 编辑
                id = params.id
                let ds = DsList.filter(d => d.id === id)[0]
                ds.name = params.name
                ds.host = params.host
                ds.port = params.port
                ds.userName = params.userName
                ds.password = params.password
                ds.remark = params.remark
                ds.isAutoMeta = params.isAutoMeta
                ds.priority = params.priority
            } else { // 新增
                id = new Date().getTime()
                DsList.push({
                    id: id,
                    name: params.name,
                    host: params.host,
                    port: params.port,
                    type: params.type,
                    dbName: params.dbName,
                    userName: params.userName,
                    password: params.password,
                    remark: params.remark,
                    isBaseDs: params.isBaseDs,
                    baseDsId: params.baseDsId,
                    isAutoMeta: params.isAutoMeta,
                    priority: params.priority
                })
                DsOwnerList.push({
                    id: id,
                    dsId: id,
                    ownerName: 'xiaoyi',
                    ownerNameCn: '小一'
                })
            }
            return id
        })

        Mock.post(mock, ApiUrl.deleteDs.name, ApiUrl.deleteDs.api, function (params) {
            let i = DsList.findIndex(d => d.id === params.id)
            DsList.splice(i, 1)
            return ''
        })

        Mock.post(mock, ApiUrl.testDs.name, ApiUrl.testDs.api, function (params) {
            return ''
        })

        Mock.post(mock, ApiUrl.deleteDsOwner.name, ApiUrl.deleteDsOwner.api, function (params) {
            let i = DsOwnerList.findIndex(d => d.id === params.dsOwnerId)
            DsOwnerList.splice(i, 1)
            return ''
        })

        Mock.post(mock, ApiUrl.addDsOwner.name, ApiUrl.addDsOwner.api, function (params) {
            let id = new Date().getTime()
            DsOwnerList.push({
                id: id,
                dsId: params.dsId,
                ownerName: params.ownerName,
                ownerNameCn: params.ownerNameCn
            })
            return id
        })

        Mock.post(mock, ApiUrl.getDs.name, ApiUrl.getDs.api, function (params) {
            let ds = DsList.filter(d => d.id === Number(params.id))[0]
            ds.createTime = DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
            ds.dbList = DbList.filter(d => d.dsId === ds.id)
            ds.dbCount = ds.dbList.length
            ds.tbCount = TbList.filter(t => ds.dbList.findIndex(d => d.id === t.dbId) > -1).length
            ds.ownerList = DsOwnerList.filter(d => d.dsId === ds.id)
            return ds
        })
    }
}