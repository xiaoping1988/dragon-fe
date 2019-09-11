<template>
  <MAPointHeat v-if="mapServer === mapServerObj.GAODE" :bmap="bmap" :data="data" :loading="loading"></MAPointHeat>
  <MBPointHeat v-else-if="mapServer === mapServerObj.BAIDU" :bmap="bmap" :data="data" :loading="loading"></MBPointHeat>
</template>

<script>
  import {listPointHeatData, listPointHeatDataPreview} from '../../../pages/dmap/api'
  import {IndexLevel, MapServer} from '../constant'
  export default {
    name: 'MDashPointHeat', // 散点热力图
    props: {
      bmap: Object,
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
      loadPointHeatData (refresh) {
        if (this.bmap && this.indexCode && this.specialFilters && this.indexLevel === IndexLevel.City) {
          let param = {
            mapId: this.mapId,
            indexCode: this.indexCode,
            filters: this.filters,
            specialFilters: this.specialFilters
          }
          if (!refresh && this.lastQueryParam === JSON.stringify(param)) {
            return
          }
          this.lastQueryParam = JSON.stringify(param)
          this.loading = true
          if (this.mapId) { // 仪表盘页面
            listPointHeatData(param).then(res => {
              this.data = res.result
              this.loading = false
            }).catch(error => {
              this.$handleError(error)
              this.loading = false
            })
          } else { // 配置页面
            param.config = JSON.stringify(this.$store.state.dmapConfig)
            listPointHeatDataPreview(param).then(res => {
              this.data = res.result
              this.loading = false
            }).catch(error => {
              this.$handleError(error)
              this.loading = false
            })
          }
        }
      }
    },
    watch: {
      bmap () {
        this.loadPointHeatData()
      },
      filters () {
        this.loadPointHeatData()
      },
      indexCode () {
        this.loadPointHeatData()
      },
      specialFilters () {
        this.loadPointHeatData()
      },
      indexLevel () {
        this.loadPointHeatData()
      },
      '$store.state.dmapConfigUpdateForQuery': function () {
        this.loadPointHeatData(true)
      }
    },
    mounted () {
      this.loadPointHeatData()
    }
  }
</script>

<style>

</style>
