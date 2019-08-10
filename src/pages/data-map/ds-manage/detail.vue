<template>
    <DPageContent>
        <el-row class="d-row">
            <el-card shadow="never">
                <h1>
                    <!--<i class="fa fa-server d-icon"></i>-->
                    {{ds.name}}
                </h1>
            </el-card>
        </el-row>
        <el-row>
            <el-col class="d-col" :span="8">
                <el-card header="基础信息" shadow="never">
                    <el-row class="d-row">
                        <el-col :span="12" class="d-detail-count">
                            库
                            <span>{{ds.dbCount}}</span>
                            个
                        </el-col>
                        <el-col :span="12" class="d-detail-count">
                            表
                            <span class="">{{ds.tbCount}}</span>
                            个
                        </el-col>
                    </el-row>
                    <DDetail :data="ds" :columns="detailColumns" :col="1"></DDetail>
                    <div class="d-desclist-index">
                        <div class="d-desclist-index-term">负责人</div>
                        <div class="d-desclist-index-detail">
                            <div v-for="item in ds.ownerList" :key="item.id">
                                <span>{{item.ownerNameCn}}({{item.ownerName}})</span>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col class="d-col" :span="16">
                <el-card shadow="never">
                    <el-row  class="d-row">
                        <el-input suffix-icon="el-icon-search"
                                  size="small"
                                  clearable
                                  v-model.trim="searchDbKey"
                                  @change="searchDbList"
                                  placeholder="请输入库名" style="width: 200px"></el-input>
                    </el-row>
                    <el-table :data="tableData">
                        <el-table-column
                                prop="dbName"
                                label="库名"
                                width="200">
                            <template slot-scope="scope">
                                <router-link :to="'/data-map/db-manage/' + scope.row.id">{{ scope.row.dbName }}</router-link>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="remark"
                                label="描述">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </DPageContent>
</template>

<script>
    import {
        getDs
    } from '../../../services/data-map/ds-manage'
    export default {
        name: 'DDsDetail',
        data () {
            return {
                ds: {},
                detailColumns: [
                    {key: 'name', title: '名称'},
                    {key: 'type', title: '类型'},
                    {key: 'updator', title: '最后修改人'},
                    {key: 'createTime', title: '创建时间'},
                    {key: 'remark', title: '描述'}
                ],
                searchDbKey: '',
                tableData: []
            }
        },
        methods: {
            setDs () {
                getDs({
                    id: this.$route.params.id
                }).then(res => {
                    this.ds = res.data
                    this.searchDbList()
                }).catch(this.$handleError)
            },
            searchDbList () {
                if (this.searchDbKey) {
                    this.tableData = this.ds.dbList.filter(d => d.dbName.includes(this.searchDbKey.toLowerCase()) || d.remark.includes(this.searchDbKey))
                } else {
                    this.tableData = this.ds.dbList
                }
            }
        },
        mounted () {
            this.setDs()
        }
    }
</script>