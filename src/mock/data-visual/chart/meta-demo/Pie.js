import {ChartType, THB, THBValueType, ShowType, GridAxisType} from '../../../../pages/data-visual/constants'
import {DataType} from '../../../../services/data-map/col-manage'

export default {
    chartType: ChartType.Pie.code,
    columns: [
        {
            key: 'col1', //
            name: '订单量', // 指标/维度显示名称
            showType: ShowType.num.code, // 显示类型
            unit: '', // 单位
            THB: [THB.hb.code, THB.tb_w.code, THB.tb_m.code, THB.tb_y.code], // 同环比
            THBValueType: THBValueType.GROWTH_RATE.code, // 同环比的数值类型
            dim: false // 是否是维度
        },
        {
            key: 'col2',
            name: '订单金额',
            showType: ShowType.amt.code,
            unit: '元',
            THB: [THB.hb.code, THB.tb_y.code],
            THBValueType: THBValueType.GROWTH_VALUE.code,
            dim: false
        },
        {
            key: 'col3',
            name: '下单率',
            showType: ShowType.rate.code,
            unit: '',
            dim: false
        }
    ], // 字段列表
    ring: false // 是否环形图
}