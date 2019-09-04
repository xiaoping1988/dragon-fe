<template>
    <div class="d-chart-measure">
        <div class="d-col-container">
            <div class="label">
                <span>数值</span>
                <i class="fa fa-pencil" title="批量添加" @click="openBatchAdd(0)"></i>
            </div>
            <DMeasureDragContainer v-model="measureList" @change="changeMeasureStore" @click-item="openConfig"></DMeasureDragContainer>
            <div v-if="!hasSecond" class="right-btn" @click="addSecond"><span>添加次轴</span></div>
        </div>
        <div v-if="hasSecond" class="d-col-container">
            <div class="label">
                <span>对比</span>
                <i class="fa fa-pencil" title="批量添加" @click="openBatchAdd(1)"></i>
            </div>
            <DMeasureDragContainer v-model="contrastMeasureList" @change="changeMeasureStore" @click-item="openConfig"></DMeasureDragContainer>
            <div class="right-btn" @click="removeSecond"><span>移除次轴</span></div>
        </div>
        <el-dialog :visible.sync="configModalVisible"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   width="400px">
            <div slot="title">
                 <span>
                   <span style="color: #1c2438;font-weight: 700;">指标配置:</span>
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
                        <div class="dim-bs-form-label"><span>字段别名</span></div>
                        <div class="dim-bs-form-input">
                            <el-input size="mini" v-model="configForm.showName"></el-input>
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
        <el-dialog :title="'批量添加指标字段'"
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
    import {AggFunc} from '../constants'
    import DMeasureDragContainer from './MeasureDragContainer'
    import {DataType} from '../../../services/data-map/col-manage'
    import DBatchAddCol from './BatchAddCol'
    export default {
        name: 'DMeasureModule',
        components: {DMeasureDragContainer, DBatchAddCol},
        data () {
            return {
                measureList: [], // 维度集合
                hasSecond: false, // 是否添加对比
                contrastMeasureList: [], // 对比维度
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
            addSecond () {
                this.hasSecond = true
            },
            removeSecond () {
                this.hasSecond = false
                let update = false
                if (this.contrastMeasureList.length) {
                    update = true
                }
                this.contrastMeasureList = []
                if (update) {
                    this.changeMeasureStore()
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
                this.changeMeasureStore()
                this.configModalVisible = false
            },
            changeMeasureStore () {
                let store = this.$store
                this.$store.commit('GeneralChart/updateMeasureConfig', {
                    main: this.measureList,
                    contrast: this.contrastMeasureList
                })
            },
            openBatchAdd (batchAddTargetType) {
                this.batchAddModalVisible = true
                this.batchAddTargetType = batchAddTargetType
            },
            submitBatchAdd (checkedColList) {
                checkedColList.forEach(col => {
                    col.colConfig = {
                        key: col.colName + '_' + new Date().getTime(),
                        showName: col.colLabel,
                        sortType: '0',
                        aggFunction: col.dataType === DataType.num.code ? AggFunc.sum.code : AggFunc.count.code,
                        unit: '', // 单位
                        divisor: 1, // 除数
                        showType: 'num' // 显示类型,text 文本 num 数字 amt 金额 rate 百分比
                    }
                    if (this.batchAddTargetType === 0) { // 主轴
                        this.measureList.push(col)
                    } else { // 次轴
                        this.contrastMeasureList.push(col)
                    }
                })
                this.changeMeasureStore()
                this.batchAddModalVisible = false
            }
        },
        mounted () {

        }
    }
</script>

<style>

</style>