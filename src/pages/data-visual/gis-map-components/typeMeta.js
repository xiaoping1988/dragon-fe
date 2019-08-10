import {FieldType} from '../constant'
/** 散点图 */
import PointD from '../../../assets/img/dmap/pointd.png'
import PointE from '../../../assets/img/dmap/pointe.png'

/** 散点热力图 */
import PointHeatD from '../../../assets/img/dmap/pointheatd.png'
import PointHeatE from '../../../assets/img/dmap/pointheate.png'

/** 区域热力图 */
import AreaHeatD from '../../../assets/img/dmap/areaheatd.png'
import AreaHeatE from '../../../assets/img/dmap/areaheate.png'

/** 区域半径图 */
import AreaRadiusCircleD from '../../../assets/img/dmap/arearadiuscircled.png'
import AreaRadiusCircleE from '../../../assets/img/dmap/arearadiuscirclee.png'

/** 气泡图 */
import BubbleD from '../../../assets/img/dmap/bubbled.png'
import BubbleE from '../../../assets/img/dmap/bubblee.png'

function getMeasureList (config) {
  let measureList = []
  if (config.measure) {
    config.measure.data.forEach(field => {
      measureList.push({
        key: field.key,
        title: field.showName,
        showType: field.fieldConfig.showType,
        unit: field.fieldConfig.unit,
        divisor: field.fieldConfig.divisor
      })
    })
  }
  return measureList
}

function getFilterList (config) {
  let filterList = []
  if (config.insideFilterList) {
    config.insideFilterList.forEach(field => {
      let dateColumn = false
      if (field.fieldType === FieldType.date.code ||
        field.fieldType === FieldType.day.code ||
        field.fieldType === FieldType.month.code ||
        field.fieldType === FieldType.year.code) { // 时间类型
        dateColumn = true
      }
      filterList.push({
        fieldName: field.fieldName, // 字段数据库名称
        showName: field.showName,
        dateColumn: dateColumn,
        multiple: field.fieldConfig.multiple, // 日期是否区间,下拉框是否多选
        dateLevel: field.fieldConfig.dateLevel, // 时间类型,day日month月year年,目前只支持这三种
        dateNum: field.fieldConfig.dateNum, // 时间类型的字段,过滤条件要计算的基准区间数量
        customDate: field.fieldConfig.customDate, // dateNum为-99,自定义的时间
        defaultValue: field.fieldConfig.defaultValue, // 下拉框里的默认值
        defaultLabel: field.fieldConfig.defaultLabel, // 下拉框里的默认标签
        fieldType: field.fieldType,
        children: field.fieldConfig.children
      })
    })
  }
  return filterList
}

function getSpecialField (config) {
  let specialField = {}
  if (config.specialField) {
    Object.keys(config.specialField).forEach(key => {
      if (config.specialField[key].fieldName) {
        specialField[key] = {
          field: config.specialField[key].fieldName,
          title: config.specialField[key].title,
          number: config.specialField[key].fieldType === FieldType.num.code,
          showName: config.specialField[key].showName
        }
      }
    })
  }
  return specialField
}

function handleConfig (config) {
  let measureList = getMeasureList(config)
  let options = {
    dsId: config.workTable.dsId,
    dbName: config.workTable.dbName,
    tableName: config.workTable.tableName,
    detail: (config.measure && config.measure.detail),
    showLeftPanel: measureList.length > 0,
    showBusinessCircle: config.basic.showBusinessCircle, // 是否显示商圈
    specialField: getSpecialField(config),
    measureList: measureList,
    filterList: getFilterList(config)
  }
  return options
}

