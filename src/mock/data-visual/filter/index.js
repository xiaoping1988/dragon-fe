import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'

import {ApiUrl} from '../../../services/data-visual/filter'

export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.querySelectData.name, ApiUrl.querySelectData.api, function (params) {
            let tbId = params.tbId
            let tbName = params.tbName
            let dbName = params.dbName
            let colName = params.colName
            let conditionValue = params.conditionValue
            return ["北京","上海","广州","深圳","杭州","长沙"]
        })
    }
}