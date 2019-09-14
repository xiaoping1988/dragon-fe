<template>
    <div style="width: 100%">
        <el-row class="filter-config-form d-row">
            <el-col :span="8" class="panel-item">
                <div class="head-label">字段</div>
                <div class="search">
                    <el-input
                            size="mini"
                            clearable
                            placeholder="搜索字段"
                            suffix-icon="el-icon-search"
                            v-model.trim="colKeyword">
                    </el-input>
                </div>
                <ul class="col-list">
                    <li v-for="col in searchedColList" :key="col.colName">
                        <div class="col-item"
                             :title="col.colName">
                            <div class="pre-icon">
                                <i class="fa" :class="'fa-' + dataTypeObj[col.dataType].icon"></i>
                            </div>
                            <div class="col-label d-ellipsis">
                                {{col.colLabel}}
                            </div>
                            <div class="btn">
                                <el-button type="text" size="mini" @click="addFilter(col)">添加</el-button>
                            </div>
                        </div>
                    </li>
                </ul>
            </el-col>
            <el-col :span="8" class="panel-item">
                <div class="head-label">已添加</div>
                <ul class="col-list">
                    <li v-for="(col, index) in filterList" :key="col.colName">
                        <div class="col-item"
                             :title="col.colName"
                             :class="{active: col.colName === activeConfigFilter.colName}">
                            <div class="pre-icon">
                                <i class="fa" :class="'fa-' + dataTypeObj[col.dataType].icon"></i>
                            </div>
                            <div class="col-label d-ellipsis" @click="configFilter(col)">
                                {{col.colLabel}}
                            </div>
                            <div class="btn">
                                <el-button type="text" size="mini" @click="removeFilter(index)">删除</el-button>
                            </div>
                        </div>
                    </li>
                </ul>
            </el-col>
            <el-col :span="8" class="panel-item">
                <div class="head-label">配置</div>
                <div v-if="activeConfigFilter.colName">
                    <div v-if="filterControlTypeObj.date.code === activeConfigFilter.colConfig.controlType">
                        <el-row class="d-row">
                            <el-radio-group v-model="activeConfigFilter.colConfig.timeFreq" @change="changeTimeFreq">
                                <el-radio v-for="item in timeFreqList" :key="item.code" :label="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-row>
                        <DDatePicker
                                :type="activeConfigFilter.colConfig.timeFreq"
                                range
                                :value="activeConfigFilter.colConfig.defaultValue"
                                @change="changeFilterDefaultValue"></DDatePicker>
                    </div>
                    <div v-if="activeConfigFilter.dataType === dataTypeObj.text.code">
                        <el-row class="d-row">
                            <el-radio-group v-model="activeConfigFilter.colConfig.controlType">
                                <el-radio label="select">
                                    <el-tooltip effect="dark" content="建议枚举值使用下拉框精确筛选" placement="top">
                                        <span>下拉框</span>
                                    </el-tooltip>
                                </el-radio>
                                <el-radio label="text">

                                    <el-tooltip effect="dark" content="建议长文本值使用文本框模糊筛选" placement="top">
                                        <span>文本框</span>
                                    </el-tooltip>
                                </el-radio>
                            </el-radio-group>
                        </el-row>
                        <DSelect v-if="filterControlTypeObj.select.code === activeConfigFilter.colConfig.controlType"
                                 :value="activeConfigFilter.colConfig.defaultValue"
                                 :data="selectData"
                                 @focus="setSelectData"
                                 @change="changeFilterDefaultValue"></DSelect>
                        <DInputText  v-if="filterControlTypeObj.text.code === activeConfigFilter.colConfig.controlType"
                                     :value="activeConfigFilter.colConfig.defaultValue"
                                     @change="changeFilterDefaultValue"></DInputText>
                    </div>

                    <DInputNumber v-if="filterControlTypeObj.num.code === activeConfigFilter.colConfig.controlType"
                                  :value="activeConfigFilter.colConfig.defaultValue"
                                  @change="changeFilterDefaultValue"></DInputNumber>
                    <DLoading :loading="selectLoading" style="height: 100px"></DLoading>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <DSubmitCancel nohr
                           size="mini"
                           @submit="submit"
                           @cancel="cancel"
                           submitText="确定">
            </DSubmitCancel>
        </el-row>
    </div>
