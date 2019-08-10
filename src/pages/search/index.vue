<template>
    <el-row>
        <el-card shadow="never" style="padding: 5px 40px">
            <el-col :span="14">
                <el-row class="d-row">
                    <el-input placeholder="请输入搜索关键字" v-model="keyword" @change="searchData">
                        <template slot="append">
                            <el-button type="primary" class="d-search" @click="searchData">搜索</el-button>
                        </template>
                    </el-input>
                </el-row>
                <el-row style="margin-bottom: 15px">
                    <div v-if="searchResult.total">
                        <el-row class="d-row d-result-item" v-for="(item, i) in searchResult.result" :key="i">
                            <div>
                                <h3>
                                    <a v-html="item.title" target="_blank" :href="item.url" class="result-title"></a>
                                </h3>
                                <div v-html="item.intro" class="intro"></div>
                                <div class="time">{{item.updateTime}}</div>
                            </div>
                        </el-row>
                        <el-row class="d-row">
                            <el-pagination
                                    @current-change="changePage"
                                    background
                                    :current-page.sync="currentPage"
                                    :page-size="pageSize"
                                    layout="total, prev, pager, next, jumper"
                                    :total="searchResult.total">
                            </el-pagination>
                        </el-row>
                    </div>
                    <el-row v-else>
                        <div style="font-size: 24px">
                            <i class="el-icon-warning d-warn" style="color: red"></i>
                            没有找到您期望的内容，请尝试其他搜索词，或联系产品人员
                        </div>
                    </el-row>
                </el-row>
            </el-col>
            <el-col :span="10"></el-col>
        </el-card>
    </el-row>
</template>

<script>
    import {search} from '../../services/search'
    export default {
        name: 'DSearch',
        data () {
            return {
                keyword: '',
                currentPage: 1,
                pageSize: 20,
                total: 0,
                searchResult: {
                    total: 0,
                    result: []
                }
            }
        },
        watch: {
            '$route.fullPath': function () {
                this.keyword = this.$route.query.keyword
                this.searchData()
            }
        },
        methods: {
            searchData () {
                if (this.keyword === '') {
                    this.searchResult = {
                        total: 0,
                        result: []
                    }
                    return
                }
                search({
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    keyword: this.keyword
                }).then(res => {
                    this.searchResult = res.data
                }).catch(this.$handleError)
            },
            changePage () {
                this.searchData()
            }
        },
        mounted () {
            this.keyword = this.$route.query.keyword
            this.searchData()
        }
    }
</script>

<style>
    .d-search {
        background-color: #409EFF!important;
        border-color: #409EFF!important;
        border-radius: 0px!important;
        color: #FFF!important;
    }

    .d-result-item h3 {
        font-weight: 500;
    }

    .d-result-item .result-title {
        font-family: PingFangSC-Regular,PingFangSC,'helvetica neue','hiragino sans gb',arial,'microsoft yahei ui','microsoft yahei',simsun,sans-serif!important;
        font-size: 16px;
        color: #373D41;
        line-height: 24px;
    }

    .d-result-item a:hover {
        text-decoration: underline;
    }

    .d-result-item .result-title strong {
        color: #409EFF;
    }

    .d-result-item .intro {
        font-size: 14px;
        margin-top: 8px;
        font-family: PingFangSC-Light,PingFangSC,'helvetica neue','hiragino sans gb',arial,'microsoft yahei ui','microsoft yahei',simsun,sans-serif!important;
        color: #73777A;
        line-height: 24px;
    }

    .d-result-item .intro strong {
        color: red;
    }

    .d-result-item .time {
        margin-top: 8px;
        color: #C3C5C6;
    }
</style>