<template>
    <div class="d-chart-container">
        <div class="head">
            <div class="left d-ellipsis">
                <span class="title" v-if="chartMeta.chartType !== 'INDEX_CARD' || !showChart">{{chartObj.name}}</span>
                <span style="margin-left: 10px;margin-right: 10px;">
                    <el-tooltip placement="bottom" effect="light">
                        <div slot="content" style="width: 300px; max-height: 400px;overflow: auto">
                            <el-row :gutter="24" style="margin: 0px">
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-detail">
                                            <h4>{{chartObj.isCertified === 1 ? '数据部门已认证,数据质量可靠' : '未经过数据部门认证'}}</h4>
                                        </div>
                                    </el-col>
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-term">标签</div>
                                        <div class="d-desclist-index-detail d-tag-group">
                                            <el-tag v-for="tag in chartObj.tagList" :key="tag.id" size="mini">{{tag.name}}</el-tag>
                                        </div>
                                    </el-col>
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-term">描述</div>
                                        <div class="d-desclist-index-detail">{{chartObj.remark}}</div>
                                    </el-col>
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-term">负责人</div>
                                        <div class="d-desclist-index-detail">{{chartObj.creatorCn}}({{chartObj.creator}})</div>
                                    </el-col>
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-term">负责部门</div>
                                        <div class="d-desclist-index-detail">{{chartObj.departmentName}}</div>
                                    </el-col>
                            </el-row>
                        </div>
                      <i class="fa fa-trophy grey-icon" :class="{'data-certified': chartObj.isCertified === 1}"></i>
                    </el-tooltip>
                </span>
                <span v-if="chart.largeChartType !== largeChartTypeObj.External.code">
                    <el-tooltip placement="bottom-start" effect="light" :visible-arrow="false">
                        <div slot="content" style="width: 300px; max-height: 400px;overflow: auto">
                            <el-row :gutter="24" style="margin: 0px">
                                    <el-col v-for="(item, index) in showLabelArr"
                                            v-if="item.showLabel !== '' && item.showLabel !== '全部'"
                                            :key="index"
                                            class="d-desclist-index">
                                        <div class="d-desclist-index-term">{{item.colLabel}}</div>
                                        <div class="d-desclist-index-detail">{{item.showLabel}}</div>
                                    </el-col>
                            </el-row>
                        </div>
                        <span class="d-chart-filter-tip">
                            <span v-for="(item, index) in showLabelArr"
                                  v-if="item.showLabel !== '' && item.showLabel !== '全部'"
                                  :key="index"
                                  class="item">
                                <span class="label">{{item.colLabel}}</span>
                                <span class="value">{{item.showLabel}}</span>
                            </span>
                        </span>
                    </el-tooltip>
                </span>
            </div>
            <div class="right">
                <div v-if="chart.editAuth"
                     title="编辑报表"
                     class="btn"
                     @click="openChartEdit">
                    <i class="fa fa-pencil"></i>
                </div>
                <div v-if="filterMeta.length && chart.largeChartType !== largeChartTypeObj.External.code"
                     class="btn filter-btn"
                     @mouseenter="mouseEnterFilterBtn"
                     @mouseleave="mouseLeaveFilterBtn">
                    <i class="fa fa-filter"></i>
                    <div class="d-chart-filter-panel" :id="'filter_panel_' + chart.id">
                        <DFilterList :data="filterMeta" @inited="initedFilterList" @change="changeCondition"></DFilterList>
                    </div>
                </div>
                <div class="btn" title="图类型切换" v-if="chart.largeChartType === largeChartTypeObj.General.code">
                    <i class="fa fa-line-chart"></i>
                </div>
                <div class="btn" title="维度指标切换" v-if="chart.largeChartType === largeChartTypeObj.General.code">
                    <i class="fa fa-sliders"></i>
                </div>
                <div class="btn" title="全屏">
                    <i class="fa fa-expand"></i>
                </div>
                <div class="btn more-btn" v-if="chart.largeChartType !== largeChartTypeObj.External.code">
                    <i class="fa fa-ellipsis-v"></i>
                    <ul class="d-chart-btn-more d-btn-list">
                        <li >导出EXCEL</li>
                        <li v-if="chartMeta.chartType !== chartTypeObj.IndexCard.code && chartMeta.chartType !== chartTypeObj.Table.code"
                            @click="exportImg">导出图片</li>
                        <li >刷新数据</li>
                        <li v-if="chart.editAuth">复制图表</li>
                        <li v-if="chart.editAuth">移动图表</li>
                        <li >查看SQL</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="content d-box-middle" :id="'chart_content_' + chart.id">
            <div v-if="chart.largeChartType === largeChartTypeObj.External.code"> <!-- 嵌套外部报表 -->
                <iframe v-if="visibled" :src="chartObj.url" class="d-chart-external"></iframe>
            </div>
            <div v-else-if="chart.largeChartType === largeChartTypeObj.GpsMap.code"><!-- 经纬度地图 -->

            </div>
            <div v-else> <!-- 普通图表 -->
                <DChartFactory v-if="showChart"
                               :id="chart.id"
                               :meta="chartMeta"
                               :data="data"
                               @sort="sortData"
                               :resizeCount="resizeCount"></DChartFactory>
                <div v-else class="tip">
                    {{tipMsg}}
                </div>
            </div>
        </div>
        <DLoading :loading="loading"></DLoading>
        <el-dialog
                v-if="chart.largeChartType === largeChartTypeObj.External.code"
                :visible.sync="showEditChartModal"
                title="编辑图表"
                top="30px"
                width="360px"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="false">
            <DExternalReportForm :data="externalReportForm"
                                 @submit="submitExternalReport"
                                 @cancel="showEditChartModal = false">
            </DExternalReportForm>
        </el-dialog>
    </div>
