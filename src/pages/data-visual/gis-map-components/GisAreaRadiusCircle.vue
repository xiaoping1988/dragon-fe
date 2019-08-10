<template>
  <MAAreaRadiusCircle v-if="mapServer === mapServerObj.GAODE"
                      :bmap="bmap"
                      :data="data"
                      :clickMethod="circleClickMethod"
                      :loading="loading"></MAAreaRadiusCircle>
  <MBAreaRadiusCircle v-else-if="mapServer === mapServerObj.BAIDU"
                      :bmap="bmap"
                      :data="data"
                      :clickMethod="circleClickMethod"
                      :loading="loading"></MBAreaRadiusCircle>
</template>

<script>
  import {listAreaRadiusCircleData, listAreaRadiusCircleDataPreview} from '../../../pages/dmap/api'
  import {MapServer} from '../constant'
  export default {
    name: 'MDashAreaRadiusCircle',
    props: {
      bmap: Object,
      mapId: [String, Number], // 地图ID
      filters: String, // 筛选条件
      specialFilters: String, // 特殊字段筛选条件
      mapServer: String
    },
    data () {
      return {
        loading: false,
        data: [],
        lastQueryParam: '',
        lastSpecialFilters: '',
        mapServerObj: MapServer
      }
    },
    computed: {
      circleClickMethod () {
        return this.clickCircle
      }
    },
    methods: {
      loadCircle (refresh) {
        if (this.bmap && this.specialFilters) {
          let param = {
            mapId: this.mapId,
            filters: this.filters,
            specialFilters: JSON.parse(this.specialFilters)
          }
          // 如果只是gps点变化了，不用更新圆圈数据
          param.specialFilters.gps = null
          if (!refresh && this.lastQueryParam === JSON.stringify(param)) {
            return
          }
          this.lastQueryParam = JSON.stringify(param)
          this.loading = true
          param.specialFilters = this.specialFilters
          if (this.mapId) { // 仪表盘页面
            listAreaRadiusCircleData(param).then(res => {
              this.data = res.result
              this.loading = false
            }).catch(error => {
              this.handleError(error)
              this.loading = false
            })
          } else { // 配置页面
            param.config = JSON.stringify(this.$store.state.dmapConfig)
            listAreaRadiusCircleDataPreview(param).then(res => {
              this.data = res.result
              this.loading = false
            }).catch(error => {
              this.handleError(error)
              this.loading = false
            })
          }
        }
      },
      clickCircle (circle) {
        this.$emit('on-click-circle', circle)
      }
    },
    watch: {
      bmap () {
        this.loadCircle()
      },
      filters () {
        this.loadCircle()
      },
      specialFilters (newVal, oldVal) {
        this.loadCircle()
      },
      '$store.state.dmapConfigUpdateForQuery': function () {
        this.loadCircle(true)
      }
    },
    mounted () {
      this.loadCircle()
    }
  }
</script>
