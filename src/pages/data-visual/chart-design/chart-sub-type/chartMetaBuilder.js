// http://www.iconfont.cn
// #1296db 高亮  #8a8a8a 置灰
/** 表格 */
import tableD from '@/assets/chart/tabled.png'
import tableE from '@/assets/chart/tablee.png'
/** 指标卡 */
import indexCardD from '@/assets/chart/indexcardd.png'
import indexCardE from '@/assets/chart/indexcarde.png'
/** 多功能指标卡 */
import multiIndexCardD from '@/assets/chart/multiindexcardd.png'
import multiIndexCardE from '@/assets/chart/multiindexcarde.png'
/** 折线图 */
import lineD from '@/assets/chart/lined.png'
import lineE from '@/assets/chart/linee.png'
/** 面积图 */
import areaD from '@/assets/chart/aread.png'
import areaE from '@/assets/chart/areae.png'
/** 堆积面积图 */
import stackAreaD from '@/assets/chart/stackaread.png'
import stackAreaE from '@/assets/chart/stackareae.png'
/** 柱状图 */
import barD from '@/assets/chart/bard.png'
import barE from '@/assets/chart/bare.png'
/** 横向柱状图 */
import barTransverseD from '@/assets/chart/bartransversed.png'
import barTransverseE from '@/assets/chart/bartransversee.png'
/** 横向堆积柱状图 */
import stackBarTransverseD from '@/assets/chart/stackbartransversed.png'
import stackBarTransverseE from '@/assets/chart/stackbartransversee.png'
/** 纵向堆积柱状图 */
import stackBarD from '@/assets/chart/stackbard.png'
import stackBarE from '@/assets/chart/stackbare.png'
/** 饼图 */
import pieD from '@/assets/chart/pied.png'
import pieE from '@/assets/chart/piee.png'
/** 环形图 */
import ringD from '@/assets/chart/ringd.png'
import ringE from '@/assets/chart/ringe.png'
/** 漏斗图 */
import funnelD from '@/assets/chart/funneld.png'
import funnelE from '@/assets/chart/funnele.png'
/** 双轴图 */
import lineBarD from '@/assets/chart/linebard.png'
import lineBarE from '@/assets/chart/linebare.png'
/** 地图 */
import mapD from '@/assets/chart/mapd.png'
import mapE from '@/assets/chart/mape.png'
import {ChartType, GridAxisType, ShowType, THB, THBValueType} from '../../constants'
import {DataType} from "../../../../services/data-map/col-manage";

/**
 * 处理字段的公共属性信息
 * @param chartConfig 图表配置
 * @param dimColumnMoreProperty 维度对象多余的属性值
 * @param measureColumnMoreProperty 数值对象多余的属性值
 * @returns {{columns: Array}}
 */
function handleColumnCommonProps (chartConfig, dimColumnMoreProperty, measureColumnMoreProperty) {
  let columns = [] // 图表要展现的字段列表，维度及数值
  /**
   * 处理维度列表
   * @param dimList 维度集合
   * @param contrast 是否对比维度
   * @returns {*}
   */
  function handDim (config) {
    // 解析维度字段
    if (config) {
      let tempShowColumns = [] // 图内要展现的字段，包含不支持切换的维度及切换默认显示的维度
      config.colList.forEach((col, index) => {
        let tempCol = {
          key: col.colConfig.key, // 取数据用的key
          name: col.colConfig.showName, // 维度显示名称
          showType: col.colConfig.showType, // 显示类型
          dataType: col.dataType, // 数据类型
          dim: true
        }
        tempShowColumns.push(Object.assign(tempCol, dimColumnMoreProperty))
      })
      columns = columns.concat(tempShowColumns)
    }
  }

  // 处理维度
  handDim(chartConfig.dimConfig.main)
  // 处理对比维度
  handDim(chartConfig.dimConfig.contrast)

  /**
   * 处理指标字段
   * @param measureList 指标集合
   * @param isMain 是否是主轴
   */
  function handleMeasure (config, isMain) {
    if (config) {
      let tempShowColumns = [] // 图内展示的字段
      config.colList.forEach(col => {
        let tempCol = {
          key: col.colConfig.key, // 字段key
          name: col.colConfig.showName, // 字段显示名称
          showType: col.colConfig.showType, // 显示类型，文本、数字、金额、百分比
          unit: col.colConfig.unit, // 单位
          divisor: col.colConfig.divisor, // 除数
          axis: isMain ? GridAxisType.LeftY.code : GridAxisType.RightY.code, // 轴标识
          type: config.type, // 线条类型
          THB: col.colConfig.THB,
          THBValueType: col.colConfig.THBValueType,
          dim: false
        }
        tempShowColumns.push(Object.assign(tempCol, measureColumnMoreProperty))
      })
      columns = columns.concat(tempShowColumns)
    }
  }

  // 处理主轴指标
  handleMeasure(chartConfig.measureConfig.main, true)

  // 处理次轴指标
  handleMeasure(chartConfig.measureConfig.second, true)

  return {
    columns: columns
  }
}

