<template>
    <div class="d-work-table">
        <div class="table">
            <div class="module-title">
                工作表
            </div>
            <div class="table-name-panel">
                <div class="table-name d-ellipsis" 
                     :title="tbInfo.tbNameCn" 
                     @click="openPreviewTable">{{tbInfo.tbNameCn}}</div>
                <div class="exchange-table" 
                     title="切换工作表"
                     @click="openExchangeTable">
                    <i class="fa fa-exchange"></i>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="head">
                <div class="module-title">
                    字段
                </div>
                <div class="col-btn">
                    <i class="el-icon-plus"></i>
                    <ul class="d-btn-list">
                        <li >添加计算字段</li>
                    </ul>
                </div>
            </div>
            <div class="search">
                <el-input
                        size="mini"
                        clearable
                        placeholder="搜索字段"
                        suffix-icon="el-icon-search"
                        class="d-visual-input"
                        v-model.trim="colKeyword">
                </el-input>
            </div>
            <ul class="col-list">
                <li v-for="col in searchedColList" :key="col.colName">
                    <div class="col-item"
                         :title="col.colName"
                         @click="toggleShowTimeFreq(col)"
                         draggable="true"
                         @dragstart="dragColStart($event, col)"
                         @dragover="allowDrop($event)">
                        <!--<div class="pre-angle">-->
                            <!--<i v-if="col.dataType === dataTypeObj.date.code" class="fa" :class="[col.showTimeFreq ? 'fa-angle-down' : 'fa-angle-right']"></i>-->
                        <!--</div>-->
                        <div class="pre-icon">
                            <i class="fa" :class="'fa-' + dataTypeObj[col.dataType].icon"></i>
                        </div>
                        <div class="col-label d-ellipsis">
                            {{col.colLabel}}
                        </div>
                    </div>
                    <!--<ul v-if="col.dataType === dataTypeObj.date.code" v-show="col.showTimeFreq" class="time-freq-list">-->
                        <!--<li v-for="(item, index) in timeFreqList"-->
                            <!--:key="index"-->
                            <!--class="time-freq-item"-->
                            <!--draggable="true">-->
                            <!--<span>{{item.name}}</span>-->
                        <!--</li>-->
                    <!--</ul>-->
                </li>
                <li v-for="(col, index) in searchedLogicColList" :key="index">
                    <div class="col-item"
                         :title="col.colName"
                         draggable="true"
                         @dragstart="dragColStart($event, col)"
                         @dragover="allowDrop($event)">
                        <div class="pre-icon new-col">
                            <i class="fa" :class="'fa-' + dataTypeObj[col.dataType].icon"></i>
                        </div>
                        <div class="col-label d-ellipsis">
                            {{col.colLabel}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <DLoading :loading="loading"></DLoading>
        <el-dialog
                :visible.sync="showPreviewModal"
                title="预览数据"
                top="30px"
                width="70%">
            <DPreviewTable v-if="showPreviewModal" :tbId="this.currentTbId"></DPreviewTable>
        </el-dialog>
        <el-dialog
                :visible.sync="showExchangeModal"
                title="切换工作表"
                top="30px"
                width="360px">
            <DWorkTableSelect v-if="showExchanged" @select="exchangeTable"></DWorkTableSelect>
        </el-dialog>
    </div>
</template>

<script>
    import {getTb} from '../../../services/data-map/tb-manage'
    import {
        DataType
    } from '../../../services/data-map/col-manage'
    import DPreviewTable from '../../data-map/tb-manage/PreviewTable'
    import DWorkTableSelect from '../dashboard/workTableSelect'
    import {TimeFreq} from '../constants'
    export default {
        name: 'DWorkTable',
        components: {DPreviewTable, DWorkTableSelect},
        props: {
            tbId: [String,Number]
        },
        data () {
            return {
                loading: false,
                currentTbId: this.tbId,
                timeFreqList: Object.values(TimeFreq),
                dataTypeObj: DataType,
                showPreviewModal: false, // 显示预览数据弹窗
                showPreviewed: false, // 是否点击过预览数据
                showExchangeModal: false, // 显示切换工作表弹窗
                showExchanged: false, // 是否点击过切换工作表
                tbInfo: {}, // 工作表信息
                logicColList: [], // 工作表的全局逻辑字段数据
                searchedColList: [], // 搜索到的原始字段
                searchedLogicColList: [], // 搜索到的逻辑字段
                colKeyword: '' // 搜索字段的关键词
            }
        },
        methods: {
            initData () {
                this.setTbInfo()
                this.setTbLogicCol()
            },
            setTbInfo () {
                this.loading = true
                getTb({
                    id: this.currentTbId
                }).then(res => {
                    this.tbInfo = res.data
                    this.updateWorkTableStore()
                    this.loading = false
                    this.searchColList()
                }).catch(this.$handleError)
            },
            updateWorkTableStore () {
                this.$store.commit('GeneralChart/updateWorkTable', this.tbInfo)
            },
            setTbLogicCol () {
                this.logicColList = [
                    {
                        colId: 1,
                        colName: 'newcol',
                        colLabel: '北京订单金额',
                        dataType: DataType.num.code,
                        formula: 'sum(col_2)',
                        formulaShow: 'sum([订单金额])',
                        isNewCol: true
                    }
                ]
                this.searchLogicColList()
            },
            searchColList () {
                if (this.colKeyword === '') {
                    this.searchedColList = this.tbInfo.colList
                } else {
                    this.searchedColList = this.tbInfo.colList.filter(c => c.colName.includes(this.colKeyword.toLowerCase()) || c.colLabel.includes(this.colKeyword))
                }
            },
            searchLogicColList () {
                if (this.colKeyword === '') {
                    this.searchedLogicColList = this.logicColList
                } else {
                    this.searchedLogicColList = this.logicColList.filter(c => c.colName.includes(this.colKeyword.toLowerCase()) || c.colLabel.includes(this.colKeyword))
                }
            },
            openPreviewTable () {
                this.showPreviewModal = true
                this.showPreviewed = true
            },
            openExchangeTable () {
                this.showExchangeModal = true
                this.showExchanged = true
            },
            exchangeTable (table) {
                this.showExchangeModal = false
                this.currentTbId = table.id
            },
            toggleShowTimeFreq (col) {
                if (col.dataType === DataType.date.code) {
                    col.showTimeFreq = !col.showTimeFreq
                    this.$forceUpdate()
                }
            },
            allowDrop (e) {
                e.preventDefault()
            },
            dragColStart (e, col) {
                e.dataTransfer.setData('dragingCol', JSON.stringify(col))
            }
        },
        watch: {
            tbId () {
                this.currentTbId = this.tbId
            },
            currentTbId () {
                if (this.currentTbId) {
                    this.initData()
                }
            },
            colKeyword () {
                this.searchColList()
                this.searchLogicColList()
            }
        }
    }
</script>

<style>
    .d-work-table {
        width: 100%;
        height: 100%;
    }
    .d-work-table .table {
        padding-top: 10px;
    }

    .d-work-table .table .table-name-panel {
        height: 32px;
        line-height: 32px;
        padding-left: 25px;
        cursor: pointer;
        display: flex;
    }

    .d-work-table .table .table-name-panel:hover {
        background: #fff;
    }

    .d-work-table .table .table-name-panel .table-name {
        flex-grow: 1;
    }
    .d-work-table .table .table-name-panel .exchange-table {
        width: 30px;
        text-align: center;
    }

    .d-work-table .table .table-name-panel .exchange-table:hover {
        color: #3a8ee6;
    }

    .d-work-table .column {
        height: calc(100% - 74px);
    }

    .d-work-table .column .head {
        display: flex;
        height: 32px;
        line-height: 32px;
    }

    .d-work-table .column .head .module-title {
        flex-grow: 1;
    }

    .d-work-table .column .head .col-btn {
        width: 30px;
        cursor: pointer;
        text-align: center;
        position: relative;
    }

    .d-work-table .column .head .col-btn:hover i {
        color: #3a8ee6;
    }

    .d-work-table .column .head .col-btn:hover .d-btn-list {
        display: block;
    }

    .d-work-table .column .head .col-btn .d-btn-list {
        position: absolute;
        background: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        white-space: nowrap;
        text-align: left;
        z-index: 100;
        display: none;
        right: -20px;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .d-work-table .column .head .col-btn .d-btn-list li {
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        padding-top: 0px;
        padding-bottom: 0px;
    }

    .d-work-table .column .head .col-btn .d-btn-list li:hover {
        background: #f5f7fa;
    }

    .d-work-table .column .search {
        padding-left: 10px;
        padding-right: 10px;
    }

    .d-work-table .column .col-list {
        height: calc(100% - 60px);
        overflow: auto;
    }

    .d-work-table .column .col-list li {
        padding: 0px;
    }

    .d-work-table .column .col-list .col-item {
        cursor: pointer;
        box-sizing: border-box;
        width: 100%;
        height: 32px;
        line-height: 32px;
        display: flex;
        padding-left: 10px;
        padding-right: 10px;
    }

    .d-work-table .column .col-list .time-freq-list .time-freq-item:hover,
    .d-work-table .column .col-list .col-item:hover {
        background: #f5f7fa;
        color: #3a8ee6;
    }

    .d-work-table .column .col-list .col-item .pre-angle {
        width: 12px;
    }

    .d-work-table .column .col-list .col-item .pre-icon {
        width: 18px;
        color: #3a8ee6;
    }

    .d-work-table .column .col-list .col-item .new-col {
        color: #e4b117!important;
    }

    .d-work-table .column .col-list .col-item .col-label {
        flex-grow: 1;
    }

    .d-work-table .column .col-list .time-freq-list {
        width: 100%;
    }

    .d-work-table .column .col-list .time-freq-list .time-freq-item {
        height: 32px;
        line-height: 32px;
        cursor: pointer;
        padding-left: 40px;
    }
</style>