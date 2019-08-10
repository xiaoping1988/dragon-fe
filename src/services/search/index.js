import {get, post} from '@/axios'
import Domain from '../domainSetting'

const ApiBase = Domain.search.be + '/api/search'

export const ApiUrl = {
    search: {
        api: ApiBase + '',
        name: '搜索'
    }
}

export const search = (params) => {return post(ApiUrl.search.api, params)}
