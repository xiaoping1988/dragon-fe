import Vue from 'vue'
import Router from 'vue-router'
// import Pages from '../pages'
import Pages from './pageComponent'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            component: Pages.Home,
            redirect: '/data-visual'
        },
        {
            path: '*',
            redirect: '/data-visual'
        },
        {
            path: '/sso/login',
            component: Pages.SSO
        },
        {
            path: '/about-me',
            component: Pages.AboutMe
        },
        {
            path: '/auth',
            component: Pages.Auth,
            children: [
                {path: 'resource', component: Pages.AuthResource},
                {path: 'role', component: Pages.AuthRole},
                {path: 'user', component: Pages.AuthUser},
                {path: 'console', component: Pages.AuthConsole}
            ],
            redirect: '/auth/console'
        },
        {
            path: '/search',
            component: Pages.Search
        },
        {
            path: '/message',
            component: Pages.Message,
            children: [
                {path: 'onsite', component: Pages.MessageOnsite},
                {path: 'receive-manage', component: Pages.MessageReceiveManage}
            ],
            redirect: '/message/onsite'
        },
        {
            path: '/data-map',
            component: Pages.DataMap,
            children: [
                {
                    path: 'my-tb',
                    component: Pages.DataMapMyTb,
                    children: [
                        {path: 'own', component: Pages.DataMapMyTbOwn},
                        {path: 'manage', component: Pages.DataMapMyTbManage},
                        {path: 'auth', component: Pages.DataMapMyTbAuth}
                    ],
                    redirect: '/data-map/my-tb/own'
                },
                {path: 'ds-manage', component: Pages.DataMapDsManage},
                {path: 'ds-manage/:id', component: Pages.DataMapDsManageDetail},
                {path: 'db-manage/:id', component: Pages.DataMapDbManageDetail},
                {path: 'tb-manage', component: Pages.DataMapTbManage},
                {path: 'tb-manage/:id', component: Pages.DataMapTbManageDetail}
            ],
            redirect: '/data-map/my-tb/own'
        },
        {
            path: '/data-visual',
            component: Pages.DataVisual,
            children: [
                {
                    path: 'dashboard',
                    component: Pages.DataVisualDashboard,
                    children: [
                        {path: ':projId/:dashId', component: Pages.DataVisualDashboardContainer}
                    ]
                },
                {
                    path: 'chart-demo',
                    component: Pages.DataVisualChartDemo,
                    children: [
                        {path: 'indexcard', component: Pages.DataVisualChartDemoIndexCard},
                        {path: 'table', component: Pages.DataVisualChartDemoTable},
                        {path: 'line-bar', component: Pages.DataVisualChartDemoLineBar},
                        {path: 'line-bar-not-date', component: Pages.DataVisualChartDemoLineBarNotDate},
                        {path: 'line', component: Pages.DataVisualChartDemoLine},
                        {path: 'line-not-date', component: Pages.DataVisualChartDemoLineNotDate},
                        {path: 'bar', component: Pages.DataVisualChartDemoBar},
                        {path: 'bar-stack', component: Pages.DataVisualChartDemoBarStack},
                        {path: 'bar-stack-top', component: Pages.DataVisualChartDemoBarStackTop},
                        {path: 'bar-top', component: Pages.DataVisualChartDemoBarTop},
                        {path: 'bar-not-date', component: Pages.DataVisualChartDemoBarNotDate},
                        {path: 'area', component: Pages.DataVisualChartDemoArea},
                        {path: 'area-not-date', component: Pages.DataVisualChartDemoAreaNotDate},
                        {path: 'pie', component: Pages.DataVisualChartDemoPie},
                        {path: 'pie-ring', component: Pages.DataVisualChartDemoPieRing},
                        {path: 'funnel', component: Pages.DataVisualChartDemoFunnel},
                        {path: 'funnel-dim', component: Pages.DataVisualChartDemoFunnelDim},
                        {path: 'map', component: Pages.DataVisualChartDemoMap},
                        {path: 'filter', component: Pages.DataVisualChartDemoChartFilter}
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
