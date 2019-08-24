<template>
    <div>
        <el-row class="d-row">
            选择工作表
        </el-row>
        <el-row class="d-row">
            <el-input
                    size="mini"
                    clearable
                    placeholder="搜索工作表"
                    suffix-icon="el-icon-search"
                    v-model.trim="tableKeyWord"
                    @change="searchTable">
            </el-input>
        </el-row>
        <el-row class="d-row">
            <div class="d-tb-panel">
                <ul class="d-tb-list">
                    <li v-for="(item, index) in searchedTableList"
                        :key="index"
                        class="d-tb-item"
                        @click="selectTable(item)">
                        <h4 class="d-tb-title d-ellipsis" :title="item.dbName + '.' + item.tbName">{{item.dbName}}.{{item.tbName}}</h4>
                        <div class="d-tb-desc d-ellipsis" :title="item.tbNameCn">{{item.tbNameCn}}</div>
                    </li>
                </ul>
            </div>
        </el-row>
    </div>
</template>

<script>
    import {
        listMyTbOwn
    } from '../../../services/data-map/tb-manage'
    export default {
        name: 'DWorkTableSelect',
        data () {
            return {
                tableKeyWord: '', // 工作表搜索关键词
                searchedTableList: [], // 搜索到的工作表结果
            }
        },
        methods: {
            searchTable () {
                listMyTbOwn({
                    tbName: this.tableKeyWord,
                    pageNo: 1,
                    pageSize: 15
                }).then(res => {
                    this.searchedTableList = res.data.data
                }).catch(this.$handleError)
            },
            selectTable (table) {
                this.$emit('select', table)
            }
        },
        mounted () {
            this.searchTable()
        }
    }
</script>

<style>
    .d-tb-panel {
        height: 250px;
        width: 100%;
        overflow: auto;
    }

    .d-tb-item {
        cursor: pointer;
    }

    .d-tb-item:hover {
        background: #f5f7fa;
    }

    .d-tb-title {
        margin-bottom: 4px;
        color: rgba(0,0,0,.65);
        font-size: 12px;
        line-height: 16px;
    }

    .d-tb-desc {
        color: rgba(0,0,0,.45);
        font-size: 12px;
        line-height: 16px;
    }
</style>