<template>
    <div>
        <el-form label-position="top"
                 label-width="80px"
                 :model="externalReportForm"
                 :rules="externalReportFormRules"
                 ref="externalReportForm"
                 size="mini">
            <el-form-item label="名称" prop="name">
                <el-input v-model="externalReportForm.name"></el-input>
            </el-form-item>
            <el-form-item label="URL" prop="url">
                <el-input v-model="externalReportForm.url"></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-tag
                        v-for="(tag,index) in externalReportForm.tagList"
                        :key="index"
                        closable
                        :disable-transitions="false"
                        size="small"
                        @close="delExternalReportTag(index)">
                    {{tag.name}}
                </el-tag>
                <el-input
                        class="d-tag-input"
                        v-if="externalReportTagInputVisible"
                        v-model.trim="externalReportTagInputValue"
                        ref="saveExternalReportTagInput"
                        @keyup.enter.native="saveExternalReportTagConfirm"
                        @blur="saveExternalReportTagConfirm"
                >
                </el-input>
                <el-button v-else size="mini" @click="showExternalReportTagInput" class="d-tag-input-btn">+ 添加标签</el-button>
            </el-form-item>
            <el-form-item label="描述" prop="remark">
                <el-input v-model="externalReportForm.remark" type="textarea" :rows="3"></el-input>
            </el-form-item>
        </el-form>
        <DSubmitCancel slot="footer" nohr @submit="submit" @cancel="cancel" size="mini">
        </DSubmitCancel>
    </div>
</template>

<script>
    export default {
        name: 'DExternalReportForm',
        props: {
            data: Object
        },
        data () {
            return {
                externalReportForm: {
                    url: '',
                    name: '',
                    tagList: [],
                    remark: ''
                },
                externalReportFormRules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { max: 50, message: '长度最大50个字符', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '请输入URL', trigger: 'blur' },
                        { type: 'url', message: '请输入正确的URL', trigger: 'blur' }
                    ],
                    remark: [
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ]
                },
                externalReportTagInputValue: '',
                externalReportTagInputVisible: false
            }
        },
        methods: {
            initForm () {
                if (!this.data || !this.data.id) {
                    this.externalReportForm = {
                        url: '',
                        name: '',
                        tagList: [],
                        remark: ''
                    }
                } else {
                    this.externalReportForm = {
                        id: this.data.id,
                        url: this.data.url,
                        name: this.data.name,
                        tagList: this.data.tagList,
                        remark: this.data.remark
                    }
                }
            },
            cancel () {
                this.$emit('cancel')
            },
            submit () {
                this.$refs['externalReportForm'].validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.externalReportForm)
                    } else {
                        return false
                    }
                })
            },
            showExternalReportTagInput () {
                this.externalReportTagInputVisible = true
                this.$nextTick(_ => {
                    this.$refs.saveExternalReportTagInput.$refs.input.focus();
                })
            },
            saveExternalReportTagConfirm () {
                let inputValue = this.externalReportTagInputValue
                let success = true
                if (inputValue) {
                    if (inputValue.length > 50) {
                        this.$messageWarn('标签长度最大50个字符!')
                        success = false
                    } else if (this.externalReportForm.tagList.findIndex(t => t.name === inputValue) >= 0) {
                        this.$messageWarn('标签已存在!')
                        success = false
                    } else {
                        this.externalReportForm.tagList.push({name: inputValue})
                    }
                }
                if (success) {
                    this.externalReportTagInputVisible = false
                    this.externalReportTagInputValue = ''
                }
            },
            delExternalReportTag (index) {
                this.externalReportForm.tagList.splice(index, 1)
            }
        },
        watch: {
            data () {
                this.initForm()
            }
        },
        mounted () {
            this.initForm()
        }
    }
</script>