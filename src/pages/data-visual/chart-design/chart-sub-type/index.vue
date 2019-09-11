<template>
    <ul class="chart-sub-type-list">
        <li v-for="item in chartSubTypeList"
            :key="item.code"
            class="chart-sub-type-item d-box-middle"
            :class="{'chat-sub-type-enable': item.enable, 'chat-sub-type-active': item.active}"
            @click="selectActive(item)">
            <el-tooltip effect="dark" placement="left">
                <div slot="content">
                    <div class="chart-sub-type-tip name">
                        <span>{{item.name}}</span>
                    </div>
                    <div class="chart-sub-type-tip">
                        <span>{{item.ruleTipDim}}</span>
                    </div>
                    <div class="chart-sub-type-tip">
                        <span>{{item.ruleTipMeasure}}</span>
                    </div>
                </div>
                <img class="chart-sub-type-icon" :src="item.enable ? item.imgEnable : item.imgDisable"/>
            </el-tooltip>
        </li>
    </ul>
</template>

<script>
    import ChartMetaBuilder from './chartMetaBuilder'
    export default {
        name: 'DChartSubTypeList',
        data () {
            return {
                chartSubTypeList: Object.values(ChartMetaBuilder),
                userSelectedChartSubType: null // 用户选中的图表类型
            }
        },
        watch: {
            '$store.state.GeneralChart.configUpdateCount': function () {
                this.updateEnableAndActiveItem()
            }
        },
        methods: {
            updateEnableAndActiveItem () {
                let userLastSelectedEnable = false // 用户上次选中的图表类型依然可用
                let maxPriorityChartType  // 优先级最高的可适配的图表类型
                this.chartSubTypeList.forEach(c => {
                    c.active = false
                    c.enable = c.ruleCheck(this.$store.state.GeneralChart.editConfig)
                    if (c.enable) {
                        if (!maxPriorityChartType || c.priority > maxPriorityChartType.priority) {
                            maxPriorityChartType = c
                        }
                        if (this.userSelectedChartSubType && this.userSelectedChartSubType.code === c.code) {
                            userLastSelectedEnable = true
                        }
                    }
                })
                if (userLastSelectedEnable) { // 用户上次选中的图表类型依然可用
                    this.userSelectedChartSubType.active = true
                    this.updateChartMetaStore(this.userSelectedChartSubType)
                } else if (maxPriorityChartType) {
                    maxPriorityChartType.active = true
                    this.updateChartMetaStore(maxPriorityChartType)
                } else {
                    this.updateChartMetaStore()
                }
            },
            selectActive (item) {
                if (!item.enable) {
                    return
                }
                this.chartSubTypeList.forEach(c => {
                    c.active = (item && item.code === c.code)
                })
                this.userSelectedChartSubType = item
                this.updateChartMetaStore(item)
            },
            updateChartMetaStore (item) {
                let itemMeta = {}
                if (item) {
                    itemMeta = item.getChartMeta(this.$store.state.GeneralChart.editConfig)
                }
                this.$store.commit('GeneralChart/updateChartMeta', itemMeta)
            }
        }
    }
</script>

<style>

    .chart-sub-type-list {
        display: flex;
        flex-wrap: wrap;
    }

    .chart-sub-type-item {
        width: 50px;
        height: 50px;
        position: relative;
        margin: 2px;
        padding: 0px;
    }

    .chart-sub-type-icon {
        width: 25px;
        height: 25px;
    }

    .chart-sub-type-tip {
        line-height: 20px;
    }

    .chart-sub-type-tip.name {
        font-weight: 700;
    }

    .chat-sub-type-enable {
        cursor: pointer;
    }

    .chat-sub-type-enable:hover {
        background-color: #f9f9f9;
    }

    .chat-sub-type-active {
        background-color: #ffffff;
        border: 1px solid rgba(81,130,228,.6) ;
    }
</style>