<template>
    <DPageContent>
        <el-card shadow="never">
            <el-row class="d-row d-search-form">
                <el-select size="small"
                           clearable
                           filterable
                           placeholder="库名,可搜索"
                           class="item"
                           v-model="searchForm.dbId"
                           @change="setTableData">
                    <el-option v-for="db in allDbList" :key="db.id" :value="db.id" :label="db.dbName">
                    </el-option>
                </el-select>
                <el-input size="small"
                          clearable
                          placeholder="表关键词搜索"
                          suffix-icon="el-icon-search"
                          class="item"
                          v-model="searchForm.tbName"
                          @change="setTableData"></el-input>
            </el-row>
            <el-row class="d-row">
                <el-table ref="table"
                          :data="tableData.data"
                          @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="50"
                            :selectable="(row, index) => { return !row.hasAuth}">
                    </el-table-column>
                    <el-table-column
                            prop="tbName"
                            label="表名">
                        <template slot-scope="scope">
                            <router-link :to="'/data-map/tb-manage/' + scope.row.id">{{ scope.row.tbName }}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="tbNameCn"
                            label="中文名"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="tagList"
                            label="标签"
                            width="200">
                        <template slot-scope="scope">
                            <div class="d-tag-group">
                                <el-tag size="mini" effect="plain" v-for="item in scope.row.tagList" :key="item.id">{{item.name}}</el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="dbName"
                            label="数据库"
                            width="200">
                        <template slot-scope="scope">
                            <router-link :to="'/data-map/db-manage/' + scope.row.dbId">{{ scope.row.dbName }}</router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="250">
                        <template slot-scope="scope">
                            <el-button v-if="!scope.row.hasAuth" type="text" size="mini">申请权限</el-button>
                            <el-button v-if="scope.row.hasAuth" disabled type="text" size="mini">已有权限</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <div>
                    <div style="float: left">
                        <el-checkbox style="margin-left: 14px" v-model="downCheckAll" @change="changeDownCheck"></el-checkbox>
                        <el-button size="mini">申请权限</el-button>
                    </div>
                    <div style="float: right;">
                        <el-pagination
                                @current-change="setTableData"
                                @size-change="setTableData"
                                background
                                :current-page.sync="pageNo"
                                :page-sizes="[10, 20, 50, 100]"
                                :page-size.sync="pageSize"
                                layout="total, sizes, prev, pager, next"
                                :total="tableData.total">
                        </el-pagination>
                    </div>
                </div>
            </el-row>
        </el-card>
    </DPageContent>
</template>

<script>
    import {
        searchTb
    } from '../../../services/data-map/tb-manage'
    import {
        listAllDb
    } from '../../../services/data-map/db-manage'
    export default {
        name: 'DTbManage',
        data () {
            return {
                isMy: true,
                searchForm: {
                    dbId: '',
                    tbName: ''
                },
                pageNo: 1,
                pageSize: 10,
                tableData: {},
                allDbList: [],
                downCheckAll: false,
                selectTbIdList: []
            }
        },
        methods: {
            clickTab (isMy) {
                this.isMy = isMy
            },
            setAllDbList () {
                listAllDb().then(res => {
                    this.allDbList = res.data
                }).catch(this.$handleError)
            },
            setTableData () {
                this.downCheckAll = false
                searchTb({
                    dbId: this.searchForm.dbId,
                    tbName: this.searchForm.tbName,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                }).then(res => {
                    this.tableData = res.data
                }).catch(this.$handleError)
            },
            changeDownCheck () {
                if (this.downCheckAll) {
                    this.$refs.table.toggleAllSelection()
                } else {
                    this.$refs.table.clearSelection()
                }
            },
            handleSelectionChange (val) {
                this.selectTbIdList = val.map(r => r.id)
                this.downCheckAll = val.length === this.tableData.data.filter(d => !d.hasAuth).length
            }
        },
        mounted () {
            this.setAllDbList()
            this.setTableData()
        }
    }
</script>