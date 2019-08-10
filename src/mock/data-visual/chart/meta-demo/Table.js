import {ChartType, THB, THBValueType, ShowType, GridAxisType} from '../../../../pages/data-visual/constants'
import {DataType} from '../../../../services/data-map/col-manage'

export default {
    chartType: ChartType.Table.code,
    columns: [
        {
            key: 'col1',
            name: '日期',
            showType: ShowType.text.code,
            dataType: DataType.date.code,
            dim: true
        },
        {
            key: 'col2',
            name: '大区',
            showType: ShowType.text.code,
            dim: true
        },
        {
            key: 'col3',
            name: '省份',
            showType: ShowType.text.code,
            dim: true
        },
        {
            key: 'col4',
            name: '城市',
            showType: ShowType.text.code,
            locked: true,
            dim: true
        },
        {
            key: 'col5',
            name: '订单量',
            showType: ShowType.num.code,
            unit: '',
            THB: [THB.hb.code],
            THBValueType: THBValueType.GROWTH_RATE.code,
            sortType: 'asc',
            dim: false
        },
        {
            key: 'col6',
            name: '订单金额',
            showType: ShowType.amt.code,
            unit: '元',
            THB: [THB.hb.code],
            THBValueType: THBValueType.GROWTH_VALUE.code,
            dim: false
        },
        {
            key: 'col7',
            name: '订单率',
            showType: ShowType.rate.code,
            unit: '',
            THB: [THB.hb.code],
            THBValueType: THBValueType.CONTRAST_VALUE.code,
            dim: false
        },
        {
            key: 'col8',
            name: '用户量',
            showType: ShowType.num.code,
            unit: '',
            dim: false
        },
        {
            key: 'col9',
            name: 'PV',
            showType: ShowType.num.code,
            unit: '',
            dim: false
        },
        {
            key: 'col10',
            name: 'GMV',
            showType: ShowType.amt.code,
            unit: '',
            dim: false
        }
    ]
}