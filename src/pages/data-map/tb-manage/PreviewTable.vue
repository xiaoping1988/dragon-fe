<template>
    <div v-if="previewData">
        <div class="head">
            显示最新
            <span class="d-strong-count">{{previewData.data.length}}</span>
            条数据,数据最后更新时间
            <span class="d-strong-count">{{previewData.lastDataModifiedTime}}</span>
        </div>
        <el-table :data="previewData.data"
                  height="400" width="100%">
            <el-table-column
                    v-for="col in previewData.colList"
                    :key="col.colName"
                    :prop="col.colName"
                    :label="col.colLabel"
                    :width="col.width">
                <template slot="header" slot-scope="scope">
                    <i class="d-icon fa" :class="'fa-' + dataTypeObj[colObj[scope.column.property].dataType].icon"></i><span>{{ scope.column.label }}</span>
                </template>
            </el-table-column>
        </el-table>
        <DLoading :loading="loading"></DLoading>
    </div>
</template>

<script>
    import {
        previewTbData
    } from '../../../services/data-map/tb-manage'
    import {
        DataType
    } from '../../../services/data-map/col-manage'
    import {getByteLength} from '../../../utils/assist'
    export default {
        name: 'DPreviewTable',
        props: {
            tbId: [String, Number]
        },
        data () {
            return {
                dataTypeObj: DataType,
                previewData: null,
                colObj: {},
                maxColWidth: 250,
                minColWidth: 150
            }
        },
        methods: {
            preview () {
                if (this.previewData) {
                    return
                }
                this.loading = false
                previewTbData({
                    id: this.tbId
                }).then(res => {
                    this.previewData = res.data
                    this.previewData.colList.forEach(c => {
                        this.colObj[c.colName] = c
                        c.width = this.minColWidth
                    })
                    this.resizeColWidth()
                    this.loading = false
                }).catch(this.$handleError)
            },
            resizeColWidth () {
                this.$nextTick(function () {
                    let containerWidth = this.$el.clientWidth
                    let avgWidth = containerWidth / this.previewData.colList.length
                    if (this.minColWidth < avgWidth) {
                        this.minColWidth = avgWidth
                    }
                    this.previewData.colList.forEach(c => {
                        c.width = this.computeColWidth(c.colName)
                    })
                    this.$forceUpdate()
                })
            },
            computeColWidth (colName) { // 计算列宽度
                let tmpWidth = this.minColWidth
                if (colName.length * 20 > this.minColWidth) {
                    tmpWidth = colName.length * 20
                }
                return tmpWidth
            }
        },
        watch: {
            tbId () {
                this.previewData = null
                this.preview()
            }
        },
        mounted () {
            this.preview()
        }
    }
</script>