import Mock from '@/mock'
import DateUtils from '../../utils/dateUtils'

import {ApiUrl} from '../../services/sso'

export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.login.name, ApiUrl.login.api, function (params) {
            let res = ''
            return res
        })
    }
}