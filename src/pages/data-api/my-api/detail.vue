<template>
    <DPageContent>
        <el-row class="d-row">
            <DPageHeader :title="api.name" hasBack></DPageHeader>
        </el-row>
        <el-row>
            <el-col class="d-col" :span="8">
                <el-card shadow="never">
                    <div slot="header">
                        <span class="d-card-title">基础信息</span>
                    </div>
                    <DDetail :data="api" :columns="detailColumns" :col="1"></DDetail>
                </el-card>
            </el-col>
            <el-col class="d-col" :span="16">
                <el-row class="d-row">
                    <el-card shadow="never">
                        <div slot="header">
                            <span class="d-card-title">调用趋势</span>
                        </div>
                        <el-row class="d-row">
                            <div style="float: left">
                                <el-radio-group v-model="timePeriodValue" size="mini" @change="setSumChartData">
                                    <el-radio-button v-for="item in timePeriodList" :label="item.code" :key="item.code">{{item.name}}</el-radio-button>
                                </el-radio-group>
                            </div>
                            <div style="float: right">
                                <el-radio-group v-model="timeFreqValue" size="mini" @change="setSumChartData">
                                    <el-radio-button v-for="item in timeFreqList" :label="item.code" :key="item.code">{{item.name}}</el-radio-button>
                                </el-radio-group>
                            </div>
                        </el-row>
                        <el-row class="d-row">
                            <div class="d-call-chart d-box-middle">
                                <DChartFactory v-if="sumChartData.length" :meta="chartMeta" :data="sumChartData" id="sumCall"></DChartFactory>
                                <div v-else class="d-no-data-tip">
                                    暂无API调用数据
                                </div>
                            </div>
                        </el-row>
                    </el-card>
                </el-row>
                <el-row class="d-row">
                    <el-card shadow="never">
                        <div slot="header">
                            <span class="d-card-title">已授权的应用列表</span>
                        </div>
                        <el-table :data="api.appList">
                            <el-table-column
                                    type="index"
                                    label="序号"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="应用名称">
                            </el-table-column>
                            <el-table-column
                                    prop="callCnt7"
                                    label="近7天调用次数"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="100">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini" @click="openAppChart(scope.row)">调用趋势</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-row>
            </el-col>
        </el-row>
        <el-dialog :title="'应用[ ' + app.name + ' ]的调用趋势'"
                   :visible.sync="showAppChartModal">
            <el-row class="d-row">
                <div style="float: left">
                    <el-radio-group v-model="appTimePeriodValue" size="mini" @change="setAppChartData">
                        <el-radio-button v-for="item in timePeriodList" :label="item.code" :key="item.code">{{item.name}}</el-radio-button>
                    </el-radio-group>
                </div>
                <div style="float: right">
                    <el-radio-group v-model="appTimeFreqValue" size="mini" @change="setAppChartData">
                        <el-radio-button v-for="item in timeFreqList" :label="item.code" :key="item.code">{{item.name}}</el-radio-button>
                    </el-radio-group>
                </div>
            </el-row>
            <el-row class="d-row">
                <div class="d-call-chart d-box-middle">
                    <DChartFactory v-if="appChartData.length" :meta="chartMeta" :data="appChartData" id="appCall"></DChartFactory>
                    <div v-else class="d-no-data-tip">
                        暂无API调用数据
                    </div>
                </div>
            </el-row>
        </el-dialog>
    </DPageContent>
</template>

<script>
    import {
        getDevApi,
        listApiCallTrendData
    } from '../../../services/data-api/api-dev'
    import DChartFactory from '../../data-visual/chart-factory'
    import DateUtils from '../../../utils/dateUtils'
    export default {
        name: 'DApiDevDetail',
        components: {DChartFactory},
        data () {
            return {
                apiId: this.$route.params.id,
                api: {},
                detailColumns: [
                    {key: 'id', title: 'API ID'},
                    {key: 'name', title: '名称'},
                    {key: 'releaseCnt', title: '发布次数'},
                    {key: 'callCnt7', title: '近7天调用次数'},
                    {key: 'remark', title: '描述'},
                    {key: 'creator', title: '创建人'},
                    {key: 'createTime', title: '创建时间'},
                    {key: 'updator', title: '最后修改人'},
                    {key: 'updateTime', title: '最后修改时间'}
                ],
                timePeriodValue: 7,
                timePeriodList: [
                    {code: 7, name: '近一周'},
                    {code: 30, name: '近一月'},
                    {code: 180, name: '近半年'}
                ],
                timeFreqValue: 'DAY',
                timeFreqList: [
                    {code: 'HOUR', name: '小时'},
                    {code: 'DAY', name: '日'},
                    {code: 'WEEK', name: '周'}
                ],
                chartMeta: {
                    chartType: 'LINE_BAR',
                    columns: [
                        {
                            key: 'dt', //
                            name: '日期', // 指标/维度显示名称
                            showType: 'text', // 显示类型
                            dataType: 'date', // 数据类型
                            dim: true // 是否是维度
                        },
                        {
                            key: 'callCnt',
                            name: '调用次数',
                            showType: 'num',
                            unit: '',
                            type: 'line',
                            dim: false
                        }
                    ], // 字段列表
                    area: true // 面积图
                },
                sumChartData: [],
                appChartData: [],
                showAppChartModal: false,
                app: {},
                appTimePeriodValue: 7,
                appTimeFreqValue: 'DAY'
            }
        },
        methods: {
            setApi () {
                getDevApi({
                    id: this.apiId
                }).then(res => {
                    this.api = res.data
                }).catch(this.$handleError)
                this.setSumChartData()
            },
            setSumChartData () {
                let today = DateUtils.formatDate(new Date(), 'yyyyMMdd')
                listApiCallTrendData({
                    startDate: DateUtils.addDate(today, 0 - this.timePeriodValue, 'yyyyMMdd'),
                    endDate: today,
                    timeFreq: this.timeFreqValue,
                    apiId: this.apiId
                }).then(res => {
                    this.sumChartData = res.data
                }).catch(this.$handleError)
            },
            openAppChart (app) {
                this.app = app
                this.showAppChartModal = true
                this.appTimeFreqValue = 'DAY'
                this.appTimePeriodValue = 7
                this.setAppChartData()
            },
            setAppChartData () {
                let today = DateUtils.formatDate(new Date(), 'yyyyMMdd')
                listApiCallTrendData({
                    startDate: DateUtils.addDate(today, 0 - this.appTimePeriodValue, 'yyyyMMdd'),
                    endDate: today,
                    timeFreq: this.appTimeFreqValue,
                    apiId: this.apiId,
                    appId: this.app.id
                }).then(res => {
                    this.appChartData = res.data
                }).catch(this.$handleError)
            }
        },
        mounted () {
            this.setApi()
        }
    }
</script>

<style>
    .d-call-chart {
        width: 100%;
        height: 250px;
    }
</style>