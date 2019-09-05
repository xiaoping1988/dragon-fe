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
                <span>数值</span>
                <i class="fa fa-pencil" title="批量添加" @click="openBatchAdd(1)"></i>
            </div>
            <DMeasureDragContainer v-model="contrastMeasureList" @change="changeMeasureStore" @click-item="openConfig"></DMeasureDragContainer>
            <div class="right-btn" @click="removeSecond"><span>移除次轴</span></div>
        </div>
        <el-dialog :visible.sync="configModalVisible"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   width="500px">
            <div slot="title">
                 <span>
                   <span style="color: #1c2438;font-weight: 700;">指标配置:</span>
                   <span style="color: #be3330">{{currentConfigCol.colConfig.showName}}</span>
                   <span style="color: #1c2438;font-weight: 700;margin-left: 10px">原始名称:</span>
                   <span style="color: #be3330">{{currentConfigCol.colLabel}}</span>
                 </span>
            </div>
            <el-tabs v-model="activeConfigTab">
                <el-tab-pane label="字段设置" name="bs">
                    <el-row class="d-row d-form-item">
                        <div class="measure-bs-form-label"><span>显示名称</span></div>
                        <div class="measure-bs-form-input">
                            <el-input size="mini" v-model="configForm.showName" :placeholder="currentConfigCol.colLabel"></el-input>
                        </div>
                    </el-row>
                    <el-row class="d-row d-form-item">
                        <div class="measure-bs-form-label"><span>排序方式</span></div>
                        <div class="measure-bs-form-input">
                            <el-select v-model="configForm.sortType" size="mini" style="width: 100%">
                                <el-option value="0" label="默认"></el-option>
                                <el-option value="asc" label="正序"></el-option>
                                <el-option value="desc" label="倒序"></el-option>
                            </el-select>
                        </div>
                    </el-row>
                    <el-row class="d-row d-form-item">
                        <div class="measure-bs-form-label"><span>显示类型</span></div>
                        <div class="measure-bs-form-input">
                            <el-radio-group v-model="configForm.showType">
                                <el-radio v-for="item in showTypeList" :key="item.code" :label="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </div>
                    </el-row>
                    <el-row class="d-row d-form-item">
                        <div class="measure-bs-form-label"><span>单位</span></div>
                        <div class="measure-bs-form-input">
                            <el-input size="mini" v-model="configForm.unit" placeholder="例如:元,万元,人,个等"></el-input>
                        </div>
                    </el-row>
                    <el-row class="d-row d-form-item">
                        <div class="measure-bs-form-label"><span>除数</span></div>
                        <div class="measure-bs-form-input">
                            <el-select v-model="configForm.divisor" size="mini" style="width: 50%">
                                <el-option v-for="item in divisorList" :value="item.code" :key="item.code" :label="item.name"></el-option>
                            </el-select>
                            <el-input-number v-if="configForm.divisor === 0"
                                             v-model="configForm.customDivisor"
                                             size="mini"
                                             controls-position="right"
                                             :min="1"
                                             style="width: 50%"></el-input-number>
                        </div>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane v-if="!currentConfigCol.isNewCol" label="函数" name="func">
                    <el-radio-group v-model="configForm.aggFunction">
                        <div v-for="item in aggFuncList" :key="item.code" class="vertical">
                            <el-radio :label="item.code">{{item.name}}</el-radio>
                        </div>
                    </el-radio-group>
                </el-tab-pane>
                <el-tab-pane label="同环比" name="thb">
                    <el-row class="d-row d-form-item">
                        <div class="measure-bs-form-label"><span>日期字段</span></div>
                        <div class="measure-bs-form-input">
                            <el-select v-model="configForm.divisor" size="mini" style="width: 100%">
                                <el-option v-for="item in divisorList" :value="item.code" :key="item.code" :label="item.name"></el-option>
                            </el-select>
                        </div>
                    </el-row>
                    <el-row class="d-row d-form-item">
                        <div class="measure-bs-form-label"><span>对比类型</span></div>
                        <div class="measure-bs-form-input">
                            <el-checkbox-group v-model="configForm.THB"
                                               @change="changeCheckedThb()">
                                <el-checkbox v-for="(item, j) in THBList"
                                             :key="j"
                                             :label="item.code">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-row>
                    <el-row class="d-row d-form-item">
                        <div class="measure-bs-form-label"><span>数值设置</span></div>
                        <div class="measure-bs-form-input">
                            <el-radio-group v-model="configForm.THBValueType">
                                <el-radio v-for="item in THBValueTypeList" :key="item.code" :label="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
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
    import {AggFunc, ShowType, THB, THBValueType} from '../constants'
    import DMeasureDragContainer from './MeasureDragContainer'
    import {DataType} from '../../../services/data-map/col-manage'
    import DBatchAddCol from './BatchAddCol'
    import {getMeasureColCofig} from './utils'
    export default {
        name: 'DMeasureModule',
        components: {DMeasureDragContainer, DBatchAddCol},
        data () {
            return {
                aggFuncList: Object.values(AggFunc),
                aggFuncObj: AggFunc,
                showTypeList: Object.values(ShowType),
                THBList: Object.values(THB),
                THBValueTypeList: Object.values(THBValueType),
                measureList: [], // 指标集合
                hasSecond: false, // 是否添加对比
                contrastMeasureList: [], // 对比维度
                configModalVisible: false, // 配置框可见
                configForm: { // 配置表单数据
                    aggFunction: '',
                    showName: '',
                    sortType: '',
                    unit: '', // 单位
                    divisor: 1, // 除数
                    customDivisor: 1, // 自定义除数
                    THB: [], // 同环比
                    THBValueType: '', // 同环比的数值类型
                    THBTimeCol: {
                        type: '',
                        colName: ''
                    } // 同环比基准日期字段
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
                batchAddTargetType: 0, // 批量添加的容器对象,主轴0 次轴1
                divisorList: [
                    {code: 1, name: '空'},
                    {code: 100, name: '百'},
                    {code: 1000, name: '千'},
                    {code: 10000, name: '万'},
                    {code: 1000000, name: '百万'},
                    {code: 0, name: '自定义'}
                ]
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
            openConfig (col) {
                this.currentConfigCol = col
                this.configForm = { // 配置表单数据
                    aggFunction: col.colConfig.aggFunction,
                    showName: col.colConfig.showName,
                    sortType: col.colConfig.sortType,
                    showType: col.colConfig.showType,
                    unit: col.colConfig.unit, // 单位
                    divisor: col.colConfig.divisor, // 除数
                    customDivisor: col.colConfig.customDivisor, // 自定义除数
                    THB: col.colConfig.THB, // 同环比
                    THBValueType: col.colConfig.THBValueType, // 同环比的数值类型
                    THBTimeCol: col.colConfig.THBTimeCol // 同环比基准日期字段
                }
                this.activeConfigTab = 'bs'
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
                this.$store.commit('GeneralChart/updateMeasureConfig', {
                    main: {
                        type: '',
                        colList: this.measureList
                    },
                    contrast: {
                        type: '',
                        colList: this.contrastMeasureList
                    }
                })
            },
            openBatchAdd (batchAddTargetType) {
                this.batchAddModalVisible = true
                this.batchAddTargetType = batchAddTargetType
            },
            submitBatchAdd (checkedColList) {
                checkedColList.forEach(col => {
                    col.colConfig = getMeasureColCofig(col)
                    if (this.batchAddTargetType === 0) { // 主轴
                        this.measureList.push(col)
                    } else { // 次轴
                        this.contrastMeasureList.push(col)
                    }
                })
                this.changeMeasureStore()
                this.batchAddModalVisible = false
            },
            changeCheckedThb () {

            }
        },
        mounted () {

        }
    }
</script>

<style>
    .measure-bs-form-label {
        width: 60px;
        text-align: right;
        padding-right: 12px;
        box-sizing: border-box;
        font-weight: 700;
    }

    .measure-bs-form-input {
        width: 400px;
    }
</style>