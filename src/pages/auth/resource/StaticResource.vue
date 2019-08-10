<template>
    <el-row>
        <el-col :span="8" style="border-right: 1px solid #e8e8e8;padding-right: 10px">
            <el-button size="small" icon="el-icon-plus" style="width: 100%;margin-bottom: 10px" @click="openAddRootStaticResourceForm">创建根资源</el-button>
            <el-tree default-expand-all
                     highlight-current
                     node-key="id"
                     ref="resourceTree"
                     :data="treeData"
                     @current-change="changeStaticResource"
            ></el-tree>
        </el-col>
        <el-col :span="16" style="padding-left: 10px">
            <el-card v-if="selectId" shadow="never">
                <div slot="header">
                    <span class="d-card-title">资源</span>
                    <div style="float: right;">
                        <el-button class="d-card-btn" type="text" @click="openAddChildStaticResourceForm">
                            添加子资源
                        </el-button>
                        <el-button class="d-card-btn" type="text" @click="openUpdateStaticResourceForm">
                            编辑
                        </el-button>
                        <el-button class="d-card-btn" type="text" @click="deleteStaticResourceById">
                            删除
                        </el-button>
                    </div>
                </div>
                <DDetail :data="detailData" :columns="detailColumns" :col="4"></DDetail>
                <div class="d-desclist-index">
                    <div class="d-desclist-index-term">后端API</div>
                    <div class="d-desclist-index-detail">
                        <div v-for="api in detailData.beApiList" :key="api.id">
                            <span>{{api.name}}：</span>
                            <span>{{api.url}}</span>
                        </div>
                    </div>
                </div>
            </el-card>
        </el-col>

        <el-dialog :title="formTitle"
                   :visible.sync="formVisible">
            <el-form :model="formData"
                     :rules="formRules"
                     ref="staticResourceForm"
                     label-width="80px">
                <el-form-item label="类型" prop="type">
                    <el-radio-group v-model="formData.type">
                        <el-radio label="MENU">MENU</el-radio>
                        <el-radio label="BUTTON">BUTTON</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="code">
                    <el-input v-model.trim="formData.code" placeholder="字母开头,只能包含字母、数字、下划线"></el-input>
                </el-form-item>
                <el-form-item label="前端路由" prop="feRouter">
                    <el-input v-model.trim="formData.feRouter"></el-input>
                </el-form-item>
                <el-form-item label="后端API">
                    <el-row v-for="(api, index) in formData.beApiList" :key="index">
                        <el-col :span="10">
                            <el-form-item label-width="0px"
                                          style="margin-bottom: 22px;"
                                          :prop="'beApiList.' + index + '.name'"
                                          :rules="[
                                                                  {required: true, message: '接口名称不能为空', trigger: 'blur'}
                                                              ]">
                                <el-input placeholder="接口名称" v-model.trim="api.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="0px"
                                          style="margin-bottom: 22px;"
                                          :prop="'beApiList.' + index + '.url'"
                                          :rules="[
                                                                  {required: true, message: '接口路径不能为空', trigger: 'blur'}
                                                              ]">
                                <el-input placeholder="接口路径" v-model.trim="api.url"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-button size="medium" icon="el-icon-minus" @click="deleteStaticResourceApi(index)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-button size="medium" type="primary" icon="el-icon-plus" @click="addStaticResourceApi"></el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <DSubmitCancel slot="footer" nohr @submit="submitStaticResourceForm" @cancel="formVisible = false"></DSubmitCancel>
        </el-dialog>
    </el-row>
</template>

