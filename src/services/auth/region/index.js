import {get, post} from '@/axios'
import Domain from '../../domainSetting'

const ApiBase = Domain.auth.be + '/api/region'

export const ApiUrl = {
    listProvinceCity: {
        api: ApiBase + '/province-city',
        name: '获取省份城市列表'
    }
}

export const WholeCountry = {
    id: -99,
    name: '全国'
}

export const listProvinceCity = (params) => {return post(ApiUrl.listProvinceCity.api, params)}
