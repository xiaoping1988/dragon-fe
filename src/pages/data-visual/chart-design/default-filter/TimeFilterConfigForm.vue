<template>
    <div class="time-filter-config">
        <el-row class="d-row">
            <el-col :span="12">
                <div class="label">
                    时间粒度
                </div>
                <div class="value d-box-middle">
                    <el-radio-group v-model="configForm.timeFreq" @change="changeTimeFreq">
                        <div v-for="item in timeFreqList" :key="item" class="vertical">
                            <el-radio :label="item">{{timeFreqObj[item].name}}</el-radio>
                        </div>
                    </el-radio-group>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="label">条件值</div>
                <div class="value d-box-middle">
                    <el-radio-group v-model="configForm.relativeTimeNum">
                        <div v-for="item in relativeTimeList" :key="item.dateNum" class="vertical">
                            <el-radio :label="item.dateNum">{{item.name}}</el-radio>
                        </div>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>
        <el-row class="d-row">
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
    import {TimeFreq} from '../../constants'
    import {DataType} from '../../../../services/data-map/col-manage'
    export default {
        name: 'DTimeFilterConfigForm',
        props: {
            col: Object
        },
        data () {
            return {
                timeFreqObj: TimeFreq,
                timeFreqList: [],
                relativeTimeList: [],
                configForm: {
                    timeFreq: '', // 粒度，按日按周
                    relativeTimeNum: -1, // 相对计算步长,例近一天，昨天
                    relativeTimeLabel: ''
                }
            }
        },
        methods: {
            initForm () {
                this.configForm.timeFreq = this.col.colConfig.timeFreq
                this.timeFreqList = DataType[this.col.dataType].timeFreq
                this.relativeTimeList = TimeFreq[this.configForm.timeFreq].range
                this.configForm.relativeTimeNum = this.col.colConfig.relativeTimeNum
            },
            submit () {
                this.configForm.relativeTimeLabel = this.relativeTimeList.filter(d => d.dateNum === this.configForm.relativeTimeNum)[0].name
                this.$emit('submit', this.configForm)
            },
            cancel () {
                this.$emit('cancel')
            },
            changeTimeFreq () {
                this.relativeTimeList = TimeFreq[this.configForm.timeFreq].range
                this.configForm.relativeTimeNum = TimeFreq[this.configForm.timeFreq].rangeDefaultDateNum
            }
        },
        mounted () {
            this.initForm()
        }
    }
</script>

<style>
    .time-filter-config {
        width: 100%;
    }

    .time-filter-config .label {
        height: 32px;
        line-height: 32px;
        text-align: center;
    }

    .time-filter-config .value {
        /*padding-left: 45%;*/
    }
</style>