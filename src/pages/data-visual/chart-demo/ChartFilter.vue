<template>
    <div style="width: 100%">
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
                            width="300px"
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
                            :value="-99"
                            width="300px"
                            customDate="2019-08-01,2019-08-08 12:10:11"
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
                            width="300px"
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
                            width="300px"
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
                            :value="-99"
                            customDate="2018"
                            width="300px"
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
                            width="300px"
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
                    <DSelect width="300px"
                             value="全部"
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

        </el-row>
        <el-row>
            <h2>文本框</h2>
        </el-row>
        <el-row>

        </el-row>
    </div>
</template>

<script>
    import DDatePicker from '../chart-filter/DatePicker'
    import DSelect from '../chart-filter/Select'
    export default {
        name: 'DChartFilterDemo',
        components: {DDatePicker, DSelect},
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
                selectValue: ''
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
            changeSelect (conditionValue) {
                this.selectValue = conditionValue
            }
        }
    }
</script>