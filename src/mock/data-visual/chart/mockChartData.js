import {ChartType, THB, THBValueType, ShowType, GridAxisType, proviceCitys} from '../../../pages/data-visual/constants'
import {DataType} from '../../../services/data-map/col-manage'
import {randomInt, randomDouble} from '../../../utils/assist'
import DateUtils from '../../../utils/dateUtils'

function mockChartData(meta) {
    let data = []
    let dateDim = false
    meta.columns.forEach((c, j) => {
        if (c.dim) { // 维度
            if (c.dataType === DataType.date.code) {
                dateDim = true
            }
        }
    })

    let days = DateUtils.getDatesByStr('2019-04-13', '2019-07-13', 'yyyy-MM-dd')
    let notDays = proviceCitys.map(p => p.name)
    let count = 1
    if (meta.chartType === ChartType.IndexCard.code) {
        count = 1
    } else if (meta.chartType === ChartType.Table.code) {
        days = days.concat(days)
        notDays = notDays.concat(notDays).concat(notDays).concat(notDays)
        count = days.length
    } else if (meta.chartType === ChartType.Map.code) {
        if (meta.mapType !== 'china') {
            let p = proviceCitys.filter(p => p.name === meta.mapType)[0]
            notDays = p.cityList.map(c => c.name + (c.name.includes('自治州') ? '' : '市'))
        }
        count = notDays.length
    } else if (meta.chartType === ChartType.Funnel.code) {
        notDays = ['第一步', '第二步', '第三步', '第四步']
        count = notDays.length
    } else {
        if (dateDim) {
            count = days.length
        } else {
            count = notDays.length
        }
    }
    for (let i=0; i < count; i++) {
        let row = {}
        meta.columns.forEach((c, j) => {
            if (c.dim) { // 维度
                if (c.dataType === DataType.date.code) {
                    row[c.key] = days[i]
                } else {
                    row[c.key] = notDays[i]
                }
            } else { // 指标
                if (c.showType === ShowType.rate.code) {
                    row[c.key] = randomDouble(100).toFixed(2)*1
                } else if (c.showType === ShowType.num.code) {
                    row[c.key] = randomInt(10000)*1
                } else if (c.showType === ShowType.amt.code) {
                    row[c.key] = randomDouble(10000).toFixed(2)*1
                }
                if (c.THB && c.THB.length) {
                    c.THB.forEach(thb => {
                        if (c.THBValueType === THBValueType.CONTRAST_VALUE.code) {
                            row[c.key + '_' + thb] = randomDouble(100).toFixed(2) * (randomInt(100)%2 === 0 ? 1 : -1)
                        } else if (c.THBValueType === THBValueType.GROWTH_VALUE.code) {
                            row[c.key + '_' + thb] = randomInt(10000) * (randomInt(100)%2 === 0 ? 1 : -1)
                        } else if (c.THBValueType === THBValueType.GROWTH_RATE.code) {
                            row[c.key + '_' + thb] = randomDouble(100).toFixed(2) * (randomInt(100)%2 === 0 ? 1 : -1)
                        }
                    })
                }
            }
        })
        data.push(row)
    }
    return data
}

export {mockChartData}