<template>
    <div class="d-dash-container">
        <div class="head">
            <h2 class="title">{{dash.name}}</h2>
            <div class="btn">
                <el-button v-if="dash.editAuth"
                           type="text"
                           size="mini"
                           @click="openAddChart">
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
            <el-tabs v-if="hasTab" v-model="activeTabId">
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
        <el-dialog
                :visible.sync="showAddChartModal"
                title="添加图表"
                width="360px">
            <el-row class="d-row">
                选择图表类型
            </el-row>
            <el-row class="d-box-middle d-row">
                <el-radio-group v-model="largeChartType">
                    <el-radio v-for="(item, index) in largeChartTypeList" :label="item.code" :key="item.code">{{item.name}}</el-radio>
                </el-radio-group>
            </el-row>
            <div v-if="largeChartType === 3">
                <el-form label-position="top"
                         label-width="80px"
                         :model="externalReportForm"
                         :rules="externalReportFormRules"
                         ref="externalReportForm"
                         size="mini">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="externalReportForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="URL" prop="url">
                        <el-input v-model="externalReportForm.url"></el-input>
                    </el-form-item>
                    <el-form-item label="标签">
                        <el-tag
                                v-for="(tag,index) in externalReportForm.tagList"
                                :key="index"
                                closable
                                :disable-transitions="false"
                                size="small"
                                @close="delExternalReportTag(index)">
                            {{tag}}
                        </el-tag>
                        <el-input
                                class="d-tag-input"
                                v-if="externalReportTagInputVisible"
                                v-model.trim="externalReportTagInputValue"
                                ref="saveExternalReportTagInput"
                                @keyup.enter.native="saveExternalReportTagConfirm"
                                @blur="saveExternalReportTagConfirm"
                        >
                        </el-input>
                        <el-button v-else size="mini" @click="showExternalReportTagInput" class="d-tag-input-btn">+ 添加标签</el-button>
                    </el-form-item>
                    <el-form-item label="描述" prop="remark">
                        <el-input v-model="externalReportForm.remark" type="textarea" :rows="3"></el-input>
                    </el-form-item>
                </el-form>
<!--                <el-row class="d-row">-->
<!--                    外部报表URL-->
<!--                </el-row>-->
<!--                <el-row class="d-row">-->
<!--                    <el-input-->
<!--                            size="mini"-->
<!--                            clearable-->
<!--                            placeholder="请输入外部报表URL"-->
<!--                            v-model.trim="externalReportUrl">-->
<!--                    </el-input>-->
<!--                </el-row>-->
<!--                <el-row class="d-row">-->
<!--                    报表名称-->
<!--                </el-row>-->
<!--                <el-row class="d-row">-->
<!--                    <el-input-->
<!--                            size="mini"-->
<!--                            clearable-->
<!--                            placeholder="请输入报表名称"-->
<!--                            v-model.trim="externalReportUrl">-->
<!--                    </el-input>-->
<!--                </el-row>-->
                <DSubmitCancel slot="footer" nohr @submit="submitExternalReport" @cancel="showAddChartModal = false" size="mini">
                </DSubmitCancel>
            </div>
            <div v-else>
                <el-row class="d-row">
                    选择工作表
                </el-row>
                <el-row class="d-row">
                    <el-input
                            size="mini"
                            clearable
                            placeholder="搜索工作表"
                            suffix-icon="el-icon-search"
                            v-model.trim="tableKeyWord"
                            @change="searchTable">
                    </el-input>
                </el-row>
                <el-row class="d-row">
                    <div class="d-tb-panel">
                        <ul class="d-tb-list">
                            <li v-for="(item, index) in searchedTableList" :key="index" class="d-tb-item">
                                <h4 class="d-tb-title d-ellipsis" :title="item.dbName + '.' + item.tbName">{{item.dbName}}.{{item.tbName}}</h4>
                                <div class="d-tb-desc d-ellipsis" :title="item.tbNameCn">{{item.tbNameCn}}</div>
                            </li>
                        </ul>
                    </div>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getDashMetaForShow
    } from '../../../services/data-visual/dashboard'
    import {
        listMyTbOwn
    } from '../../../services/data-map/tb-manage'
    import DChartList from '../chart-panel/ChartList.vue'
    import {LargeChartType} from '../constants'
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
                hasTab: false, // 是否有页签
                chartList: [], // 仪表盘没分tab, 仪表盘内展现的图表
                tabList: [], // 仪表盘分了tab, 仪表盘的所有tab及tab下的图表
                chartMargin: 4, // 图表之间的间隔
                containerWidth: 980, // 图表列表容器的实际宽度
                minContainerWidth: 980, // 图表列表容器的最小宽度
                showAddChartModal: false, // 显示添加图表的弹框
                largeChartType: LargeChartType.General.code, // 图表大分类
                largeChartTypeList: Object.values(LargeChartType), // 图表大分类列表
                tableKeyWord: '', // 工作表搜索关键词
                searchedTableList: [], // 搜索到的工作表结果
                externalReportUrl: '', //外部报表url
                externalReportForm: {
                    url: '',
                    name: '',
                    tagList: [],
                    remark: ''
                },
                externalReportFormRules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { max: 50, message: '长度最大50个字符', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '请输入URL', trigger: 'blur' },
                        { type: 'url', message: '请输入正确的URL', trigger: 'blur' }
                    ],
                    remark: [
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ]
                },
                externalReportTagInputValue: '',
                externalReportTagInputVisible: false
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
            openAddChart () {
                this.showAddChartModal = true
                this.searchTable()
            },
            searchTable () {
                listMyTbOwn({
                    tbName: this.tableKeyWord,
                    pageNo: 1,
                    pageSize: 15
                }).then(res => {
                    this.searchedTableList = res.data.data
                }).catch(this.$handleError)
            },
            submitExternalReport () {

            },
            showExternalReportTagInput () {
                this.externalReportTagInputVisible = true
                this.$nextTick(_ => {
                    this.$refs.saveExternalReportTagInput.$refs.input.focus();
                })
            },
            saveExternalReportTagConfirm () {
                let inputValue = this.externalReportTagInputValue
                let success = true
                if (inputValue) {
                    if (inputValue.length > 50) {
                        this.$messageWarn('标签长度最大50个字符!')
                        success = false
                    } else if (this.externalReportForm.tagList.includes(inputValue)) {
                        this.$messageWarn('标签已存在!')
                        success = false
                    } else {
                        this.externalReportForm.tagList.push(inputValue)
                    }
                }
                if (success) {
                    this.externalReportTagInputVisible = false
                    this.externalReportTagInputValue = ''
                }
            },
            delExternalReportTag (index) {
                this.externalReportForm.tagList.splice(index, 1)
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

    .d-dash-container > .filter {
        height: 30px;
        padding-left: 15px;
        padding-right: 15px;
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

    .d-tb-panel {
        height: 200px;
        width: 100%;
        overflow: auto;
    }

    .d-tb-item {
        cursor: pointer;
    }

    .d-tb-item:hover {
        background: #f5f7fa;
    }

    .d-tb-title {
        margin-bottom: 4px;
        color: rgba(0,0,0,.65);
        font-size: 12px;
        line-height: 16px;
    }

    .d-tb-desc {
        color: rgba(0,0,0,.45);
        font-size: 12px;
        line-height: 16px;
    }
</style>