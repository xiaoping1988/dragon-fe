import Vue from 'vue'
import Router from 'vue-router'
import Pages from '../pages/data-visual/chart-demo/index.vue'
const Home = () => import('../pages/index.vue')
const SSO = () => import('../pages/sso/index.vue')
const Auth = () => import('../pages/auth/index.vue')
const AuthResource = () => import('../pages/auth/resource/index.vue')
const AuthRole = () => import('../pages/auth/role/index.vue')
const AuthUser = () => import('../pages/auth/user/index.vue')
const AuthConsole = () => import('../pages/auth/console/index.vue')
const Search = () => import('../pages/search/index.vue')
const Message = () => import('../pages/message/index.vue')
const MessageOnsite = () => import('../pages/message/onsite/index.vue')
const MessageReceiveManage = () => import('../pages/message/receive-manage/index.vue')
const DataMap = () => import('../pages/data-map/index.vue')
const DataMapMyTb = () => import('../pages/data-map/my-tb/index.vue')
const DataMapMyTbOwn = () => import('../pages/data-map/my-tb/own/index.vue')
const DataMapMyTbManage = () => import('../pages/data-map/my-tb/manage/index.vue')
const DataMapMyTbAuth = () => import('../pages/data-map/my-tb/auth/index.vue')
const DataMapDsManage = () => import('../pages/data-map/ds-manage/index.vue')
const DataMapDsManageDetail = () => import('../pages/data-map/ds-manage/detail.vue')
const DataMapTbManage = () => import('../pages/data-map/tb-manage/index.vue')
const DataMapTbManageDetail = () => import('../pages/data-map/tb-manage/detail.vue')
const DataMapDbManageDetail = () => import('../pages/data-map/db-manage/detail.vue')
const DataVisual = () => import('../pages/data-visual/index.vue')
const DataVisualDashboard = () => import('../pages/data-visual/dashboard/index.vue')
const DataVisualDashboardContainer = () => import('../pages/data-visual/dashboard/container.vue')
const DataVisualChartDemo = () => import('../pages/data-visual/chart-demo/index.vue')
const DataVisualChartDemoIndexCard = () => import('../pages/data-visual/chart-demo/IndexCard.vue')
const DataVisualChartDemoTable = () => import('../pages/data-visual/chart-demo/Table.vue')
const DataVisualChartDemoLineBar = () => import('../pages/data-visual/chart-demo/LineBar.vue')
const DataVisualChartDemoLineBarNotDate = () => import('../pages/data-visual/chart-demo/LineBarNotDate.vue')
const DataVisualChartDemoLine = () => import('../pages/data-visual/chart-demo/Line.vue')
const DataVisualChartDemoLineNotDate = () => import('../pages/data-visual/chart-demo/LineNotDate.vue')
const DataVisualChartDemoBar = () => import('../pages/data-visual/chart-demo/Bar.vue')
const DataVisualChartDemoBarStack = () => import('../pages/data-visual/chart-demo/BarStack.vue')
const DataVisualChartDemoBarStackTop = () => import('../pages/data-visual/chart-demo/BarStackTop.vue')
const DataVisualChartDemoBarTop = () => import('../pages/data-visual/chart-demo/BarTop.vue')
const DataVisualChartDemoBarNotDate = () => import('../pages/data-visual/chart-demo/BarNotDate.vue')
const DataVisualChartDemoArea = () => import('../pages/data-visual/chart-demo/Area.vue')
const DataVisualChartDemoAreaNotDate = () => import('../pages/data-visual/chart-demo/AreaNotDate.vue')
const DataVisualChartDemoPie = () => import('../pages/data-visual/chart-demo/Pie.vue')
const DataVisualChartDemoPieRing = () => import('../pages/data-visual/chart-demo/PieRing.vue')
const DataVisualChartDemoFunnel = () => import('../pages/data-visual/chart-demo/Funnel.vue')
const DataVisualChartDemoFunnelDim = () => import('../pages/data-visual/chart-demo/FunnelDim.vue')
const DataVisualChartDemoMap = () => import('../pages/data-visual/chart-demo/Map.vue')
const DataVisualChartDemoChartFilter = () => import('../pages/data-visual/chart-demo/ChartFilter.vue')
const AboutMe = () => import('../pages/about-me/index.vue')

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            component: Home,
            redirect: '/data-visual'
        },
        {
            path: '*',
            redirect: '/data-visual'
        },
        {
            path: '/sso/login',
            component: SSO
        },
        {
            path: '/auth',
            component: Auth,
            children: [
                {path: 'resource', component: AuthResource},
                {path: 'role', component: AuthRole},
                {path: 'user', component: AuthUser},
                {path: 'console', component: AuthConsole}
            ],
            redirect: '/auth/console'
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/about-me',
            component: AboutMe
        },
        {
            path: '/message',
            component: Message,
            children: [
                {path: 'onsite', component: MessageOnsite},
                {path: 'receive-manage', component: MessageReceiveManage}
            ],
            redirect: '/message/onsite'
        },
        {
            path: '/data-map',
            component: DataMap,
            children: [
                {
                    path: 'my-tb',
                    component: DataMapMyTb,
                    children: [
                        {path: 'own', component: DataMapMyTbOwn},
                        {path: 'manage', component: DataMapMyTbManage},
                        {path: 'auth', component: DataMapMyTbAuth}
                    ],
                    redirect: '/data-map/my-tb/own'
                },
                {path: 'ds-manage', component: DataMapDsManage},
                {path: 'ds-manage/:id', component: DataMapDsManageDetail},
                {path: 'db-manage/:id', component: DataMapDbManageDetail},
                {path: 'tb-manage', component: DataMapTbManage},
                {path: 'tb-manage/:id', component: DataMapTbManageDetail}
            ],
            redirect: '/data-map/my-tb/own'
        },
        {
            path: '/data-visual',
            component: DataVisual,
            children: [
                {
                    path: 'dashboard',
                    component: DataVisualDashboard,
                    children: [
                        {path: ':projId/:dashId', component: DataVisualDashboardContainer}
                    ]
                },
                {
                    path: 'chart-demo',
                    component: DataVisualChartDemo,
                    children: [
                        {path: 'indexcard', component: DataVisualChartDemoIndexCard},
                        {path: 'table', component: DataVisualChartDemoTable},
                        {path: 'line-bar', component: DataVisualChartDemoLineBar},
                        {path: 'line-bar-not-date', component: DataVisualChartDemoLineBarNotDate},
                        {path: 'line', component: DataVisualChartDemoLine},
                        {path: 'line-not-date', component: DataVisualChartDemoLineNotDate},
                        {path: 'bar', component: DataVisualChartDemoBar},
                        {path: 'bar-stack', component: DataVisualChartDemoBarStack},
                        {path: 'bar-stack-top', component: DataVisualChartDemoBarStackTop},
                        {path: 'bar-top', component: DataVisualChartDemoBarTop},
                        {path: 'bar-not-date', component: DataVisualChartDemoBarNotDate},
                        {path: 'area', component: DataVisualChartDemoArea},
                        {path: 'area-not-date', component: DataVisualChartDemoAreaNotDate},
                        {path: 'pie', component: DataVisualChartDemoPie},
                        {path: 'pie-ring', component: DataVisualChartDemoPieRing},
                        {path: 'funnel', component: DataVisualChartDemoFunnel},
                        {path: 'funnel-dim', component: DataVisualChartDemoFunnelDim},
                        {path: 'map', component: DataVisualChartDemoMap},
                        {path: 'filter', component: DataVisualChartDemoChartFilter}
                    ],
                    redirect: '/data-visual/chart-demo/indexcard'
                }
            ],
            redirect: '/data-visual/dashboard'
        }
    ]
})

// router.beforeEach(function (to, from, next) {
//   next()
// })

export default router
