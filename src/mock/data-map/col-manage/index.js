import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'

import {ApiUrl, DataType} from '../../../services/data-map/col-manage'

export let ColList = [
    {id: 1, tbId: 1, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 2, tbId: 2, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 3, tbId: 3, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 4, tbId: 4, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 5, tbId: 5, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 6, tbId: 6, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 7, tbId: 7, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 8, tbId: 8, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 9, tbId: 9, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 10, tbId: 10, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 11, tbId: 11, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 12, tbId: 12, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 13, tbId: 13, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 14, tbId: 14, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 15, tbId: 15, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 16, tbId: 16, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 17, tbId: 17, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 18, tbId: 18, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 19, tbId: 19, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 20, tbId: 20, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 21, tbId: 21, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 73, tbId: 22, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 74, tbId: 22, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 23, tbId: 23, colName: 'col_1', colComment: '字段描述信息', colLabel: '订单ID', originalDataType: 'VARCHAR', dataType: DataType.text.code},
    {id: 24, tbId: 1, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 25, tbId: 2, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 26, tbId: 3, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 27, tbId: 4, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 28, tbId: 5, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 29, tbId: 6, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 30, tbId: 7, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 31, tbId: 8, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 32, tbId: 9, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 33, tbId: 10, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 34, tbId: 11, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 35, tbId: 12, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 36, tbId: 13, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 37, tbId: 14, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 38, tbId: 15, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 39, tbId: 16, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 40, tbId: 17, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 41, tbId: 18, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 42, tbId: 19, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 43, tbId: 20, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 44, tbId: 21, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 45, tbId: 23, colName: 'col_2', colComment: '字段描述信息', colLabel: '订单金额', originalDataType: 'BIGINT', dataType: DataType.num.code},
    {id: 46, tbId: 1, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 47, tbId: 2, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 48, tbId: 3, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 49, tbId: 4, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 50, tbId: 5, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 51, tbId: 6, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 52, tbId: 7, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 53, tbId: 8, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 54, tbId: 9, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 55, tbId: 10, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 56, tbId: 11, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 57, tbId: 12, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 58, tbId: 13, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 59, tbId: 14, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 60, tbId: 15, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 61, tbId: 16, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 62, tbId: 17, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 63, tbId: 18, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 64, tbId: 19, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 65, tbId: 20, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 66, tbId: 21, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 67, tbId: 23, colName: 'col_3', colComment: '字段描述信息', colLabel: '创建时间', originalDataType: 'DATETIME', dataType: DataType.date.code},
    {id: 68, tbId: 23, colName: 'col_4', colComment: '字段描述信息', colLabel: '统计日期(YYYYMMDD)', originalDataType: 'VARCHAR', dataType: DataType.text_day_8.code},
    {id: 69, tbId: 23, colName: 'col_5', colComment: '字段描述信息', colLabel: '创建日期(YYYY-MM-DD)', originalDataType: 'VARCHAR', dataType: DataType.text_day_10.code},
    {id: 70, tbId: 23, colName: 'col_6', colComment: '字段描述信息', colLabel: '创建月份(YYYY-MM)', originalDataType: 'VARCHAR', dataType: DataType.text_month_7.code},
    {id: 71, tbId: 23, colName: 'col_7', colComment: '字段描述信息', colLabel: '统计月份(YYYYMM)', originalDataType: 'VARCHAR', dataType: DataType.text_month_6.code},
    {id: 72, tbId: 23, colName: 'col_8', colComment: '字段描述信息', colLabel: '年', originalDataType: 'VARCHAR', dataType: DataType.text_year.code},
    {id: 681, tbId: 1, colName: 'col_4', colComment: '字段描述信息', colLabel: '统计日期(YYYYMMDD)', originalDataType: 'VARCHAR', dataType: DataType.text_day_8.code},
    {id: 691, tbId: 1, colName: 'col_5', colComment: '字段描述信息', colLabel: '创建日期(YYYY-MM-DD)', originalDataType: 'VARCHAR', dataType: DataType.text_day_10.code},
    {id: 701, tbId: 1, colName: 'col_6', colComment: '字段描述信息', colLabel: '创建月份(YYYY-MM)', originalDataType: 'VARCHAR', dataType: DataType.text_month_7.code},
    {id: 711, tbId: 1, colName: 'col_7', colComment: '字段描述信息', colLabel: '统计月份(YYYYMM)', originalDataType: 'VARCHAR', dataType: DataType.text_month_6.code},
    {id: 721, tbId: 1, colName: 'col_8', colComment: '字段描述信息', colLabel: '年', originalDataType: 'VARCHAR', dataType: DataType.text_year.code},
    {id: 682, tbId: 2, colName: 'col_4', colComment: '字段描述信息', colLabel: '统计日期(YYYYMMDD)', originalDataType: 'VARCHAR', dataType: DataType.text_day_8.code},
    {id: 692, tbId: 2, colName: 'col_5', colComment: '字段描述信息', colLabel: '创建日期(YYYY-MM-DD)', originalDataType: 'VARCHAR', dataType: DataType.text_day_10.code},
    {id: 702, tbId: 2, colName: 'col_6', colComment: '字段描述信息', colLabel: '创建月份(YYYY-MM)', originalDataType: 'VARCHAR', dataType: DataType.text_month_7.code},
    {id: 712, tbId: 2, colName: 'col_7', colComment: '字段描述信息', colLabel: '统计月份(YYYYMM)', originalDataType: 'VARCHAR', dataType: DataType.text_month_6.code},
    {id: 722, tbId: 2, colName: 'col_8', colComment: '字段描述信息', colLabel: '年', originalDataType: 'VARCHAR', dataType: DataType.text_year.code},
    {id: 683, tbId: 3, colName: 'col_4', colComment: '字段描述信息', colLabel: '统计日期(YYYYMMDD)', originalDataType: 'VARCHAR', dataType: DataType.text_day_8.code},
    {id: 693, tbId: 3, colName: 'col_5', colComment: '字段描述信息', colLabel: '创建日期(YYYY-MM-DD)', originalDataType: 'VARCHAR', dataType: DataType.text_day_10.code},
    {id: 703, tbId: 3, colName: 'col_6', colComment: '字段描述信息', colLabel: '创建月份(YYYY-MM)', originalDataType: 'VARCHAR', dataType: DataType.text_month_7.code},
    {id: 713, tbId: 3, colName: 'col_7', colComment: '字段描述信息', colLabel: '统计月份(YYYYMM)', originalDataType: 'VARCHAR', dataType: DataType.text_month_6.code},
    {id: 723, tbId: 3, colName: 'col_8', colComment: '字段描述信息', colLabel: '年', originalDataType: 'VARCHAR', dataType: DataType.text_year.code},
    {id: 684, tbId: 4, colName: 'col_4', colComment: '字段描述信息', colLabel: '统计日期(YYYYMMDD)', originalDataType: 'VARCHAR', dataType: DataType.text_day_8.code},
    {id: 694, tbId: 4, colName: 'col_5', colComment: '字段描述信息', colLabel: '创建日期(YYYY-MM-DD)', originalDataType: 'VARCHAR', dataType: DataType.text_day_10.code},
    {id: 704, tbId: 4, colName: 'col_6', colComment: '字段描述信息', colLabel: '创建月份(YYYY-MM)', originalDataType: 'VARCHAR', dataType: DataType.text_month_7.code},
    {id: 714, tbId: 4, colName: 'col_7', colComment: '字段描述信息', colLabel: '统计月份(YYYYMM)', originalDataType: 'VARCHAR', dataType: DataType.text_month_6.code},
    {id: 724, tbId: 4, colName: 'col_8', colComment: '字段描述信息', colLabel: '年', originalDataType: 'VARCHAR', dataType: DataType.text_year.code}
]

