<template>
    <div class="d-chart-dim">
        <div class="d-dim-container">
            <div class="label">
                <span>维度</span>
                <i class="fa fa-pencil" title="批量添加" @click="openBatchAdd(0)"></i>
            </div>
            <DDimDragContainer :data="dimList" @change="changeDimStore" @click-item="openConfig"></DDimDragContainer>
            <div v-if="!hasContrast" class="right-btn" @click="addContrast"><span>添加对比</span></div>
        </div>
        <!--<DDraggable v-model="dimList">-->
            <!--<template slot-scope="{item, index}">-->
                <!--<div class="tag-item" style="margin-top: 5px">-->
                    <!--<div >-->
                        <!--<span>{{item.dimConfig.showName}}</span>-->
                        <!--<span v-if="item.dimConfig.timeFreq">(按{{timeFreqObj[item.dimConfig.timeFreq].name}})</span>-->
                    <!--</div>-->
                    <!--<div class="btn">-->
                        <!--<i class="fa fa-times-circle" title="移除字段"></i>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</template>-->
        <!--</DDraggable>-->
        <!--<DDraggable v-model="dimList" style="display: flex">-->
            <!--<template slot-scope="{item, index}">-->
                <!--<div class="tag-item" style="margin-top: 5px">-->
                    <!--<div >-->
                        <!--<span>{{item.dimConfig.showName}}</span>-->
                        <!--<span v-if="item.dimConfig.timeFreq">(按{{timeFreqObj[item.dimConfig.timeFreq].name}})</span>-->
                    <!--</div>-->
                    <!--<div class="btn">-->
                        <!--<i class="fa fa-times-circle" title="移除字段"></i>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</template>-->
        <!--</DDraggable>-->
        <DraggableContainer v-model="dimList" style="width: 180px">
            <template slot-scope="{item, index}">
                <div class="tag-item" style="width: 100%">
                    <div >
                        <span>{{item.dimConfig.showName}}</span>
                        <span v-if="item.dimConfig.timeFreq">(按{{timeFreqObj[item.dimConfig.timeFreq].name}})</span>
                    </div>
                    <div class="btn">
                        <i class="fa fa-times-circle" title="移除字段"></i>
                    </div>
                </div>
            </template>
        </DraggableContainer>
        <div v-if="hasContrast" class="d-dim-container">
            <div class="label">
                <span>对比</span>
                <i class="fa fa-pencil" title="批量添加" @click="openBatchAdd(1)"></i>
            </div>
            <DDimDragContainer :data="contrastDimList" @change="changeDimStore" @click-item="openConfig"></DDimDragContainer>
            <div class="right-btn" @click="removeContrast"><span>移除对比</span></div>
        </div>
        <el-dialog :visible.sync="configModalVisible"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   width="400px">
            <div slot="title">
                 <span>
                   <span style="color: #1c2438;font-weight: 700;">维度配置:</span>
                   <span style="color: #be3330">{{currentConfigDim.dimConfig.showName}}</span>
                   <span style="color: #1c2438;font-weight: 700;margin-left: 10px">原始名称:</span>
                   <span style="color: #be3330">{{currentConfigDim.colLabel}}</span>
                 </span>
            </div>
            <el-tabs v-model="activeConfigTab">
                <el-tab-pane v-if="currentConfigDim.dimConfig.timeFreq" label="粒度" name="tf">
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
    import {TimeFreq} from '../constants'
    import DDimDragContainer from './DimDragContainer'
    import {DataType} from '../../../services/data-map/col-manage'
    import DBatchAddCol from './BatchAddCol'
    import DraggableContainer from '../../../components/draggable/DraggableContainer'
    export default {
        name: 'DDimModule',
        components: {DDimDragContainer, DBatchAddCol, DraggableContainer},
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
                currentConfigDim: {
                    colLabel: '',
                    dimConfig: {
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
                this.currentConfigDim = dim
                this.configForm = {
                    timeFreq: dim.dimConfig.timeFreq,
                    showName: dim.dimConfig.showName,
                    sortType: dim.dimConfig.sortType
                }
                if (dim.dimConfig.timeFreq) {
                    this.activeConfigTab = 'tf'
                } else {
                    this.activeConfigTab = 'bs'
                }
                this.configModalVisible = true
            },
            submitConfigForm () {
                this.currentConfigDim.dimConfig.timeFreq = this.configForm.timeFreq
                this.currentConfigDim.dimConfig.sortType = this.configForm.sortType
                if (this.configForm.showName) {
                    this.currentConfigDim.dimConfig.showName = this.configForm.showName
                } else {
                    this.currentConfigDim.dimConfig.showName = this.currentConfigDim.colLabel
                }
                this.changeDimStore()
                this.configModalVisible = false
            },
            changeDimStore () {
                let store = this.$store
                this.$store.commit('GeneralChart/updateDimConfig', {
                    main: this.dimList,
                    contrast: this.contrastDimList
                })
            },
            openBatchAdd (batchAddTargetType) {
                this.batchAddModalVisible = true
                this.batchAddTargetType = batchAddTargetType
            },
            submitBatchAdd (checkedColList) {
                checkedColList.forEach(col => {
                    col.dimConfig = {
                        key: col.colName + '_' + new Date().getTime(),
                        showName: col.colLabel,
                        sortType: '0',
                        timeFreq: col.dataType === DataType.date.code ? TimeFreq.day.code : ''
                    }
                    if (this.batchAddTargetType === 0) { // 维度
                        this.dimList.push(col)
                    } else { // 对比
                        this.contrastDimList.push(col)
                    }
                })
                this.changeDimStore()
                this.batchAddModalVisible = false
            }
        },
        mounted () {
            this.dimList = [{"id":47,"tbId":2,"colName":"col_3","colComment":"字段描述信息","colLabel":"创建时间","originalDataType":"DATETIME","dataType":"date","dimConfig":{"key":"col_3_1567243144843","showName":"创建时间","sortType":"0","timeFreq":"day"}},{"id":2,"tbId":2,"colName":"col_1","colComment":"字段描述信息","colLabel":"订单ID","originalDataType":"VARCHAR","dataType":"text","dimConfig":{"key":"col_1_1567243144843","showName":"订单ID","sortType":"0","timeFreq":""}},{"id":25,"tbId":2,"colName":"col_2","colComment":"字段描述信息","colLabel":"订单金额","originalDataType":"BIGINT","dataType":"num","dimConfig":{"key":"col_2_1567243144844","showName":"订单金额","sortType":"0","timeFreq":""}}]
        }
    }
</script>

<style>
    .d-dim-container {
        line-height: 32px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        display: flex;
        flex-flow: row;
        padding: 5px 5px;
    }

    .d-dim-container .label {
        width: 58px;
    }

    .d-dim-container .label i {
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
    }

    .d-dim-container .right-btn,
    .d-dim-container .label i:hover {
        color: #3a8ee6;
    }

    .d-dim-container .drag-container {
        width: calc(100% - 113px);
        display: flex;
        flex-flow: wrap;
    }

    .d-dim-container .right-btn {
        cursor: pointer;
        width: 55px;
        text-align: center;
    }

    .dim-bs-form-label {
        width: 60px;
    }

    .dim-bs-form-input {
        width: 300px;
    }
</style>