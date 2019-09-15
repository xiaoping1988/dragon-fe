const domain = {
    auth: { // 统一权限
        fe: '', // 前端域名
        be: '' // 后端域名
    },
    message: { // 消息中心
        fe: '', // 前端域名
        be: '' // 后端域名
    },
    commonNav: { // 公共导航服务
        fe: '', // 前端域名
        be: '' // 后端域名
    },
    search: { // 搜索中心
        fe: '', // 前端域名
        be: '' // 后端域名
    },
    ssoLogin: { // 单点登录服务
        fe: '', // 前端域名
        be: '' // 后端域名
    },
    dataMap: { // 数据地图
        fe: '', // 前端域名
        be: '' // 后端域名
    },
    dataVisual: { // 数据可视化
        fe: '', // 前端域名
        be: '' // 后端域名
    },
    sso: { // 单点登录
        fe: '', // 前端域名
        be: '' // 后端域名
    },
    dataApi: { // 数据api
        fe: '', // 前端域名
        be: '' // 后端域名
    }
}

if (process.env.NODE_ENV === 'development') { // 开发环境
    domain.auth = {
        fe: 'http://localhost:8080', // 前端域名
        be: 'http://localhost:8081' // 后端域名
    }
    domain.message = {
        fe: 'http://localhost:8080', // 前端域名
        be: 'http://localhost:8081' // 后端域名
    }
    domain.commonNav = {
        fe: 'http://localhost:8080', // 前端域名
        be: 'http://localhost:8081' // 后端域名
    }
    domain.search = {
        fe: 'http://localhost:8080', // 前端域名
        be: 'http://localhost:8081' // 后端域名
    }
    domain.ssoLogin = {
        fe: 'http://localhost:8080', // 前端域名
        be: 'http://localhost:8081' // 后端域名
    }
    domain.dataMap = {
        fe: 'http://localhost:8080', // 前端域名
        be: 'http://localhost:8081' // 后端域名
    }
    domain.dataVisual = {
        fe: 'http://localhost:8080', // 前端域名
        be: 'http://localhost:8081' // 后端域名
    }
    domain.sso = {
        fe: 'http://localhost:8080', // 前端域名
        be: 'http://localhost:8081' // 后端域名
    }
    domain.dataApi = {
        fe: 'http://localhost:8080', // 前端域名
        be: 'http://localhost:8081' // 后端域名
    }
} else if (process.env.NODE_ENV === 'production') {
    domain.auth = {
        fe: 'https://xiaoping1988.github.io', // 前端域名
        be: 'https://xiaoping1988.github.io' // 后端域名
    }
    domain.message = {
        fe: 'https://xiaoping1988.github.io', // 前端域名
        be: 'https://xiaoping1988.github.io' // 后端域名
    }
    domain.commonNav = {
        fe: 'https://xiaoping1988.github.io', // 前端域名
        be: 'https://xiaoping1988.github.io' // 后端域名
    }
    domain.search = {
        fe: 'https://xiaoping1988.github.io', // 前端域名
        be: 'https://xiaoping1988.github.io' // 后端域名
    }
    domain.ssoLogin = {
        fe: 'https://xiaoping1988.github.io', // 前端域名
        be: 'https://xiaoping1988.github.io' // 后端域名
    }
    domain.dataMap = {
        fe: 'https://xiaoping1988.github.io', // 前端域名
        be: 'https://xiaoping1988.github.io' // 后端域名
    }
    domain.dataVisual = {
        fe: 'https://xiaoping1988.github.io', // 前端域名
        be: 'https://xiaoping1988.github.io' // 后端域名
    }
    domain.sso = {
        fe: 'https://xiaoping1988.github.io', // 前端域名
        be: 'https://xiaoping1988.github.io' // 后端域名
    }
    domain.dataApi = {
        fe: 'https://xiaoping1988.github.io', // 前端域名
        be: 'https://xiaoping1988.github.io' // 后端域名
    }
}

export default domain