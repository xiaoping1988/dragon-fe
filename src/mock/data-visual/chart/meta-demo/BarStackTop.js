import {ChartType, THB, THBValueType, ShowType} from '../../../../pages/data-visual/constants'
import {DataType} from '../../../../services/data-map/col-manage'

export default {
    chartType: ChartType.LineBar.code,
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
            THB: [THB.hb.code, THB.tb_y.code],
            THBValueType: THBValueType.GROWTH_VALUE.code,
            type: 'bar',
            dim: false
        },
        {
            key: 'col3',
            name: '支付金额',
            showType: ShowType.amt.code,
            unit: '元',
            type: 'bar',
            dim: false
        }
    ], // 字段列表
    category: 'y', // 类目轴为y轴
    stack: true // 堆积图
}