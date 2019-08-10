<template>
    <DChartFactory :meta="meta" :data="data" id="bar4"></DChartFactory>
</template>

<script>
    import DChartFactory from '../chart-factory'
    import {mockChartData} from '../../../mock/data-visual/chart/mockChartData'
    import MetaDemo from '../../../mock/data-visual/chart/meta-demo/BarStackTop'
    export default {
        name: 'DBarStackTopDemo',
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