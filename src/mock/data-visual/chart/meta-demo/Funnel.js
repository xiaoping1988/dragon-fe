import {ChartType, THB, THBValueType, ShowType} from '../../../../pages/data-visual/constants'
import {DataType} from '../../../../services/data-map/col-manage'

export default {
    chartType: ChartType.Funnel.code,
    columns: [
        {
            key: 'col1', //
            name: '点击量', // 指标/维度显示名称
            showType: ShowType.num.code, // 显示类型
            unit: '', // 单位
            dim: false // 是否是维度
        },
        {
            key: 'col2',
            name: '注册量',
            showType: ShowType.num.code,
            unit: '',
            dim: false
        },
        {
            key: 'col3',
            name: '下单量',
            showType: ShowType.num.code,
            unit: '',
            dim: false
        },
        {
            key: 'col4',
            name: '支付量',
            showType: ShowType.num.code,
            unit: '',
            dim: false
        }
    ], // 字段列表
    ring: false // 是否环形图
}