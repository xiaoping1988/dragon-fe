<template>
    <div class="api-guide-dev">
        <el-row class="d-row">
            <DPageHeader title="API开发" hasBack backPath="/data-api/my-api">
                <div slot="right">
                    <el-button size="mini" type="text">测试</el-button>
                    <el-button size="mini" type="text">发布</el-button>
                    <el-button size="mini" type="text">保存</el-button>
                    <el-button size="mini" type="text">刷新</el-button>
                    <el-button size="mini" type="text">版本</el-button>
                </div>
            </DPageHeader>
        </el-row>
        <div class="api-guide-dev-container">
            <div class="main-dev">
                <el-row id="basic" class="d-row">
                    <el-card shadow="never">
                        <div slot="header">
                            <span class="d-card-title">基本信息</span>
                        </div>
                        <el-form :model="basicForm"
                                 :rules="basicFormRule"
                                 size="mini"
                                 ref="basicForm"
                                 label-width="80px">
                            <el-form-item label="API名称" prop="name">
                                <el-input v-model.trim="basicForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="API描述" prop="remark">
                                <el-input type="textarea" rows="4" v-model.trim="basicForm.remark"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-row>
                <el-row id="table" class="d-row">
                    <el-card shadow="never">
                        <div slot="header">
                            <span class="d-card-title">数据表</span>
                        </div>
                        <el-form :model="dsForm"
                                 :rules="dsFormRule"
                                 size="mini"
                                 ref="dsForm"
                                 label-width="100px"
                                 inline>
                            <el-form-item label="数据源类型" prop="dbType">
                                <el-select v-model="dsForm.dbType"
                                           style="width: 300px"
                                           filterable
                                           @change="changeDbType">
                                    <el-option v-for="item in dbTypeList" :key="item.code" :value="item.code" :label="item.name"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据源名称" prop="dbId">
                                <el-select v-model="dsForm.dbId"
                                           style="width: 300px"
                                           filterable
                                           @change="changeDb">
                                    <el-option v-for="db in dbList" :key="db.id" :value="db.id" :label="db.dbName"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据表名称" prop="tbId">
                                <el-select v-model="dsForm.tbId"
                                           style="width: 300px"
                                           filterable
                                           remote
                                           placeholder="请输入关键词"
                                           :remote-method="searchTb"
                                           :loading="searchTbLoading">
                                    <el-option v-for="tb in tbList" :key="tb.id" :value="tb.id" :label="tb.tbName"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-row>
                <el-row id="requestParam" class="d-row">
                    <el-card shadow="never">
                        <div slot="header">
                            <span class="d-card-title">请求参数</span>
                            <div style="float: right;">
                                <el-button class="d-card-btn" type="text">
                                    添加参数
                                </el-button>
                            </div>
                        </div>
                        <el-table
                                border
                                :data="requestParamData">
                            <el-table-column
                                    prop="paramName"
                                    label="参数名称">
                            </el-table-column>
                            <el-table-column
                                    prop="colName"
                                    label="绑定字段">
                            </el-table-column>
                            <el-table-column
                                    prop="dataType"
                                    label="参数类型">
                            </el-table-column>
                            <el-table-column
                                    prop="operType"
                                    label="操作符">
                            </el-table-column>
                            <el-table-column
                                    prop="sqlFunc"
                                    label="函数">
                            </el-table-column>
                            <el-table-column
                                    prop="isRequired"
                                    label="是否必填">
                            </el-table-column>
                            <el-table-column
                                    prop="exampleValue"
                                    label="示例值">
                            </el-table-column>
                            <el-table-column
                                    prop="defaultValue"
                                    label="默认值">
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    label="描述">
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="80">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini" @click="deleteApi(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-row>
                <el-row id="responseParam" class="d-row">
                    <el-card shadow="never">
                        <div slot="header">
                            <span class="d-card-title">返回参数</span>
                            <div style="float: right;">
                                <el-button class="d-card-btn" type="text">
                                    添加参数
                                </el-button>
                            </div>
                        </div>
                        <el-table
                                border
                                :data="responseParamData">
                            <el-table-column
                                    prop="paramName"
                                    label="参数名称">
                            </el-table-column>
                            <el-table-column
                                    prop="colName"
                                    label="绑定字段">
                            </el-table-column>
                            <el-table-column
                                    prop="dataType"
                                    label="参数类型">
                            </el-table-column>
                            <el-table-column
                                    prop="sqlFunc"
                                    label="函数">
                            </el-table-column>
                            <el-table-column
                                    prop="exampleValue"
                                    label="示例值">
                            </el-table-column>
                            <el-table-column
                                    prop="orderType"
                                    label="排序">
                            </el-table-column>
                            <el-table-column
                                    prop="orderPriority"
                                    label="排序优先级">
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    label="描述">
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="80">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini" @click="deleteApi(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-row>
            </div>
            <ul class="right-nav">
                <li>
                    <a href="#basic">基本信息</a>
                </li>
                <li>
                    <a href="#table">数据表</a>
                </li>
                <li>
                    <a href="#requestParam">请求参数</a>
                </li>
                <li>
                    <a href="#responseParam">返回参数</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
        DbType
    } from '../../../services/data-map/ds-manage'
    import {
        listUserOwnDbByType
    } from '../../../services/data-map/db-manage'
    import {
        listMyTbOwn
    } from '../../../services/data-map/tb-manage'
    export default {
        name: 'DGuideDev',
        data () {
            return {
                basicForm: {
                    id: '',
                    name: '',
                    remark: ''
                },
                basicFormRule: {
                    name: [
                        { required: true, message: '请输入API名称', trigger: 'blur' }
                    ],
                    remark: [
                        { required: true, message: '请输入API描述', trigger: 'blur' }
                    ]
                },
                dbTypeList: Object.values(DbType),
                dsForm: {
                    dbType: '',
                    dbId: '',
                    tbId: ''
                },
                dbList: [],
                tbList: [],
                searchTbLoading: false,
                dsFormRule: {
                    dbType: [
                        { required: true, message: '请选择数据源类型', trigger: 'change' }
                    ],
                    dbId: [
                        { required: true, message: '请选择数据源', trigger: 'change' }
                    ],
                    tbId: [
                        { required: true, message: '请选择数据表', trigger: 'change' }
                    ]
                },
                requestParamData: [],
                responseParamData: []
            }
        },
        methods: {
            changeDbType () {
                this.setDbList()
            },
            setDbList () {
                this.dbList = []
                this.dsForm.dbId = ''
                this.tbList = []
                this.dsForm.tbId = ''
                listUserOwnDbByType({
                    dbType: this.dsForm.dbType
                }).then(res => {
                    this.dbList = res.data
                }).catch(this.$handleError)
            },
            changeDb () {
                this.setTbList()
            },
            setTbList (tbNameKey) {
                this.tbList = []
                this.dsForm.tbId = ''
                this.searchTbLoading = true
                listMyTbOwn({
                    dbId: this.dsForm.dbId,
                    tbName: tbNameKey,
                    pageNo: 1,
                    pageSize: 15
                }).then(res => {
                    this.tbList = res.data.data
                    this.searchTbLoading = false
                }).catch(error => {
                    this.$handleError(error)
                    this.searchTbLoading = false
                })
            },
            searchTb (tbNameKey) {
                this.setTbList(tbNameKey)
            }
        }
    }
</script>

<style>
    .api-guide-dev {
        width: 100%;
        height: 100%;
        background: #f0f2f5;
    }

    .api-guide-dev-container {
        width: 100%;
        height: calc(100% - 70px);
        display: flex;
    }

    .api-guide-dev-container .right-nav {
        width: 36px;
        line-height: 36px;
        height: 100%;
    }

    .api-guide-dev-container .right-nav li {
        width: 100%;
        writing-mode: vertical-rl;
        padding: 10px 0px;
        cursor: pointer;
    }

    .api-guide-dev-container .right-nav li:hover {
        background: #d7d9dc;
        color: #3a8ee6;
    }

    .api-guide-dev-container .main-dev {
        width: calc(100% - 36px);
        height: 100%;
        overflow: auto;
    }
</style>