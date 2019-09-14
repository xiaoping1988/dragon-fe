<template>
    <div class="d-chart-dim">
        <div class="d-col-container">
            <div class="label">
                <span>维度</span>
                <i class="fa fa-pencil" title="批量添加" @click="openBatchAdd(0)"></i>
            </div>
            <DDimDragContainer v-model="dimList" @change="changeDimStore" @click-item="openConfig"></DDimDragContainer>
            <div v-if="!hasContrast" class="right-btn" @click="addContrast"><span>添加对比</span></div>
        </div>
        <div v-if="hasContrast" class="d-col-container">
            <div class="label">
                <span>对比</span>
                <i class="fa fa-pencil" title="批量添加" @click="openBatchAdd(1)"></i>
            </div>
            <DDimDragContainer v-model="contrastDimList" @change="changeDimStore" @click-item="openConfig"></DDimDragContainer>
            <div class="right-btn" @click="removeContrast"><span>移除对比</span></div>
        </div>
        <el-dialog :visible.sync="configModalVisible"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   width="400px">
            <div slot="title">
                 <span>
                   <span style="color: #1c2438;font-weight: 700;">维度配置:</span>
                   <span style="color: #be3330">{{currentConfigCol.colConfig.showName}}</span>
                   <span style="color: #1c2438;font-weight: 700;margin-left: 10px">原始名称:</span>
                   <span style="color: #be3330">{{currentConfigCol.colLabel}}</span>
                 </span>
            </div>
            <el-tabs v-model="activeConfigTab">
                <el-tab-pane v-if="currentConfigCol.colConfig.timeFreq" label="粒度" name="tf">
                    <el-radio-group v-model="configForm.timeFreq">
                        <div v-for="item in timeFreqList" :key="item.code" class="vertical">
                            <el-radio :label="item.code">按{{item.name}}</el-radio>
                        </div>
                    </el-radio-group>
                </el-tab-pane>
                <el-tab-pane label="字段设置" name="bs">
                    <el-row class="d-row d-form-item">
                        <div class="dim-bs-form-label"><span>显示名称</span></div>
                        <div class="dim-bs-form-input">
                            <el-input size="mini" v-model="configForm.showName" :placeholder="currentConfigCol.colLabel"></el-input>
                        </div>
                    </el-row>
                    <el-row class="d-row d-form-item">
                        <div class="dim-bs-form-label"><span>排序方式</span></div>
                        <div class="dim-bs-form-input">
                            <el-select v-model="configForm.sortType" size="mini" style="width: 100%">
                                <el-option value="0" label="默认"></el-option>
                                <el-option value="asc" label="正序"></el-option>
                                <el-option value="desc" label="倒序"></el-option>
                            </el-select>
                        </div>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <DSubmitCancel slot="footer"
                           nohr
                           size="mini"
                           @submit="submitConfigForm"
                           @cancel="configModalVisible = false"
                           submitText="确定">
            </DSubmitCancel>
        </el-dialog>
        <el-dialog :title="'批量添加' + (batchAddTargetType === 0 ? '维度' : '对比') + '字段'"
                   :visible.sync="batchAddModalVisible"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :show-close="false"
                   width="600px">
            <DBatchAddCol @submit="submitBatchAdd" @cancel="batchAddModalVisible = false"></DBatchAddCol>
        </el-dialog>
    </div>
</template>

<script>
    import {TimeFreq} from '../../constants'
    import DDimDragContainer from './DimDragContainer'
    import DBatchAddCol from '../BatchAddCol'
    import {getDimColCofig} from '../utils'
    export default {
        name: 'DDimModule',
        components: {DDimDragContainer, DBatchAddCol},
        data () {
            return {
                timeFreqObj: TimeFreq,
                timeFreqList: Object.values(TimeFreq),
                dimList: [], // 维度集合
                hasContrast: false, // 是否添加对比
                contrastDimList: [], // 对比维度
                configModalVisible: false, // 配置框可见
                configForm: { // 维度配置表单数据
                    timeFreq: '',
                    showName: '',
                    sortType: ''
                },
                currentConfigCol: {
                    colLabel: '',
                    colConfig: {
                        key: '',
                        showName: '',
                        sortType: ''
                    }
                }, // 当前正在配置中的维度字段对象
                activeConfigTab: '',
                batchAddModalVisible: false, // 批量添加的窗口
                batchAddTargetType: 0 // 批量添加的容器对象,维度0对比1
            }
        },
        methods: {
            addContrast () {
                this.hasContrast = true
            },
            removeContrast () {
                this.hasContrast = false
                let update = false
                if (this.contrastDimList.length) {
                    update = true
                }
                this.contrastDimList = []
                if (update) {
                    this.changeDimStore()
                }
            },
            openConfig (dim) {
                this.currentConfigCol = dim
                this.configForm = {
                    timeFreq: dim.colConfig.timeFreq,
                    showName: dim.colConfig.showName,
                    sortType: dim.colConfig.sortType
                }
                if (dim.colConfig.timeFreq) {
                    this.activeConfigTab = 'tf'
                } else {
                    this.activeConfigTab = 'bs'
                }
                this.configModalVisible = true
            },
            submitConfigForm () {
                this.currentConfigCol.colConfig.timeFreq = this.configForm.timeFreq
                this.currentConfigCol.colConfig.sortType = this.configForm.sortType
                if (this.configForm.showName) {
                    this.currentConfigCol.colConfig.showName = this.configForm.showName
                } else {
                    this.currentConfigCol.colConfig.showName = this.currentConfigCol.colLabel
                }
                this.changeDimStore()
                this.configModalVisible = false
            },
            changeDimStore () {
                this.$store.commit('GeneralChart/updateDimConfig', {
                    main: {
                        colList: this.dimList
                    },
                    contrast: {
                        colList: this.contrastDimList
                    }
                })
            },
            openBatchAdd (batchAddTargetType) {
                this.batchAddModalVisible = true
                this.batchAddTargetType = batchAddTargetType
            },
            submitBatchAdd (checkedColList) {
                checkedColList.forEach(col => {
                    col.colConfig = getDimColCofig(col)
                    if (this.batchAddTargetType === 0) { // 维度
                        this.dimList.push(col)
                    } else { // 对比
                        this.contrastDimList.push(col)
                    }
                })
                this.changeDimStore()
                this.batchAddModalVisible = false
            },
            initDataFromVuexStore () {
                this.dimList = this.$store.state.GeneralChart.editConfig.dimConfig.main.colList
                this.contrastDimList = this.$store.state.GeneralChart.editConfig.dimConfig.contrast.colList
            }
        },
        mounted () {
            this.initDataFromVuexStore()
        }
    }
</script>

<style>
    .dim-bs-form-label {
        width: 60px;
        font-weight: 700;
    }

    .dim-bs-form-input {
        width: 300px;
    }
</style>