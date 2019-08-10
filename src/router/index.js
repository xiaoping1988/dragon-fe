import Vue from 'vue'
import Router from 'vue-router'
import Pages from '../pages'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            component: Pages.Home
        },
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/sso/login',
            component: Pages.SSO
        },
        {
            path: '/auth',
            component: Pages.Auth,
            children: [
                {path: 'resource', component: Pages.Auth.Resource},
                {path: 'role', component: Pages.Auth.Role},
                {path: 'user', component: Pages.Auth.User},
                {path: 'console', component: Pages.Auth.Console}
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
                {path: 'onsite', component: Pages.Message.Onsite},
                {path: 'receive-manage', component: Pages.Message.ReceiveManage}
            ],
            redirect: '/message/onsite'
        },
        {
            path: '/data-map',
            component: Pages.DataMap,
            children: [
                {
                    path: 'my-tb',
                    component: Pages.DataMap.MyTb,
                    children: [
                        {path: 'own', component: Pages.DataMap.MyTb.Own},
                        {path: 'manage', component: Pages.DataMap.MyTb.Manage},
                        {path: 'auth', component: Pages.DataMap.MyTb.Auth}
                    ],
                    redirect: '/data-map/my-tb/own'
                },
                {path: 'ds-manage', component: Pages.DataMap.DsManager},
                {path: 'ds-manage/:id', component: Pages.DataMap.DsManager.Detail},
                {path: 'db-manage/:id', component: Pages.DataMap.DbManager.Detail},
                {path: 'tb-manage', component: Pages.DataMap.TbManager},
                {path: 'tb-manage/:id', component: Pages.DataMap.TbManager.Detail}
            ],
            redirect: '/data-map/my-tb/own'
        },
        {
            path: '/data-visual',
            component: Pages.DataVisual,
            children: [
                {
                    path: 'dashboard',
                    component: Pages.DataVisual.Dashboard,
                    children: [
                        {path: ':projId/:dashId', component: Pages.DataVisual.Dashboard.Container}
                    ]
                },
                {
                    path: 'chart-demo',
                    component: Pages.DataVisual.ChartDemo,
                    children: [
                        {path: 'indexcard', component: Pages.DataVisual.ChartDemo.IndexCard},
                        {path: 'table', component: Pages.DataVisual.ChartDemo.Table},
                        {path: 'line-bar', component: Pages.DataVisual.ChartDemo.LineBar},
                        {path: 'line-bar-not-date', component: Pages.DataVisual.ChartDemo.LineBarNotDate},
                        {path: 'line', component: Pages.DataVisual.ChartDemo.Line},
                        {path: 'line-not-date', component: Pages.DataVisual.ChartDemo.LineNotDate},
                        {path: 'bar', component: Pages.DataVisual.ChartDemo.Bar},
                        {path: 'bar-stack', component: Pages.DataVisual.ChartDemo.BarStack},
                        {path: 'bar-stack-top', component: Pages.DataVisual.ChartDemo.BarStackTop},
                        {path: 'bar-top', component: Pages.DataVisual.ChartDemo.BarTop},
                        {path: 'bar-not-date', component: Pages.DataVisual.ChartDemo.BarNotDate},
                        {path: 'area', component: Pages.DataVisual.ChartDemo.Area},
                        {path: 'area-not-date', component: Pages.DataVisual.ChartDemo.AreaNotDate},
                        {path: 'pie', component: Pages.DataVisual.ChartDemo.Pie},
                        {path: 'pie-ring', component: Pages.DataVisual.ChartDemo.PieRing},
                        {path: 'funnel', component: Pages.DataVisual.ChartDemo.Funnel},
                        {path: 'funnel-dim', component: Pages.DataVisual.ChartDemo.FunnelDim},
                        {path: 'map', component: Pages.DataVisual.ChartDemo.Map},
                        {path: 'filter', component: Pages.DataVisual.ChartDemo.ChartFilter}
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
