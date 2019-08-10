<template>
    <div>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="openAddForm">新增</el-button>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="名称"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="code"
                    label="编码"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="url"
                    label="数据接口">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="openUpdateForm(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteDataResourceById(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="formTitle"
                   :visible.sync="formVisible">
            <el-form :model="formData"
                     :rules="formRules"
                     ref="dataResourceForm"
                     label-width="80px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="code">
                    <el-input v-model.trim="formData.code" placeholder="字母开头,只能包含字母、数字、下划线"></el-input>
                </el-form-item>
                <el-form-item label="数据接口" prop="url">
                    <el-input v-model.trim="formData.url"></el-input>
                </el-form-item>
            </el-form>
            <DSubmitCancel slot="footer" nohr @submit="submitDataResourceForm" @cancel="formVisible = false"></DSubmitCancel>
        </el-dialog>
    </div>
</template>

<script>
    import {
        listDataResource,
        saveOrUpdateDataResource,
        deleteDataResource
    } from '../../../services/auth/resource'
    export default {
        name: 'DataResource',
        props: {
            projId: Number
        },
        data () {
            return {
                tableData: [],
                formVisible: false,
                formTitle: '',
                formData: {
                    name: '',
                    code: '',
                    url: ''
                },
                formRules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入编码', trigger: 'blur' },
                        { type: 'string', pattern: /^[A-Za-z]+[A-Za-z0-9_]*[A-Za-z0-9]+$/, message: '字母开头,只能包含字母、数字、下划线', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '请输入数据接口', trigger: 'blur' },
                        { type: 'url', message: '数据接口不规范', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            setDataResourceTableData () {
                if (!this.projId) {
                    this.tableData = []
                    return
                }
                listDataResource({
                    projId: this.projId
                }).then(res => {
                    this.tableData = res.data
                }).catch(this.$handleError)
            },
            openAddForm () {
                this.formData = {
                    name: '',
                    code: '',
                    url: ''
                }
                this.formTitle = '新增数据资源大类'
                this.formVisible = true
            },
            openUpdateForm (row) {
                this.formData = {
                    id: row.id,
                    name: row.name,
                    code: row.code,
                    url: row.url
                }
                this.formTitle = '编辑数据资源大类'
                this.formVisible = true
            },
            submitDataResourceForm () {
                this.$refs['dataResourceForm'].validate((valid) => {
                    if (valid) {
                        saveOrUpdateDataResource({
                            projId: this.projId,
                            id: this.formData.id,
                            name: this.formData.name,
                            code: this.formData.code,
                            url: this.formData.url
                        }).then(res => {
                            this.formVisible = false
                            this.setDataResourceTableData()
                        }).catch(this.$handleError)
                    } else {
                        return false
                    }
                })
            },
            deleteDataResourceById (row) {
                let msg = '确认删除数据资源大类<strong class="d-error">"' + row.name + '"</strong>吗?'
                let vue = this
                vue.$confirmInfo(msg, function () {
                    deleteDataResource({
                        id: row.id
                    }).then(res => {
                        vue.setDataResourceTableData()
                    }).catch(vue.$handleError)
                })
            }
        },
        watch: {
            projId: function () {
                this.setDataResourceTableData()
            }
        }
    }
</script>