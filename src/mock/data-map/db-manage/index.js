import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'
import {TbList} from '../tb-manage'
import {DsList} from '../ds-manage'
import {ApiUrl} from '../../../services/data-map/db-manage'

export let DbList = [
    {id: 1, dbName: 'dg_pay', remark: '数据库秒速', dsId: 1, isLogical: 0},
    {id: 2, dbName: 'dg_maxc', remark: '数据库秒速', dsId: 2, isLogical: 0},
    {id: 3, dbName: 'hive_db_1', remark: '数据库秒速', dsId: 3, isLogical: 0},
    {id: 4, dbName: 'hive_db_2', remark: '数据库秒速', dsId: 3, isLogical: 0},
    {id: 5, dbName: 'hive_db_3', remark: '数据库秒速', dsId: 3, isLogical: 0},
    {id: 6, dbName: 'hive_db_4', remark: '数据库秒速', dsId: 3, isLogical: 0},
    {id: 7, dbName: 'dg_user', remark: '数据库秒速', dsId: 7, isLogical: 0},
    {id: 8, dbName: 'kylin_hive_db_1', remark: '数据库秒速', dsId: 8, isLogical: 0},
    {id: 9, dbName: 'kylin_hive_db_2', remark: '数据库秒速', dsId: 8, isLogical: 0},
    {id: 10, dbName: 'kylin_hive_db_3', remark: '数据库秒速', dsId: 8, isLogical: 0},
    {id: 11, dbName: 'kylin_hive_db_4', remark: '数据库秒速', dsId: 8, isLogical: 0},
    {id: 12, dbName: 'kylin_hive_db_5', remark: '数据库秒速', dsId: 8, isLogical: 0}
]

export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.listAllDb.name, ApiUrl.listAllDb.api, function (params) {
            return DbList
        })

        Mock.post(mock, ApiUrl.listUserOwnDbByType.name, ApiUrl.listUserOwnDbByType.api, function (params) {
            let dsIds = DsList.filter(d => d.type === params.dbType).map(d => d.id)
            return DbList.filter(d => dsIds.includes(d.dsId))
        })

        Mock.post(mock, ApiUrl.getDb.name, ApiUrl.getDb.api, function (params) {
            let db = DbList.filter(d => d.id ===  Number(params.id))[0]
            db.tbCount = TbList.filter(t => t.dbId === db.id).length
            db.dsName = DsList.filter(d => d.id === db.dsId)[0].name
            return db
        })
    }
}