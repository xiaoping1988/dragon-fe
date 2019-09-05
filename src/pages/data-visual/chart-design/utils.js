import {TimeFreq, AggFunc, ShowType, THB, THBValueType} from '../constants'
import {DataType} from '../../../services/data-map/col-manage'

export const getDimColCofig = function (orginalCol) {
    return {
        key: orginalCol.colName + '_' + new Date().getTime(),
        showName: orginalCol.colLabel,
        showType: orginalCol.dataType === DataType.num.code ? ShowType.num.code : ShowType.text.code,
        sortType: '0',
        timeFreq: orginalCol.dataType === DataType.date.code ? TimeFreq.day.code : ''
    }
}

export const getMeasureColCofig = function (orginalCol) {
    return {
        key: orginalCol.colName + '_' + new Date().getTime(),
        showName: orginalCol.colLabel,
        sortType: '0',
        aggFunction: orginalCol.dataType === DataType.num.code ? AggFunc.sum.code : AggFunc.count.code,
        unit: '', // 单位
        divisor: 1, // 除数
        showType: ShowType.num.code, // 显示类型,text 文本 num 数字 amt 金额 rate 百分比
        THB: [], // 同环比
        THBValueType: '', // 同环比的数值类型
        THBTimeCol: {
            type: '',
            colName: ''
        } // 同环比基准日期字段
    }
}