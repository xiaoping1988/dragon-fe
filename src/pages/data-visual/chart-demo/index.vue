<template>
    <DPageContent>
        <DMenuNav slot="side" :data="sideMenuList" mode="vertical"></DMenuNav>
        <div class="d-chart-container d-box-middle d-chart-full-screen" style="overflow: auto">
            <router-view></router-view>
        </div>
    </DPageContent>
</template>

<script>
    export default {
        name: 'DChartDemo',
        data () {
            return {
                sideMenuList: [
                    {name: '指标卡', path: '/data-visual/chart-demo/indexcard'},
                    {name: '表格', path: '/data-visual/chart-demo/table'},
                    {name: '双轴图', path: '/data-visual/chart-demo/line-bar'},
                    {name: '非日期双轴图', path: '/data-visual/chart-demo/line-bar-not-date'},
                    {name: '折现图', path: '/data-visual/chart-demo/line'},
                    {name: '非日期折现图', path: '/data-visual/chart-demo/line-not-date'},
                    {name: '柱状图', path: '/data-visual/chart-demo/bar'},
                    {name: '非日期柱状图', path: '/data-visual/chart-demo/bar-not-date'},
                    {name: '堆积柱状图', path: '/data-visual/chart-demo/bar-stack'},
                    {name: '堆积top图', path: '/data-visual/chart-demo/bar-stack-top'},
                    {name: '条形top图', path: '/data-visual/chart-demo/bar-top'},
                    {name: '面积图', path: '/data-visual/chart-demo/area'},
                    {name: '非日期面积图', path: '/data-visual/chart-demo/area-not-date'},
                    {name: '饼图', path: '/data-visual/chart-demo/pie'},
                    {name: '环形图', path: '/data-visual/chart-demo/pie-ring'},
                    {name: '漏斗图(零维度)', path: '/data-visual/chart-demo/funnel'},
                    {name: '漏斗图(一维度)', path: '/data-visual/chart-demo/funnel-dim'},
                    {name: '地图', path: '/data-visual/chart-demo/map'},
                    {name: '筛选控件', path: '/data-visual/chart-demo/filter'}
                ]
            }
        }
    }
</script>

<style>
    .d-chart-full-screen {
        background: #fff;
        width: 100%;
        height: 100%;
    }
</style>