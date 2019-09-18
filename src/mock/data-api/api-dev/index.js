import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'
import {guid, randomInt} from '../../../utils/assist'

import {ApiUrl} from '../../../services/data-api/api-dev'
import {AppList} from '../app'

export const ApiDevList = [
    {id: 1, name: '按时间查询用户信息', remark: '按时间查询用户信息', isReleased: 0, creator: 'xiaoping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 2, name: '按时间查询订单信息', remark: '按时间查询订单信息', isReleased: 1, creator: 'xiaoping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'}
]

export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.listMyApi.name, ApiUrl.listMyApi.api, function (params) {
            ApiDevList.map(a => {
                a.callCnt7 = randomInt(10000)
                return a
            })
            return ApiDevList
        })

        Mock.post(mock, ApiUrl.deleteById.name, ApiUrl.deleteById.api, function (params) {
            let i = ApiDevList.findIndex(a => a.id === Number(params.id))
            ApiDevList.splice(i, 1)
            return ''
        })

        Mock.post(mock, ApiUrl.releaseApi.name, ApiUrl.releaseApi.api, function (params) {
            let api = ApiDevList.filter(a => a.id === Number(params.id))[0]
            api.isReleased = 1
            api.updator = 'xiaoping'
            api.updateTime = DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
            return ''
        })

        Mock.post(mock, ApiUrl.getApi.name, ApiUrl.getApi.api, function (params) {
            let api = ApiDevList.filter(a => a.id === Number(params.id))[0]
            api.releaseCnt = randomInt(100)
            api.callCnt7 = randomInt(10000)
            api.appList = AppList.map(a => {
                a.callCnt7 = randomInt(2500)
                return a
            })
            return api
        })

        Mock.post(mock, ApiUrl.listApiCallTrendData.name, ApiUrl.listApiCallTrendData.api, function (params) {
            let data = []
            let startDate = params.startDate
            let endDate = params.endDate
            let timeFreq = params.timeFreq
            let dates = []
            if (timeFreq === 'HOUR') { // 小时
                dates = DateUtils.getHoursByStr(startDate, endDate, 'yyyyMMdd')
            } else if (timeFreq === 'DAY') { // 天
                dates = DateUtils.getDatesByStr(startDate, endDate, 'yyyyMMdd')
            } else if (timeFreq === 'WEEK') { // 周
                dates = DateUtils.getWeeksByStr(startDate, endDate, 'yyyyMMdd')
            }
            dates.forEach(d => {
                data.push({
                    dt: d,
                    callCnt: randomInt(1000)
                })
            })
            return data
        })
    }
}