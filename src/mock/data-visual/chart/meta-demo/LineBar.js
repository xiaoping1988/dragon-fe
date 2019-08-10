import {ChartType, THB, THBValueType, ShowType, GridAxisType} from '../../../../pages/data-visual/constants'
import {DataType} from '../../../../services/data-map/col-manage'

export default {
    chartType: ChartType.LineBar.code,
    columns: [
        {
            key: 'col1', //
            name: '日期', // 指标/维度显示名称
            showType: ShowType.text.code, // 显示类型
            dataType: DataType.date.code, // 数据类型
            dim: true // 是否是维度
        },
        {
            key: 'col2',
            name: '订单金额',
            showType: ShowType.amt.code,
            unit: '元',
            THB: [THB.hb.code, THB.tb_y.code],
            THBValueType: THBValueType.GROWTH_VALUE.code,
            type: 'bar',
            dim: false,
            axis: GridAxisType.LeftY.code
        },
        {
            key: 'col3',
            name: '订单率',
            showType: ShowType.rate.code,
            unit: '',
            type: 'line',
            dim: false,
            axis: GridAxisType.RightY.code
        }
    ] // 字段列表
}