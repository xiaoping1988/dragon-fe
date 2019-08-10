<template>
    <DPageContent>
        <el-card shadow="never">
            <el-row class="d-row">
                <div class="d-search-form" style="float: left">
                    <el-select v-model="searchForm.type"
                               size="small"
                               clearable
                               @change="setTableData"
                               placeholder="类型">
                        <el-option v-for="item in dbTypeList" :label="item.name" :value="item.code" :key="item.code"></el-option>
                    </el-select>
                    <el-input size="small"
                              placeholder="数据源名称/数据库名称"
                              suffix-icon="el-icon-search"
                              class="item"
                              clearable
                              v-model="searchForm.name"
                              @change="setTableData"></el-input>
                </div>
                <div style="float: right">
                    <el-button type="primary" size="small" @click="openAddDsForm()">新增数据源</el-button>
                </div>
            </el-row>
            <el-row class="d-row">
                <el-table :data="tableData.data"
                          row-key="id"
                          default-expand-all
                          :row-class-name="tableRowClassName">
                    <el-table-column
                            prop="name"
                            label="数据源名称"
                            width="200">
                        <template slot-scope="scope">
                            <router-link :to="'/data-map/ds-manage/' + scope.row.id">{{ scope.row.name }}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="类型"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="host"
                            label="域名"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="dbName"
                            label="数据库名称"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="remark"
                            label="描述">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="250">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="openUpdateDsForm(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="deleteDsById(scope.row)">删除</el-button>
                            <el-button type="text" size="small" v-if="scope.row.isBaseDs === 1" @click="openAddDsForm(scope.row)">新建查询引擎</el-button>
                            <el-button type="text" size="small" v-if="scope.row.isBaseDs === 1" @click="openDsOwnerForm(scope.row)">变更Owner</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <el-pagination
                        @current-change="setTableData"
                        @size-change="setTableData"
                        background
                        :current-page.sync="pageNo"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size.sync="pageSize"
                        layout="total, sizes, prev, pager, next"
                        :total="tableData.total">
                </el-pagination>
            </el-row>
        </el-card>
        <el-dialog :title="dsFormTitle"
                   top="30px"
                :visible.sync="dsFormVisible">
            <el-form ref="dsForm"
                     :model="dsForm"
                     :rules="formRules"
                     label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="类型" prop="type">
                            <el-select v-model="dsForm.type" :disabled="dsForm.id != undefined" style="width: 100%">
                                <el-option v-for="item in dbTypeList" :label="item.name" :value="item.code" :key="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="数据源名称" prop="name">
                            <el-input v-model="dsForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="描述" prop="remark">
                            <el-input v-model="dsForm.remark"
                                      type="textarea"
                                      :rows="2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="域名" prop="host">
                            <el-input v-model="dsForm.host"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="端口" prop="port">
                            <el-input v-model="dsForm.port"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="数据库名称" prop="dbName">
                            <el-input v-model="dsForm.dbName" :disabled="dsForm.id != undefined"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户名" prop="userName">
                            <el-input v-model="dsForm.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="dsForm.password" type="password"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item v-if="dsForm.isBaseDs === 0" label="优先级" prop="priority">
                            <el-input-number v-model="dsForm.priority" :min="1" :max="100" style="width: 100%"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="dsForm.isBaseDs === 0" label="元数据同步" prop="isAutoMeta">
                            <el-radio-group v-model="dsForm.isAutoMeta">
                                <el-radio :label="1">自动</el-radio>
                                <el-radio :label="0">手动</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <DSubmitCancel slot="footer" nohr @submit="submitDsForm" @cancel="dsFormVisible = false">
                <el-button type="primary" @click="testDs">测试连接</el-button>
            </DSubmitCancel>
        </el-dialog>
        <el-dialog :title="'变更Owner：' + currentDs.name"
                   :visible.sync="dsOwnerFormVisible">
            <el-row style="margin-bottom: 20px">
                <el-select filterable
                           reserve-keyword
                           multiple
                           remote
                           placeholder="请输入用户名或姓名,搜索添加"
                           size="small"
                           v-model="userNameList"
                           @change="selectUser"
                           :remote-method="searchUser"
                           style="float: right;width: 220px">
                    <el-option
                            v-for="(item, index) in searchUserList"
                            :key="item.userName"
                            :label="item.userNameCn"
                            :value="item.userName">
                        <span style="float: left">{{ item.userNameCn }}({{item.userName}})</span>
                        <span style="float: right">
                            <el-button type="text"
                                       title="添加用户"
                                       icon="el-icon-plus"
                                       @click="addDsOwner(item, index)"></el-button>
                        </span>
                    </el-option>
                </el-select>
            </el-row>
            <el-row>
                <el-col :span="6"
                        v-for="(dsOwner, index) in dsOwnerList"
                        :key="dsOwner.id"
                        class="d-hover-btn">
                    <span>{{dsOwner.ownerNameCn}}({{dsOwner.ownerName}})</span>
                    <el-button type="text"
                               title="删除用户"
                               icon="el-icon-delete"
                               @click="deleteDsOwnerById(dsOwner.id, index)"></el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </DPageContent>
