import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.dataVisual.be + '/api/filter'

export const ApiUrl = {
    querySelectData: {
        api: ApiBase + '/query-select-data',
        name: '查询下拉框枚举数据'
    }
}

export const querySelectData = (params) => {return post(ApiUrl.querySelectData.api, params)}