/**
 * 获取切换字段的配置信息
 * 显示页面，切换按钮用
 * @param chartConfig
 * @returns {{columns: Array}}
 */
function handleSwitchFieldMeta (chartConfig) {
  return handleColumnCommonProps(chartConfig, {}, {})
}

export {handleSwitchFieldMeta}

/**
 * 获取图表的维度和指标数量
 * @param chartConfig
 * @returns {{dimList: *, contrastDimList: *, mainAxisMeasureList: *, secondAxisMeasureList: *}}
 */
function getChartColumnCnt (chartConfig) {
  let mainDimCnt = chartConfig.dimConfig.main.colList.length
  let contrastDimCnt = chartConfig.dimConfig.contrast.colList.length
  let mainMeasureCnt = chartConfig.measureConfig.main.colList.length
  let secondMeasureCnt = chartConfig.measureConfig.second.colList.length
  return {
    mainDimCnt: mainDimCnt,
    contrastDimCnt: contrastDimCnt,
    mainMeasureCnt: mainMeasureCnt,
    secondMeasureCnt: secondMeasureCnt
  }
}

/**
 * 展示页面图表类型(折线图、柱状图、横向柱状图、堆积柱状图、横向堆积柱状图、堆积面积图)切换的规则校验
 * @param colCnt
 * @returns {boolean}
 */
function ruleCheckLineOrBarOfSwitch (colCnt) {
  if (colCnt.mainDimCnt === 1) { // 必须要有一个维度
    if ((colCnt.mainMeasureCnt && !colCnt.secondMeasureCnt) ||
        (!colCnt.mainMeasureCnt && colCnt.secondMeasureCnt)) { // 只能一个轴上有指标
      return true
    }
  }
  return false
}

/**
 * 获取折线图、柱状图、横向柱状图、堆积柱状图、横向堆积柱状图、堆积面积图的chartMeta
 * @returns {{chartType: *, chartSubType, category: string, hasContrast: boolean, type: *}}
 * @param parameters
 */
function getChartMetaOfLineOrBar (chartConfig, type, chartType, chartSubType, category, stack) {
  let result = handleColumnCommonProps(chartConfig,
    { // 添加的维度属性
      // axis: GridAxisType.DownX.code
    },
    { // 添加的指标属性
      axis: GridAxisType.LeftY.code,
      type: type
    })
  //   是否有对比
  let contrast = chartConfig.dimConfig.contrast.colList.length > 0
  let chartMeta = {
    chartType: chartType.code,
    chartSubType: chartSubType,
    category: category, // 目录轴标识,x或者y
    hasContrast: contrast, // 是否动态图例
    type: type, // 线条类型
    stack: stack // 是否堆积
  }
  Object.assign(chartMeta, result)
  return chartMeta
}

/**
 * 展示页面右边图表类型中(饼图、环形图)的规则校验
 * @param colCnt
 * @returns {boolean}
 */
function ruleCheckPieOrRingOfSwitch (colCnt) {
  if (colCnt.mainDimCnt && !colCnt.contrastDimCnt) { // 必须要有一个维度,不支持对比维度
    if (colCnt.mainMeausreCnt === 1 && !colCnt.secondMeausreCnt) { // 主轴有一个指标,次轴没有指标
      return true
    }
    if (!colCnt.mainMeausreCnt && colCnt.secondMeausreCnt === 1) { // 主轴没有有指标,次轴有一个指标
      return true
    }
  }
  return false
}

