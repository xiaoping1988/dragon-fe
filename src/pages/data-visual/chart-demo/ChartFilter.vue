<template>
    <div style="width: 100%;height: 100%">
        <el-row>
            <h2>筛选项列表：纵向</h2>
        </el-row>
        <el-row>
            <!--<DFilterItem :meta="dateFilterColumn" :labelWidth="labelWidth"></DFilterItem>-->
            <!--<DFilterItem :meta="selectFilterColumn" :labelWidth="labelWidth"></DFilterItem>-->
            <!--<DFilterItem :meta="numberFilterColumn" :labelWidth="labelWidth"></DFilterItem>-->
            <!--<DFilterItem :meta="textFilterColumn" :labelWidth="labelWidth"></DFilterItem>-->
            <div class="d-ellipsis">
                <span class="d-chart-filter-tip">
                    <span v-for="(item, index) in showLabelArr"
                          v-if="item.value !== '' && item.value !== '全部'"
                          :key="index"
                          class="item">
                        <span class="label">{{item.colLabel}}</span>
                        <span class="value">{{item.showLabel}}</span>
                    </span>
                </span>
            </div>
            <DFilterList :data="filterList" @inited="initedFilterList" @change="changeCondition"></DFilterList>
        </el-row>
        <el-row>
            <h2>筛选项列表：水平</h2>
        </el-row>
        <el-row>
            <DFilterList :data="filterList" horizontal></DFilterList>
        </el-row>
        <el-row>
            <h2>日期</h2>
        </el-row>
        <el-row>
            <el-col :span="12" class="d-desclist-index">
                <div class="d-desclist-index-term">单选</div>
                <div class="d-desclist-index-detail">
                    <div>
                        <span>条件值: {{singleDayValue}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>显示: {{singleDayLabel}}</span>
                    </div>
                    <DDatePicker
                            type="day"
                            :value="1"
                            :width="300"
                            @inited="changeDay"
                            @change="changeDay"></DDatePicker>
                </div>

            </el-col>
            <el-col :span="12" class="d-desclist-index">
                <div class="d-desclist-index-term">区间选</div>
                <div class="d-desclist-index-detail">
                    <div>
                        <span>条件值: {{rangeDayValue}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>显示: {{rangeDayLabel}}</span>
                    </div>
                    <DDatePicker
                            type="day"
                            range
                            value="2019-08-01,2019-08-08 12:10:11"
                            :width="300"
                            @inited="changeDayRange"
                            @change="changeDayRange"></DDatePicker>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <h2>月</h2>
        </el-row>
        <el-row>
            <el-col :span="12" class="d-desclist-index">
                <div class="d-desclist-index-term">单选</div>
                <div class="d-desclist-index-detail">
                    <div>
                        <span>条件值: {{singleMonthValue}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>显示: {{singleMonthLabel}}</span>
                    </div>
                    <DDatePicker
                            type="month"
                            :value="0"
                            :width="300"
                            @inited="changeMonth"
                            @change="changeMonth"></DDatePicker>
                </div>

            </el-col>
            <el-col :span="12" class="d-desclist-index">
                <div class="d-desclist-index-term">区间选</div>
                <div class="d-desclist-index-detail">
                    <div>
                        <span>条件值: {{rangeMonthValue}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>显示: {{rangeMonthLabel}}</span>
                    </div>
                    <DDatePicker
                            type="month"
                            range
                            :value="1"
                            :width="300"
                            @inited="changeMonthRange"
                            @change="changeMonthRange"></DDatePicker>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <h2>年</h2>
        </el-row>
        <el-row>
            <el-col :span="12" class="d-desclist-index">
                <div class="d-desclist-index-term">单选</div>
                <div class="d-desclist-index-detail">
                    <div>
                        <span>条件值: {{singleYearValue}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>显示: {{singleYearLabel}}</span>
                    </div>
                    <DDatePicker
                            type="year"
                            value="2018"
                            :width="300"
                            @inited="changeYear"
                            @change="changeYear"></DDatePicker>
                </div>

            </el-col>
            <el-col :span="12" class="d-desclist-index">
                <div class="d-desclist-index-term">区间选</div>
                <div class="d-desclist-index-detail">
                    <div>
                        <span>条件值: {{rangeYearValue}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>显示: {{rangeYearLabel}}</span>
                    </div>
                    <DDatePicker
                            type="year"
                            range
                            :value="3"
                            :width="300"
                            @inited="changeYearRange"
                            @change="changeYearRange"></DDatePicker>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <h2>下拉框</h2>
        </el-row>
        <el-row>
            <el-col :span="12" class="d-desclist-index">
                <div class="d-desclist-index-detail">
                    <div>
                        <span>条件值: {{selectValue}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>显示: {{selectValue}}</span>
                    </div>
                    <DSelect :width="300"
                             value=""
                             :data="selectData"
                             @inited="changeSelect"
                             @change="changeSelect"></DSelect>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <h2>数字框</h2>
        </el-row>
        <el-row>
            <el-col :span="12" class="d-desclist-index">
                <div class="d-desclist-index-detail">
                    <div>
                        <span>条件值: {{numValue}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>显示: {{numLabel}}</span>
                    </div>
                    <DInputNumber :width="300"
                             value="1,"
                             @inited="changeNumber"
                             @change="changeNumber"></DInputNumber>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <h2>文本框</h2>
        </el-row>
        <el-row>
            <div class="d-desclist-index-detail">
                <div>
                    <span>条件值: {{inputValue}}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>显示: {{inputValue}}</span>
                </div>
                <DInputText :width="300"
                            value="小学生"
                            @inited="changeInput"
                            @change="changeInput"></DInputText>
            </div>
        </el-row>
    </div>
</template>

<script>
    import DDatePicker from '../chart-filter/DatePicker'
    import DSelect from '../chart-filter/Select'
    import DInputNumber from '../chart-filter/InputNumber'
    import DInputText from '../chart-filter/InputText'
    import DFilterItem from '../chart-filter/FilterItem'
    import DFilterList from '../chart-filter/FilterList'
    import {FilterControlType, TimeFreq, Operator} from '../constants'
    import {DataType} from '../../../services/data-map/col-manage'
    let dateFilterColumn = {
        colLabel: '时间字段',
        colName: 'createtime',
        tbId: 1,
        dbName: 'dw',
        tbName: 'tb',
        dataType: DataType.date.code, // 数据类型
        colConfig: { // 筛选配置
            controlType: FilterControlType.date.code, // 筛选控件类型
            oper: Operator.between.code,
            defaultValue: 7, // 默认值
            timeFreq: TimeFreq.day.code // 日期类型
        }
    }
    let numberFilterColumn = {
        colLabel: '数字字段的所产生的',
        colName: 'amt',
        tbId: 1,
        dbName: 'dw',
        tbName: 'tb',
        dataType: DataType.num.code, // 数据类型
        colConfig: {
            controlType: FilterControlType.num.code,
            defaultValue: '1,5',
            oper: Operator.between.code
        }
    }
    let selectFilterColumn = {
        colLabel: '枚举字段',
        colName: 'state',
        tbId: 1,
        dbName: 'dw',
        tbName: 'tb',
        dataType: DataType.text.code, // 数据类型
        colConfig: {
            controlType: FilterControlType.select.code,
            oper: Operator.in.code,
            defaultValue: '北京'
        }
    }
    let textFilterColumn = {
        colLabel: '文本字段',
        colName: 'addr',
        tbId: 1,
        dbName: 'dw',
        tbName: 'tb',
        dataType: DataType.text.code, // 数据类型
        colConfig: {
            controlType: FilterControlType.text.code,
            defaultValue: 'xiao',
            oper: Operator.like.code
        }
    }
    export default {
        name: 'DChartFilterDemo',
        components: {DDatePicker, DSelect, DInputNumber, DInputText, DFilterItem, DFilterList},
        data () {
            return {
                singleDayValue: '',
                singleDayLabel: '',
                rangeDayValue: '',
                rangeDayLabel: '',
                singleMonthValue: '',
                singleMonthLabel: '',
                rangeMonthValue: '',
                rangeMonthLabel: '',
                singleYearValue: '',
                singleYearLabel: '',
                rangeYearValue: '',
                rangeYearLabel: '',
                selectData: ['开始','的说法','定时','dsfa','的为','的说法为','权威','ytry','复旦复华',
                    '挂号费v','贵好几倍v','到生产','萨达','下单','请遵守','规范化','奥德赛'],
                selectValue: '',
                numValue: '',
                numLabel: '',
                inputValue: '',
                labelWidth: 130,
                dateFilterColumn: dateFilterColumn,
                numberFilterColumn: numberFilterColumn,
                selectFilterColumn: selectFilterColumn,
                textFilterColumn: textFilterColumn,
                filterList: [dateFilterColumn, numberFilterColumn, selectFilterColumn, textFilterColumn],
                conditionValueArr: [],
                showLabelArr: []
            }
        },
        methods: {
            changeDay (conditionValue, showLabel) {
                this.singleDayValue = conditionValue
                this.singleDayLabel = showLabel
            },
            changeDayRange (conditionValue, showLabel) {
                this.rangeDayValue = conditionValue
                this.rangeDayLabel = showLabel
            },
            changeMonth (conditionValue, showLabel) {
                this.singleMonthValue = conditionValue
                this.singleMonthLabel = showLabel
            },
            changeMonthRange (conditionValue, showLabel) {
                this.rangeMonthValue = conditionValue
                this.rangeMonthLabel = showLabel
            },
            changeYear (conditionValue, showLabel) {
                this.singleYearValue = conditionValue
                this.singleYearLabel = showLabel
            },
            changeYearRange (conditionValue, showLabel) {
                this.rangeYearValue = conditionValue
                this.rangeYearLabel = showLabel
            },
            changeSelect (conditionValue, showLabel) {
                this.selectValue = conditionValue
            },
            changeNumber (conditionValue, showLabel) {
                this.numValue = conditionValue
                this.numLabel = showLabel
            },
            changeInput (conditionValue, showLabel) {
                this.inputValue = conditionValue
            },
            initedFilterList (conditionValueArr, showLabelArr) {
                this.conditionValueArr = conditionValueArr
                this.showLabelArr = showLabelArr
            },
            changeCondition (conditionValueArr, showLabelArr) {
                this.conditionValueArr = conditionValueArr
                this.showLabelArr = showLabelArr
            }
        }
    }
</script>

<style>
    .d-chart-filter-tip .item {
        padding-right: 10px;
    }

    .d-chart-filter-tip .item .label {
        font-weight: 100;
        color: #ccc;
        padding-right: 5px;
    }

    .d-chart-filter-tip .item .value {
        font-weight: 100;
    }
</style>