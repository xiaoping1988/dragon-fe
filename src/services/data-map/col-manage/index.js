import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.dataMap.be + '/api/col'

export const ApiUrl = {
    listTbCol: {
        api: ApiBase + '/list-by-tb',
        name: '获取某张表的字段信息'
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
        icon: 'calendar-o'
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
        icon: 'calendar'
    },
    text_day_8: {
        code: 'text_day_8',
        name: '文本_日_YYYYMMDD',
        icon: 'calendar'
    },
    text_month_7: {
        code: 'text_month_7',
        name: '文本_月_YYYY-MM',
        icon: 'calendar'
    },
    text_month_6: {
        code: 'text_month_6',
        name: '文本_月_YYYYMM',
        icon: 'calendar'
    },
    text_year: {
        code: 'text_year',
        name: '文本_年',
        icon: 'calendar'
    }
}

export const listTbCol = (params) => {return post(ApiUrl.listTbCol.api, params)}