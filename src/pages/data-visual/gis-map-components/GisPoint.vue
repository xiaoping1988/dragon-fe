<template>
  <MAPoint v-if="mapServer === mapServerObj.GAODE"
           :data="data"
           :bmap="bmap"
           :areaPlyData="areaPlyData"
           :loading="loading"
           :clickMethod="pointClickMethod"></MAPoint>
  <MBPoint v-else-if="mapServer === mapServerObj.BAIDU"
           :data="data"
           :bmap="bmap"
           :areaPlyData="areaPlyData"
           :loading="loading"
           :clickMethod="pointClickMethod"></MBPoint>
</template>

<script>
  import {listPointData, listPointDataPreview} from '../../../pages/dmap/api'
  import {IndexLevel, MapServer} from '../constant'
  export default {
    name: 'DGisPoint',
    props: {
      bmap: Object,
      areaPlyData: Array, // 商圈数据
      mapId: [String, Number], // 地图ID
      detail: Boolean, // 是否明细图
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
    computed: {
      pointClickMethod () {
        return this.clickPoint
      }
    },
    methods: {
      loadPoint (refresh) {
        if (this.bmap && this.specialFilters && (this.indexCode || this.detail) && this.indexLevel === IndexLevel.City) {
          let param = {
            mapId: this.mapId,
            indexCode: (this.detail ? '' : this.indexCode),
            filters: this.filters,
            specialFilters: this.specialFilters
          }
          if (!refresh && this.lastQueryParam === JSON.stringify(param)) {
            return
          }
          this.lastQueryParam = JSON.stringify(param)
          this.loading = true
          if (this.mapId) { // 仪表盘页面操作
            listPointData(param).then(res => {
              this.data = res.result
              this.loading = false
            }).catch(error => {
              this.handleError(error)
              this.loading = false
            })
          } else { // 配置页面
            param.config = JSON.stringify(this.$store.state.dmapConfig)
            listPointDataPreview(param).then(res => {
              this.data = res.result
              this.loading = false
            }).catch(error => {
              this.handleError(error)
              this.loading = false
            })
          }
        }
      },
      clickPoint (point) {
        this.$emit('on-click-point', point)
      }
    },
    watch: {
      bmap () {
        this.loadPoint()
      },
      filters () {
        this.loadPoint()
      },
      indexCode () {
        this.loadPoint()
      },
      specialFilters () {
        this.loadPoint()
      },
      '$store.state.dmapConfigUpdateForQuery': function () {
        this.loadPoint(true)
      }
    },
    mounted () {
      this.loadPoint()
    }
  }
</script>
