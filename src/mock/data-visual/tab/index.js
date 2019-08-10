import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'

import {ApiUrl} from '../../../services/data-visual/tab'

export let TabList = [
    {id: 1, name: '订单分析', dashId: 1},
    {id: 2, name: '用户分析', dashId: 1},
    {id: 3, name: '交易分析', dashId: 1},
    {id: 4, name: '流量分析', dashId: 1},
    {id: 5, name: '增长分析', dashId: 1}
]
export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.addOrUpdateTab.name, ApiUrl.addOrUpdateTab.api, function (params) {
            let res = params.id
            return res
        })
    }
}