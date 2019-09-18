<template>
    <DPageContent>
        <el-card shadow="never">
            <el-form inline>
                <el-form-item>
                    <el-input suffix-icon="el-icon-search"
                              size="mini"
                              clearable
                              v-model.trim="keyword"
                              placeholder="请输入关键字搜索"></el-input>
                </el-form-item>
                <el-form-item style="float: right">
                    <el-button icon="el-icon-plus" type="primary" size="mini" @click="openApiDev">开发新API</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    :data="tableData">
                <el-table-column
                        prop="name"
                        label="名称"
                        width="250">
                    <template slot-scope="scope">
                        <router-link :to="'/data-api/api-dev/' + scope.row.id">{{ scope.row.name }}</router-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="callCnt7"
                        label="近7天调用次数">
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="描述">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="updateTime"
                        label="修改时间"
                        width="150">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.isReleased === 0" type="text" size="mini" @click="releaseApi(scope.row)" class="d-error">发布</el-button>
                        <el-button type="text" size="mini" @click="deleteApi(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <DLoading :loading="loading"></DLoading>
        </el-card>
    </DPageContent>
</template>

<script>
    import {listMyApi, deleteById, releaseApi} from '../../../services/data-api/api-dev'
    export default {
        name: 'DMyApi',
        data () {
            return {
                tableData: [],
                keyword: '',
                apiList: [],
                loading: false
            }
        },
        methods: {
            setApiList () {
                this.keyword = ''
                listMyApi().then(res => {
                    this.apiList = res.data
                    this.searchApi()
                }).catch(this.$handleError)
            },
            searchApi () {
                if (this.keyword) {
                    this.tableData = this.apiList.filter(a => a.name.includes(this.keyword) || a.remark.includes(this.keyword))
                } else {
                    this.tableData = this.apiList
                }
            },
            deleteApi (row) {
                let msg = '确认删除API<strong class="d-error">"' + row.name + '"</strong>吗?'
                let vue = this
                vue.$confirmInfo(msg, function () {
                    deleteById({
                        id: row.id
                    }).then(res => {
                        vue.setApiList()
                    }).catch(vue.$handleError)
                })
            },
            releaseApi (row) {
                this.loading = true
                releaseApi({
                    id: row.id
                }).then(res => {
                    this.loading = false
                    this.setApiList()
                }).catch(error => {
                    this.$handleError(error)
                    this.loading = false
                })
            },
            openApiDev () {
                this.$router.push('/data-api/guide-dev')
            }
        },
        watch: {
            keyword () {
                this.searchApi()
            }
        },
        mounted () {
            this.setApiList()
        }
    }
</script>

<style>

</style>