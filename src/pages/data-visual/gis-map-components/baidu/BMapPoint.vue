<template>
  <div>
    <DLoading v-show="loading"></DLoading>
  </div>
</template>

<script>
  export default {
    name: 'DBMapPoint', // 散点图
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
          vue.bmap.removeOverlay(vue.highLightMarker)
          vue.pointCollection.forEach(pc => {
            pc.clear()
          })
          vue.pointCollection = []
          if (vue.data && vue.data.length) {
            let pointCount = vue.data.length
            let gpsSize = BMAP_POINT_SIZE_NORMAL
            if (pointCount < 50) {
              gpsSize = BMAP_POINT_SIZE_BIGGER
            } else if (pointCount < 500) {
              gpsSize = BMAP_POINT_SIZE_BIG
            }
            // TODO 以后要做成对比
            let tempData = {}
            let points = []
            vue.data.forEach(d => {
              if (d.gps) {
                let gps = d.gps.split(',')
                let point = new BMap.Point(Number(gps[0]), Number(gps[1]))
                point.pointData = d
                points.push(point)
              }
            })
            let collection = new BMap.PointCollection(points, {
              size: gpsSize,
              shape: BMAP_POINT_SHAPE_STAR,
              color: 'green'
            })
            if (vue.clickMethod) {
              vue.geocoder = new BMap.Geocoder()
              collection.addEventListener('click', function (e) {
                vue.geocoder.getLocation(e.point, function (rs) {
                  let addComp = rs.addressComponents
                  e.point.gpsAddress = addComp.city + addComp.district + addComp.street + addComp.streetNumber
                  if (addComp.province !== addComp.city) {
                    e.point.gpsAddress = addComp.province + e.point.gpsAddress
                  }
                  vue.clickPoint(e.point)
                })
              })
            }
            vue.bmap.addOverlay(collection)
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
          this.bmap.removeOverlay(this.highLightMarker)
        }
      },
      clickPoint (point) {
        if (this.clickMethod) { //
          if (this.areaPlyData && this.areaPlyData.length && !point.bizName) {
            let bizName = '不归属任何商圈'
            for (let i in this.areaPlyData) {
              if (BMapLib.GeoUtils.isPointInPolygon(point, this.areaPlyData[i])) {
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
          this.bmap.removeOverlay(this.highLightMarker)
        }
        if (newVal) {
          this.highLightMarker = new BMap.Marker(newVal)
          this.bmap.addOverlay(this.highLightMarker)
        }
      },
      clickMethod () {
        let vue = this
        if (vue.clickMethod) {
          vue.pointCollection.forEach(pc => {
            pc.removeEventListener('click')
            pc.addEventListener('click', function (e) {
              vue.clickPoint(e.point)
            })
          })
        } else {
          vue.pointCollection.forEach(ply => {
            ply.removeEventListener('click')
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