<script>
    import {
        listStaticResourceTree,
        getStaticResource,
        saveOrUpdateStaticResource,
        deleteStaticResource
    } from '../../../services/auth/resource'
    export default {
        name: 'StaticResource',
        props: {
           projId: Number
        },
        data () {
            return {
                treeData: [],
                selectId: 0,
                detailData: {},
                detailColumns: [
                    {key: 'name', title: '名称'},
                    {key: 'code', title: '编码'},
                    {key: 'type', title: '类型'},
                    {key: 'feRouter', title: '前端路由'}
                ],
                formVisible: false,
                formTitle: '',
                formData: {
                    name: '',
                    code: '',
                    feRouter: '',
                    type: 'MENU',
                    pid: 0,
                    beApiList: []
                },
                formRules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    code: [
                        { type: 'string', pattern: /^[A-Za-z]+[A-Za-z0-9_]*[A-Za-z0-9]+$/, message: '字母开头,只能包含字母、数字、下划线', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            setStaticResourceTreeData (selectId) {
                let vue = this
                if (!vue.projId) {
                    vue.treeData = []
                    vue.selectId = null
                    vue.detailData = {}
                    return
                }
                listStaticResourceTree({
                    projId: vue.projId
                }).then(res => {
                    vue.treeData = res.data
                    if (vue.treeData && vue.treeData.length) {
                        if (selectId) {
                            vue.selectId = selectId
                        } else {
                            vue.selectId = vue.treeData[0].id
                        }
                        vue.setStaticResourceDetail()
                    } else {
                        vue.selectId = null
                        vue.detailData = {}
                    }
                    vue.$nextTick(function () {
                        vue.$refs.resourceTree.setCurrentKey(vue.selectId)
                    })
                }).catch(this.$handleError)
            },
            setStaticResourceDetail () {
                getStaticResource({
                    id: this.selectId
                }).then(res => {
                    this.detailData = res.data
                }).catch(this.$handleError)
            },
            changeStaticResource (data, node) {
                this.selectId = data.id
                this.setStaticResourceDetail()
            },
            openAddRootStaticResourceForm () {
                this.formData = {
                    pid: 0,
                    name: '',
                    code: '',
                    type: 'MENU',
                    feRouter: '',
                    beApiList: []
                }
                this.formTitle = '创建根资源'
                this.formVisible = true
            },
            openAddChildStaticResourceForm () {
                this.formData = {
                    pid: this.selectId,
                    name: '',
                    code: '',
                    type: 'MENU',
                    feRouter: '',
                    beApiList: []
                }
                this.formTitle = '添加子资源'
                this.formVisible = true
            },
            openUpdateStaticResourceForm () {
                this.formData = {
                    id: this.detailData.id,
                    pid: this.detailData.pid,
                    name: this.detailData.name,
                    code: this.detailData.code,
                    type: this.detailData.type,
                    feRouter: this.detailData.feRouter,
                    beApiList: this.detailData.beApiList
                }
                this.formTitle = '编辑资源'
                this.formVisible = true
            },
            addStaticResourceApi () {
                this.formData.beApiList.push({
                    name: '',
                    url: ''
                })
            },
            deleteStaticResourceApi (index) {
                this.formData.beApiList.splice(index, 1)
            },
            submitStaticResourceForm () {
                this.$refs['staticResourceForm'].validate((valid) => {
                    if (valid) {
                        saveOrUpdateStaticResource({
                            projId: this.projId,
                            id: this.formData.id,
                            pid: this.formData.pid,
                            name: this.formData.name,
                            code: this.formData.code,
                            type: this.formData.type,
                            feRouter: this.formData.feRouter,
                            beApiList: JSON.stringify(this.formData.beApiList)
                        }).then(res => {
                            this.formVisible = false
                            if (this.formData.id) { // 修改
                                this.setStaticResourceDetail()
                            } else { // 新增
                                this.setStaticResourceTreeData(res.data)
                            }
                        }).catch(this.$handleError)
                    } else {
                        return false
                    }
                })
            },
            deleteStaticResourceById () {
                let msg = '确认删除资源<strong class="d-error">"' + this.detailData.name + '"</strong>吗?'
                let vue = this
                vue.$confirmInfo(msg, function () {
                    deleteStaticResource({
                        id: vue.selectId
                    }).then(res => {
                        vue.setStaticResourceTreeData()
                    }).catch(vue.$handleError)
                })
            }
        },
        watch: {
            projId: function () {
                this.setStaticResourceTreeData()
            }
        }
    }
</script>