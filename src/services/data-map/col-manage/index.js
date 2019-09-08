import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.dataMap.be + '/api/col'

export const ApiUrl = {
    listTbCol: {
        api: ApiBase + '/list-by-tb',
        name: '获取某张表的原始字段信息'
    },
    listTbLogicCol: {
        api: ApiBase + '/list-logic-by-tb',
        name: '获取某张表的逻辑字段(计算字段、分组字段等)'
    }
}

/**
 * 字段数据类型
 * @type {{date: {code: string, name: string, icon: string}, num: {code: string, name: string, icon: string}, text: {code: string, name: string, icon: string}, text_day_10: {code: string, name: string, icon: string}, text_day_8: {code: string, name: string, icon: string}, text_month_7: {code: string, name: string, icon: string}, text_month_6: {code: string, name: string, icon: string}, text_year: {code: string, name: string, icon: string}}}
 */
export const DataType = {
    date: {
        code: 'date',
        name: '日期',
        icon: 'calendar-o',
        timeFreq: ['year','quarter','month','week','day','hour','minute','second'],
        defaultTimeFreq: 'day'
    },
    num: {
        code: 'num',
        name: '数值',
        icon: 'hashtag'
    },
    text: {
        code: 'text',
        name: '文本',
        icon: 'text-width'
    },
    text_day_10: {
        code: 'text_day_10',
        name: '文本_日_YYYY-MM-DD',
        icon: 'calendar',
        timeFreq: ['day'],
        defaultTimeFreq: 'day'
    },
    text_day_8: {
        code: 'text_day_8',
        name: '文本_日_YYYYMMDD',
        icon: 'calendar',
        timeFreq: ['day'],
        defaultTimeFreq: 'day'
    },
    text_month_7: {
        code: 'text_month_7',
        name: '文本_月_YYYY-MM',
        icon: 'calendar',
        timeFreq: ['month'],
        defaultTimeFreq: 'month'
    },
    text_month_6: {
        code: 'text_month_6',
        name: '文本_月_YYYYMM',
        icon: 'calendar',
        timeFreq: ['month'],
        defaultTimeFreq: 'month'
    },
    text_year: {
        code: 'text_year',
        name: '文本_年',
        icon: 'calendar',
        timeFreq: ['year'],
        defaultTimeFreq: 'year'
    }
}

export const listTbCol = (params) => {return post(ApiUrl.listTbCol.api, params)}
export const listTbLogicCol = (params) => {return post(ApiUrl.listTbLogicCol.api, params)}