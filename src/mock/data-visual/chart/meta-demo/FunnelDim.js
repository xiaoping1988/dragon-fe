import {ChartType, THB, THBValueType, ShowType} from '../../../../pages/data-visual/constants'
import {DataType} from '../../../../services/data-map/col-manage'

export default {
    chartType: ChartType.Funnel.code,
    columns: [
        {
            key: 'col1', //
            name: '渠道', // 指标/维度显示名称
            showType: ShowType.text.code, // 显示类型
            unit: '', // 单位
            dim: true // 是否是维度
        },
        {
            key: 'col2',
            name: '下单金额',
            showType: ShowType.amt.code,
            unit: '元',
            dim: false
        }
    ], // 字段列表
    ring: false // 是否环形图
}