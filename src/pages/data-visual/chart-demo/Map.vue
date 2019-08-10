<template>
    <div style="width: 100%;height: 100%">
        <div style="height: 32px">
            <el-select v-model="mapType" placeholder="请选择" @change="changeProvince">
                <el-option label="全国" value="china"></el-option>
                <el-option
                        v-for="item in proviceCityList"
                        :key="item.mapType"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
        </div>
        <div style="width: 100%;height: calc(100% - 32px)">
            <DChartFactory :meta="meta" :data="data" :id="mapType"></DChartFactory>
        </div>
    </div>
</template>

<script>
    import DChartFactory from '../chart-factory'
    import {proviceCitys} from '../constants'
    import {mockChartData} from '../../../mock/data-visual/chart/mockChartData'
    import MetaDemo from '../../../mock/data-visual/chart/meta-demo/Map'

    export default {
        name: 'DMapDemo',
        components: {
            DChartFactory
        },
        data () {
            return {
                proviceCityList: proviceCitys,
                meta: {},
                data: [],
                mapType: 'china'
            }
        },
        methods: {
            changeProvince () {
                this.setMeta()
                this.setData()
            },
            setMeta () {
                this.meta = MetaDemo
                this.meta.mapType = this.mapType
            },
            setData () {
                this.data = mockChartData(this.meta)
            }
        },
        mounted () {
            this.mapType = 'china'
            this.changeProvince()
        }
    }
</script>