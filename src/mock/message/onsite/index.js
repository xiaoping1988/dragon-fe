import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'

import {ApiUrl} from '../../../services/message/onsite'

export let MsgList = [
    {
        id: 1,
        title: '导出excel',
        content: '导出excel导出excel导出excel导出excel导出excel导出excel导出excel导出excel',
        isRead: 0,
        createTime: '2019-05-18 12:01:22'
    },
    {
        id: 2,
        title: '妈妈叫你回家吃饭',
        content: '妈妈叫你回家吃饭妈妈叫你回家吃饭妈妈叫你回家吃饭妈妈叫你回家吃饭妈妈叫你回家吃饭妈妈叫你回家吃饭',
        isRead: 0,
        createTime: '2019-05-17 12:01:22'
    },
    {
        id: 3,
        title: '回家啦',
        content: '回家啦回家啦回家啦回家啦回家啦回家啦回家啦',
        isRead: 0,
        createTime: '2019-05-16 12:01:22'
    },
    {
        id: 4,
        title: '任务完成了',
        content: '片子下好任务完成了任务完成了任务完成了任务完成了任务完成了任务完成了了',
        isRead: 0,
        createTime: '2019-05-15 12:01:22'
    },
    {
        id: 5,
        title: '出来玩了,兴奋不兴奋',
        content: '出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋',
        isRead: 0,
        createTime: '2019-05-14 12:01:22'
    },
    {
        id: 6,
        title: '出来玩了,兴奋不兴奋',
        content: '出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋',
        isRead: 1,
        createTime: '2019-05-14 12:01:22'
    },
    {
        id: 7,
        title: '出来玩了,兴奋不兴奋',
        content: '出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋',
        isRead: 1,
        createTime: '2019-05-14 12:01:22'
    },
    {
        id: 8,
        title: '出来玩了,兴奋不兴奋',
        content: '出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋',
        isRead: 1,
        createTime: '2019-05-14 12:01:22'
    },
    {
        id: 9,
        title: '出来玩了,兴奋不兴奋',
        content: '出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋',
        isRead: 1,
        createTime: '2019-05-14 12:01:22'
    },
    {
        id: 10,
        title: '出来玩了,兴奋不兴奋',
        content: '出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋出来玩了,兴奋不兴奋',
        isRead: 0,
        createTime: '2019-05-14 12:01:22'
    }
]
export default {
    bootstrap (mock) {
        Mock.post(mock, ApiUrl.listMsg.name, ApiUrl.listMsg.api, function (params) {
            let data = []
            let total = 0
            if (params.isRead === -1) { // 全部
                data = MsgList
                total = 130
            } else if (params.isRead === 0) { // 未读
                data = MsgList.filter(m => m.isRead === 0)
                total = 85
            } else { // 已读
                data = MsgList.filter(m => m.isRead === 1)
                total = 45
            }
            let num = params.pageSize / 10
            let allData = []
            for (let i = 0; i < num; i++) {
                allData = allData.concat(data)
            }
            allData = allData.reverse()
            let res = {
                total: total,
                data: allData
            }
            return res
        })
        Mock.post(mock, ApiUrl.getMsg.name, ApiUrl.getMsg.api, function (params) {
            let res = {}
            MsgList.forEach(m => {
                if (Number(params.id) === m.id) {
                    m.isRead = 1
                    res = m
                }
            })
            return res
        })

        Mock.post(mock, ApiUrl.getUnReadCount.name, ApiUrl.getUnReadCount.api, function (params) {
            let res = MsgList.filter(m => m.isRead === 0)
            return res.length
        })

        Mock.post(mock, ApiUrl.markReadedAll.name, ApiUrl.markReadedAll.api, function (params) {
            MsgList.forEach(m => {
                if (m.isRead === 0) {
                    m.isRead = 1
                }
            })
            return ''
        })

        Mock.post(mock, ApiUrl.markReadedByIds.name, ApiUrl.markReadedByIds.api, function (params) {
            let idList = params.idList.split(',')
            MsgList.forEach(m => {
                if (idList.includes(m.id + '') && m.isRead === 0) {
                    m.isRead = 1
                }
            })
            return ''
        })

        Mock.post(mock, ApiUrl.deleteAll.name, ApiUrl.deleteAll.api, function (params) {
            MsgList = []
            return ''
        })

        Mock.post(mock, ApiUrl.deleteByIds.name, ApiUrl.deleteByIds.api, function (params) {
            let idList = params.idList.split(',')
            let delIndex = []
            MsgList.forEach((m, i) => {
                if (idList.includes(m.id + '')) {
                    delIndex.push(i)
                }
            })
            delIndex.forEach((d, i) => {
                MsgList.splice(d - i, 1)
            })
            return ''
        })
    }
}