</template>

<script>
    import {DataType} from '../../../../services/data-map/col-manage'
    import {FilterControlType, Operator, TimeFreq} from '../../constants'
    import DDatePicker from '../../chart-filter/DatePicker'
    import DSelect from '../../chart-filter/Select'
    import DInputNumber from '../../chart-filter/InputNumber'
    import DInputText from '../../chart-filter/InputText'
    import {querySelectData} from '../../../../services/data-visual/filter'
    export default {
        name: 'DChartInsideFilterConfigForm',
        components: {DDatePicker, DSelect, DInputNumber, DInputText},
        data () {
            return {
                filterControlTypeObj: FilterControlType,
                dataTypeObj: DataType,
                searchedColList: [],
                colKeyword: '',
                filterList: [],
                activeConfigFilter: {},
                selectLoading: false,
                selectData:[],
                initedSelectData: false,
                timeFreqList: []
            }
        },
        methods: {
            initConfigForm () {
                this.colKeyword = ''
                this.filterList = JSON.parse(JSON.stringify(this.$store.state.GeneralChart.editConfig.chartFilterMeta))
                this.searchColList()
                if (this.filterList.length) {
                    this.setActiveConfigFilter(this.filterList[0])
                }
            },
            searchColList () {
                let tmpAllColList = JSON.parse(JSON.stringify(this.$store.state.GeneralChart.workTableColList))
                let tmpColList = []
                if (this.colKeyword) {
                    tmpColList = tmpAllColList.filter(c => c.colName.includes(this.colKeyword.toLowerCase()) || c.colLabel.includes(this.colKeyword))
                } else {
                    tmpColList = tmpAllColList
                }
                this.searchedColList = tmpColList
            },
            addFilter (col) {
                let i = this.filterList.findIndex(c => c.colName === col.colName)
                if (i >= 0) {
                    this.$messageWarn('此字段已添加筛选!')
                    return
                }
                let tempCol = JSON.parse(JSON.stringify(col))
                let controlType
                let oper
                let defaultValue = ''
                let timeFreq
                if (tempCol.dataType === DataType.text.code) {
                    controlType = FilterControlType.select.code
                    oper = Operator.in.code
                } else if (tempCol.dataType === DataType.num.code) {
                    controlType = FilterControlType.num.code
                    oper = Operator.between.code
                } else {
                    controlType = FilterControlType.date.code
                    oper = Operator.between.code
                    if (tempCol.dataType === DataType.date.code || tempCol.dataType === DataType.text_day_8.code || tempCol.dataType === DataType.text_day_10.code) {
                        timeFreq = TimeFreq.day.code
                        defaultValue = TimeFreq.day.rangeDefaultDateNum
                    } else if (tempCol.dataType === DataType.text_month_6.code || tempCol.dataType === DataType.text_month_7.code) {
                        timeFreq = TimeFreq.month.code
                        defaultValue = TimeFreq.month.rangeDefaultDateNum
                    } else if (tempCol.dataType === DataType.text_year.code) {
                        timeFreq = TimeFreq.year.code
                        defaultValue = TimeFreq.year.rangeDefaultDateNum
                    }
                }
                tempCol.colConfig = {
                    controlType: controlType, // 筛选控件类型
                    oper: oper,
                    defaultValue: defaultValue, // 默认值
                    timeFreq: timeFreq // 日期类型
                }
                this.filterList.push(tempCol)
                this.setActiveConfigFilter(tempCol)
            },
            removeFilter (index) {
                if (this.filterList[index].colName === this.activeConfigFilter.colName) {
                    this.activeConfigFilter = {}
                }
                this.filterList.splice(index, 1)
            },
            configFilter (col) {
                this.setActiveConfigFilter(col)
            },
            setActiveConfigFilter (col) {
                this.activeConfigFilter = col
                this.initedSelectData = false
                if (col.colConfig.controlType === FilterControlType.date.code) {
                    if (col.dataType === DataType.date.code) {
                        this.timeFreqList = [TimeFreq.day, TimeFreq.month, TimeFreq.year]
                    } else if (col.dataType === DataType.text_day_8.code || col.dataType === DataType.text_day_10.code) {
                        this.timeFreqList = [TimeFreq.day]
                    } else if (col.dataType === DataType.text_month_6.code || col.dataType === DataType.text_month_7.code) {
                        this.timeFreqList = [TimeFreq.month]
                    } else if (col.dataType === DataType.text_year.code) {
                        this.timeFreqList = [TimeFreq.year]
                    }
                }
            },
            changeTimeFreq (timeFreq) {
                this.activeConfigFilter.colConfig.defaultValue = TimeFreq[timeFreq].rangeDefaultDateNum
            },
            changeFilterDefaultValue (value, showLabel, relativeDateNum) {
                if (relativeDateNum === undefined) {
                    this.activeConfigFilter.colConfig.defaultValue = value
                } else {
                    this.activeConfigFilter.colConfig.defaultValue = relativeDateNum
                }
            },
            setSelectData () {
                if (this.initedSelectData) {
                    return
                }
                this.selectLoading = true
                querySelectData({
                    tbId: this.activeConfigFilter.tbId,
                    tbName: this.activeConfigFilter.tbName,
                    dbName: this.activeConfigFilter.dbName,
                    colName: this.activeConfigFilter.colName
                }).then(res => {
                    this.initedSelectData = true
                    this.selectLoading = false
                    this.selectData = res.data
                }).catch(error => {
                    this.$handleError(error)
                    this.selectLoading = false
                })
            },
            submit () {
                this.$emit('submit', this.filterList)
            },
            cancel () {
                this.$emit('cancel')
            }
        },
        watch: {
            colKeyword () {
                this.searchColList()
            }
        },
        mounted () {
            this.initConfigForm()
        }
    }
