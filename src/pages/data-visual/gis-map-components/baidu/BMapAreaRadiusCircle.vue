<template>
  <DLoading v-show="loading"></DLoading>
</template>

<script>
  export default {
    name: 'DBMapAreaRadiusCircle', // 区域半径图
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
              let point = new BMap.Point(Number(gps[0]), Number(gps[1]))
              let circle = new BMap.Circle(point, Number(d.radius), vue.circleStyle)
              circle.circleData = d
              circle.circleStyle = vue.circleStyle
              if (vue.clickMethod) { // 添加点击事件
                circle.addEventListener('click', function (e) {
                  vue.clickCircle(circle)
                })
              }
              vue.bmap.addOverlay(circle)
              vue.circleList.push(circle)
            }
          })
        }
      },
      removeOverlays () {
        if (this.bmap) {
          this.circleList.forEach(c => {
            if (c) {
              this.bmap.removeOverlay(c)
            }
          })
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
          oldVal.setFillOpacity(oldVal.circleStyle.fillOpacity)
          oldVal.setFillColor(oldVal.circleStyle.fillColor)
        }

        if (newVal) {
          newVal.setFillOpacity(this.circleHighlightStyle.fillOpacity)
          newVal.setFillColor(this.circleHighlightStyle.fillColor)
        }
      },
      clickMethod () {
        let vue = this
        if (vue.clickMethod) {
          vue.circleList.forEach(circle => {
            circle.removeEventListener('click')
            circle.addEventListener('click', function (e) {
              vue.clickCircle(circle)
            })
          })
        } else {
          vue.circleList.forEach(circle => {
            circle.removeEventListener('click')
          })
        }
      }
    },
    beforeDestroy () {
      this.removeOverlays()
    }
  }
</script>
