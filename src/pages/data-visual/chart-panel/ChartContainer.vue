<template>
    <div class="d-chart-container">
        <div class="head">
            <div class="left d-ellipsis">
                <span class="title" v-if="chartMeta.chartType !== 'INDEX_CARD' || !showChart">{{chart.name}}</span>
                <span style="margin-left: 10px;margin-right: 10px;">
                    <el-tooltip placement="bottom" effect="light">
                        <div slot="content" style="width: 300px; max-height: 400px;overflow: auto">
                            <el-row :gutter="24" style="margin: 0px">
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-detail">
                                            <h4>{{chart.isCertified === 1 ? '数据部门已认证,数据质量可靠' : '未经过数据部门认证'}}</h4>
                                        </div>
                                    </el-col>
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-term">标签</div>
                                        <div class="d-desclist-index-detail d-tag-group">
                                            <el-tag v-for="tag in chart.tagList" :key="tag.id" size="mini">{{tag.name}}</el-tag>
                                        </div>
                                    </el-col>
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-term">描述</div>
                                        <div class="d-desclist-index-detail">{{chart.remark}}</div>
                                    </el-col>
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-term">负责人</div>
                                        <div class="d-desclist-index-detail">{{chart.creatorCn}}({{chart.creator}})</div>
                                    </el-col>
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-term">负责部门</div>
                                        <div class="d-desclist-index-detail">{{chart.departmentName}}</div>
                                    </el-col>
                            </el-row>
                        </div>
                      <i class="fa fa-trophy grey-icon" :class="{'data-certified': chart.isCertified === 1}"></i>
                    </el-tooltip>
                </span>
                <span class="d-chart-filter-tip">
                    <span v-for="(item, index) in showLabelArr"
                          v-if="item.value !== '' && item.value !== '全部'"
                          :key="index"
                          class="item">
                        <span class="label">{{item.showName}}</span>
                        <span class="value">{{item.showLabel}}</span>
                    </span>
                </span>
            </div>

            <div class="right">
                <div v-if="chart.editAuth"
                     title="编辑报表"
                     class="btn">
                    <i class="fa fa-pencil"></i>
                </div>
                <div v-if="filterMeta.length" class="btn filter-btn">
                    <i class="fa fa-filter"></i>
                    <div class="d-chart-filter-panel">
                        <DFilterList :data="filterMeta" @inited="initedFilterList" @change="changeCondition"></DFilterList>
                    </div>
                </div>
                <div class="btn">
                    <i class="fa fa-line-chart"></i>
                </div>
                <div class="btn">
                    <i class="fa fa-sliders"></i>
                </div>
                <div class="btn more-btn">
                    <i class="fa fa-ellipsis-v"></i>
                    <ul class="d-chart-btn-more d-btn-list">
                        <li >导出EXCEL</li>
                        <li >导出图片</li>
                        <li >刷新数据</li>
                        <li v-if="chart.editAuth">复制图表</li>
                        <li v-if="chart.editAuth">移动图表</li>
                        <li >查看SQL</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="content d-box-middle">
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
        <DLoading :loading="loading"></DLoading>
    </div>
</template>

<script>
    import DChartFactory from '../chart-factory'
    import DFilterList from '../chart-filter/FilterList'
    import {queryData} from '../../../services/data-visual/chart'
    export default {
        name: 'DChartContainer',
        components: {DChartFactory, DFilterList},
        props: {
            chart: Object,
            globalFilterValue: String,
            resizeCount: { // resize标识
                type: Number,
                default: 0
            },
            visibled: Boolean // 是否可见过了
        },
        data () {
            return {
                chartMeta: {},
                filterMeta: [],
                data: [],
                showChart: false,
                tipMsg: '',
                loading: false,
                sortFieldKey: '',
                sortType: '',
                chartFilterValue: '',
                conditionValueArr: [], // 筛选项列表的值
                showLabelArr: [] // 筛选项列表值的显示
            }
        },
        methods: {
            handleMeta () {
                let meta = JSON.parse(this.chart.meta)
                this.chartMeta = meta.chartMeta
                this.filterMeta = meta.filterMeta ? meta.filterMeta : []
            },
            sortData (key, sortType) {
                this.sortFieldKey = key
                this.sortType = sortType
                this.setData()
            },
            setData () {
                if (!this.visibled) {
                    return
                }
                this.loading = true
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
                this.showLabelArr = showLabelArr
            },
            changeCondition (conditionValueArr, showLabelArr) {
                this.conditionValueArr = conditionValueArr
                this.showLabelArr = showLabelArr
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
</style>