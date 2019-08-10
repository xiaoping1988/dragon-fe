<template>
  <div>
    <DLoading v-show="loading"></DLoading>
  </div>
</template>

<script>
  export default {
    name: 'DAMapPoint', // 散点图
    props: {
      loading: Boolean,
      areaPlyData: Array, // 商圈数据
      bmap: Object, // 地图对象
      data: Array, // 热力数据,数组内对象格式:{gps: '经度,纬度', count_value: 0}
      clickMethod: Function
    },
    data () {
      return {
        pointCollection: [],
        selectPoint: null,
        highLightMarker: null,
        geocoder: null
      }
    },
    methods: {
      loadPoints () {
        let vue = this
        if (vue.bmap) {
          if (vue.highLightMarker) {
            vue.highLightMarker.setMap(null)
          }
          vue.pointCollection.forEach(pc => {
            pc.clear()
          })
          vue.pointCollection = []
          if (vue.data && vue.data.length) {
            let pointCount = vue.data.length
            let gpsSize = new AMap.Size(11, 11)
            if (pointCount < 50) {
              gpsSize = new AMap.Size(20, 20)
            } else if (pointCount < 500) {
              gpsSize = new AMap.Size(15, 15)
            }
            // TODO 以后要做成对比
            let tempData = {}
            let points = []
            vue.data.forEach(d => {
              if (d.gps) {
                let gps = d.gps.split(',')
                let point = {
                  lnglat: new AMap.LngLat(Number(gps[0]), Number(gps[1]))
//                  name: i,
//                  id: 1,
                }
                point.lnglat.pointData = d
                points.push(point)
              }
            })
            let styleObj = {
              url: '//vdata.amap.com/icons/b18/1/2.png',  // 图标地址
              anchor: new AMap.Pixel(3, 3),
              size: gpsSize
            }
            let collection = new AMap.MassMarks(points, {
              zIndex: 1000,
              style: styleObj,
              cursor: 'pointer'
            })
            if (vue.clickMethod) {
              if (!vue.geocoder) {
                vue.geocoder = new AMap.Geocoder()
              }
              collection.on('click', function (e) {
                vue.geocoder.getAddress(e.data.lnglat, function (status, result) {
                  if (status === 'complete' && result.regeocode) {
                    e.data.lnglat.gpsAddress = result.regeocode.formattedAddress
                  }
                  vue.clickPoint(e.data.lnglat)
                })
              })
            }
            collection.setMap(vue.bmap)
            vue.pointCollection.push(collection)
          }
        }
      },
      removeOverlays () {
        if (this.pointCollection) {
          this.pointCollection.forEach(pc => {
            pc.clear()
          })
        }

        if (this.highLightMarker) {
          this.highLightMarker.setMap(null)
          this.highLightMarker = null
        }
      },
      clickPoint (point) {
        if (this.clickMethod) { //
          if (this.areaPlyData && this.areaPlyData.length && !point.bizName) {
            let bizName = '不归属任何商圈'
            for (let i in this.areaPlyData) {
              if (AMap.GeometryUtil.isPointInRing(point, this.areaPlyData[i].getPath())) {
                if (this.areaPlyData[i].bizData && this.areaPlyData[i].bizData.bizName) {
                  bizName = this.areaPlyData[i].bizData.bizName
                } else {
                  bizName = '未命名'
                }
                break
              }
            }
            point.bizName = bizName
          }
          this.selectPoint = point
          this.clickMethod(point)
        }
      }
    },
    watch: {
      data () {
        this.loadPoints()
      },
      selectPoint (newVal, oldVal) {
        if (this.highLightMarker) {
          this.highLightMarker.setMap(null)
        }
        if (newVal) {
          this.highLightMarker = new AMap.Marker({position: newVal})
          this.highLightMarker.setMap(this.bmap)
        }
      },
      clickMethod () {
        let vue = this
        if (vue.clickMethod) {
          vue.pointCollection.forEach(pc => {
            pc.off('click')
            pc.on('click', function (e) {
              vue.clickPoint(e.data.lnglat)
            })
          })
        } else {
          vue.pointCollection.forEach(ply => {
            ply.off('click')
          })
        }
      }
    },
    beforeDestroy () {
      this.removeOverlays()
    }
  }
</script>

<style scoped>
  .dmap-point-panel {
    position: absolute;
    background-color: #ffffff;
    top: 50px;
    right: 15px;
  }
</style>
