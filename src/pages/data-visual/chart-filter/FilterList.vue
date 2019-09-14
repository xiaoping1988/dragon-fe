<template>
    <ul class="d-chart-filter-list" :style="filterListStyle">
        <DFilterItem v-for="(item, index) in data"
                     :key="index"
                     :meta="item"
                     :labelWidth="labelWidth"
                     @inited="(conditionValue, showLabel) => initedCondition(item, conditionValue, showLabel)"
                     @change="(conditionValue, showLabel) => changeCondition(item, conditionValue, showLabel)"></DFilterItem>
    </ul>
</template>

<script>
    import DFilterItem from './FilterItem'
    import {getByteLength} from '../../../utils/assist'
    export default {
        name: 'DFilterList',
        components: {DFilterItem},
        props: {
            data: { // 筛选项集合
                type: Array,
                default: function () {
                    return []
                }
            },
            horizontal: Boolean // 筛选列表显示方向,是否横向水平显示,默认纵向显示
        },
        data () {
            return {
                labelWidth: null, // 筛选控件的名称宽度
                initFilterNum: 0, // 初始化完的筛选项数量
                conditionValueObj: {}, // 筛选条件值集合
                showLabelObj: {} // 筛选项的显示值集合
            }
        },
        computed: {
            filterListStyle () {
                let style = {}
                if (this.horizontal) {
                    style = {
                        display: 'flex',
                        flexWrap: 'wrap'
                    }
                }
                return style
            }
        },
        methods: {
            setLabelWidth () {
                if (!this.horizontal) {
                    let maxWidth = 0
                    this.data.forEach(d => {
                        let len = getByteLength(d.colLabel)
                        maxWidth = len > maxWidth ? len : maxWidth
                    })
                    this.labelWidth = maxWidth * 6
                }
            },
            initedCondition (col, conditionValue, showLabel) { // 初始化某个筛选项的值和显示
                this.initFilterNum = this.initFilterNum + 1
                this.updateColFilter(col, conditionValue, showLabel)
                if (this.data.length === this.initFilterNum) { // 全部筛选项列表都初始化完,通知父组件
                    this.$emit('inited', Object.values(this.conditionValueObj), Object.values(this.showLabelObj))
                }
            },
            changeCondition (col, conditionValue, showLabel) { // 修改某个筛选项的值和显示,通知父组件
                this.updateColFilter(col, conditionValue, showLabel)
                this.$emit('change', Object.values(this.conditionValueObj), Object.values(this.showLabelObj))
            },
            updateColFilter (col, conditionValue, showLabel) { // 修改某个筛选项的值和显示
                this.conditionValueObj[col.colName] = {
                    colName: col.colName,
                    tbId: col.tbId,
                    tbName: col.tbName,
                    dbName: col.dbName,
                    oper: col.colConfig.oper,
                    dataType: col.dataType,
                    value: conditionValue
                }
                this.showLabelObj[col.colName] = {
                    colLabel: col.colLabel,
                    showLabel: showLabel
                }
            }
        },
        mounted () {
            this.setLabelWidth()
        }
    }
</script>