<template>
    <div class="d-dash-container">
        <div class="head">
            <h2 class="title">{{dash.name}}</h2>
            <div class="btn">
                <el-button type="text" size="mini" v-if="dash.editAuth">
                    <i class="fa fa-bar-chart-o d-icon"></i>添加图表
                </el-button>
                <el-button type="text" size="mini" v-if="dash.editAuth">
                    <i class="fa fa-bookmark-o d-icon"></i>添加页签
                </el-button>
                <el-button type="text" size="mini">
                    <i class="fa fa-expand d-icon"></i>全屏
                </el-button>
                <el-button type="text" size="mini" v-if="dash.editAuth">
                    <i class="fa fa-filter d-icon"></i>全局筛选
                </el-button>
                <el-button type="text" size="mini" title="更多操作" class="more">
                    <i class="fa fa-ellipsis-v d-icon"></i>
                    <ul class="d-btn-list">
                        <li>导出仪表盘</li>
                        <li>导出Word</li>
                        <li>导出PDF</li>
                    </ul>
                </el-button>
            </div>
        </div>
        <div class="filter" v-if="this.dash.globalFilterList && this.dash.globalFilterList.length">
            <i class="fa fa-filter d-icon"></i>
            <el-button type="text" size="mini" icon="el-icon-search">查询</el-button>
        </div>
        <div class="d-dash-main" :style="dashMainStyle" :id="'main_' + dashId">
            <el-tabs v-if="hasTab" v-model="activeTabId" @tab-click="clickTab">
                <el-tab-pane v-for="tab in tabList" :label="tab.name" :name="tab.id + ''" :key="tab.id">
                    <DChartList :tabId="tab.id"
                                :activeTabId="activeTabId"
                                :activeChartId="activeChartId"
                                :data="tab.chartList"
                                :containerWidth="containerWidth"></DChartList>
                </el-tab-pane>
            </el-tabs>
            <DChartList v-else
                        :tabId="-1"
                        :activeTabId="-1"
                        :activeChartId="activeChartId"
                        :data="chartList"
                        :containerWidth="containerWidth"></DChartList>
        </div>
        <DLoading :loading="loading"></DLoading>
    </div>
</template>

<script>
    import {
        getDashMetaForShow
    } from '../../../services/data-visual/dashboard'
    import DChartList from '../chart-panel/ChartList.vue'
    export default {
        name: 'DDashContainer',
        components: {DChartList},
        data () {
            return {
                projId: '',
                dashId: '',
                activeChartId: '',
                activeTabId: '',
                dash: {},
                loading: false,
                hasTab: false,
                chartList: [], // 仪表盘没分tab, 仪表盘内展现的图表
                tabList: [], // 仪表盘分了tab, 仪表盘的所有tab及tab下的图表
                chartMargin: 4, // 图表之间的间隔
                containerWidth: 980, // 图表列表容器的实际宽度
                minContainerWidth: 980 // 图表列表容器的最小宽度
            }
        },
        computed: {
            dashMainStyle () {
                let headHeight = 45
                if (this.dash.globalFilterList && this.dash.globalFilterList.length) {
                    headHeight = headHeight + 40
                }
                return {
                    height: 'calc(100% - ' + headHeight + 'px)'
                }
            }
        },
        methods: {
            renderDash () {
                let vue = this
                vue.projId = vue.$route.params.projId
                vue.dashId = vue.$route.params.dashId
                vue.activeChartId = vue.$route.query.chartId
                vue.activeTabId = vue.$route.query.tabId
                vue.loading = true
                vue.hasTab = false
                vue.chartList = []
                vue.tabList = []
                getDashMetaForShow({
                    id: vue.dashId
                }).then(res => {
                    vue.loading = false
                    vue.dash = res.data
                    if (vue.dash.tabList && (vue.dash.tabList.length > 1 || (vue.dash.tabList.length === 1 && vue.dash.tabList[0].id !== -1))) {
                        vue.hasTab = true
                        vue.tabList = vue.dash.tabList
                        if (!vue.activeTabId) {
                            vue.activeTabId = vue.tabList[0].id + ''
                        }
                    } else if (vue.dash.tabList && vue.dash.tabList.length) {
                        vue.chartList = vue.dash.tabList[0].chartList
                    }
                }).catch(vue.$handleError)
            },
            setContainerWidth () {
                this.$nextTick(function () {
                    let dom = document.getElementById('main_' + this.dashId)
                    if (dom) {
                        this.containerWidth = dom.clientWidth - 30
                    }
                })
            },
            clickTab () {

            }
        },
        watch: {
            '$route.path': function () {
                this.renderDash()
            }
        },
        mounted () {
            let vue = this
            vue.renderDash()
            vue.setContainerWidth()
            window.addEventListener('resize', function () {
                vue.setContainerWidth()
            })
        }
    }
</script>

<style>
    .d-dash-container {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
    }

    .d-dash-container .head {
        height: 30px;
        padding-left: 15px;
        padding-top: 15px;
        padding-right: 15px;
    }

    .d-dash-container .filter {
        height: 30px;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 10px;
    }

    .d-dash-container .head .title {
        color: rgba(10,18,32,.64);
        font-weight: 400;
        float: left;
    }

    .d-dash-container .head .btn {
        float: right;
    }

    .d-dash-container .head .btn .more {
        position: relative;
    }

    .d-dash-container .head .btn .more .d-btn-list{
        right: 0px;
        top: 25px;
        display: none;
        text-align: left;
    }

    .d-dash-container .head .btn .more:hover .d-btn-list{
        display: block;
    }

    .d-dash-main {
        width: 100%;
        position: relative;
    }

    .d-dash-main .el-tabs {
        height: 100%;
        width: 100%;
    }

    .d-dash-main .el-tabs .el-tabs__header {
        padding-left: 15px;
        padding-right: 15px;
    }
    .d-dash-main .el-tabs .el-tabs__content{
        height: calc(100% - 55px);
        width: 100%;
    }

    .d-dash-main .el-tabs .el-tabs__content .el-tab-pane {
        height: 100%;
        width: 100%;
    }
</style>