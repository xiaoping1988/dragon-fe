<template>
    <DPageContent>
        <el-row class="d-row">
            <el-card shadow="never">
                <h1 style="margin-bottom: 10px">
                    <!--<i class="fa fa-table d-icon"></i>-->
                    {{tb.dbName}}.{{tb.tbName}}
                </h1>
                <el-button v-if="!tb.hasAuth" type="primary" plain size="small">申请权限</el-button>
            </el-card>
        </el-row>
        <el-row>
            <el-col class="d-col" :span="6">
                <el-card header="基础信息" shadow="never">
                    <el-row class="d-row">
                        <el-col :span="12" class="d-detail-count" style="border-right: 0px">
                            读取
                            <span>{{tb.readCount}}</span>
                            次
                        </el-col>
                    </el-row>
                    <DDetail :data="tb" :columns="detailColumns" :col="1"></DDetail>
                    <div class="d-desclist-index">
                        <div class="d-desclist-index-term">标签</div>
                        <div class="d-desclist-index-detail d-tag-group">
                            <el-tag size="mini" effect="plain" :closable="tb.hasAuth" v-for="item in tb.tagList" :key="item.id">{{item.name}}</el-tag>
                            <i v-if="tb.hasAuth" class="el-icon-circle-plus-outline d-icon" title="新增标签"></i>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col class="d-col" :span="18">
                <el-card shadow="never">
                    <el-tabs v-model="activeTab" type="card" @tab-click="clickTab" style="width: 100%">
                        <el-tab-pane label="字段信息" name="column">
                            <el-table :data="tb.colList">
                                <el-table-column
                                        type="index"
                                        label="序号"
                                        width="50">
                                </el-table-column>
                                <el-table-column
                                        prop="colName"
                                        label="字段名"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="colLabel"
                                        label="中文名"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="dataType"
                                        label="数据类型"
                                        width="200">
                                    <template slot-scope="scope">
                                        <i class="d-icon fa" :class="'fa-' + dataTypeObj[scope.row.dataType].icon"></i><span>{{ dataTypeObj[scope.row.dataType].name }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="originalDataType"
                                        label="原始类型"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="colComment"
                                        label="描述">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="预览数据" name="preivewData">
                            <div v-if="!tb.hasAuth" class="d-no-data-tip">
                                暂无权限查看数据,可点击左上角按钮申请权限
                            </div>
                            <div v-else-if="previewData">
                                <div class="head">
                                    显示最新
                                    <span class="d-strong-count">{{previewData.data.length}}</span>
                                    条数据
                                </div>
                                <el-table :data="previewData.data"
                                          height="500" width="100%">
                                    <el-table-column
                                            v-for="col in previewData.colList"
                                            :key="col.colName"
                                            :prop="col.colName"
                                            :label="col.colLabel"
                                            :width="col.colLabel.length > 10 ? col.colLabel.length * 16 + 20 : 150">
                                        <template slot="header" slot-scope="scope">
                                            <i class="d-icon fa" :class="'fa-' + dataTypeObj[colObj[scope.column.property].dataType].icon"></i><span>{{ scope.column.label }}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="应用追溯" name="app">

                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </DPageContent>
</template>

<script>
    import {
        getTb,
        previewTbData
    } from '../../../services/data-map/tb-manage'
    import {
        DataType
    } from '../../../services/data-map/col-manage'
    export default {
        name: 'DTbDetail',
        data () {
            return {
                tb: {},
                dataTypeObj: DataType,
                detailColumns: [
                    {key: 'tbName', title: '名称'},
                    {key: 'dbName', title: '数据库归属'},
                    {key: 'dsName', title: '数据源归属'},
                    {key: 'lastDataModifiedTime', title: '最后数据更新时间'},
                    {key: 'remark', title: '描述'},
                    {key: 'queryEngineTypeList', title: '支持引擎类型'},
                ],
                activeTab: 'column',
                previewData: null,
                colObj: {}
            }
        },
        methods: {
            setTb () {
                getTb({
                    id: this.$route.params.id
                }).then(res => {
                    this.tb = res.data
                }).catch(this.$handleError)
            },
            clickTab (tab, event) {
                if (tab.paneName === 'preivewData') {
                    this.setPreviewData()
                }
            },
            setPreviewData () {
                if (this.tb.hasAuth && !this.previewData) {
                    previewTbData({
                        id: this.$route.params.id
                    }).then(res => {
                        this.previewData = res.data
                        this.previewData.colList.forEach(c => {
                            this.colObj[c.colName] = c
                        })
                    }).catch(this.$handleError)
                }
            }
        },
        mounted () {
            this.setTb()
        }
    }
</script>