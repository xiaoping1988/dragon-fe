<template>
  <DLoading v-show="loading"></DLoading>
</template>

<script>
  import {listBizByCityAndBusiness} from '../../../pages/dmap/api'
  export default {
    name: 'DAMapBusinessCircle', // 城市商圈图
    props: {
      bmap: { // 地图对象
        type: Object
      },
      businessCode: { // 业务线代码
        type: String,
        required: true
      },
      cityId: { // 城市ID
        type: [String, Number],
        required: true
      },
      showName: Boolean, // 是否要显示商圈名称
      clickMethod: Function, // 点击商圈的方法
      initMenuMethod: Function, // 初始化右键菜单的方法
      selectBizId: [String, Number], // 选中的商圈ID
      fillOpacity: Number
    },
    data () {
      return {
        loading: false,
        bizStyle: { // 商圈样式
          strokeWeight: 1.5,
          strokeColor: '#0905ff',
          fillOpacity: 0.6,
          fillColor: '#ffffff'
        },
        bizHighlightStyle: { // 高亮显示
          fillOpacity: 0.6, // 商圈高亮显示的透明度
          fillColor: '#1d1d1d' // 商圈高亮显示的背景色
        },
        labelStyle: {
          'font-weight': 100,
          border: '1px solid #ccc'
        },
        bizPlyList: {},
        selectBizPly: null,
        lastQueryParams: ''
      }
    },
    methods: {
      updateBizStyle () {
        if (this.fillOpacity !== undefined && this.fillOpacity !== null) {
          this.bizStyle.fillOpacity = this.fillOpacity
        }
      },
      loadBusinessCircle (refresh) {
        let vue = this
        vue.updateBizStyle()
        if (vue.bmap && vue.businessCode && vue.cityId) {
          let param = {
            businessCode: vue.businessCode,
            city_id: vue.cityId
          }
          if (!refresh && vue.lastQueryParams === JSON.stringify(param)) {
            return
          }
          vue.lastQueryParams = JSON.stringify(param)
          vue.loading = true
          vue.removeOverlays()
          listBizByCityAndBusiness(param).then(res => {
            if (res.result.length) {
              res.result.forEach(biz => {
                if (biz.bizRange) {
                  let opt = {
                    path: vue.getPolygonPoints(biz),
                    cursor: 'pointer'
                  }
                  Object.assign(opt, vue.bizStyle)
                  let ply = new AMap.Polygon(opt) // 建立多边形覆盖物
                  ply.bizStyle = vue.bizStyle
                  ply.bizData = biz
                  vue.bizPlyList[biz.bizId] = ply
                  if (vue.selectBizId && vue.selectBizId === biz.bizId) { // 初始化选中的商圈
                    vue.selectBizPly = ply
                  }
                  if (vue.initMenuMethod) { // 初始化右键菜单
                    vue.initMenuMethod(ply)
                  }
                  ply.setMap(vue.bmap)  // 添加覆盖物
                  if (vue.clickMethod) { // 添加点击事件
                    ply.on('click', function (e) {
                      vue.clickBusinessCircle(e, ply)
                    })
                  }
                  // 添加商圈名称
                  if (vue.showName && biz.bizCenter) {
                    let bizCenter = biz.bizCenter.split(',')
                    ply.bizCenterPoint = new AMap.LngLat(Number(bizCenter[0]), Number(bizCenter[1]))
                    ply.bizLabel = vue.getLabel(ply.bizCenterPoint, biz.bizName)
                    ply.bizLabel.setMap(vue.bmap)
                  }
                }
              })
            }
            vue.$emit('on-loaded', vue.bizPlyList)
            vue.loading = false
          }).catch(error => {
            vue.handleError(error)
            vue.loading = false
          })
        }
      },
      clickBusinessCircle (e, ply) {
        if (this.clickMethod) {
          this.selectBizPly = ply
          this.clickMethod(e, ply)
        }
      },
      getPolygonPoints (biz) { // 解析每个商圈覆盖物的point对象集合
        let gons = []
        let range = JSON.parse(biz.bizRange)
        range.forEach(r => {
          gons.push(new AMap.LngLat(Number(r.lng), Number(r.lat)))
        })
        return gons
      },
      getLabel (point, bizName) { // 获取某个商圈的商圈名称标签
        if (!bizName) {
          bizName = ''
        }
        // 添加商圈名称
        let opt = {
          text: bizName,
          position: point,
          offset: this.getLabelOffset(bizName),
          style: this.labelStyle,
          zIndex: 200
        }
        let label = new AMap.Text(opt)
        return label
      },
      getLabelOffset (bizName) { // 标签的offset
//        let offsetWidth = 0
//        if (bizName && bizName.length) {
//          offsetWidth = (bizName.length / 2) * -10
//        }
        return new AMap.Pixel(0, 0)
      },
      removeOverlays () {
        Object.values(this.bizPlyList).forEach(biz => {
          if (biz) {
            this.bmap.remove(biz)
            if (biz.bizLabel) {
              this.bmap.remove(biz.bizLabel)
            }
          }
        })
        this.bizPlyList = {}
      },
      refresh () {
        this.loadBusinessCircle(true)
      }
    },
    watch: {
      bmap () {
        this.loadBusinessCircle()
      },
      businessCode () {
        this.loadBusinessCircle()
      },
      cityId () {
        this.loadBusinessCircle()
      },
      selectBizId () {
        if (this.selectBizId) {
          this.selectBizPly = this.bizPlyList[this.selectBizId]
        } else {
          this.selectBizPly = null
        }
      },
      selectBizPly (newVal, oldVal) {
        if (oldVal) {
          let opt = oldVal.getOptions()
          opt.fillOpacity = oldVal.bizStyle.fillOpacity
          opt.fillColor = oldVal.bizStyle.fillColor
          oldVal.setOptions(opt)
        }

        if (newVal) {
          let opt = newVal.getOptions()
          opt.fillOpacity = this.bizHighlightStyle.fillOpacity
          opt.fillColor = this.bizHighlightStyle.fillColor
          newVal.setOptions(opt)
        }
      },
      clickMethod () {
        let vue = this
        if (vue.clickMethod) {
          Object.values(vue.bizPlyList).forEach(ply => {
            ply.off('click')
            ply.on('click', function (e) {
              vue.clickBusinessCircle(e, ply)
            })
          })
        } else {
          Object.values(vue.bizPlyList).forEach(ply => {
            ply.off('click')
          })
        }
      }
    },
    mounted () {
      this.loadBusinessCircle()
    },
    beforeDestroy () {
      this.removeOverlays()
    }
  }
</script>
