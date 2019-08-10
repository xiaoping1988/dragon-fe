<template>
    <DChartFactory :meta="meta" :data="data" id="line3"></DChartFactory>
</template>

<script>
    import DChartFactory from '../chart-factory'
    import {mockChartData} from '../../../mock/data-visual/chart/mockChartData'
    import MetaDemo from '../../../mock/data-visual/chart/meta-demo/LineBarNotDate'
    export default {
        name: 'DLineBarNotDateDemo',
        components: {
            DChartFactory
        },
        data () {
            return {
                meta: MetaDemo,
                data: mockChartData(MetaDemo)
            }
        }
    }
</script>