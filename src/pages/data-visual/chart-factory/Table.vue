<template>
    <div class="d-chart-table">
        <el-table ref="tableChart"
                  id="tableChart"
                  :data="tableData"
                  border
                  :span-method="arraySpanMethod"
                  height="300px"
                  header-cell-class-name="d-table-header-cell">
            <el-table-column v-for="(col, index) in columns"
                             :key="index"
                             :prop="col.key"
                             show-overflow-tooltip
                             :width="col.width"
                             :label="col.name"
                             :align="col.dim ? 'left' : 'right'"
                             :fixed="col.fixed">
                <template slot="header" slot-scope="scope">
                    <div class="d-table-header-col">
                        <span>{{scope.column.label}}</span>
                        <span class="d-table-header-btn sort" :class="{sorted: col.sortType}">
                            <i class="asc" :class="{active: col.sortType === 'asc'}" @click="toggleSort(col, 'asc')"></i>
                            <i class="desc" :class="{active: col.sortType === 'desc'}" @click="toggleSort(col, 'desc')"></i>
                        </span>
                        <span class="d-table-header-btn lock" :class="{locked: col.locked}" @click="toggleLock(col)">
                            <i class="fa" :class="[col.locked ? 'fa-lock' : 'fa-unlock']"></i>
                        </span>
                    </div>
                </template>
                <template slot-scope="scope">
                    <div v-if="scope.row.loadMoreBtn"
                         class="d-table-more"
                         :style="{'padding-left': loadMoreBtnPaddingLeft + 'px'}">
                        <el-button @click="loadMoreData" type="text" size="mini">加载更多...</el-button>
                    </div>
                    <DFormatValue v-else
                                  :value="scope.row[col.key]"
                                  :showType="col.showType"
                                  :growthSign="col.growthSign"></DFormatValue>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {pageSearch} from '../../../utils/assist'
    import {THB, THBValueType, ShowType} from '../constants'
    export default {
        name: 'DTable',
        props: {
            meta: {
                required: true,
                type: Object
            },
            data: Array,
            id: [Number, String]
        },
        data () {
            return {
                columns: [], // 列字段
                columnObj: {}, // 列字段
                pageSize: 10, // 页大小
                pageNo: 1, // 页号
                tableData: [], // 表格里的数据
                tableWidth: 0, // 自适应div宽度
                lockedWidth: 0, // 锁住的列的左边表格宽度
                minColWidth: 120, // 每列最小宽度
                loadMoreBtnPaddingLeft: 20, // 加载更多按钮的padding-left
                sortColKey: '' // 当前排序的列
            }
        },
        methods: {
            handleMeta () { // 处理元数据
                let tmpCols = []
                let containerWidth = this.$el.clientWidth
                let avgWidth = containerWidth / this.meta.columns.length
                if (this.minColWidth < avgWidth) {
                    this.minColWidth = avgWidth
                }
                this.meta.columns.forEach(c => {
                    let tmpC = JSON.parse(JSON.stringify(c))
                    if (tmpC.unit) {
                        tmpC.name = tmpC.name + '(' + tmpC.unit + ')'
                    }
                    tmpC.width = this.computeColWidth(tmpC.name)
                    if (tmpC.sort) {
                        this.sortColKey = tmpC.key
                    }
                    tmpCols.push(tmpC)
                    if (tmpC.locked) {
                        tmpCols.forEach(c2 => {
                            c2.fixed = true
                            this.lockedWidth = this.lockedWidth + c2.width
                        })
                    }
                    if (tmpC.THB && tmpC.THB.length) {
                        tmpC.THB.forEach(thb => {
                            let tmpName = tmpC.name + '(' + THB[thb].name + ')'
                            let tmpWidth = this.computeColWidth(tmpName)
                            tmpCols.push({
                                key: tmpC.key + '_' + thb,
                                name: tmpName,
                                showType: THBValueType[tmpC.THBValueType].showType,
                                growthSign: true,
                                dim: false,
                                width: tmpWidth
                            })
                        })
                    }
                    this.columnObj[tmpC.key] = tmpC
                })
                this.columns = tmpCols
                this.resizeTable()
            },
            computeColWidth (colName) { // 计算列宽度
                let tmpWidth = this.minColWidth
                if (colName.length * 20 > this.minColWidth) {
                    tmpWidth = colName.length * 20
                }
                return tmpWidth + 50
            },
            handleData () { // 处理表格数据
                this.pageNo = 1
                this.tableData = []
                if (this.data && this.data.length) {
                    this.addTableData()
                }
            },
            addTableData () { // 
                if (this.tableData.length) {
                    this.tableData.pop()
                }
                let tmpData = pageSearch(this.data, this.pageNo, this.pageSize)
                this.tableData = this.tableData.concat(tmpData)
                if (tmpData.length === this.pageSize) {
                    // 在最后一行添加加载更多按钮
                    this.tableData.push({
                        loadMoreBtn: true
                    })
                }
            },
            loadMoreData () { // 加载更多数据
                this.pageNo = this.pageNo + 1
                this.addTableData()
            },
            resizeTable () { // 为了自适应屏幕
                let vue = this
                setTimeout(function () {
                    let tc = document.getElementById('tableChart')
                    tc.style.height = '100%'
                    vue.tableWidth = tc.clientWidth
                    vue.setLoadMoreBtnPaddingLeft()
                }, 1)
            },
            setLoadMoreBtnPaddingLeft () { // 设置加载更多按钮的padding-left
                let moreBtnWidth = 76
                let center = (this.tableWidth - moreBtnWidth)/2
                this.loadMoreBtnPaddingLeft = this.lockedWidth && center > this.lockedWidth ? (this.lockedWidth - moreBtnWidth) : center
            },
            arraySpanMethod({ row, column, rowIndex, columnIndex }) { // 表格里的单元格合并
                if (row.loadMoreBtn) { // 加载更多按钮这一行,合并所有列
                    if (columnIndex === 0) {
                        return [1, this.columns.length]
                    } else {
                        return [0, 0]
                    }

                }
            },
            toggleLock (col) { // 点击锁列按钮
                this.lockedWidth = 0
                if (col.locked) {
                    for (let i in this.columns) {
                        if (this.columns[i].key === col.key) {
                            break
                        }
                        this.columns[i].fixed = false
                    }
                    col.locked = false
                    col.fixed = false
                } else {
                    let isPre = true
                    for (let i in this.columns) {
                        if (this.columns[i].key === col.key) {
                            isPre = false
                        }
                        if (isPre) {
                            this.columns[i].locked = false
                            this.columns[i].fixed = true
                            this.lockedWidth = this.lockedWidth + this.columns[i].width
                        } else if (this.columns[i].key !== col.key) {
                            this.columns[i].locked = false
                            this.columns[i].fixed = false
                        }

                    }
                    col.locked = true
                    col.fixed = true
                    this.lockedWidth = this.lockedWidth + col.width
                }
                this.setLoadMoreBtnPaddingLeft()
                this.$refs.tableChart.doLayout()
                this.$forceUpdate()
            },
            toggleSort (col, type) {
                if (col.key === this.sortColKey) {
                    if (col.sortType === type) {
                        col.sortType = ''
                    } else {
                        col.sortType = type
                    }
                } else {
                    for (let i in this.columns) {
                        if (this.columns[i].key === this.sortColKey) {
                            this.columns[i].sortType = ''
                            break
                        }
                    }
                    col.sortType = type
                    this.sortColKey = col.key
                }
                this.$emit('sort', col.key, col.sortType)
            }
        },
        watch: {
            meta () {
                this.handleMeta()
            },
            data () {
                this.handleData()
            }
        },
        mounted () {
            let vue = this
            vue.handleMeta()
            vue.handleData()
        }
    }