</template>

<script>
    import {
        DbType,
        listDs,
        addOrUpdateDs,
        deleteDs,
        testDs,
        listDsOwner,
        deleteDsOwner,
        addDsOwner
    } from '../../../services/data-map/ds-manage'
    import {
        searchUser
    } from '../../../services/auth/user'
    export default {
        name: 'DDsManager',
        data () {
            return {
                searchForm: {
                    type: '',
                    name: ''
                },
                pageSize: 10,
                pageNo: 1,
                tableData: {
                    total: 0,
                    data: []
                },
                dbTypeList: Object.values(DbType),
                dsFormVisible: false,
                dsFormTitle: '新建数据源',
                dsForm: {
                    type: DbType.MYSQL.code, // 类型
                    name: '', // 名称
                    host: '', // 域名
                    port: '', // 端口
                    dbName: '', // 数据库名称
                    userName: '', // 用户名
                    password: '', // 密码
                    isBaseDs: 1, // 是否基础数据源
                    priority: 0 // 优先级
                },
                formRules: {
                    type: [
                        { required: true, message: '请选择类型', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入数据源名称', trigger: 'blur' }
                    ],
                    host: [
                        { required: true, message: '请输入域名', trigger: 'blur' }
                    ],
                    dbName: [
                        { required: true, message: '请输入数据库名称', trigger: 'blur' },
                        { type: 'string', pattern: /^[A-Za-z]+[A-Za-z0-9_]*[A-Za-z0-9]+$/, message: '只能包含数字、字母、下划线,字母开头', trigger: 'blur' }
                    ],
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { type: 'string', pattern: /^[A-Za-z]+[A-Za-z0-9_]*[A-Za-z0-9]+$/, message: '只能包含数字、字母、下划线,字母开头', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    port: [
                        { type: 'string', pattern: /^[1-9]+[0-9]*$/, message: '端口号只能是数字', trigger: 'blur' }
                    ]
                },
                currentDs: {},
                dsOwnerFormVisible: false,
                dsOwnerList: [],
                searchUserList: [],
                userNameList: []
            }
        },
        methods: {
            setTableData () {
                listDs({
                    pageSize: this.pageSize,
                    pageNo: this.pageNo,
                    type: this.searchForm.type,
                    name: this.searchForm.name
                }).then(res => {
                    this.tableData = res.data
                }).catch(this.$handleError)
            },
            openAddDsForm (row) {
                this.dsFormVisible = true
                this.dsForm = {
                    type: DbType.MYSQL.code, // 类型
                    name: '', // 名称
                    host: '', // 域名
                    port: '', // 端口
                    dbName: '', // 数据库名称
                    userName: '', // 用户名
                    password: '', // 密码
                    priority: 1, // 优先级
                    isAutoMeta: 1 // 元数据是否自动同步,比如impala自动同步hive,kylin需要手动加载hive数据源
                }
                if (row) {
                    this.dsFormTitle = '新建数据源：' + row.name + ' 的查询引擎'
                    this.dsForm.isBaseDs = 0
                    this.dsForm.baseDsId = row.id
                } else {
                    this.dsFormTitle = '新建数据源'
                    this.dsForm.isBaseDs = 1
                    this.dsForm.baseDsId = 0
                }
            },
            openUpdateDsForm (row) {
                this.dsFormVisible = true
                if (row.isBaseDs === 1) {
                    this.dsFormTitle = '编辑数据源'
                } else {
                    this.dsFormTitle = '编辑查询引擎'
                }
                this.dsForm = {
                    id: row.id,
                    type: row.type, // 类型
                    name: row.name, // 名称
                    remark: row.remark, // 描述
                    host: row.host, // 域名
                    port: row.port, // 端口
                    dbName: row.dbName, // 数据库名称
                    userName: row.userName, // 用户名
                    password: row.password, // 密码
                    isBaseDs: row.isBaseDs, // 是否基础数据源
                    baseDsId: row.baseDsId, // 是否基础数据源
                    priority: row.priority, // 优先级
                    isAutoMeta: row.isAutoMeta
                }
            },
            submitDsForm () {
                this.$refs['dsForm'].validate((valid) => {
                    if (valid) {
                        addOrUpdateDs(this.dsForm).then(res => {
                            this.dsFormVisible = false
                            this.setTableData()
                        }).catch(this.$handleError)
                    } else {
                        return false
                    }
                })
            },
            testDs () {
                this.$refs['dsForm'].validate((valid) => {
                    if (valid) {
                        testDs(this.dsForm).then(res => {
                            this.$messageSuccess('测试成功!')
                        }).catch(this.$handleError)
                    } else {
                        return false
                    }
                })
            },
            deleteDsById (row) {
                let msg
                if (row.isBaseDs === 1) {
                    msg = '确认删除数据源<strong class="d-error">"' + row.name + '"</strong>吗?'
                } else {
                    msg = '确认删除查询引擎<strong class="d-error">"' + row.name + '"</strong>吗?'
                }
                let vue = this
                vue.$confirmInfo(msg, function () {
                    deleteDs({
                        id: row.id
                    }).then(res => {
                        vue.setTableData()
                    }).catch(vue.$handleError)
                })
            },
            tableRowClassName({row, rowIndex}) {
                if (row.children && row.children.length) {
                    return 'success-row'
                }
                return ''
            },
            openDsOwnerForm (row) {
                this.currentDs = row
                this.dsOwnerFormVisible = true
                this.setDsOwnerList()
            },
            setDsOwnerList () {
                this.dsOwnerList = []
                listDsOwner({
                    id: this.currentDs.id
                }).then(res => {
                    this.dsOwnerList = res.data
                }).catch(this.$handleError)
            },
            deleteDsOwnerById (dsOwnerId, index) {
                deleteDsOwner({
                    dsOwnerId: dsOwnerId
                }).then(res => {
                    this.dsOwnerList.splice(index, 1)
                }).catch(this.$handleError)
            },
            searchUser (keyword) {
                if (keyword) {
                    searchUser({
                        keyword: keyword
                    }).then(res => {
                        this.searchUserList = res.data.filter(d => {
                            let i = this.dsOwnerList.findIndex(u => u.ownerName === d.userName)
                            return i === -1
                        })
                    }).catch(this.$handleError)
                }
            },
            addDsOwner (user, index) {
                addDsOwner({
                    dsId: this.currentDs.id,
                    ownerName: user.userName,
                    ownerNameCn: user.userNameCn
                }).then(res => {
                    this.dsOwnerList.unshift({
                        id: res.data,
                        ownerName: user.userName,
                        ownerNameCn: user.userNameCn
                    })
                    this.searchUserList.splice(index, 1)
                }).catch(this.$handleError)
            },
            selectUser () {
                this.userNameList = []
            }
        },
        mounted () {
            this.setTableData()
        }
    }
</script>

<style>
    .el-table .success-row {
        background: #f0f9eb;
    }
</style>