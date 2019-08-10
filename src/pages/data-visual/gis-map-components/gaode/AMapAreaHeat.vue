<template>
  <div>
    <ul class="d-gismap-areaheat-panel page-col-ul">
      <li v-for="(c, i) in colors" :key="i">
        <p class="legend-label-long" :style="{background: c.color}"></p>
        <p class="legend-name-long">
            <span v-if="i === 0">
              &gt;= {{c.start}}
            </span>
          <span v-else-if="i === colors.length - 1">
              &lt; {{c.end}}
            </span>
          <span v-else>
              {{c.start}} - {{c.end}}
            </span>
        </p>
      </li>
    </ul>
    <DLoading v-show="loading"></DLoading>
  </div>
</template>

<script>
  const DefaultColorRange = [ // 颜色区间值范围, 从上至下, 从大到小
    {color: '#ff0000', start: 100},
    {color: '#ffe66f', start: 75, end: 100},
    {color: '#53ff53', start: 50, end: 75},
    {color: '#1482e5', start: 25, end: 50},
    {color: '#b4e0f3', end: 25}
  ]
  export default {
    name: 'DAMapAreaHeat', // 区域热力图
    props: {
      loading: Boolean,
      areaPlyData: Array, // 区域多边形覆盖物
      data: Array // 热力数据,数组内对象格式:{gps: '经度,纬度', count_value: 0}
    },
    data () {
      return {
        colors: DefaultColorRange,
        fillOpacity: 0.7,
        emptyStyle: {
          fillColor: '#ffffff',
          fillOpacity: 0.01
        }
      }
    },
    methods: {
      initData () { // 初始化数据
//        this.clearColor()
        this.setColorRange()
        this.setBizFillColor()
      },
      setBizFillColor () { // 设置商圈的热力颜色
        if (this.areaPlyData) {
          let tempBizDataObj = {}
          this.data.forEach(d => {
            tempBizDataObj[d.biz_id] = d
          })
          Object.values(this.areaPlyData).forEach(bizPly => {
            let tempData
            if ((tempData = tempBizDataObj[bizPly.bizData.bizId])) {
              bizPly.bizStyle = {
                fillColor: this.getBizFillColor(tempData),
                fillOpacity: this.fillOpacity
              }
            } else {
              bizPly.bizStyle = this.emptyStyle
            }
            let opt = bizPly.getOptions()
            opt.fillOpacity = bizPly.bizStyle.fillOpacity
            opt.fillColor = bizPly.bizStyle.fillColor
            bizPly.setOptions(opt)
          })
        }
      },
      getBizFillColor (bizData) {
        let fillColor = this.colors[0].color
        for (let i in this.colors) {
          if (this.colors[i].start === undefined) { // 最低范围
            if (bizData.count_value < this.colors[i].end) {
              fillColor = this.colors[i].color
              break
            }
          } else if (this.colors[i].end === undefined) { // 最高范围
            if (bizData.count_value >= this.colors[i].start) {
              fillColor = this.colors[i].color
              break
            }
          } else {
            if (bizData.count_value >= this.colors[i].start && bizData.count_value < this.colors[i].end) {
              fillColor = this.colors[i].color
              break
            }
          }
        }
        return fillColor
      },
      setColorRange () { // 设置颜色的范围值
        if (this.data && this.data.length) {
          let tempDataList = JSON.parse(JSON.stringify(this.data))
          // 升序排
          tempDataList.sort((a, b) => a.count_value - b.count_value)
          // 找出20%，40%，60%，80%四个位置的值
          let len = tempDataList.length
          let index20 = Math.round(len * 0.2) - 1
          if (index20 < 0) index20 = 0
          let index40 = Math.round(len * 0.4) - 1
          if (index40 < 0) index40 = 0
          let index60 = Math.round(len * 0.6) - 1
          if (index60 < 0) index60 = 0
          let index80 = Math.round(len * 0.8) - 1
          if (index80 < 0) index80 = 0

          let count20 = tempDataList[index20].count_value
          let count40 = tempDataList[index40].count_value
          let count60 = tempDataList[index60].count_value
          let count80 = tempDataList[index80].count_value
          if (count20 === 0) count20 = 1
          if (count40 <= count20) count40 = count20 + 1
          if (count60 <= count40) count60 = count40 + 1
          if (count80 <= count60) count80 = count60 + 1

          // 根据20%,40%,60%,80%的值设置颜色区间值范围
          this.colors[4].end = count20
          this.colors[3].start = count20
          this.colors[3].end = count40
          this.colors[2].start = count40
          this.colors[2].end = count60
          this.colors[1].start = count60
          this.colors[1].end = count80
          this.colors[0].start = count80
        } else {
          this.colors = DefaultColorRange
        }
      },
      clearColor () {
        if (this.areaPlyData) {
          Object.values(this.areaPlyData).forEach(bizPly => {
            if (bizPly) {
              bizPly.bizStyle = this.emptyStyle
              let opt = bizPly.getOptions()
              opt.fillOpacity = bizPly.bizStyle.fillOpacity
              opt.fillColor = bizPly.bizStyle.fillColor
              bizPly.setOptions(opt)
            }
          })
        }
      }
    },
    watch: {
      data () {
        this.initData()
      },
      areaPlyData () {
//        this.initData()
      }
    },
    mounted () {
      this.initData()
    },
    beforeDestroy () {
      this.clearColor()
    }
  }
</script>

<style scoped>
  .d-gismap-areaheat-panel {
    position: absolute;
    z-index: 700;
    background-color: #ffffff;
    right: 15px;
    top: 50px;
  }
</style>