</script>

<style>
    .d-chart-table,
    .d-chart-table .el-table {
        width: 100%;
        height: 100%;
    }

    .d-chart-table .el-table thead th {
        background: #f5f7fa;
    }

    .d-table-more {
    }

    .d-table-header-cell .cell {
        padding: 0px!important;
    }

    .d-table-header-cell .cell,
    .d-table-header-btn {
        height: 25px;
    }

    .d-table-header-col {
        height: 100%;
        width: 100%;
        line-height: 25px!important;
        text-align: center!important;
        padding: 0px!important;
        position: relative;
    }

    .d-table-header-btn {
        display: none;
        width: 20px;
        align-items: center;
        vertical-align: middle;
        cursor: pointer;
        overflow: initial;
        position: absolute;
    }

    .d-table-header-btn.lock {
        right: 5px;
    }

    .d-table-header-btn.sort {
        right: 25px;
    }

    .d-table-header-col .d-table-header-btn.locked i,
    .d-table-header-btn.sort .active {
        color: #409EFF;
    }

    .d-table-header-btn.sort .asc.active {
        border-bottom-color: #409EFF;
    }

    .d-table-header-btn.sort .desc.active {
        border-top-color: #409EFF;
    }

    .d-table-header-btn i {
        position: absolute;
        left: 5px;
        color: #c0c4cc;
    }

    .d-table-header-btn .asc,
    .d-table-header-btn .desc {
        width: 0;
        height: 0;
        border: 5px solid transparent;
    }

    .d-table-header-btn .asc {
        top: 1px;
        border-bottom-color: #c0c4cc;
    }

    .d-table-header-btn .desc {
        bottom: 2px;
        border-top-color: #c0c4cc;
    }

    .d-table-header-col:hover .d-table-header-btn,
    .d-table-header-col .d-table-header-btn.locked,
    .d-table-header-col .d-table-header-btn.sorted{
        display: inline-flex;
    }
</style>