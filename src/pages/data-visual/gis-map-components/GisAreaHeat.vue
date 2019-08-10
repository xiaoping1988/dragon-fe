<template>
  <MAAreaHeat v-if="mapServer === mapServerObj.GAODE"
              :loading="loading"
              :areaPlyData="areaPlyData"
              :data="data"></MAAreaHeat>
  <MBAreaHeat v-else-if="mapServer === mapServerObj.BAIDU"
              :loading="loading"
              :areaPlyData="areaPlyData"
              :data="data"></MBAreaHeat>
</template>

<script>
  import {
    listAreaHeatData,
    listAreaHeatDataPreview
  } from '../../../pages/dmap/api'
  import {IndexLevel, MapServer} from '../constant'
  export default {
    name: 'MDashAreaHeat',
    props: {
      areaPlyData: Array,
      mapId: [String, Number], // 地图ID
      filters: String, // 筛选条件
      specialFilters: String, // 特殊字段筛选条件
      indexCode: String, // 热力指标
      indexLevel: String,
      mapServer: String
    },
    data () {
      return {
        loading: false,
        data: [],
        lastQueryParam: '',
        mapServerObj: MapServer
      }
    },
    methods: {
      loadAreaHeatData (refresh) { // 区域热力图数据
        let vue = this
        if (vue.areaPlyData && vue.indexCode && vue.specialFilters && vue.indexLevel === IndexLevel.City) {
          let param = {
            mapId: vue.mapId,
            indexCode: vue.indexCode,
            filters: vue.filters,
            specialFilters: vue.specialFilters
          }
          if (!refresh && vue.lastQueryParam === JSON.stringify(param)) {
            return
          }
          vue.lastQueryParam = JSON.stringify(param)
          vue.loading = true
          if (vue.mapId) { // 仪表盘页面
            listAreaHeatData(param).then(res => {
              vue.data = res.result
              vue.loading = false
            }).catch(error => {
              vue.handleError(error)
              vue.loading = false
            })
          } else { // 配置页面
            param.config = JSON.stringify(this.$store.state.dmapConfig)
            listAreaHeatDataPreview(param).then(res => {
              vue.data = res.result
              vue.loading = false
            }).catch(error => {
              vue.handleError(error)
              vue.loading = false
            })
          }
        }
      }
    },
    watch: {
      filters () {
        this.loadAreaHeatData()
      },
      indexCode () {
        this.loadAreaHeatData()
      },
      specialFilters () {
        this.loadAreaHeatData()
      },
      '$store.state.dmapConfigUpdateForQuery': function () {
        this.loadAreaHeatData(true)
      }
    },
    mounted () {
      this.loadAreaHeatData()
    }
  }
</script>
