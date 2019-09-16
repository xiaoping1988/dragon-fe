<template>
    <DPageContent>
        <el-card shadow="never">
            <el-form inline>
                <el-form-item>
                    <el-input suffix-icon="el-icon-search"
                              size="mini"
                              clearable
                              v-model.trim="keyword"
                              placeholder="请输入关键字搜索"></el-input>
                </el-form-item>
                <el-form-item style="float: right">
                    <el-button icon="el-icon-plus" type="primary" size="mini" @click="openAddAppFormModal">开发新API</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    :data="tableData">
                <el-table-column
                        prop="name"
                        label="名称"
                        width="180">
                    <template slot-scope="scope">
                        <router-link :to="'/data-api/app/' + scope.row.id">{{ scope.row.name }}</router-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="code"
                        label="编码"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="accessKey"
                        width="220"
                        label="accessKey">
                </el-table-column>
                <el-table-column
                        prop="ownerList"
                        width="220"
                        label="负责人">
                    <template slot-scope="scope">
                        <div class="d-tag-group">
                            <el-tag size="mini" effect="plain" v-for="(item, index) in scope.row.ownerList" :key="index">
                                {{item.userNameCn}}({{item.userName}})
                            </el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="描述">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="openUpdateAppFormModal(scope.row)" class="d-error">发布</el-button>
                        <el-button type="text" size="mini" @click="openUpdateAppFormModal(scope.row)">编辑</el-button>
                        <el-button type="text" size="mini" @click="deleteApp(scope.row)">删除</el-button>
                        <el-button type="text" size="mini" @click="openOwner(scope.row)">配置负责人</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog :title="appForm.id ? '编辑应用' : '注册新应用'"
                   :visible.sync="showAppFormModal">
            <el-form :model="appForm"
                     :rules="appFormRule"
                     size="mini"
                     ref="appForm"
                     label-width="80px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="appForm.name"></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="code">
                    <el-input v-model.trim="appForm.code" placeholder="字母开头,只能包含字母、数字、下划线">
                    </el-input>
                </el-form-item>
                <el-form-item label="描述" prop="remark">
                    <el-input type="textarea" rows="4" v-model.trim="appForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <DSubmitCancel slot="footer" nohr @submit="submitAppForm" @cancel="showAppFormModal = false" size="mini"></DSubmitCancel>
        </el-dialog>
        <el-dialog :title="'变更应用[ ' + currentApp.name + ' ]的Owner'"
                   :visible.sync="showAppOwnerModal">
            <el-row style="margin-bottom: 20px">
                <el-select filterable
                           reserve-keyword
                           multiple
                           remote
                           placeholder="请输入用户名或姓名,搜索添加"
                           size="mini"
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
                                       @click="addAppOwner(item, index)"></el-button>
                        </span>
                    </el-option>
                </el-select>
            </el-row>
            <el-row>
                <el-col :span="6"
                        v-for="(item, index) in currentApp.ownerList"
                        :key="item.id"
                        class="d-hover-btn">
                    <span>{{item.userNameCn}}({{item.userName}})</span>
                    <el-button type="text"
                               title="删除用户"
                               icon="el-icon-delete"
                               @click="deleteAppOwnerById(item, index)"></el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </DPageContent>
</template>

<script>
    import {
        searchUser
    } from '../../../services/auth/user'
    import {listMyApp, addOrUpdate, addOwner, deleteById, deleteOwner} from '../../../services/data-api/app'
    export default {
        name: 'DApp',
        data () {
            return {
                tableData: [],
                keyword: '',
                appList: [],
                loading: false,
                showAppFormModal: false,
                appForm: {
                    id: '',
                    name: '',
                    code: '',
                    remark: ''
                },
                appFormRule: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入编码', trigger: 'blur' },
                        { type: 'string', pattern: /^[A-Za-z]+[A-Za-z0-9_]*[A-Za-z0-9]+$/, message: '字母开头,只能包含字母、数字、下划线', trigger: 'blur' }
                    ]
                },
                showAppOwnerModal: false,
                currentApp: {},
                searchUserList: [],
                userNameList: []
            }
        },
        methods: {
            setAppList () {
                this.keyword = ''
                listMyApp().then(res => {
                    this.appList = res.data
                    this.searchApp()
                }).catch(this.$handleError)
            },
            searchApp () {
                if (this.keyword) {
                    this.tableData = this.appList.filter(a => a.name.includes(this.keyword) || a.code.includes(this.keyword.toUpperCase()) || a.remark.includes(this.keyword))
                } else {
                    this.tableData = this.appList
                }
            },
            openAddAppFormModal () {
                this.showAppFormModal = true
                this.appForm = {
                    name: '',
                    code: '',
                    remark: ''
                }
            },
            openUpdateAppFormModal (app) {
                this.showAppFormModal = true
                this.appForm = {
                    id: app.id,
                    name: app.name,
                    code: app.code,
                    remark: app.remark
                }
            },
            submitAppForm () {
                this.$refs['appForm'].validate((valid) => {
                    if (valid) {
                        addOrUpdate(this.appForm).then(res => {
                            this.showAppFormModal = false
                            this.setAppList()
                        }).catch(this.$handleError)
                    } else {
                        return false
                    }
                })
            },
            deleteApp (app) {
                let msg = '确认删除应用<strong class="d-error">"' + app.name + '"</strong>吗?'
                let vue = this
                vue.$confirmInfo(msg, function () {
                    deleteById({
                        id: app.id
                    }).then(res => {
                        vue.setAppList()
                    }).catch(vue.$handleError)
                })
            },
            openOwner (app) {
                this.showAppOwnerModal = true
                this.currentApp = app
            },
            deleteAppOwnerById (appOwnerId, index) {
                deleteOwner({
                    appOwnerId: appOwnerId
                }).then(res => {
                    this.currentApp.ownerList.splice(index, 1)
                }).catch(this.$handleError)
            },
            searchUser (keyword) {
                if (keyword) {
                    searchUser({
                        keyword: keyword
                    }).then(res => {
                        this.searchUserList = res.data.filter(d => {
                            let i = this.currentApp.ownerList.findIndex(u => u.userName === d.userName)
                            return i === -1
                        })
                    }).catch(this.$handleError)
                }
            },
            addAppOwner (user, index) {
                addOwner({
                    appId: this.currentApp.id,
                    userName: user.userName,
                    userNameCn: user.userNameCn
                }).then(res => {
                    this.currentApp.ownerList.unshift({
                        id: res.data,
                        appId: this.currentApp.id,
                        userName: user.userName,
                        userNameCn: user.userNameCn
                    })
                    this.searchUserList.splice(index, 1)
                }).catch(this.$handleError)
            },
            selectUser () {
                this.userNameList = []
            }
        },
        watch: {
            keyword () {
                this.searchApp()
            }
        },
        mounted () {
            this.setAppList()
        }
    }
</script>

<style>

</style>