/**
 * 获取饼图、环形图的chartMeta
 * @param chartConfig
 * @param ring 是否环形图
 * @param chartType
 * @param chartTypeSub
 * @returns {{chartType: *, chartTypeSub: *, ring: *}}
 */
function getChartMetaOfPieOrRing (chartConfig, ring, chartType, chartTypeSub) {
  let result = handleColumnCommonProps(chartConfig,
    { // 添加的维度属性
    },
    { // 添加的指标属性
    })
  let chartMeta = {
    chartType: chartType.code,
    chartSubType: chartTypeSub,
    ring: ring // 是否是环形图
  }
  Object.assign(chartMeta, result)
  return chartMeta
}

export default {
  Table: { // 表格
    code: 'Table',
    name: '表格',
    chartType: ChartType.Table, // 大类型,判断显示的组件用
    priority: 0, // 优先级,值越大,优先级越高
    imgEnable: tableE, // 可用状态下的icon
    imgDisable: tableD, // 不可用状态下的icon
    enable: false, // 是否可用
    active: false, // 在可用的图类型中，是否选中
    ruleTipDim: '0个或多个维度', // 维度个数条件提示
    ruleTipMeasure: '0个或多个数值', // 数值个数条件提示
    /**
     * 配置页面右边图表类型的规则校验
     * @param chartConfig
     * @returns {*|boolean}
     */
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    /**
     * 展示页面切换图表类型的规则校验,如果只是有对比维度,则不支持
     * @param chartConfig
     * @returns {boolean}
     */
    ruleCheckOfSwitch: function (colCnt) {
      if (colCnt.mainDimCnt || colCnt.mainMeasureCnt || colCnt.secondMeasureCnt) { // 支持对比,维度、数值有值就行
        return true
      }
      return false
    },
    /**
     * 生成图表渲染用的配置
     * @param chartConfig 图表配置json，http://confluence.daojia-inc.com/pages/viewpage.action?pageId=73076708
     * @returns {{chartSubType: string, chartType: *}}
     */
    getChartMeta: function (chartConfig) {
      let result = handleColumnCommonProps(chartConfig,
        { // 添加的维度属性
        },
        { // 添加的指标属性

        })

      let chartMeta = {
        chartType: this.chartType.code,
        chartSubType: this.code
      }
      Object.assign(chartMeta, result)
      return chartMeta
    }
  },
  IndexCard: {
    code: 'IndexCard',
    name: '指标卡',
    chartType: ChartType.IndexCard,
    priority: 11,
    imgEnable: multiIndexCardE,
    imgDisable: multiIndexCardD,
    enable: false,
    active: false,
    ruleTipDim: '0个维度',
    ruleTipMeasure: '至少1个最多3个数值',
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    ruleCheckOfSwitch: function (colCnt) { // 展示页面
      if (!colCnt.mainDimCnt && !colCnt.contrastDimCnt) { // 不支持维度
        let measureCnt = colCnt.mainMeasureCnt + colCnt.secondMeasureCnt
        if (measureCnt <= 3 && measureCnt >= 1) { // 主轴次轴加起来至少一个指标且不超过三个指标
          return true
        }
      }
      return false
    },
    getChartMeta: function (chartConfig) {
      let result = handleColumnCommonProps(chartConfig,
        { // 添加的维度属性
        },
        { // 添加的指标属性
        })

      let chartMeta = {
        chartType: this.chartType.code,
        chartSubType: this.code
      }
      Object.assign(chartMeta, result)
      return chartMeta
    }
  },
  Line: {
    code: 'Line',
    name: '折线图',
    chartType: ChartType.LineBar,
    priority: 10,
    imgEnable: lineE,
    imgDisable: lineD,
    enable: false,
    active: false,
    ruleTipDim: '1个维度(支持对比)',
    ruleTipMeasure: '1个或多个数值',
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    ruleCheckOfSwitch: function (colCnt) { // 展示页面规则校验
      return ruleCheckLineOrBarOfSwitch(colCnt)
    },
    getChartMeta: function (chartConfig) {
      return getChartMetaOfLineOrBar(chartConfig, 'line', this.chartType, this.code, 'x')
    }
  },
  Area: {
    code: 'Area',
    name: '面积图',
    chartType: ChartType.LineBar,
    priority: 20,
    imgEnable: areaE,
    imgDisable: areaD,
    enable: false,
    active: false,
    ruleTipDim: '1个维度(支持对比)',
    ruleTipMeasure: '1个或多个数值',
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    ruleCheckOfSwitch: function (colCnt) { // 展示页面规则校验
      return ruleCheckLineOrBarOfSwitch(colCnt)
    },
    getChartMeta: function (chartConfig) {
      let chartMeta = getChartMetaOfLineOrBar(chartConfig, 'line', this.chartType, this.code, 'x')
      chartMeta.area = true // 是否是面积图
      return chartMeta
    }
  },
  StackArea: {
    code: 'StackArea',
    name: '堆积面积图',
    chartType: ChartType.LineBar,
    priority: 10,
    imgEnable: stackAreaE,
    imgDisable: stackAreaD,
    enable: false,
    active: false,
    ruleTipDim: '1个维度',
    ruleTipMeasure: '2个或多个数值',
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    ruleCheckOfSwitch: function (colCnt) { // 展示页面规则校验
      if (colCnt.contrastDimCnt) { // 不支持对比
        return false
      }
      return ruleCheckLineOrBarOfSwitch(colCnt)
    },
    getChartMeta: function (chartConfig) {
      let chartMeta = getChartMetaOfLineOrBar(chartConfig, 'line', this.chartType, this.code, 'x', true)
      chartMeta.area = true // 是否面积图
      return chartMeta
    }
  },
  Bar: {
    code: 'Bar',
    name: '柱状图',
    chartType: ChartType.LineBar,
    priority: 10,
    imgEnable: barE,
    imgDisable: barD,
    enable: false,
    active: false,
    ruleTipDim: '1个维度(支持对比)',
    ruleTipMeasure: '1个或多个数值',
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    ruleCheckOfSwitch: function (colCnt) { // 展示页面规则校验
      return ruleCheckLineOrBarOfSwitch(colCnt)
    },
    getChartMeta: function (chartConfig) {
      return getChartMetaOfLineOrBar(chartConfig, 'bar', this.chartType, this.code, 'x')
    }
  },
  BarTransverse: {
    code: 'BarTransverse',
    name: '条形图',
    chartType: ChartType.LineBar,
    priority: 9,
    imgEnable: barTransverseE,
    imgDisable: barTransverseD,
    enable: false,
    active: false,
    ruleTipDim: '1个维度(支持对比)',
    ruleTipMeasure: '1个或多个数值',
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    ruleCheckOfSwitch: function (colCnt) { // 展示页面规则校验
      return ruleCheckLineOrBarOfSwitch(colCnt)
    },
    getChartMeta: function (chartConfig) {
      return getChartMetaOfLineOrBar(chartConfig, 'bar', this.chartType, this.code, 'y')
    }
  },
  StackBar: {
    code: 'StackBar',
    name: '堆积柱状图',
    chartType: ChartType.LineBar,
    priority: 10,
    imgEnable: stackBarE,
    imgDisable: stackBarD,
    enable: false,
    active: false,
    ruleTipDim: '1个维度(支持对比)',
    ruleTipMeasure: '2个或多个数值',
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    ruleCheckOfSwitch: function (colCnt) { // 展示页面规则校验
      return ruleCheckLineOrBarOfSwitch(colCnt)
    },
    getChartMeta: function (chartConfig) {
      return getChartMetaOfLineOrBar(chartConfig, 'bar', this.chartType, this.code, 'x', true)
    }
  },
  StackBarTransverse: {
    code: 'StackBarTransverse',
    name: '堆积条形图',
    chartType: ChartType.LineBar,
    priority: 9,
    imgEnable: stackBarTransverseE,
    imgDisable: stackBarTransverseD,
    enable: false,
    active: false,
    ruleTipDim: '1个维度(支持对比)',
    ruleTipMeasure: '2个或多个数值',
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    ruleCheckOfSwitch: function (colCnt) { // 展示页面规则校验
      return ruleCheckLineOrBarOfSwitch(colCnt)
    },
    getChartMeta: function (chartConfig) {
      return getChartMetaOfLineOrBar(chartConfig, 'bar', this.chartType, this.code, 'y', true)
    }
  },
  Pie: {
    code: 'Pie',
    name: '饼图',
    chartType: ChartType.Pie,
    priority: 10,
    imgEnable: pieE,
    imgDisable: pieD,
    enable: false,
    active: false,
    ruleTipDim: '1个维度',
    ruleTipMeasure: '1个数值',
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    ruleCheckOfSwitch: function (colCnt) { // 展示页面规则校验
      return ruleCheckPieOrRingOfSwitch(colCnt)
    },
    getChartMeta: function (chartConfig) {
      return getChartMetaOfPieOrRing(chartConfig, false, this.chartType, this.code)
    }
  },
  Ring: {
    code: 'Ring',
    name: '环形图',
    chartType: ChartType.Pie,
    priority: 9,
    imgEnable: ringE,
    imgDisable: ringD,
    enable: false,
    active: false,
    ruleTipDim: '1个维度',
    ruleTipMeasure: '1个数值',
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    ruleCheckOfSwitch: function (colCnt) { // 展示页面规则校验
      return ruleCheckPieOrRingOfSwitch(colCnt)
    },
    getChartMeta: function (chartConfig) {
      return getChartMetaOfPieOrRing(chartConfig, true, this.chartType, this.code)
    }
  },
  Funnel: {
    code: 'Funnel',
    name: '漏斗图',
    chartType: ChartType.Funnel,
    priority: 10,
    imgEnable: funnelE,
    imgDisable: funnelD,
    enable: false,
    active: false,
    ruleTipDim: '0个维度',
    ruleTipMeasure: '多个数值',
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    ruleCheckOfSwitch: function (colCnt) { // 展示页面规则校验
      if (!colCnt.mainDimCnt && !colCnt.contrastDimCnt) { // 不支持维度
        let measureCnt = colCnt.mainMeasureCnt + colCnt.secondMeasureCnt
        if (measureCnt) { // 主轴次轴加起来至少一个指标
          return true
        }
      }
      return false
    },
    getChartMeta: function (chartConfig) {
      let result = handleColumnCommonProps(chartConfig,
        { // 添加的维度属性
        },
        { // 添加的指标属性
        })
      let chartMeta = {
        chartType: this.chartType.code,
        chartSubType: this.code
      }
      Object.assign(chartMeta, result)
      return chartMeta
    }
  },
  Map: {
    code: 'Map',
    name: '地图',
    chartType: ChartType.Map,
    priority: 10,
    imgEnable: mapE,
    imgDisable: mapD,
    enable: false,
    active: false,
    ruleTipDim: '1个维度(行政区域字段)',
    ruleTipMeasure: '1个数值或者多个数值同一个切换组',
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    ruleCheckOfSwitch: function (colCnt) { // 展示页面规则校验
      if (colCnt.mainDimCnt === 1 && !colCnt.contrastDimCnt && colCnt.mainMeasureCnt === 1 && !colCnt.secondMeasureCnt) {
        return true
      }
      return false
    },
    getChartMeta: function (chartConfig) {
      let result = handleColumnCommonProps(chartConfig,
        { // 添加的维度属性
        },
        { // 添加的指标属性
        })
      let chartMeta = {
        chartType: this.chartType.code,
        chartSubType: this.code
      }
      Object.assign(chartMeta, result)
      return chartMeta
    }
  },
  LineBar: {
    code: 'LineBar',
    name: '双轴图',
    chartType: ChartType.LineBar,
    priority: 10,
    imgEnable: lineBarE,
    imgDisable: lineBarD,
    enable: false,
    active: false,
    ruleTipDim: '1个维度',
    ruleTipMeasure: '双轴各1个或者多个数值',
    ruleCheck: function (chartConfig) {
      return this.ruleCheckOfSwitch(getChartColumnCnt(chartConfig))
    },
    ruleCheckOfSwitch: function (colCnt) { // 展示页面规则校验
      if (colCnt.mainDimCnt === 1 && colCnt.mainMeasureCnt && colCnt.secondMeasureCnt ) { // 必须有一个维度,主轴、次轴都必须要有至少一个指标
        return true
      }
      return false
    },
    getChartMeta: function (chartConfig) {
      let result = handleColumnCommonProps(chartConfig,
        { // 添加的维度属性
        },
        { // 添加的指标属性
        })
      let chartMeta = {
        chartType: this.chartType.code,
        chartSubType: this.code,
        category: 'x'
      }
      Object.assign(chartMeta, result)
      return chartMeta
    }
  }
}
