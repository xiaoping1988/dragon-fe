<template>
    <div>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="openAddForm">新增</el-button>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="typeName"
                    width="220"
                    label="类型">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="url"
                    label="URL">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="openUpdateForm(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteById(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="formTitle"
                   :visible.sync="formVisible">
            <el-form :model="formData"
                     :rules="formRules"
                     ref="formData"
                     label-width="80px">
                <el-form-item label="类型" prop="type">
                    <el-radio-group v-model="formData.type">
                        <el-radio :label="1">后端</el-radio>
                        <el-radio :label="2">前端</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="URL" prop="url">
                    <el-input v-model.trim="formData.url"></el-input>
                </el-form-item>
            </el-form>
            <DSubmitCancel slot="footer" nohr @submit="submitForm" @cancel="formVisible = false"></DSubmitCancel>
        </el-dialog>
    </div>
</template>

<script>
    import {
        listWhiteListResource,
        saveOrUpdateWhiteListResource,
        deleteWhiteListResource
    } from '../../../services/auth/resource'
    export default {
        name: 'WhiteListResource',
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
                    type: 1,
                    url: ''
                },
                formRules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '请输入URL', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            setTableData () {
                if (!this.projId) {
                    this.tableData = []
                    return
                }
                listWhiteListResource({
                    projId: this.projId
                }).then(res => {
                    this.tableData = res.data
                }).catch(this.$handleError)
            },
            openAddForm () {
                this.formData = {
                    name: '',
                    type: 1,
                    url: ''
                }
                this.formTitle = '新增白名单'
                this.formVisible = true
            },
            openUpdateForm (row) {
                this.formData = {
                    id: row.id,
                    name: row.name,
                    type: row.type,
                    url: row.url
                }
                this.formTitle = '编辑白名单'
                this.formVisible = true
            },
            submitForm () {
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        saveOrUpdateWhiteListResource({
                            projId: this.projId,
                            id: this.formData.id,
                            name: this.formData.name,
                            type: this.formData.type,
                            url: this.formData.url
                        }).then(res => {
                            this.formVisible = false
                            this.setTableData()
                        }).catch(this.$handleError)
                    } else {
                        return false
                    }
                })
            },
            deleteById (row) {
                let msg = '确认删除白名单资源<strong class="d-error">"' + row.name + '"</strong>吗?'
                let vue = this
                vue.$confirmInfo(msg, function () {
                    deleteWhiteListResource({
                        id: row.id
                    }).then(res => {
                        vue.setTableData()
                    }).catch(vue.$handleError)
                })
            }
        },
        watch: {
            projId: function () {
                this.setTableData()
            }
        }
    }
</script>