import {ChartType, THB, THBValueType, ShowType, GridAxisType} from '../../../../pages/data-visual/constants'
import {DataType} from '../../../../services/data-map/col-manage'

export default {
    chartType: ChartType.Pie.code,
    columns: [
        {
            key: 'col1', //
            name: '城市', // 指标/维度显示名称
            showType: ShowType.text.code, // 显示类型
            dim: true // 是否是维度
        },
        {
            key: 'col2',
            name: '订单金额',
            showType: ShowType.amt.code,
            unit: '元',
            dim: false
        }
    ], // 字段列表
    ring: true // 是否环形图
}