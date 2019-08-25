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
                        // c.width = this.minColWidth
                        this.colObj[c.colName] = c
                    })
                    // TODO 计算表格表头各列宽度
                    // this.previewData.forEach(d => {
                    //     this.previewData.colList.forEach(c => {
                    //         if (c.width < this.maxColWidth) {
                    //             let len = getByteLength(d[c.colName] + '')
                    //             if (len * 6 > this.maxColWidth) {
                    //                 c.width = this.maxColWidth
                    //             }
                    //         }
                    //     })
                    // })
                    this.loading = false
                }).catch(this.$handleError)
            }
        },
        mounted () {
            this.preview()
        }
    }
</script>