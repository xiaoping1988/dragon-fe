<template>
    <DChartFactory :meta="meta" :data="data" id="area1"></DChartFactory>
</template>

<script>
    import DChartFactory from '../chart-factory'
    import {mockChartData} from '../../../mock/data-visual/chart/mockChartData'
    import MetaDemo from '../../../mock/data-visual/chart/meta-demo/Area'
    export default {
        name: 'DAreaDemo',
        components: {DChartFactory},
        data () {
            return {
                meta: MetaDemo,
                data: mockChartData(MetaDemo)
            }
        }
    }
</script>