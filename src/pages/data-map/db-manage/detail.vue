<template>
    <DPageContent>
        <el-row class="d-row">
            <el-card shadow="never">
                <h1>
                    <!--<i class="fa fa-database d-icon"></i>-->
                    {{db.dbName}}
                </h1>
            </el-card>
        </el-row>
        <el-row>
            <el-col class="d-col" :span="8">
                <el-card header="基础信息" shadow="never">
                    <el-row class="d-row">
                        <el-col :span="12" class="d-detail-count" style="border-right: 0px">
                            表
                            <span class="">{{db.tbCount}}</span>
                            个
                        </el-col>
                    </el-row>
                    <DDetail :data="db" :columns="detailColumns" :col="1"></DDetail>
                </el-card>
            </el-col>
            <el-col class="d-col" :span="16">
                <el-card shadow="never">
                    <el-row class="d-row">
                        <el-input suffix-icon="el-icon-search"
                                  size="small"
                                  clearable
                                  v-model.trim="searchTbKey"
                                  @change="setTbList"
                                  placeholder="请输入表名/中文名" style="width: 200px"></el-input>
                    </el-row>
                    <el-row class="d-row">
                        <el-table :data="tableData.data">
                            <el-table-column
                                    prop="tbName"
                                    label="表名"
                                    width="200">
                                <template slot-scope="scope">
                                    <router-link :to="'/data-map/tb-manage/' + scope.row.id">{{ scope.row.tbName }}</router-link>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    label="描述">
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row class="d-right-pagination">
                        <el-pagination
                                @current-change="setTbList"
                                @size-change="setTbList"
                                background
                                :current-page.sync="pageNo"
                                :page-sizes="[20, 50, 100]"
                                :page-size.sync="pageSize"
                                layout="sizes, prev, pager, next"
                                :total="tableData.total">
                        </el-pagination>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </DPageContent>
</template>

<script>
    import {
        getDb
    } from '../../../services/data-map/db-manage'
    import {
        searchTb
    } from '../../../services/data-map/tb-manage'
    export default {
        name: 'DDbDetail',
        data () {
            return {
                db: {},
                detailColumns: [
                    {key: 'dbName', title: '名称'},
                    {key: 'dsName', title: '数据源归属'},
                    {key: 'remark', title: '描述'}
                ],
                searchTbKey: '',
                tableData: [],
                pageSize: 20,
                pageNo: 1
            }
        },
        methods: {
            setDb () {
                getDb({
                    id: this.$route.params.id
                }).then(res => {
                    this.db = res.data
                    this.setTbList()
                }).catch(this.$handleError)
            },
            setTbList () {
                searchTb({
                    dbId: this.db.id,
                    tbName: this.searchTbKey,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                }).then(res => {
                    this.tableData = res.data
                }).catch(this.$handleError)
            }
        },
        mounted () {
            this.setDb()
        }
    }
</script>