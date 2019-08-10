import Mock from '@/mock'
import DateUtils from '../../../utils/dateUtils'

import {ApiUrl} from '../../../services/auth/resource'

const StaticResourceList = [
    {id: 1, pid: 0, name: '仪表盘', code: 'REPORT_DASH', feRouter: '/report/dash', type: 'MENU', projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 2, pid: 1, name: '只读', code: '', feRouter: '', type: 'MENU', projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 3, pid: 1, name: '新增', code: 'REPORT_DASH_ADD', feRouter: '', type: 'BUTTON', projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 4, pid: 0, name: '模板', code: 'REPORT_TPL', feRouter: '/report/tpl', type: 'MENU', projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 5, pid: 4, name: '只读', code: '', feRouter: '', type: 'MENU', projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 6, pid: 4, name: '新增', code: 'REPORT_TPL_ADD', feRouter: '', type: 'BUTTON', projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'}
]

const StaticResourceApiList = [
    {id: 1, name: '查询一条记录', url: '/api/resource/get-by-id', resourceId: 1},
    {id: 2, name: '查询资源树', url: '/api/resource/get-by-id', resourceId: 1}
]

const DataResourceList = [
    {id: 1, name: '模板', code: 'TPL', url: 'https://localhost:8080/api/tpl', projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 2, name: '库表', code: 'DB_TABLE', url: 'https://localhost:8080/api/db-table', projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 3, name: '服务', code: 'SERVICE', url: 'https://localhost:8080/api/service', projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'}
]

const WhiteResourceList = [
    {id: 1, name: '查询仪表盘', type: 1, url: '/api/dash/list', projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'},
    {id: 2, name: '仪表盘页面', type: 2, url: '/report/dash', projId: 1, creator: 'liujiangping', createTime: '2019-05-10 10:23:21', updator: 'sanshang', updateTime: '2019-05-12 10:23:21'}
]

function buildTree(dataArr) {
    let root = {
        id: 0,
        label: 'root',
        children: []
    }
    addChildren(root, dataArr)
    return root.children

}

function addChildren(node, dataArr) {
    let children = dataArr.filter(d => d.pid == node.id)
    if (children && children.length) {
        children.forEach(c => {
            let child = {
                id: c.id,
                label: c.name,
                children: []
            }
            addChildren(child, dataArr)
            node.children.push(child)
        })
    }
}

export default {
    mockDataResource (mock, dataResource) {
        Mock.get(mock, dataResource.name, dataResource.url, function (params) {
            return [
                {
                    id: '1_db',
                    realId: '1',
                    label: 'db_1',
                    type: 'db',
                    children: [
                        {id: '1_table', realId: '1', label: 'tb_1', type: 'table'},
                        {id: '2_table', realId: '2', label: 'tb_2', type: 'table'},
                        {id: '3_table', realId: '3', label: 'tb_3', type: 'table'},
                        {id: '4_table', realId: '4', label: 'tb_4', type: 'table'}
                    ]
                },
                {
                    id: '2_db',
                    realId: '2',
                    label: 'db_2',
                    type: 'db',
                    children: [
                        {id: '5_table', realId: '5', label: 'tb_5', type: 'table'},
                        {id: '6_table', realId: '6', label: 'tb_6', type: 'table'},
                        {id: '7_table', realId: '7', label: 'tb_7', type: 'table'},
                        {id: '8_table', realId: '8', label: 'tb_8', type: 'table'}
                    ]
                },
                {
                    id: '3_db',
                    realId: '3',
                    label: 'db_3',
                    type: 'db',
                    children: [
                        {id: '9_table', realId: '9', label: 'tb_9', type: 'table'},
                        {id: '10_table', realId: '10', label: 'tb_10', type: 'table'},
                        {id: '11_table', realId: '11', label: 'tb_11', type: 'table'},
                        {id: '12_table', realId: '12', label: 'tb_12', type: 'table'}
                    ]
                }
            ]
        })
    },
    bootstrap (mock) {
        let obj = this
        DataResourceList.forEach(d => {
            obj.mockDataResource(mock, d)
        })
        Mock.post(mock, ApiUrl.listStaticResourceTree.name, ApiUrl.listStaticResourceTree.api, function (params) {
            let list = StaticResourceList.filter(r => r.projId === params.projId)
            return buildTree(list)
        })

        Mock.post(mock, ApiUrl.getStaticResource.name, ApiUrl.getStaticResource.api, function (params) {
            let res = {}
            StaticResourceList.forEach(r => {
                if (r.id === params.id) {
                    res = r
                    res.beApiList = StaticResourceApiList.filter(a => a.resourceId === r.id)
                }
            })
            return res
        })

        Mock.post(mock, ApiUrl.saveOrUpdateStaticResource.name, ApiUrl.saveOrUpdateStaticResource.api, function (params) {
            let res
            if (params.id) { // 修改
                res = params.id
                StaticResourceList.forEach(r => {
                    if (r.id === params.id) {
                        r.name = params.name
                        r.code = params.code.toUpperCase()
                        r.type = params.type
                        r.feRouter = params.feRouter
                        r.updator = 'sanshang'
                        r.updateTime = DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
                        let beApiList = JSON.parse(params.beApiList)
                        let delIndex = []
                        StaticResourceApiList.forEach((a, index) => {
                            let i = beApiList.findIndex(b => a.id === b.id)
                            if (i === -1) {
                                delIndex.push(index)
                            } else {
                                a.name = beApiList[i].name
                                a.url = beApiList[i].url
                            }
                        })
                        delIndex.forEach((d, i) => {
                            StaticResourceApiList.splice(d - i, 1)
                        })
                        beApiList.forEach((a, index) => {
                            if (!a.id) {
                                StaticResourceApiList.push({
                                    id: new Date().getTime() + index,
                                    name: a.name,
                                    url: a.url,
                                    resourceId: res
                                })
                            }
                        })
                    }
                })
            } else {
                res = new Date().getTime()
                StaticResourceList.push({
                    projId: params.projId,
                    id: res,
                    pid: params.pid,
                    name: params.name,
                    code: params.code.toUpperCase(),
                    type: params.type,
                    feRouter: params.feRouter,
                    creator: 'xiaoping',
                    createTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    updator: 'xiaoping',
                    updateTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
                })
                let beApiList = JSON.parse(params.beApiList)
                beApiList.forEach((a, index) => {
                    StaticResourceApiList.push({
                        id: new Date().getTime() + index,
                        name: a.name,
                        url: a.url,
                        resourceId: res
                    })
                })
            }
            return res
        })

        Mock.post(mock, ApiUrl.deleteStaticResource.name, ApiUrl.deleteStaticResource.api, function (params) {
            let i = StaticResourceList.findIndex(r => r.id === params.id)
            StaticResourceList.splice(i, 1)
            return ''
        })

        Mock.post(mock, ApiUrl.listDataResource.name, ApiUrl.listDataResource.api, function (params) {
            let res = DataResourceList.filter(d => d.projId === params.projId)
            return res
        })

        Mock.post(mock, ApiUrl.saveOrUpdateDataResource.name, ApiUrl.saveOrUpdateDataResource.api, function (params) {
            let res
            if (params.id) { // 修改
                res = params.id
                DataResourceList.forEach(r => {
                    if (r.id === params.id) {
                        r.name = params.name
                        r.code = params.code.toUpperCase()
                        r.url = params.url
                        r.updator = 'sanshang'
                        r.updateTime = DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
                    }
                })
            } else { // 新增
                res = new Date().getTime()
                DataResourceList.push({
                    projId: params.projId,
                    id: res,
                    name: params.name,
                    code: params.code.toUpperCase(),
                    url: params.url,
                    creator: 'xiaoping',
                    createTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    updator: 'xiaoping',
                    updateTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
                })
            }
            obj.mockDataResource(mock, params)
            return res
        })

        Mock.post(mock, ApiUrl.deleteDataResource.name, ApiUrl.deleteDataResource.api, function (params) {
            let i = DataResourceList.findIndex(r => r.id === params.id)
            DataResourceList.splice(i, 1)
            return ''
        })

        Mock.post(mock, ApiUrl.listWhiteListResource.name, ApiUrl.listWhiteListResource.api, function (params) {
            let res = WhiteResourceList.filter(d => d.projId === params.projId)
            res.forEach(r => {
                if (r.type === 1) {
                    r.typeName = '后端'
                } else {
                    r.typeName = '前端'
                }
            })
            return res
        })

        Mock.post(mock, ApiUrl.saveOrUpdateWhiteListResource.name, ApiUrl.saveOrUpdateWhiteListResource.api, function (params) {
            let res
            if (params.id) { // 修改
                res = params.id
                WhiteResourceList.forEach(r => {
                    if (r.id === params.id) {
                        r.type = params.type
                        r.name = params.name
                        r.url = params.url
                        r.updator = 'sanshang'
                        r.updateTime = DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
                    }
                })
            } else { // 新增
                res = new Date().getTime()
                WhiteResourceList.push({
                    projId: params.projId,
                    id: res,
                    name: params.name,
                    type: params.type,
                    url: params.url,
                    creator: 'xiaoping',
                    createTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    updator: 'xiaoping',
                    updateTime: DateUtils.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
                })
            }
            return res
        })

        Mock.post(mock, ApiUrl.deleteWhiteListResource.name, ApiUrl.deleteWhiteListResource.api, function (params) {
            let i = WhiteResourceList.findIndex(r => r.id === params.id)
            WhiteResourceList.splice(i, 1)
            return ''
        })
    }
}