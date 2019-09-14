<template>
    <div class="d-chart-inside-filter">
        <div class="head">
            <div class="module-title">
                图内筛选
            </div>
            <div class="btn" title="编辑图内筛选配置" @click="openConfig">
                <i class="fa fa-pencil"></i>
            </div>
        </div>
        <ul class="filter-list">
            <li v-for="col in filterList" :key="col.colName">
                <div class="col-item"
                     :title="col.colName">
                    <div class="pre-icon">
                        <i class="fa" :class="'fa-' + dataTypeObj[col.dataType].icon"></i>
                    </div>
                    <div class="col-label d-ellipsis">
                        {{col.colLabel}}
                    </div>
                    <div class="btn">
                        <!--<el-button type="text" size="mini" @click="addFilter(col)">添加</el-button>-->
                    </div>
                </div>
            </li>
        </ul>
        <el-dialog title="配置图内筛选"
                   :visible.sync="configModalVisible"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :show-close="false"
                   width="720px">
            <DChartInsideFilterConfigForm @submit="submit" @cancel="cancel" v-if="configModalVisible"></DChartInsideFilterConfigForm>
        </el-dialog>
    </div>
</template>

<script>
    import {DataType} from '../../../../services/data-map/col-manage'
    import DChartInsideFilterConfigForm from './FilterConfigForm'
    export default {
        name: 'DChartInsideFilter',
        components: {DChartInsideFilterConfigForm},
        data () {
            return {
                dataTypeObj: DataType,
                configModalVisible: false,
                filterList: []
            }
        },
        methods: {
            openConfig () {
                this.configModalVisible = true
            },
            submit (filterList) {
                this.filterList = filterList
                this.updateChartFilterMetaStore()
                this.configModalVisible = false
            },
            cancel () {
                this.configModalVisible = false
            },
            updateChartFilterMetaStore () {
                this.$store.commit('GeneralChart/updateChartFilterMeta', this.filterList)
            }
        },
        watch: {
            colKeyword () {
                this.searchColList()
            }
        }
    }
</script>

<style>
    .d-chart-inside-filter {
        width: 100%;
    }

    .d-chart-inside-filter .head {
        display: flex;
        height: 32px;
        line-height: 32px;
    }

    .d-chart-inside-filter .head .module-title {
        flex-grow: 1;
    }

    .d-chart-inside-filter .head .btn {
        width: 30px;
        cursor: pointer;
        text-align: center;
    }

    .d-chart-inside-filter .head .btn:hover {
        color: #3a8ee6;
    }

    .filter-config-form {
        background: #ffffff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding: 10px;
        box-sizing: border-box;
        height: 330px;
    }

    .filter-config-form .head-label {
        margin-bottom: 10px;
    }

    .filter-list li {
        padding: 0px;
    }

    .filter-list .col-item {
        cursor: pointer;
        box-sizing: border-box;
        width: 100%;
        height: 32px;
        line-height: 32px;
        display: flex;
        padding-left: 10px;
        padding-right: 10px;
    }

    .filter-list .col-item .pre-icon {
        width: 18px;
        color: #3a8ee6;
    }

    .filter-list .col-item .btn {
        display: none;
        width: 26px;
    }

    .filter-list .col-item:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    .filter-list .col-item:hover .btn {
        display: inline-flex;
    }

    .filter-list .col-item .col-label {
        flex-grow: 1;
    }
</style>