<template>
    <DPageContent>
        <el-card v-show="!showDetail" shadow="never">
            <el-row class="d-row">
                <el-button type="info" :plain="readState !== messageReadStateObj.all.code" size="small" @click="changeMessageReadState(messageReadStateObj.all.code)">全部消息</el-button>
                <el-button type="info" :plain="readState !== messageReadStateObj.unread.code" size="small" @click="changeMessageReadState(messageReadStateObj.unread.code)">未读消息<span v-if="unReadCount > 0">({{unReadCount}})</span></el-button>
                <el-button type="info" :plain="readState !== messageReadStateObj.readed.code" size="small" @click="changeMessageReadState(messageReadStateObj.readed.code)">已读消息</el-button>
            </el-row>
            <el-row>
                <el-table
                        ref="msgTable"
                        :data="tableData.data"
                        height="480px"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="30">
                    </el-table-column>
                    <el-table-column
                            width="20">
                        <template slot-scope="scope">
                            <span class="d-unread-state" v-if="scope.row.isRead === 0">●</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="标题内容">
                        <template slot-scope="scope">
                            <a href="javascript:void(0)"
                               class="d-msg-title"
                               :class="[scope.row.isRead === 0 ? 'd-unread-msg' : 'd-read-msg']"
                               @click="setMsgDetail(scope.row.id)"><span>{{ scope.row.title }}</span></a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="提交时间"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="类型"
                            width="200">
                    </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                    <div style="float: left">
                        <el-checkbox style="margin-left: 14px" :disabled="!tableData.data.length" v-model="downCheckAll" @change="changeDownCheck"></el-checkbox>
                        <el-button :disabled="!selectMsgIdList.length" size="small" @click="delByIds">删除</el-button>
                        <el-button v-if="readState !== messageReadStateObj.readed.code" :disabled="!selectMsgIdList.length" size="small" @click="readedByIds">标记已读</el-button>
                        <el-button v-if="readState !== messageReadStateObj.readed.code" size="small" @click="readedAll">全部已读</el-button>
                        <el-button size="small" @click="delAll">全部删除</el-button>
                    </div>
                    <div style="float: right;">
                        <el-pagination
                                @current-change="changePageNo"
                                @size-change="changePageSize"
                                background
                                :current-page.sync="currentPage"
                                :page-sizes="[10, 20, 50, 100]"
                                :page-size.sync="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="tableData.total">
                        </el-pagination>
                    </div>
                </div>
            </el-row>
        </el-card>
        <el-card v-show="showDetail" shadow="never">
            <el-row class="d-row">
                <el-button size="small" icon="el-icon-back" @click="backToList">返回列表</el-button>
            </el-row>
            <el-row>
                <div class="d-msg-detail-top">
                    <h4>{{msgDetail.title}}</h4>
                    <div>{{msgDetail.createTime}}</div>
                </div>
                <div class="d-msg-detail-content" v-html="msgDetail.content"></div>
            </el-row>
        </el-card>
    </DPageContent>
</template>

<script>
    import {
        listMsg,
        getMsg,
        getUnReadCount,
        markReadedAll,
        markReadedByIds,
        deleteAll,
        deleteByIds
    } from '../../../services/message/onsite'
    const MessageReadState = {
        all: {
            code: -1,
            name: '全部消息'
        },
        unread: {
            code: 0,
            name: '未读消息'
        },
        readed: {
            code: 1,
            name: '已读消息'
        }
    }
    export default {
        name: 'DMessage',
        data () {
            return {
                messageReadStateObj: MessageReadState,
                readState: MessageReadState.all.code,
                currentPage: 1,
                pageSize: 10,
                tableData: {
                    total: 10,
                    data: []
                },
                selectMsgIdList: [],
                unReadCount: 0,
                downCheckAll: false,
                showDetail: false,
                msgDetail: {}
            }
        },
        methods: {
            changeMessageReadState (readState) {
                this.readState = readState
                this.setTableData()
            },
            handleSelectionChange (val) {
                this.selectMsgIdList = val.map(r => r.id)
                this.downCheckAll = val.length === this.tableData.data.length
            },
            changePageNo () {
                this.setTableData()
            },
            changePageSize () {
                this.setTableData()
            },
            setTableData () {
                this.downCheckAll = false
                listMsg({
                    isRead: this.readState,
                    pageSize: this.pageSize,
                    pageNo: this.currentPage
                }).then(res => {
                    this.tableData = res.data
                }).catch(this.$handleError)
            },
            setUnReadCount () {
                getUnReadCount().then(res => {
                    this.unReadCount = res.data
                }).catch(this.$handleError)
            },
            changeDownCheck () {
                if (this.downCheckAll) {
                    this.$refs.msgTable.toggleAllSelection()
                } else {
                    this.$refs.msgTable.clearSelection()
                }
            },
            readedAll () {
                markReadedAll().then(res => {
                    this.setTableData()
                    this.setUnReadCount()
                }).catch(this.$handleError)
            },
            readedByIds () {
                markReadedByIds({
                    idList: this.selectMsgIdList.toString()
                }).then(res => {
                    this.setTableData()
                    this.setUnReadCount()
                }).catch(this.$handleError)
            },
            delAll () {
                let vue = this
                let msg = '确认删除所有消息吗?'
                vue.$confirmInfo(msg, function () {
                    deleteAll().then(res => {
                        vue.setTableData()
                        vue.setUnReadCount()
                    }).catch(vue.$handleError)
                })
            },
            delByIds () {
                let vue = this
                let msg = '确认删除选中的<strong class="d-error">"' + vue.selectMsgIdList.length + '"</strong>条消息吗?'
                vue.$confirmInfo(msg, function () {
                    deleteByIds({
                        idList: vue.selectMsgIdList.toString()
                    }).then(res => {
                        vue.setTableData()
                        vue.setUnReadCount()
                    }).catch(vue.$handleError)
                })
            },
            setMsgDetail (id) {
                this.showDetail = true
                this.msgDetail = {}
                getMsg({
                    id: id
                }).then(res => {
                    this.msgDetail = res.data
                }).catch(this.$handleError)
            },
            backToList () {
                this.showDetail = false
                this.msgDetail = {}
                this.setTableData()
                this.setUnReadCount()
            },
            init () {
                if (this.$route.query.id) {
                    this.setMsgDetail(this.$route.query.id)
                } else {
                    this.showDetail = false
                    this.msgDetail = {}
                    this.setTableData()
                    this.setUnReadCount()
                }
            }
        },
        watch: {
           '$route.fullPath': function () {
               this.init()
           } 
        },
        mounted () {
            this.init()
        }
    }
</script>

<style>
    .d-unread-state {
        font-size: 16px;
        color: #428bca;
    }

    .d-unread-msg {
        color: #000;
    }

    .d-read-msg {
        color: #999;
    }

    .d-msg-title:hover {
        text-decoration: underline;
        color: #409EFF;
    }

    .d-msg-detail-top {
        text-align: center;
        line-height: 30px;
        margin-bottom: 20px;
        border-bottom: 1px solid #dcdfe6;
    }

    .d-msg-detail-top h4 {
        font-size: 18px;
    }
</style>