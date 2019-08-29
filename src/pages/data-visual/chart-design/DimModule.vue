<template>
    <div class="d-chart-dim">
        <div class="d-dim-container">
            <div class="label">
                <span>维度</span>
                <i class="fa fa-pencil" title="批量添加"></i>
            </div>
            <ul class="drag-container">
                <li v-for="(item, index) in dimList" :key="index" class="drag-item">
                    <div class="tag-item" @click="openConfig(item)">
                        <div>
                            <span>{{item.dimConfig.showName}}</span>
                            <span v-if="item.dimConfig.timeFreq">(按{{timeFreqObj[item.dimConfig.timeFreq].name}})</span>
                        </div>
                        <div class="btn">
                            <i class="fa fa-times-circle" title="移除字段" @click="removeDim(index)"></i>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="!hasContrast" class="right-btn" @click="addContrast"><span>添加对比</span></div>
        </div>
        <div v-if="hasContrast" class="d-dim-container">
            <div class="label">对比</div>
            <ul class="drag-container"></ul>
            <div class="right-btn" @click="removeContrast"><span>移除对比</span></div>
        </div>
        <el-dialog :visible.sync="configModalVisible"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false" width="400px">
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
    </div>
</template>

<script>
    import {TimeFreq} from '../constants'
    export default {
        name: 'DDimModule',
        data () {
            return {
                timeFreqObj: TimeFreq,
                timeFreqList: Object.values(TimeFreq),
                dimList: [
                    {
                        colLabel: 'xxx',
                        dimConfig: {
                            key: 'col_1',
                            showName: '订单类型',
                            timeFreq: '',
                            sortType: '0'
                        }
                    },
                    {
                        colLabel: 'yyy',
                        dimConfig: {
                            key: 'col_1',
                            showName: '日期',
                            timeFreq: TimeFreq.day.code,
                            sortType: '0'
                        }
                    }
                ], // 维度集合
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
                activeConfigTab: ''
            }
        },
        methods: {
            addContrast () {
                this.hasContrast = true
            },
            removeContrast () {
                this.hasContrast = false
                this.contrastDimList = []
            },
            removeDim (index) {
                this.dimList.splice(index, 1)
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
                this.configModalVisible = false
            }
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
        width: 48px;
    }

    .d-dim-container .label i {
        margin-left: 10px;
        cursor: pointer;
    }

    .d-dim-container .right-btn,
    .d-dim-container .label i:hover {
        color: #3a8ee6;
    }

    .d-dim-container .drag-container {
        width: calc(100% - 103px);
        display: flex;
        flex-flow: wrap;
    }

    .d-dim-container .right-btn {
        cursor: pointer;
        width: 55px;
        text-align: center;
    }

    .drag-container .drag-item {
        padding: 0px;
        margin-top: 5px;
        cursor: pointer;
    }

    .tag-item {
        width: fit-content;
        height: 28px;
        color: #FFF;
        background-color: #5182E4;
        margin-right: 5px;
        border-top-right-radius:10px;
        display: flex;
        line-height: 28px;
        padding: 0px 8px;
    }

    .tag-item .btn {
        width: 18px;
        text-align: center;
        line-height: 30px;
    }

    .tag-item .btn i {
        font-size: 14px;
        display: none;
    }

    .tag-item:hover .btn i {
        display: inline-block;
    }

    .tag-item .btn i:hover {
        color: #cccccc;
    }

    .dim-bs-form-label {
        width: 60px;
    }

    .dim-bs-form-input {
        width: 200px;
    }
</style>