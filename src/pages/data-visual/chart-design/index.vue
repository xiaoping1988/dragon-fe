<template>
    <div class="d-chart-design">
        <div class="head">
            <div class="title">
                <h2>设计图表</h2>
            </div>
            <div class="form-btn">
                <DSubmitCancel nohr @submit="submit" @cancel="cancel" size="mini">
                </DSubmitCancel>
            </div>
        </div>
        <div class="panel" v-if="inited">
            <div class="d-chart-design-left">
                <DWorkTable :tbId="tbId"></DWorkTable>
            </div>
            <div class="d-chart-design-main">
                <div class="container">
                    <div class="cols">
                        <DDimModule></DDimModule>
                        <DMeasureModule></DMeasureModule>
                    </div>
                    <div class="bottom">
                        <DDefaultFilterModule></DDefaultFilterModule>
                        <DChartPreviewModule></DChartPreviewModule>
                    </div>
                </div>

            </div>
            <div class="d-chart-design-right">
                <div class="module-title">
                    图表名称
                </div>
                <div class="module-content">
                    <el-input size="mini"
                              placeholder="请输入图表名称"
                              v-model.trim="basicProperties.name"></el-input>
                </div>
                <div class="module-title">
                    图表类型
                </div>
                <DChartSubType></DChartSubType>
                <DChartInsideFilter></DChartInsideFilter>
                <div class="module-title">
                    图表备注
                </div>
                <div class="module-content">
                    <el-input size="mini"
                              type="textarea"
                              rows="6"
                              placeholder="请输入图表备注"
                              v-model.trim="basicProperties.remark"></el-input>
                </div>
            </div>
        </div>
        <DLoading :loading="loading"></DLoading>
    </div>
</template>

<script>
    import DWorkTable from './work-table'
    import DDimModule from './dim/DimModule'
    import DMeasureModule from './measure/MeasureModule'
    import DDefaultFilterModule from './default-filter/DefaultFilterModule'
    import DChartPreviewModule from './chart-preview'
    import DChartSubType from './chart-sub-type'
    import DChartInsideFilter from './chart-inside-filter'
    import {addOrUpdateGeneralChart, getGeneralChartEditConfig} from '../../../services/data-visual/chart'
    import {GeneralChartEditConfig} from '../../../store'
    export default {
        name: 'DChartDesign',
        components: {
            DWorkTable,
            DDimModule,
            DMeasureModule,
            DDefaultFilterModule,
            DChartPreviewModule,
            DChartSubType,
            DChartInsideFilter
        },
        data () {
            return {
                tbId: '',
                chartId: '',
                basicProperties: {
                    projId: '', // 文件夹ID
                    dashId: '', // 仪表盘ID
                    tabId: '', // 页签ID
                    name: '', // 图表名称
                    remark: '' // 描述
                },
                loading: false,
                inited: false
            }
        },
        methods: {
            initData () {
                this.chartId = this.$route.query.chartId
                if (this.chartId) { // 编辑报表
                    this.loading = true
                    getGeneralChartEditConfig({
                        id: this.chartId
                    }).then(res => {
                        this.$store.commit('GeneralChart/initEditConfig', JSON.parse(res.data))
                        this.initDataFromVuexStore()
                        this.loading = false
                        this.inited = true
                    }).catch(this.$handleError)
                } else { // 新增报表
                    this.$store.commit('GeneralChart/initEditConfig', new GeneralChartEditConfig())
                    this.tbId = this.$route.query.tbId
                    this.basicProperties.dashId = this.$route.query.dashId
                    this.basicProperties.tabId = this.$route.query.tabId
                    this.basicProperties.projId = this.$route.query.projId
                    this.inited = true
                }
            },
            initDataFromVuexStore () {
                this.tbId = this.$store.state.GeneralChart.editConfig.workTable.tbId
                this.basicProperties = this.$store.state.GeneralChart.editConfig.basicProperties
            },
            submit () {
                if (this.validate()) {
                    this.updateBasicPropertiesStore()
                    this.loading = true
                    addOrUpdateGeneralChart({
                        id: this.$route.query.chartId,
                        editConfig: JSON.stringify(this.$store.state.GeneralChart.editConfig),
                        renderMeta: JSON.stringify(this.$store.state.GeneralChart.renderMeta)
                    }).then(res => {
                        this.backToDash(res.data)
                    }).catch(error => {
                        this.$handleError(error)
                        this.loading = false
                    })
                }
            },
            backToDash (chartId) {
                this.$router.push({
                        path: '/data-visual/dashboard/' + this.basicProperties.projId + '/' + this.basicProperties.dashId,
                        query: {
                            tabId: this.basicProperties.tabId,
                            chartId: chartId
                        }
                    }
                )
            },
            updateBasicPropertiesStore () {
                this.$store.commit('GeneralChart/updateBasicProperties', this.basicProperties)
            },
            validate () {
                if (this.basicProperties.name === '') {
                    this.$messageWarn('未设置图表名称!')
                    return false
                }
                if (this.basicProperties.name.length > 50) {
                    this.$messageWarn('图表名称长度超过50个字符!')
                    return false
                }
                let chartType = this.$store.state.GeneralChart.editConfig.chartStyle.type
                if (!chartType) {
                    this.$messageWarn('未选择任何图形!')
                    return false
                }
                return true
            },
            cancel () {
                this.$goBack()
            }
        },
        mounted () {
            this.initData()
        }
    }
</script>

<style>
    .d-chart-design {
        width: 100%;
        height: 100%;
        background: #F5F5F5;
    }

    .d-chart-design > .head {
        height: 42px;
        line-height: 42px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .d-chart-design .head .title {
        padding-left: 50px;
        float: left;
    }

    .d-chart-design .head .form-btn {
        float: right;
        padding-right: 50px;
    }

    .d-chart-design .panel {
        height: calc(100% - 42px);
        position: relative;
    }

    .d-chart-design-left {
        position: absolute;
        width: 220px;
        height: 100%;
    }

    .d-chart-design-main {
        position: absolute;
        width: calc(100% - 500px);
        height: 100%;
        overflow: auto;
        left: 220px;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        border-right: 1px solid rgba(0, 0, 0, 0.1);
    }

    .d-chart-design-main .container {
        height: 100%;
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
        box-sizing: border-box;
        min-width: 800px;
        position: relative;
    }

    .d-chart-design-main .container .cols {
        width: 100%;
    }

    .d-chart-design-main .container .bottom {
        min-height: calc(100% - 88px);
        width: calc(100% - 20px);
        position: absolute;
    }

    .d-chart-design-right {
        position: absolute;
        width: 280px;
        height: 100%;
        right: 0px;
        overflow: auto;
    }
</style>