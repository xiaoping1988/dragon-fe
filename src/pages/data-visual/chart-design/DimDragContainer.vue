<template>
    <DDraggableContainer v-model="dimList"
                        horizontal
                        disabled
                         noDataText="从左侧字段列表拖拽字段到这里"
                        @drop="dragDropCol"
                         class="d-drag-container">
        <template slot-scope="{item, index}">
            <div class="tag-item" v-if="item">
                <div @click="openConfig(item)">
                    <span>{{item.colConfig.showName}}</span>
                    <span v-if="item.colConfig.timeFreq">(按{{timeFreqObj[item.colConfig.timeFreq].name}})</span>
                </div>
                <div class="btn">
                    <i class="fa fa-times-circle" title="移除字段" @click="removeCol(index)"></i>
                </div>
            </div>
        </template>
    </DDraggableContainer>
</template>

<script>
    import {TimeFreq} from '../constants'
    import {DataType} from '../../../services/data-map/col-manage'
    import {getDimColCofig} from './utils'
    export default {
        name: 'DDimDragContainer',
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
                dimList: this.value,
                timeFreqObj: TimeFreq
            }
        },
        watch: {
            value () {
                this.dimList = this.value
            }
        },
        methods: {
            openConfig (item) {
                this.$emit('click-item', item)
            },
            removeCol (index) {
                this.dimList.splice(index, 1)
                this.$emit('change', this.dimList)
            },
            allowDrop (e) {
                e.preventDefault()
            },
            dragDropCol (e) { // 从左侧字段列表拖入字段释放
                let dragingCol = this.getDragingCol(e)
                this.dimList.push(dragingCol)
                this.$emit('change', this.dimList)
            },
            getDragingCol (e) {
                let dragingCol = e.dataTransfer.getData('dragingCol')
                dragingCol = JSON.parse(dragingCol)
                dragingCol.colConfig = getDimColCofig(dragingCol)
                return dragingCol
            }
        }
    }
</script>

<style>

</style>