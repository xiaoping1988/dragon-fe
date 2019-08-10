<template>
    <DPageContent>
        <el-row class="d-row">
            <el-col>
                <el-card shadow="never">
                    <div slot="header">
                        <span class="d-card-title">项目:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <el-select v-model="proj.selectId" style="width: 180px" size="small" @change="changeProj">
                            <el-option v-for="proj in proj.selectListData" :value="proj.id" :key="proj.id" :label="proj.name"></el-option>
                        </el-select>
                        <div style="float: right;">
                            <el-button class="d-card-btn" type="text" @click="openAddProjForm">
                                创建新项目
                            </el-button>
                            <el-button v-if="proj.selectId" class="d-card-btn" type="text" @click="openUpdateProjForm">
                                编辑项目
                            </el-button>
                            <el-button v-if="proj.selectId" class="d-card-btn" type="text" @click="deleteProjById">
                                删除项目
                            </el-button>
                        </div>
                    </div>
                    <DDetail :data="proj.detailData" :columns="proj.detailColumns"></DDetail>
                    <el-dialog :title="proj.formTitle"
                               :visible.sync="proj.formVisible">
                        <el-form :model="proj.formData"
                                 :rules="proj.formRules"
                                 ref="projForm"
                                 label-width="60px">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model.trim="proj.formData.name"></el-input>
                            </el-form-item>
                            <el-form-item label="编码" prop="code">
                                <el-input v-model.trim="proj.formData.code" placeholder="字母开头,只能包含字母、数字、下划线"></el-input>
                            </el-form-item>
                        </el-form>
                        <DSubmitCancel slot="footer" nohr @submit="submitProjForm" @cancel="proj.formVisible = false"></DSubmitCancel>
                    </el-dialog>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-card shadow="never">
                    <el-tabs v-model="activeTab">
                        <el-tab-pane label="功能资源" name="static">
                            <StaticResource :projId="proj.selectId"></StaticResource>
                        </el-tab-pane>
                        <el-tab-pane label="数据资源大类" name="data">
                            <DataResource :projId="proj.selectId"></DataResource>
                        </el-tab-pane>
                        <el-tab-pane label="白名单资源" name="white">
                            <WhiteListResource :projId="proj.selectId"></WhiteListResource>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </DPageContent>
</template>

<script>
    import {
        listProjectAuth,
        getProjectById,
        saveOrUpdateProj,
        deleteProj
    } from '../../../services/auth/project'
    import StaticResource from './StaticResource.vue'
    import DataResource from './DataResource.vue'
    import WhiteListResource from './WhiteListResource.vue'
    export default {
        name: 'Resource',
        components: {StaticResource, DataResource, WhiteListResource},
        data () {
            return {
                proj: {
                    selectListData: [],
                    selectId: 0,
                    detailData: {},
                    detailColumns: [
                        {key: 'name', title: '名称'},
                        {key: 'creator', title: '创建人'},
                        {key: 'updator', title: '修改人'},
                        {key: 'code', title: '编码'},
                        {key: 'createTime', title: '创建时间'},
                        {key: 'updateTime', title: '修改时间'}
                    ],
                    formVisible: false,
                    formTitle: '新建项目',
                    formData: {
                        name: '', // 项目名称
                        code: '' // 项目编码
                    },
                    formRules: {
                        name: [
                            { required: true, message: '请输入名称', trigger: 'blur' }
                        ],
                        code: [
                            { required: true, message: '请输入编码', trigger: 'blur' },
                            { type: 'string', pattern: /^[A-Za-z]+[A-Za-z0-9_]*[A-Za-z0-9]+$/, message: '字母开头,只能包含字母、数字、下划线', trigger: 'blur' }
                        ]
                    }
                },
                activeTab: 'static'
            }
        },
        methods: {
            setProjSelectListData () {
                listProjectAuth().then(res => {
                    this.proj.selectListData = res.data
                    if (this.proj.selectListData && this.proj.selectListData.length) {
                        this.proj.selectId = this.proj.selectListData[0].id
                        this.changeProj()
                    } else {
                        this.proj.selectId = null
                        this.proj.detailData = {}
                    }
                }).catch(this.$handleError)
            },
            changeProj () {
                this.setProjDetail()
            },
            setProjDetail () {
                getProjectById({
                    id: this.proj.selectId
                }).then(res => {
                    this.proj.detailData = res.data
                }).catch(this.$handleError)
            },
            openAddProjForm () {
                this.proj.formTitle = '创建新项目'
                this.proj.formVisible = true
                this.proj.formData = {
                    name: '',
                    code: ''
                }
            },
            openUpdateProjForm () {
                this.proj.formTitle = '编辑项目'
                this.proj.formVisible = true
                this.proj.formData = {
                    id: this.proj.detailData.id,
                    name: this.proj.detailData.name,
                    code: this.proj.detailData.code
                }
            },
            submitProjForm () {
                this.$refs['projForm'].validate((valid) => {
                    if (valid) {
                        saveOrUpdateProj(this.proj.formData).then(res => {
                            this.proj.formVisible = false
                            if (this.proj.formData.id) { // 修改
                                this.setProjDetail()
                            } else { // 新增
                                this.setProjSelectListData()
                            }
                        }).catch(this.$handleError)
                    } else {
                        return false
                    }
                })
            },
            deleteProjById () {
                let msg = '确认删除项目<strong class="d-error">"' + this.proj.detailData.name + '"</strong>吗?'
                let vue = this
                vue.$confirmInfo(msg, function () {
                    deleteProj({
                        id: vue.proj.selectId
                    }).then(res => {
                        vue.setProjSelectListData()
                    }).catch(vue.$handleError)
                })
            }
        },
        mounted () {
            this.setProjSelectListData()
        }
    }
</script>