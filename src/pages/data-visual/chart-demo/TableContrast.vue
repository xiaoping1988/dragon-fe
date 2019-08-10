<template>
    <DChartFactory></DChartFactory>
</template>

<script>
    import DChartFactory from '../chart-factory'
    import {ShowType, THB, THBValueType, ChartType} from '../constants'
    let metaDemo = {
        chartType: ChartType.Table.code,
        columns: [
            {
                key: 'col1',
                name: '日期',
                showType: ShowType.text.code,
                isDim: true
            },
            {
                key: 'col1_bj_jz',
                name: '订单量',
                showType: ShowType.num.code,
                unit: '',
                THB: [THB.hb.code],
                THBValueType: THBValueType.GROWTH_RATE.code,
                parentName: '保洁|家政'
            },
            {
                key: 'col1_bj_jz',
                name: '订单量',
                showType: ShowType.num.code,
                unit: '',
                THB: [THB.hb.code],
                THBValueType: THBValueType.GROWTH_RATE.code,
                parentName: '保姆|家政'
            },
            {
                key: 'col1_bj_jz',
                name: '订单量',
                showType: ShowType.num.code,
                unit: '',
                THB: [THB.hb.code],
                THBValueType: THBValueType.GROWTH_RATE.code,
                parentName: '月嫂|家政'
            },
            {
                key: 'col1_hd_sy',
                name: '订单量',
                showType: ShowType.num.code,
                unit: '',
                THB: [THB.hb.code],
                THBValueType: THBValueType.GROWTH_RATE.code,
                parentName: '货的|速运'
            },
            {
                key: 'col1_yp_sy',
                name: '订单量',
                showType: ShowType.num.code,
                unit: '',
                THB: [THB.hb.code],
                THBValueType: THBValueType.GROWTH_RATE.code,
                parentName: '优配|速运'
            },
            {
                key: 'col2_bj_jz',
                name: '订单金额',
                showType: ShowType.amt.code,
                unit: '',
                THB: [THB.hb.code],
                THBValueType: THBValueType.GROWTH_VALUE.code,
                parentName: '保洁|家政'
            },
            {
                key: 'col2_bj_jz',
                name: '订单金额',
                showType: ShowType.amt.code,
                unit: '',
                THB: [THB.hb.code],
                THBValueType: THBValueType.GROWTH_VALUE.code,
                parentName: '保姆|家政'
            },
            {
                key: 'col2_bj_jz',
                name: '订单金额',
                showType: ShowType.amt.code,
                unit: '',
                THB: [THB.hb.code],
                THBValueType: THBValueType.GROWTH_VALUE.code,
                parentName: '月嫂|家政'
            },
            {
                key: 'col2_hd_sy',
                name: '订单金额',
                showType: ShowType.amt.code,
                unit: '',
                THB: [THB.hb.code],
                THBValueType: THBValueType.GROWTH_VALUE.code,
                parentName: '货的|速运'
            },
            {
                key: 'col2_yp_sy',
                name: '订单金额',
                showType: ShowType.amt.code,
                unit: '',
                THB: [THB.hb.code],
                THBValueType: THBValueType.GROWTH_VALUE.code,
                parentName: '优配|速运'
            }
        ]
    }
    let dataDemo = [
        {
            'col1': 123,
            'col1_hb': 23.3,
            'col1_tb_w': 32.12,
            'col1_tb_m': -43.2,
            'col1_tb_y': -32.23,
            'col2': 3000,
            'col2_hb': 433.01,
            'col2_tb_y': 233.02,
            'col3': 10
        }
    ]
    export default {
        name: 'DTableContrastDemo', // 有对比维度
        components: {
            DChartFactory
        }
    }
</script>