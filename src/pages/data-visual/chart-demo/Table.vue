<template>
    <DChartFactory :meta="meta" :data="data" @sort="sortData"></DChartFactory>
</template>

<script>
    import DChartFactory from '../chart-factory'
    import {SortType, ShowType} from '../constants'
    import {compareStr} from '../../../utils/assist'
    import {mockChartData} from '../../../mock/data-visual/chart/mockChartData'
    import MetaDemo from '../../../mock/data-visual/chart/meta-demo/Table'
    export default {
        name: 'DTableDemo',
        components: {
            DChartFactory
        },
        data () {
            return {
                meta: MetaDemo,
                data: mockChartData(MetaDemo)
            }
        },
        methods: {
            sortData (key, sort) {
                let isStr = false
                for (let i in this.meta.columns) {
                    if (this.meta.columns[i].key === key) {
                        isStr = this.meta.columns[i].showType === ShowType.text.code
                    }
                }
                let tmpData = JSON.parse(JSON.stringify(this.data))
                if (sort) {
                    this.data = tmpData.sort((a, b) => {
                        if (isStr) {
                            if (sort === SortType.asc.code) {
                                return compareStr(a[key], b[key])
                            }
                            return compareStr(b[key], a[key])
                        } else {
                            if (sort === SortType.asc.code) {
                                return a[key] - b[key]
                            }
                            return b[key] - a[key]
                        }
                    })
                } else {
                    this.data = tmpData
                }

            }
        }
    }
</script>