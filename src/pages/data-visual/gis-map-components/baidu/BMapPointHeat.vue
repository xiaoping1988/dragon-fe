<template>
  <div>
    <ul class="dmap-pointheat-button page-row-ul">
      <li style="width: 55px">
        <iSwitch @on-change="toggleShowPointHeatMap" v-model="showHeat">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </iSwitch>
      </li>
      <li style="width: calc(100% - 55px)">
        <Slider v-model="sliderValue"
                :disabled="!showHeat"
                :step="10"
                :max="100"
                show-stops
                show-tip="always"
                @on-change="changePointHeatSlider"></Slider>
      </li>
    </ul>
    <DLoading v-show="loading"></DLoading>
  </div>
</template>

<script>
  export default {
    name: 'DBMapPointHeat', // 散点热力图
    props: {
      loading: Boolean,
      bmap: Object, // 地图对象
      data: Array // 热力数据,数组内对象格式:{gps: '经度,纬度', count_value: 0}
    },
    data () {
      return {
        showHeat: true,
        sliderValue: 20,
        heatOverlay: null,
        heatStyle: {
          radius: 20
        },
        inited: false
      }
    },
    methods: {
      loadPointHeat () { // 加载散点热力图
        let vue = this
        if (vue.bmap) {
          window.setTimeout(function () {
            vue.addHeatOverlay()
          }, 1000)
        }
      },
      addHeatOverlay () {
        let vue = this
        if (vue.heatOverlay) {
          vue.bmap.removeOverlay(vue.heatOverlay)
        }
        vue.inited = true
        vue.heatOverlay = new BMapLib.HeatmapOverlay(vue.heatStyle)
        vue.bmap.addOverlay(vue.heatOverlay)
        let points = []
        vue.data.forEach(p => {
          if (p.gps) {
            let gps = p.gps.split(',')
            points.push({lng: Number(gps[0]), lat: Number(gps[1]), count: Number(p.count_value)})
          }
        })
        vue.heatOverlay.setDataSet({data: points, max: (vue.sliderValue === 0 ? 1 : vue.sliderValue)})
        vue.showHeat = true
      },
      toggleShowPointHeatMap () { // 显示和隐藏散点热力图
        if (this.heatOverlay) {
          if (this.showHeat) {
            this.heatOverlay.show()
          } else {
            this.heatOverlay.hide()
          }
        }
      },
      changePointHeatSlider (value) { // 散点热力图权重滑动条
        if (this.heatOverlay) {
          this.heatOverlay.setDataSet({data: this.heatOverlay.data.data, max: (value === 0 ? 1 : value)})
        }
      },
      removeOverlays () {
        if (this.heatOverlay) {
          this.bmap.removeOverlay(this.heatOverlay)
          this.heatOverlay = null
        }
      }
    },
    watch: {
      data () {
        this.loadPointHeat()
      }
    },
    mounted () {
//      this.loadPointHeat()
    },
    beforeDestroy () {
      this.removeOverlays()
    }
  }
</script>

<style scoped>
  .dmap-pointheat-button {
    position: absolute;
    width: 300px;
    background-color: #ffffff;
    right: 15px;
    top: 70px;
    line-height: 32px;
    z-index: 10;
  }
</style>
