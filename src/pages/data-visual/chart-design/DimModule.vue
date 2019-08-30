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
                   width="600px">
            <el-row  class="d-row">
                <el-col :span="8">
                    <el-input suffix-icon="el-icon-search"
                              size="small"
                              clearable
                              v-model.trim="searchColKey"
                              placeholder="请输入关键字搜索"></el-input>
                </el-col>
            </el-row>
            <el-row v-for="(item, i) in searchedColList" :key="i"  class="d-row">
                <el-col :span="5">
                    <el-checkbox v-model="dataTypeChecked[item.code]" @change="(value) => changeDataTypeChecked(value, item)">
                        <i class="fa d-icon" :class="'fa-' + item.icon"></i><span>{{item.name}}</span>
                    </el-checkbox>
                </el-col>
                <el-col :span="19">
                    <el-checkbox-group v-model="checkedColList"
                                       @change="(value) => {changeCheckedCol(value, item)}">
                        <el-checkbox v-for="(city, j) in item.colList"
                                     :key="j"
                                     :label="city.colName">{{city.colLabel}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <DSubmitCancel slot="footer"
                           nohr
                           size="mini"
                           @submit="submitBatchAdd"
                           @cancel="batchAddModalVisible = false"
                           submitText="确定">
            </DSubmitCancel>
        </el-dialog>
    </div>
</template>

<script>
    import {TimeFreq} from '../constants'
    import DDimDragContainer from './DimDragContainer'
    import {DataType} from '../../../services/data-map/col-manage'
    export default {
        name: 'DDimModule',
        components: {DDimDragContainer},
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
                batchAddTargetType: 0, // 批量添加的容器对象,维度0对比1
                allColList: [
                    {colName: 'id', colLabel: '订单ID', dataType: DataType.text.code},
                    {colName: 'date', colLabel: '创建时间', dataType: DataType.date.code},
                    {colName: 'amt', colLabel: '订单金额', dataType: DataType.num.code}
                ], // 所有原始字段
                searchedColList: [], // 批量添加，搜索出来的字段
                searchColKey: '', // 搜索关键字
                checkedColList: [],
                dataTypeChecked: {}
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
            },
            changeDimStore () {

            },
            openBatchAdd (batchAddTargetType) {
                this.batchAddModalVisible = true
                this.batchAddTargetType = batchAddTargetType
                this.checkedColList = []
                this.dataTypeChecked = {}
                this.searchColKey = ''
                this.searchColList()
            },
            submitBatchAdd () {
                this.checkedColList.forEach(colName => {
                    let col = this.allColList.filter(c => c.colName === colName)[0]
                    let tmpCol = JSON.parse(JSON.stringify(col))
                    tmpCol.dimConfig = {
                        key: tmpCol.colName + '_' + new Date().getTime(),
                        showName: tmpCol.colLabel,
                        sortType: '0',
                        timeFreq: tmpCol.dataType === DataType.date.code ? TimeFreq.day.code : ''
                    }
                    if (this.batchAddTargetType === 0) { // 维度
                        this.dimList.push(tmpCol)
                    } else { // 对比
                        this.contrastDimList.push(tmpCol)
                    }
                })
                this.batchAddModalVisible = false
            },
            searchColList () {
                let dateList = [] // 日期
                let textList = [] // 文本
                let numberList = [] // 数值
                let tmpColList = []
                if (this.searchColKey) {
                    tmpColList = this.allColList.filter(c => c.colName.includes(this.searchColKey.toLowerCase()) || c.colLabel.includes(this.searchColKey))
                } else {
                    tmpColList = this.allColList
                }
                tmpColList.forEach(c => {
                    if (c.dataType === DataType.date.code) {
                        dateList.push(c)
                    } else if (c.dataType === DataType.num.code) {
                        numberList.push(c)
                    } else {
                        textList.push(c)
                    }
                })
                let tmpSearchedColList = []
                if (dateList.length) {
                    tmpSearchedColList.push({
                        code: DataType.date.code,
                        name: '日期',
                        icon: DataType.date.icon,
                        colList: dateList
                    })
                }
                if (textList.length) {
                    tmpSearchedColList.push({
                        code: DataType.text.code,
                        name: '文本',
                        icon: DataType.text.icon,
                        colList: textList
                    })
                }
                if (numberList.length) {
                    tmpSearchedColList.push({
                        code: DataType.num.code,
                        name: '数值',
                        icon: DataType.num.icon,
                        colList: numberList
                    })
                }
                this.searchedColList = tmpSearchedColList
            },
            setDataTypeChecked (dataType) {
                this.dataTypeChecked[dataType.code] = true
                for (let i in dataType.colList) {
                    if (!this.checkedColList.includes(dataType.colList[i].colName)) {
                        this.dataTypeChecked[dataType.code] = false
                        break
                    }
                }
            },
            changeCheckedCol (value, dataType) {
                this.setDataTypeChecked(dataType)
                this.$forceUpdate()
            },
            changeDataTypeChecked (value, dataType) {
                if (value) {
                    dataType.colList.forEach(c => {
                        if (!this.checkedColList.includes(c.colName)) {
                            this.checkedColList.push(c.colName)
                        }
                    })
                } else {
                    let delIndex = []
                    this.checkedColList.forEach((colName, i) => {
                        let j = dataType.colList.findIndex(c => c.colName === colName)
                        if (j >= 0) {
                            delIndex.push(i)
                        }
                    })
                    delIndex.forEach((d, i) => {
                        this.checkedColList.splice(d - i, 1)
                    })
                }
            }
        },
        watch: {
            searchColKey () {
                this.searchColList()
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
        width: 300px;
    }
</style>