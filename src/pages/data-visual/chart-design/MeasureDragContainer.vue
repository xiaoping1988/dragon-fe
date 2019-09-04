<template>
    <DDraggableContainer v-model="measureList"
                        horizontal
                        disabled
                         noDataText="从左侧字段列表拖拽字段到这里"
                        @drop="dragDropCol"
                         class="d-drag-container">
        <template slot-scope="{item, index}">
            <div class="tag-item" v-if="item">
                <div @click="openConfig(item)">
                    <span>{{item.colConfig.showName}}</span>
                    <span>({{aggFuncObj[item.colConfig.aggFunction].name}})</span>
                </div>
                <div class="btn">
                    <i class="fa fa-times-circle" title="移除字段" @click="removeCol(index)"></i>
                </div>
            </div>
        </template>
    </DDraggableContainer>
</template>

<script>
    import {AggFunc} from '../constants'
    import {DataType} from '../../../services/data-map/col-manage'
    export default {
        name: 'DMeasureDragContainer',
        props: {
            value: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data () {
            return {
                measureList: this.value,
                aggFuncObj: AggFunc
            }
        },
        watch: {
            value () {
                this.measureList = this.value
            }
        },
        methods: {
            openConfig (item) {
                this.$emit('click-item', item)
            },
            removeCol (index) {
                this.measureList.splice(index, 1)
                this.$emit('change', this.measureList)
            },
            allowDrop (e) {
                e.preventDefault()
            },
            dragDropCol (e) { // 从左侧字段列表拖入字段释放
                let dragingCol = this.getDragingCol(e)
                this.measureList.push(dragingCol)
                this.$emit('change', this.measureList)
            },
            getDragingCol (e) {
                let dragingCol = e.dataTransfer.getData('dragingCol')
                dragingCol = JSON.parse(dragingCol)
                dragingCol.colConfig = {
                    key: dragingCol.colName + '_' + new Date().getTime(),
                    showName: dragingCol.colLabel,
                    sortType: '0',
                    aggFunction: dragingCol.dataType === DataType.num.code ? AggFunc.sum.code : AggFunc.count.code,
                    unit: '', // 单位
                    divisor: 1, // 除数
                    showType: 'num' // 显示类型,text 文本 num 数字 amt 金额 rate 百分比
                }
                return dragingCol
            }
        }
    }
</script>

<style>

</style>