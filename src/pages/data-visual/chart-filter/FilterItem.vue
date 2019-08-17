<template>
    <li class="d-chart-filter-item">
        <div class="label" :style="{width: labelWidth + 'px'}">
            {{meta.showName}}
        </div>
        <div class="control">
            <DDatePicker
                    v-if="filterControlTypeObj.date.code === meta.filterConfig.controlType"
                    :type="meta.filterConfig.dateType"
                    range
                    :value="meta.filterConfig.defaultValue"
                    :width="controlWidth"
                    @inited="initedCondition"
                    @change="changeCondition"></DDatePicker>

            <DSelect v-if="filterControlTypeObj.select.code === meta.filterConfig.controlType"
                     :width="controlWidth"
                     :value="meta.filterConfig.defaultValue"
                     :data="selectData"
                     @focus="setSelectData"
                     @inited="initedCondition"
                     @change="changeCondition"></DSelect>

            <DInputNumber v-if="filterControlTypeObj.num.code === meta.filterConfig.controlType"
                          :width="controlWidth"
                          :value="meta.filterConfig.defaultValue"
                          @inited="initedCondition"
                          @change="changeCondition"></DInputNumber>

            <DInputText  v-if="filterControlTypeObj.text.code === meta.filterConfig.controlType"
                         :width="controlWidth"
                         :value="meta.filterConfig.defaultValue"
                         @inited="initedCondition"
                         @change="changeCondition"></DInputText>

            <DLoading :loading="loading" style="height: 100px"></DLoading>
        </div>
    </li>
</template>

<script>
    import DDatePicker from './DatePicker'
    import DSelect from './Select'
    import DInputNumber from './InputNumber'
    import DInputText from './InputText'
    import {FilterControlType} from '../constants'
    import {querySelectData} from '../../../services/data-visual/filter'
    export default {
        name: 'DFilterItem',
        components: {DDatePicker, DSelect, DInputNumber, DInputText},
        props: {
            meta: Object,
            labelWidth: Number
        },
        data () {
            return {
                filterControlTypeObj: FilterControlType, // 筛选控件类型集合
                controlWidth: 200, // 筛选控件的宽度
                selectData: [], // 下拉框筛选的枚举值
                initedSelectData: false, // 下拉框筛选的枚举值数据是否初始化了
                loading: false, // 下拉框获取后端数据时的loading
                cascadeConditionValue: '' // 有级联筛选的下拉框，获取后端数据时，上级级联的筛选条件值
            }
        },
        methods: {
            initedCondition (conditionValue, showLabel) {
                this.$emit('inited', conditionValue, showLabel)
            },
            changeCondition (conditionValue, showLabel) {
                this.$emit('change', conditionValue, showLabel)
            },
            setSelectData () {
                if (this.initedSelectData) {
                    return
                }
                this.loading = true
                querySelectData({
                    tbId: this.meta.tbId,
                    tbName: this.meta.tbName,
                    dbName: this.meta.dbName,
                    colName: this.meta.colName,
                    conditionValue: this.cascadeConditionValue
                }).then(res => {
                    this.initedSelectData = true
                    this.loading = false
                    this.selectData = res.data
                }).catch(error => {
                    this.$handleError(error)
                    this.loading = false
                })
            }
        }
    }
</script>

<style>
    .d-chart-filter-item {
        display: flex;
        line-height: 38px;
        padding: 0px;
    }
    .d-chart-filter-item .label {
        text-align: right;
        margin-right: 10px;
    }

    .d-chart-filter-item .control {
        position: relative;
        margin-right: 10px;
    }
</style>