</script>

<style>

    .filter-config-form {
        background: #ffffff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding: 10px;
        box-sizing: border-box;
        height: 330px;
    }

    .filter-config-form .head-label {
        margin-bottom: 10px;
    }

    .filter-config-form .col-list {
        height: calc(100% - 60px);
        overflow: auto;
    }

    .filter-config-form .col-list li {
        padding: 0px;
    }

    .filter-config-form .col-list .col-item {
        cursor: pointer;
        box-sizing: border-box;
        width: 100%;
        height: 32px;
        line-height: 32px;
        display: flex;
        padding-left: 10px;
        padding-right: 10px;
    }

    .filter-config-form .col-list .col-item .pre-icon {
        width: 18px;
        color: #3a8ee6;
    }

    .filter-config-form .col-list .col-item .btn {
        display: none;
        width: 26px;
    }

    .filter-config-form .col-list .col-item:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    .filter-config-form .col-list .col-item.active {
        background: rgba(0, 0, 0, 0.1);
    }

    .filter-config-form .col-list .col-item:hover .btn {
        display: inline-flex;
    }

    .filter-config-form .col-list .col-item .col-label {
        flex-grow: 1;
    }

    .filter-config-form .panel-item {
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
    }

    .filter-config-form .panel-item:first-child {
        padding-right: 5px;
    }

    .filter-config-form .panel-item:nth-child(2) {
        padding-left: 5px;
        padding-right: 5px;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        border-right: 1px solid rgba(0, 0, 0, 0.1);
    }

    .filter-config-form .panel-item:last-child {
        padding-left: 5px;
    }
</style>