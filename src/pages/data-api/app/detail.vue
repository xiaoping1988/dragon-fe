<template>
    <DPageContent>
        <el-row class="d-row">
            <DPageHeader :title="app.name" hasBack></DPageHeader>
        </el-row>
        <el-row>
            <el-col class="d-col" :span="8">
                <el-card shadow="never">
                    <div slot="header">
                        <span class="d-card-title">基础信息</span>
                    </div>
                    <DDetail :data="app" :columns="detailColumns" :col="1"></DDetail>
                    <div class="d-desclist-index">
                        <div class="d-desclist-index-term">标签</div>
                        <div class="d-desclist-index-detail d-tag-group">
                            <el-tag size="mini" effect="plain" v-for="item in app.ownerList" :key="item.id">{{item.userNameCn}}({{item.userName}})</el-tag>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col class="d-col" :span="16">
                <el-card shadow="never">
                    <div slot="header">
                        <span class="d-card-title">API列表</span>
                        <div style="float: right;">
                            <el-button class="d-card-btn" type="text" @click="applyApi">
                                申请API
                            </el-button>
                        </div>
                    </div>
                    <el-table :data="app.apiList">
                        <el-table-column
                                type="index"
                                label="序号"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="API名称"
                                width="220">
                        </el-table-column>
                        <el-table-column
                                prop="callCnt7"
                                label="近7天调用次数"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="remark"
                                label="API描述">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="mini" >查看API文档</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </DPageContent>
</template>

<script>
    import {
        getApp
    } from '../../../services/data-api/app'
    export default {
        name: 'DAppDetail',
        data () {
            return {
                appId: this.$route.params.id,
                app: {},
                detailColumns: [
                    {key: 'name', title: '名称'},
                    {key: 'code', title: '编码'},
                    {key: 'accessKey', title: 'accessKey'},
                    {key: 'remark', title: '描述'},
                    {key: 'creator', title: '创建人'},
                    {key: 'createTime', title: '创建时间'},
                    {key: 'updator', title: '修改人'},
                    {key: 'updateTime', title: '修改时间'}
                ]
            }
        },
        methods: {
            setApp () {
                getApp({
                    id: this.appId
                }).then(res => {
                    this.app = res.data
                }).catch(this.$handleError)
            },
            applyApi () {
                this.$router.push('/data-api/api-market')
            }
        },
        mounted () {
            this.setApp()
        }
    }
</script>