</template>

<script>
    import DChartFactory from '../chart-factory'
    import EchartsUtil from '../chart-factory/EchartsUtil'
    import DFilterList from '../chart-filter/FilterList'
    import {queryData, addOrUpdateExternalChart, getChart} from '../../../services/data-visual/chart'
    import {ChartType, LargeChartType} from '../constants'
    import DExternalReportForm from '../external-report/form'
    export default {
        name: 'DChartContainer',
        components: {DChartFactory, DFilterList, DExternalReportForm},
        props: {
            chart: Object,
            globalFilterValue: String,
            resizeCount: { // resize标识
                type: Number,
                default: 0
            },
            visibled: Boolean // 是否在可视区域内
        },
        data () {
            return {
                chartObj: this.chart,
                largeChartTypeObj: LargeChartType,
                chartTypeObj: ChartType,
                chartMeta: {}, // chart图渲染用的配置
                filterMeta: [], // 筛选项配置
                data: [], // 图表数据
                showChart: false, // 是否要显示图表factory控件
                tipMsg: '', // 图表未查到数据或者报错的提示
                loading: false,
                sortFieldKey: '', // 排序字段
                sortType: '', // 排序类型,asc,desc
                chartFilterValue: '[]', // 本次查询的筛选值
                lastChartFilterValue: '', // 上一次查询的筛选值
                conditionValueArr: [], // 筛选项列表的值
                showLabelArr: [], // 筛选项列表值的显示
                filterInited: false, // 筛选列表是否初始化完
                filterOperating: false, // 是否正在操作筛选
                showEditChartModal: false, // 显示添加图表的弹框
                externalReportForm: {
                    id: '',
                    url: '',
                    name: '',
                    tagList: [],
                    remark: ''
                }
            }
        },
        methods: {
            handleMeta () {
                if (this.chart.largeChartType !== LargeChartType.External.code) {
                    let meta = JSON.parse(this.chart.renderMeta)
                    this.chartMeta = meta.chartMeta
                    this.filterMeta = meta.filterMeta ? meta.filterMeta : []
                    if (this.filterMeta.length === 0) {
                        this.filterInited = true
                    }
                }
            },
            sortData (key, sortType) {
                this.sortFieldKey = key
                this.sortType = sortType
                this.setData()
            },
            setData () {
                if (!this.visibled ||
                    !this.filterInited ||
                    this.lastChartFilterValue === this.chartFilterValue ||
                    this.chart.largeChartType === LargeChartType.External.code) {
                    return
                }
                this.loading = true
                this.lastChartFilterValue = this.chartFilterValue
                queryData({
                    id: this.chart.id,
                    chartFilterValue: this.chartFilterValue,
                    globalFilterValue: this.globalFilterValue,
                    sortFieldKey: this.sortFieldKey,
                    sortType: this.sortType
                }).then(res => {
                    this.loading = false
                    this.data = res.data
                    if (!res.data.length) {
                        this.showChart = false
                        this.tipMsg = '此图表暂无数据'
                    } else {
                        this.showChart = true
                    }
                }).catch(error => {
                    this.$handleError(error)
                    this.loading = false
                    this.showChart = false
                    this.tipMsg = error.msg
                    this.data = []
                })
            },
            initedFilterList (conditionValueArr, showLabelArr) {
                this.conditionValueArr = conditionValueArr
                this.chartFilterValue = JSON.stringify(conditionValueArr)
                this.showLabelArr = showLabelArr
                this.filterInited = true
                this.setData()
            },
            changeCondition (conditionValueArr, showLabelArr) {
                this.conditionValueArr = conditionValueArr
                this.chartFilterValue = JSON.stringify(conditionValueArr)
                this.showLabelArr = showLabelArr
            },
            mouseEnterFilterBtn (e) {
                this.filterOperating = true
                let ww = window.innerWidth
                let ex = e.clientX
                let dom = document.getElementById('filter_panel_' + this.chart.id)
                if ((ww - ex) < 200) {
                    dom.style.right =  '-20px'
                } else if ((ex - 220) < 200) {
                    dom.style.left =  '-20px'
                } else {
                    dom.style.right = -dom.clientWidth / 2 + 'px'
                }
            },
            mouseLeaveFilterBtn () {
                let vue = this
                vue.filterOperating = false
                setTimeout(function () {
                    vue.setData()
                }, 100)
            },
            exportImg () {
                EchartsUtil.exportImg(this.chart.id, this.chart.name)
            },
            openChartEdit () {
                if (this.chart.largeChartType === LargeChartType.General.code) { // 普通报表
                    this.$router.push({
                        path: '/chart-design',
                        query: {
                            chartId: this.chart.id
                        }
                    })
                } else if (this.chart.largeChartType === LargeChartType.GpsMap.code) { // 经纬度地图

                } else if (this.chart.largeChartType === LargeChartType.External.code) { // 外部报表
                    this.showEditChartModal = true
                    this.externalReportForm = {
                        id: this.chartObj.id,
                        name: this.chartObj.name,
                        url: this.chartObj.url,
                        remark: this.chartObj.remark,
                        tagList: this.chartObj.tagList
                    }
                }
            },
            submitExternalReport (formData) {
                addOrUpdateExternalChart(formData).then(res => {
                    this.activeChartId = res.data
                    this.showEditChartModal = false
                    this.setChartObj(res.data)
                }).catch(this.$handleError)
            },
            setChartObj (chartId) {
                getChart({
                    id: chartId
                }).then(res => {
                    this.chartObj = res.data
                }).catch(this.$handleError)
            }
        },
        watch: {
            visibled () {
                this.setData()
            }
        },
        mounted () {
            this.handleMeta()
        }
    }
