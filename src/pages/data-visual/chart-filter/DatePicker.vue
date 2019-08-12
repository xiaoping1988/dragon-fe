<template>
    <div>
        <el-select
                v-model="currentValue"
                size="mini"
                @change="changeDateOption"
                ref="Select"
                :style="{width: width + 'px'}">
            <el-option :value="allValue" label="全部">全部</el-option>
            <el-option v-for="(item, index) in optionList" :value="item.dateNum" :key="index" :label="item.name">{{ item.name }}</el-option>
            <el-option :value="customDateOptionValue" label="自定义时间">自定义时间</el-option>
        </el-select>
        <el-dialog
                :visible.sync="customDateForm.showModal"
                title="自定义时间"
                width="720px"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false">
            <div class="d-box-middle">
                <el-date-picker
                        size="mini"
                        v-model="customDateForm.startDate"
                        :editable="false"
                        :type="datePickerType"
                        :value-format="dateValueFormat"
                        placeholder="开始时间"
                        style="width: 324px"
                        default-time="00:00:00"
                        @change="changStartDate"></el-date-picker>
                <span v-if="range" style="margin-left: 10px; margin-right: 10px">~</span>
                <el-date-picker v-if="range"
                                size="mini"
                                v-model="customDateForm.endDate"
                                :editable="false"
                                :type="datePickerType"
                                :value-format="dateValueFormat"
                                placeholder="结束时间"
                                style="width: 324px"
                                default-time="23:59:59"
                                @change="changEndDate"></el-date-picker>
            </div>
            <div slot="footer">
                <DSubmitCancel @submit="saveCustomDate" @cancel="cancelEditCustomDate" nohr></DSubmitCancel>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {TimeFreq} from '../constants'
    export default {
        name: 'DDatePicker',
        props: {
            type: {
                type: String,
                required: true,
                validator: function (value) {
                    return value === TimeFreq.day.code ||
                        value === TimeFreq.month.code ||
                        value === TimeFreq.year.code
                }
            }, // day日,month月,year年
            range: Boolean, // 是否区间
            value: [String, Number], //
            customDate: String, // 自定义时间的值
            width: Number
        },
        data () {
            return {
                customDateForm: {
                    showModal: false,
                    startDate: '',
                    endDate: ''
                },
                allValue: '全部', // 全部
                customDateOptionValue: -99, // 自定义时间选项的值
                lastSelectOptionValue: '', // 切换选项的上一个选项值
                showLabel: '', // 要显示的label
                currentValue: '', // 当前选中值
                currentDateStr: '', // 当前选中值，转义成查询条件值
                optionList: []
            }
        },
        computed: {
            datePickerType () {
                if (this.type === TimeFreq.day.code) {
                    return this.range ? 'datetime' : 'date'
                } else if (this.type === TimeFreq.month.code) {
                    return 'month'
                } else if (this.type === TimeFreq.year.code) {
                    return 'year'
                }
                return ''
            },
            dateValueFormat () {
                if (this.type === TimeFreq.day.code) {
                    return this.range ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'
                } else if (this.type === TimeFreq.month.code) {
                    return 'yyyy-MM'
                } else if (this.type === TimeFreq.year.code) {
                    return 'yyyy'
                }
                return 'yyyy-MM-dd'
            }
        },
        methods: {
            initData () {
                if (this.type === TimeFreq.day.code ||
                    this.type === TimeFreq.month.code ||
                    this.type === TimeFreq.year.code) { // 目前只支持日月年
                    if (this.range) {
                        this.optionList = TimeFreq[this.type].range
                    } else {
                        this.optionList = TimeFreq[this.type].single
                    }
                    if (Number(this.value) === this.allValue) { // 全部
                        this.showLabel = ''
                        this.currentDateStr = ''
                        this.currentValue = Number(this.value)
                    } else if (Number(this.value) === this.customDateOptionValue) { // 自定义时间
                        this.currentDateStr = this.customDate
                        this.lastSelectOptionValue = this.customDateOptionValue
                        if (this.range) {
                            let dates = this.customDate.split(',')
                            this.customDateForm.startDate = dates[0]
                            if (this.type === TimeFreq.day.code && this.customDateForm.startDate.length === 10) {
                                this.customDateForm.startDate = this.customDateForm.startDate + ' 00:00:00'
                            }
                            this.customDateForm.endDate = dates[1]
                            this.showLabel = dates[0] + '~' + dates[1]
                        } else {
                            this.customDateForm.startDate = this.customDate
                            this.showLabel = this.customDate
                        }
                        this.$nextTick(function () {
                            this.currentValue = this.showLabel
                        })
                    } else {
                        this.currentDateStr = TimeFreq[this.type].getDateStr(this.value, this.range)
                        let dds = this.optionList.filter(d => d.dateNum === Number(this.value))
                        if (dds.length) {
                            this.showLabel = dds[0].name
                            this.lastSelectOptionValue = Number(this.value)
                            this.currentValue = Number(this.value)
                        }
                    }
                    this.$emit('inited', this.currentDateStr, this.showLabel)
                } else {
                    console.warn('目前只支持日月年的类型')
                }
            },
            changeDateOption (value) {
                if (value === this.allValue) { // 全部
                    this.$emit('change', '', '')
                    this.lastSelectOptionValue = value
                } else if (value === this.customDateOptionValue) { // 自定义时间,弹出操作界面
                    this.openCustomDateForm()
                } else {
                    let option = this.optionList.filter(o => o.dateNum === value)[0]
                    this.showLabel = option.name
                    this.currentDateStr = TimeFreq[this.type].getDateStr(value, this.range)
                    this.$emit('change', this.currentDateStr, this.showLabel)
                    this.lastSelectOptionValue = value
                }
            },
            changStartDate (value) {
                // this.customDateForm.startDate = value
            },
            changEndDate (value) {
                // this.customDateForm.endDate = value
            },
            openCustomDateForm () {
                this.customDateForm.showModal = true
            },
            validCustomDateForm () {
                if (!this.customDateForm.startDate) {
                    this.$messageWarn('请选择开始时间!')
                    return false
                }
                if (this.range) { // 区间
                    if (!this.customDateForm.endDate) {
                        this.$messageWarn('请选择结束时间!')
                        return false
                    }
                    if (this.customDateForm.startDate > this.customDateForm.endDate) {
                        this.$messageWarn('结束时间必须大于或等于开始时间!')
                        return false
                    }
                }
                return true
            },
            saveCustomDate () {
                if (!this.validCustomDateForm()) {
                    return
                }
                let tmpStartDate = this.customDateForm.startDate
                if (tmpStartDate.includes('00:00:00')) {
                    tmpStartDate = tmpStartDate.substr(0, 10)
                }
                this.currentDateStr = tmpStartDate
                this.showLabel = tmpStartDate
                if (this.range) {
                    this.currentDateStr = this.currentDateStr + ',' + this.customDateForm.endDate
                    this.showLabel = this.showLabel + '~' + this.customDateForm.endDate
                }
                this.$emit('change', this.currentDateStr, this.showLabel)
                this.lastSelectOptionValue = this.customDateOptionValue
                this.customDateForm.showModal = false
                this.currentValue = this.showLabel
            },
            cancelEditCustomDate () {
                this.customDateForm.showModal = false
                if (this.lastSelectOptionValue === this.customDateOptionValue) {
                    this.currentValue = this.showLabel
                } else {
                    this.currentValue = this.lastSelectOptionValue
                }
            }
        },
        watch: {
            range () {
                this.initData()
            },
            type () {
                this.initData()
            }
        },
        mounted () {
            this.initData()
        }
    }
</script>