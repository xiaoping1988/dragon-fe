import {ChartType, THB, THBValueType, ShowType} from '../../../../pages/data-visual/constants'
import {DataType} from '../../../../services/data-map/col-manage'

export default {
    chartType: ChartType.IndexCard.code,
    columns: [
        {
            key: 'col1', //
            name: '订单量', // 指标/维度显示名称
            showType: ShowType.num.code, // 显示类型
            unit: '', // 单位
            THB: [THB.hb.code, THB.tb_w.code, THB.tb_m.code, THB.tb_y.code], // 同环比
            THBValueType: THBValueType.GROWTH_RATE.code, // 同环比的数值类型
            dim: false // 是否是维度
        }
    ]
}