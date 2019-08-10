import Mock from '@/mock'
import DateUtils from '../../utils/dateUtils'

import {ApiUrl} from '../../services/search'
import Domain from '../../services/domainSetting'

const SearchResult = [
    {title: '角色', intro: '角色相关', url: Domain.auth.fe + '#/auth/role', score: 1},
    {title: '用户', intro: '用户相关', url: Domain.auth.fe + '#/auth/user', score: 1},
    {title: '资源', intro: '资源相关', url: Domain.auth.fe + '#/auth/resource', score: 1},
    {title: '个人中心', intro: '个人中心相关', url: Domain.auth.fe + '#/auth/console', score: 1},
    {title: '站内消息', intro: '站内消息相关', url: Domain.message.fe + '#/message/onsite', score: 1},
    {title: '妈妈叫你回家吃饭', intro: '妈妈叫你回家吃饭相关', url: Domain.message.fe + '#/message/onsite?id=2', score: 1}
]

export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.search.name, ApiUrl.search.api, function (params) {
            let res = {
                total: 0,
                result: []
            }
            if (params.keyword) {
                res.total = 1300
                res.result = SearchResult.map(r => {
                    let temp = JSON.parse(JSON.stringify(r))
                    temp.title = temp.title + '<strong>' + params.keyword + "</strong>"
                    temp.intro = '<strong>' + params.keyword + "</strong>" + temp.intro
                    temp.updateTime = DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
                    return temp
                })
            }
            return res
        })
    }
}