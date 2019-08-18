<template>
    <div class="d-chart-factory d-box-middle">
        <d-index-card v-if="meta.chartType === chartTypeObj.IndexCard.code" :id="id" :meta="meta" :data="data"></d-index-card>
        <d-table v-if="meta.chartType === chartTypeObj.Table.code" :id="id" :meta="meta" :data="data" @sort="sortData"></d-table>
        <d-line-bar v-if="meta.chartType === chartTypeObj.LineBar.code" :id="id" :meta="meta" :data="data" :resizeCount="resizeCount"></d-line-bar>
        <d-pie v-if="meta.chartType === chartTypeObj.Pie.code" :id="id" :meta="meta" :data="data" :resizeCount="resizeCount"></d-pie>
        <d-funnel v-if="meta.chartType === chartTypeObj.Funnel.code" :id="id" :meta="meta" :data="data" :resizeCount="resizeCount"></d-funnel>
        <d-map v-if="meta.chartType === chartTypeObj.Map.code" :id="id" :meta="meta" :data="data" :resizeCount="resizeCount"></d-map>
    </div>
</template>

<script>
    import {ChartType} from '../constants'
    import DLineBar from './LineBar.vue'
    import DTable from './Table.vue'
    import DIndexCard from './IndexCard.vue'
    import DPie from './Pie.vue'
    import DFunnel from './Funnel.vue'
    import DMap from './Map.vue'
    export default {
        name: 'DChartFactory',
        components: {
            DLineBar,
            DTable,
            DIndexCard,
            DPie,
            DFunnel,
            DMap
        },
        props: {
            id: [String, Number],
            meta: Object,
            data: Array,
            resizeCount: { // resize标识
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                chartTypeObj: ChartType
            }
        },
        methods: {
            sortData (key, sortType) {
                this.$emit('sort', key, sortType)
            }
        }
    }
</script>

<style>
    .d-chart-factory {
        width: 100%;
        height: 100%;
    }
</style>