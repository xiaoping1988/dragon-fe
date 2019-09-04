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
        <div class="panel">
            <div class="d-chart-design-left">
                <DWorkTable :tbId="tbId"></DWorkTable>
            </div>
            <div class="d-chart-design-main">
                <DDimModule></DDimModule>
                <DMeasureModule></DMeasureModule>
                <div></div>
            </div>
            <div class="d-chart-design-right">
                <div class="module-title">
                    图表名称
                </div>
                <div class="module-title">
                    图表类型
                </div>
                <div class="module-title">
                    图内筛选
                </div>
                <div class="module-title">
                    图表备注
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DWorkTable from './WorkTable'
    import DDimModule from './DimModule'
    import DMeasureModule from './MeasureModule'
    export default {
        name: 'DChartDesign',
        components: {DWorkTable, DDimModule, DMeasureModule},
        data () {
            return {
                tbId: '',
            }
        },
        methods: {
            submit () {

            },
            cancel () {
                this.$goBack()
            }
        },
        mounted () {
            this.tbId = this.$route.query.tbId
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
        padding-left: 10px;
        padding-right: 10px;
        box-sizing: border-box;
    }

    .d-chart-design-right {
        position: absolute;
        width: 280px;
        height: 100%;
        right: 0px;
    }
</style>