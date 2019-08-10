<template>
  <DLoading v-show="loading"></DLoading>
</template>

<script>
  export default {
    name: 'DAMapAreaRadiusCircle', // 区域半径图
    props: {
      bmap: Object,
      data: Array,
      clickMethod: Function,
      loading: Boolean
    },
    data () {
      return {
        circleList: [],
        selectCircle: null,
        circleStyle: { // 圆圈样式
          strokeWeight: 0.5,
          strokeColor: '#be4334',
          fillOpacity: 0.6,
          fillColor: '#be4334'
        },
        circleHighlightStyle: { // 高亮显示
          fillOpacity: 0.6, // 圆圈高亮显示的透明度
          fillColor: '#1d1d1d' // 圆圈高亮显示的背景色
        }
      }
    },
    methods: {
      loadCircle () {
        let vue = this
        vue.removeOverlays()
        vue.addOverlays()
      },
      addOverlays () {
        let vue = this
        if (vue.bmap && vue.data) {
          vue.data.forEach(d => {
            if (d.gps) {
              let gps = d.gps.split(',')
              let opt = {
                center: new AMap.LngLat(Number(gps[0]), Number(gps[1])),
                radius: Number(d.radius),
                cursor: 'pointer'
              }
              Object.assign(opt, vue.circleStyle)
              let circle = new AMap.Circle(opt)
              circle.circleData = d
              circle.circleStyle = vue.circleStyle
              if (vue.clickMethod) { // 添加点击事件
                circle.on('click', function (e) {
                  vue.clickCircle(circle)
                })
              }
              circle.setMap(this.bmap)
              vue.circleList.push(circle)
            }
          })
        }
      },
      removeOverlays () {
        if (this.bmap) {
          this.circleList.forEach(c => {
            if (c) {
              c.setMap(null)
            }
          })
          this.circleList = []
        }
      },
      clickCircle (circle) {
        if (this.clickMethod) {
          this.selectCircle = circle
          this.clickMethod(circle)
        }
      }
    },
    watch: {
      bmap () {
        this.loadCircle()
      },
      data () {
        this.loadCircle()
      },
      selectCircle (newVal, oldVal) {
        if (oldVal) {
          let opt = oldVal.getOptions()
          opt.fillOpacity = oldVal.circleStyle.fillOpacity
          opt.fillColor = oldVal.circleStyle.fillColor
          oldVal.setOptions(opt)
        }

        if (newVal) {
          let opt = newVal.getOptions()
          opt.fillOpacity = this.circleHighlightStyle.fillOpacity
          opt.fillColor = this.circleHighlightStyle.fillColor
          newVal.setOptions(opt)
        }
      },
      clickMethod () {
        let vue = this
        if (vue.clickMethod) {
          vue.circleList.forEach(circle => {
            circle.off('click')
            circle.on('click', function (e) {
              vue.clickCircle(circle)
            })
          })
        } else {
          vue.circleList.forEach(circle => {
            circle.off('click')
          })
        }
      }
    },
    beforeDestroy () {
      this.removeOverlays()
    }
  }
</script>
