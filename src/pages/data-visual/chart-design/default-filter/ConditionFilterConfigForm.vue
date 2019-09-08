<template>
    <div class="conditioin-filter-config">
        <el-row class="d-row">
            <el-select v-model="configForm.conditionSpliceType"
                       size="mini">
                <el-option v-for="item in conditionSpliceTypeList" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
        </el-row>
        <el-row class="d-row condition-row">
            <el-col :span="3">
                {{col.colLabel}}
            </el-col>
            <el-col :span="6">
                <el-select v-model="conditionForm.oper"
                           size="mini"
                           placeholder="请选择条件"
                           style="width: 100%">
                    <el-option v-for="item in operatorList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-col>
            <el-col :span="13">
                <el-input
                        size="mini"
                        clearable
                        :disabled="conditionForm.oper === 'empty' || conditionForm.oper === 'unempty'"
                        :style="conditionInputStyle"
                        placeholder="请输入条件"
                        v-model.trim="conditionForm.value">
                </el-input>
                <span v-if="conditionForm.oper === 'between' || conditionForm.oper === 'unbetween'">~</span>
                <el-input
                        v-if="conditionForm.oper === 'between' || conditionForm.oper === 'unbetween'"
                        size="mini"
                        clearable
                        :style="conditionInputStyle"
                        placeholder="请输入条件"
                        v-model.trim="conditionForm.value2">
                </el-input>
            </el-col>
            <el-col :span="2" class="condition-btn" @click.native="addCondition">
                <i class="fa fa-plus" title="新增条件"></i>
            </el-col>
        </el-row>
        <el-row class="d-row condition-row" v-for="(item, index) in configForm.conditionList" :key="index">
            <el-col :span="3">
                {{col.colLabel}}
            </el-col>
            <el-col :span="6">
                {{operatorObj[item.oper].name}}
            </el-col>
            <el-col :span="13">
                <span>&nbsp;{{item.value}}</span>
            </el-col>
            <el-col :span="2" class="condition-btn" @click.native="removeCondition(index)">
                <i class="fa fa-minus" title="删除条件"></i>
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
    import {ConditionSpliceType, Operator} from '../../constants'
    export default {
        name: 'DAccurateFilterConfigForm',
        props: {
            col: Object
        },
        data () {
            return {
                operatorObj: Operator,
                operatorList: Object.values(Operator).filter(c => c.code !== 'in' && c.code !== 'notin'),
                conditionSpliceTypeList: Object.values(ConditionSpliceType),
                configForm: {
                    conditionSpliceType: ConditionSpliceType.and.code,
                    conditionList: []
                },
                conditionForm: {
                    oper: '',
                    value: '',
                    value2: ''
                }
            }
        },
        computed: {
            conditionInputStyle () {
                if (this.conditionForm.oper === 'between' || this.conditionForm.oper === 'unbetween') {
                    return {
                        width: 'calc(50% - 4px)'
                    }
                }
                return {
                    width: '100%'
                }
            }
        },
        methods: {
            initData () {
                this.configForm = {
                    conditionSpliceType: this.col.colConfig.conditionSpliceType ? this.col.colConfig.conditionSpliceType : ConditionSpliceType.and.code,
                    conditionList: this.col.colConfig.conditionList ? this.col.colConfig.conditionList : []
                }
                this.initConditionForm()
            },
            initConditionForm () {
                this.conditionForm = {
                    oper: '',
                    value: '',
                    value2: ''
                }
            },
            addCondition () {
                let con = this.getCondition(true)
                if (!con) {
                    return
                }
                this.configForm.conditionList.push(con)
                this.initConditionForm()
            },
            getCondition (showWarn) {
                if (!this.conditionForm.oper) {
                    if (showWarn) {
                        this.$messageWarn('请选择条件')
                    }
                    return
                }
                let value = this.conditionForm.value
                if (this.conditionForm.oper === Operator.empty.code || this.conditionForm.oper === Operator.unempty.code) {
                    value = ''
                } else if (this.conditionForm.oper === Operator.between.code || this.conditionForm.oper === Operator.unbetween.code) {
                    if (value === undefined || value === '' || this.conditionForm.value2 === undefined || this.conditionForm.value2 === '') {
                        if (showWarn) {
                            this.$messageWarn('请输入完整区间条件')
                        }
                        return
                    }
                    value = value + ',' + this.conditionForm.value2
                } else {
                    if (value === undefined || value === '') {
                        if (showWarn) {
                            this.$messageWarn('请输入条件')
                        }
                        return
                    }
                }
                return {
                    oper: this.conditionForm.oper,
                    value: value
                }
            },
            removeCondition (index) {
                this.configForm.conditionList.splice(index, 1)
            },
            submit () {
                let con = this.getCondition(false)
                if (con) {
                    this.configForm.conditionList.push(con)
                }
                if (!this.configForm.conditionList.length) {
                    this.$messageWarn('请至少添加一下筛选条件')
                    return
                }
                this.initConditionForm()
                this.$emit('submit', this.configForm)
            },
            cancel () {
                this.$emit('cancel')
            }
        },
        mounted () {
            this.initData()
        }
    }
</script>

<style>
    .conditioin-filter-config {
        width: 100%;
        margin-top: 15px;
    }

    .condition-row {
        line-height: 28px;
    }

    .condition-btn {
        text-align: center;
        cursor: pointer;
    }

    .condition-btn:hover {
        color: #3a8ee6;
        background: #f5f7fa;
    }
</style>