export default {
  Point: {
    code: 'Point',
    name: '散点图',
    priority: 0, // 优先级,值越大,优先级越高
    imgEnable: PointE,
    imgDisable: PointD,
    enable: false,
    active: false,
    ruleTipSpecialField: '城市ID和GPS字段必须要有',
    ruleTipDim: '',
    ruleTipMeasure: '0个或多个数值',
    ruleCheck: function (config) {
      if (!config.specialField) {
        return false
      }
      if (!config.specialField.city_id || !config.specialField.city_id.fieldName) { // 没有城市ID字段
        return false
      }
      if (!config.specialField.gps || !config.specialField.gps.fieldName) { // 没有GPS字段
        return false
      }
      return true
    },
    getMapOptions: function (config) {
      let meta = handleConfig(config)
      meta.type = this.code
      if (!meta.measureList.length) {
        meta.detail = true
      }
      return meta
    }
  },
  PointHeat: {
    code: 'PointHeat',
    name: '散点热力图',
    priority: 0, // 优先级,值越大,优先级越高
    imgEnable: PointHeatE,
    imgDisable: PointHeatD,
    enable: false,
    active: false,
    ruleTipSpecialField: '城市ID和GPS字段必须要有',
    ruleTipDim: '',
    ruleTipMeasure: '1个或多个数值,不支持明细',
    ruleCheck: function (config) {
      if (!config.specialField) {
        return false
      }
      if (!config.specialField.city_id || !config.specialField.city_id.fieldName) { // 没有城市ID字段
        return false
      }
      if (!config.specialField.gps || !config.specialField.gps.fieldName) { // 没有GPS字段
        return false
      }
      if (config.measure && config.measure.detail) { // 不支持明细
        return false
      }
      if (!config.measure || !config.measure.data || !config.measure.data.length) { // 必须要有指标
        return false
      }
      return true
    },
    getMapOptions: function (config) {
      let meta = handleConfig(config)
      meta.type = this.code
      return meta
    }
  },
  AreaHeat: {
    code: 'AreaHeat',
    name: '商圈热力图',
    priority: 0, // 优先级,值越大,优先级越高
    imgEnable: AreaHeatE,
    imgDisable: AreaHeatD,
    enable: false,
    active: false,
    ruleTipSpecialField: '城市ID和商圈ID字段必须要有',
    ruleTipDim: '',
    ruleTipMeasure: '1个或多个数值,不支持明细',
    ruleCheck: function (config) {
      if (!config.specialField) {
        return false
      }
      if (!config.specialField.city_id || !config.specialField.city_id.fieldName) { // 没有城市ID字段
        return false
      }
      if (!config.specialField.biz_id || !config.specialField.biz_id.fieldName) { // 没有GPS字段
        return false
      }
      if (config.measure && config.measure.detail) { // 不支持明细
        return false
      }
      if (!config.measure || !config.measure.data || !config.measure.data.length) { // 必须要有指标
        return false
      }
      return true
    },
    getMapOptions: function (config) {
      let meta = handleConfig(config)
      meta.type = this.code
      return meta
    }
  },
  AreaRadiusCircle: {
    code: 'AreaRadiusCircle',
    name: '区域半径图',
    priority: 0, // 优先级,值越大,优先级越高
    imgEnable: AreaRadiusCircleE,
    imgDisable: AreaRadiusCircleD,
    enable: false,
    active: false,
    ruleTipSpecialField: '城市ID、GPS字段和覆盖半径字段必须要有',
    ruleTipDim: '',
    ruleTipMeasure: '0个或多个数值,只支持明细',
    ruleCheck: function (config) {
      if (!config.specialField) {
        return false
      }
      if (!config.specialField.city_id || !config.specialField.city_id.fieldName) { // 没有城市ID字段
        return false
      }
      if (!config.specialField.gps || !config.specialField.gps.fieldName) { // 没有GPS字段
        return false
      }
      if (!config.specialField.radius || !config.specialField.radius.fieldName) { // 没有覆盖半径字段
        return false
      }
      if (config.measure && !config.measure.detail) { // 只支持明细
        return false
      }
      return true
    },
    getMapOptions: function (config) {
      let meta = handleConfig(config)
      meta.type = this.code
      meta.showBusinessCircle = false
      return meta
    }
  }
}