export let LogicColList = [
    {id: 1, tbId: 1, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 2, tbId: 2, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 3, tbId: 3, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 4, tbId: 4, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 5, tbId: 5, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 6, tbId: 6, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 7, tbId: 7, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 8, tbId: 8, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 9, tbId: 9, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 10, tbId: 10, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 11, tbId: 11, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 12, tbId: 12, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 13, tbId: 13, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 14, tbId: 14, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 15, tbId: 15, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 16, tbId: 16, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 17, tbId: 17, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 18, tbId: 18, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 19, tbId: 19, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 20, tbId: 20, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 21, tbId: 21, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 22, tbId: 22, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 23, tbId: 23, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'},
    {id: 24, tbId: 24, colName: 'newcol', colLabel: '北京订单金额', dataType: DataType.num.code, formula: 'sum(col_2)', formulaShow: 'sum([订单金额])'}
]

export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.listTbCol.name, ApiUrl.listTbCol.api, function (params) {
            let res = ColList.filter(c => c.tbId === Number(params.tbId))
            return res
        })

        Mock.post(mock, ApiUrl.listTbLogicCol.name, ApiUrl.listTbLogicCol.api, function (params) {
            let res = LogicColList.filter(c => c.tbId === Number(params.tbId))
            return res
        })

        Mock.post(mock, ApiUrl.addOrUpdateFormula.name, ApiUrl.addOrUpdateFormula.api, function (params) {
            let id = params.id
            let colName = ''
            if (params.id) { // 修改
                let col = LogicColList.filter(c => c.id === Number(params.id))[0]
                col.colLabel = params.colLabel
                col.dataType = params.dataType
                col.formula = params.formula
                col.formulaShow = params.formulaShow
                colName = col.colName
            } else {
                id = new Date().getTime()
                colName = 'col_' + id
                LogicColList.push({
                    id: id,
                    tbId: Number(params.tbId),
                    colName: colName,
                    colLabel: params.colLabel,
                    dataType: params.dataType,
                    formula: params.formula,
                    formulaShow: params.formulaShow
                })
            }
            return {
                id: id,
                colName: colName
            }
        })

        Mock.post(mock, ApiUrl.deleteLogicCol.name, ApiUrl.deleteLogicCol.api, function (params) {
            let i = LogicColList.findIndex(c => c.id === Number(params.id))
            LogicColList.splice(i, 1)
            return ''
        })
    }
}