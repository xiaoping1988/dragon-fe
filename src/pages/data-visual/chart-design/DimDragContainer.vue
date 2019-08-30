<template>
    <ul class="drag-container"
        @dragover="allowDrop($event)"
        @drop="dragDropCol($event)">
        <li v-for="(item, index) in data" :key="index" class="drag-item">
            <div class="tag-item">
                <div @click="openConfig(item)">
                    <span>{{item.dimConfig.showName}}</span>
                    <span v-if="item.dimConfig.timeFreq">(按{{timeFreqObj[item.dimConfig.timeFreq].name}})</span>
                </div>
                <div class="btn">
                    <i class="fa fa-times-circle" title="移除字段" @click="removeDim(index)"></i>
                </div>
            </div>
        </li>
        <li v-if="!data.length" class="d-no-data-tip" style="width: 100%">
            从左侧字段列表拖拽字段到这里
        </li>
    </ul>
</template>

<script>
    import {TimeFreq} from '../constants'
    import {DataType} from '../../../services/data-map/col-manage'
    export default {
        name: 'DDimDragContainer',
        props: {
            data: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data () {
            return {
                timeFreqObj: TimeFreq
            }
        },
        methods: {
            openConfig (item) {
                this.$emit('click-item', item)
            },
            removeDim (index) {
                this.data.splice(index, 1)
                this.$emit('change', this.data)
            },
            allowDrop (e) {
                e.preventDefault()
            },
            dragDropCol (e) { // 从左侧字段列表拖入字段释放
                let dragingCol = this.getDragingCol(e)
                this.data.push(dragingCol)
                this.$emit('change', this.data)
            },
            getDragingCol (e) {
                let dragingCol = e.dataTransfer.getData('dragingCol')
                dragingCol = JSON.parse(dragingCol)
                dragingCol.dimConfig = {
                    key: dragingCol.colName + '_' + new Date().getTime(),
                    showName: dragingCol.colLabel,
                    sortType: '0',
                    timeFreq: dragingCol.dataType === DataType.date.code ? TimeFreq.day.code : ''
                }
                return dragingCol
            }
        }
    }
</script>