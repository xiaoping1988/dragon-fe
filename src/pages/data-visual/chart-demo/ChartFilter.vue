<template>
    <div style="width: 100%;height: 100%">
        <el-row>
            <DFilterItem :meta="dateFilterColumn" :labelWidth="labelWidth"></DFilterItem>
            <DFilterItem :meta="selectFilterColumn" :labelWidth="labelWidth"></DFilterItem>
            <DFilterItem :meta="numberFilterColumn" :labelWidth="labelWidth"></DFilterItem>
            <DFilterItem :meta="textFilterColumn" :labelWidth="labelWidth"></DFilterItem>
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
    import {FilterControlType, TimeFreq} from '../constants'
    export default {
        name: 'DChartFilterDemo',
        components: {DDatePicker, DSelect, DInputNumber, DInputText, DFilterItem},
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
                dateFilterColumn: {
                    showName: '时间字段',
                    colName: 'createtime',
                    tbId: 1,
                    dbName: 'dw',
                    tbName: 'tb',
                    filterConfig: { // 筛选配置
                        controlType: FilterControlType.date.code, // 筛选控件类型
                        defaultValue: 7, // 默认值
                        dateType: TimeFreq.day.code
                    }
                },
                numberFilterColumn: {
                    showName: '数字字段的所产生的',
                    colName: 'amt',
                    tbId: 1,
                    dbName: 'dw',
                    tbName: 'tb',
                    filterConfig: {
                        controlType: FilterControlType.number.code,
                        defaultValue: '1,5'
                    }
                },
                selectFilterColumn: {
                    showName: '枚举字段',
                    colName: 'state',
                    tbId: 1,
                    dbName: 'dw',
                    tbName: 'tb',
                    filterConfig: {
                        controlType: FilterControlType.select.code,
                        defaultValue: ''
                    }
                },
                textFilterColumn: {
                    showName: '文本字段',
                    colName: 'addr',
                    tbId: 1,
                    dbName: 'dw',
                    tbName: 'tb',
                    filterConfig: {
                        controlType: FilterControlType.text.code,
                        defaultValue: 'xiao'
                    }
                }
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
            }
        }
    }
</script>