</script>

<style>
    .d-chart-container {
        width: 100%;
        height: 100%;
        padding: 8px 12px 20px 12px;
        box-sizing: border-box;
    }

    .d-chart-container .head {
        width: 100%;
        padding: 0px!important;
    }

    .d-chart-container .head,
    .d-chart-container .head .left,
    .d-chart-container .head .right {
        height: 32px!important;
        line-height: 32px!important;
    }

    .d-chart-container .head .left {
        float: left;
        max-width: 100%;
    }

    .d-chart-container .head .left .title {
        font-size: 16px;
    }

    .d-chart-container:hover .head .right {
        display: inline-flex;
    }

    .d-chart-container .head .right {
        position: absolute;
        right: 0px;
        background: #fff;
        display: none;
        padding-left: 10px;
    }

    .d-chart-container .head .right .more-btn:hover .d-chart-btn-more {
        display: block;
    }

    .d-chart-container .head .right .btn {
        position: relative;
        cursor: pointer;
        width: 20px;
    }

    .d-chart-container .head .right .btn > i {
        color: rgba(10,18,32,.64);
    }

    .d-chart-container .head .right .btn:hover > i {
        color: #409eff;
    }

    .d-chart-btn-more {
        display: none;
        position: absolute;
        right: -5px;
        top: 25px;
        white-space: nowrap;
        text-align: left;
    }

    .d-chart-container .content {
        width: 100%;
        height: calc(100% - 32px);
        cursor: default;
    }

    .d-chart-container .content > div {
        width: 100%;
        height: 100%;
    }

    .data-certified {
        color: #F5B50D!important;
    }

    .d-chart-container .head .right .filter-btn:hover > .d-chart-filter-panel {
        display: block;
    }

    .d-chart-filter-panel {
        position: absolute;
        display: none;
        background: #fff;
        z-index: 1000;
        box-shadow: 0 0 6px 0 rgba(0,0,0,.1), 0 10px 12px 0 rgba(170,182,206,.36);
        padding: 5px 0px 5px 10px;
    }

    .d-chart-external {
        border: 0px;
        width: 100%;
        height: 100%;
    }

    .d-chart-filter-tip .item {
        padding-right: 10px;
    }

    .d-chart-filter-tip .item .label {
        font-weight: 100;
        color: #ccc;
        padding-right: 5px;
    }

    .d-chart-filter-tip .item .value {
        font-weight: 100;
    }
</style>