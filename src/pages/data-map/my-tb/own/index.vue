<template>
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
                    <!--<span style="float: left">{{ db.dbName }}</span>-->
                    <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ db.id }}</span>-->
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
            <el-table
                    :data="tableData.data">
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
                        prop="authSource"
                        label="权限来源"
                        width="200">
                </el-table-column>
                <!--<el-table-column-->
                        <!--label="操作"-->
                        <!--width="250">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button type="text" size="small" @click="openGrantUserForm(scope.row)">授权用户</el-button>-->
                        <!--<el-button v-if="scope.row.grade !== 1" type="text" size="small" @click="openGrantRoleAuthForm(scope.row)">配置权限</el-button>-->
                        <!--<el-button v-if="scope.row.grade !== 1" type="text" size="small" @click="openUpdateRoleBaseForm(scope.row)">编辑</el-button>-->
                        <!--<el-button v-if="scope.row.grade !== 1" type="text" size="small" @click="deleteById(scope.row)">删除</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
        </el-row>
        <el-row class="d-right-pagination">
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
        </el-row>
    </el-card>
</template>

<script>
    import {
        listMyTbOwn
    } from '../../../../services/data-map/tb-manage'
    import {
        listAllDb
    } from '../../../../services/data-map/db-manage'
    export default {
        name: 'DMyTbOwn',
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
                allDbList: []
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
                listMyTbOwn({
                    dbId: this.searchForm.dbId,
                    tbName: this.searchForm.tbName,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                }).then(res => {
                    this.tableData = res.data
                }).catch(this.$handleError)
            }
        },
        mounted () {
            this.setAllDbList()
            this.setTableData()
        }
    }
</script>