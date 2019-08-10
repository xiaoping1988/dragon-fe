import DateUtils from '../../utils/dateUtils'
/**
 * 指标值的显示类型
 * @type {{text: {code: string, name: string}, num: {code: string, name: string}, amt: {code: string, name: string}, rate: {code: string, name: string}}}
 */
export const ShowType = {
    text: {
        code: 'text',
        name: '文本'
    },
    num: {
        code: 'num',
        name: '数字'
    },
    amt: {
        code: 'amt',
        name: '金额'
    },
    rate: {
        code: 'rate',
        name: '百分比'
    }
}

/**
 * 同环比
 * @type {{hb: {code: string, name: string}, tb_w: {code: string, name: string}, tb_m: {code: string, name: string}, tb_y: {code: string, name: string}}}
 */
export const THB = {
    hb: {
        code: 'hb',
        name: '环比',
        sortNum: 1
    },
    tb_w: {
        code: 'tb_w',
        name: '周同比',
        sortNum: 2
    },
    tb_m: {
        code: 'tb_m',
        name: '月同比',
        sortNum: 3
    },
    tb_y: {
        code: 'tb_y',
        name: '年同比',
        sortNum: 4
    }
}

/**
 * 同环比值类型
 * @type {{GROWTH_VALUE: {code: string, name: string, showType: string}, GROWTH_RATE: {code: string, name: string, showType: string}, CONTRAST_VALUE: {code: string, name: string, showType: string}}}
 */
export const THBValueType = {
    GROWTH_VALUE: {
        code: 'GROWTH_VALUE',
        name: '增长值',
        showType: ShowType.num.code
    },
    GROWTH_RATE: {
        code: 'GROWTH_RATE',
        name: '增长率',
        showType: ShowType.rate.code
    },
    CONTRAST_VALUE: {
        code: 'CONTRAST_VALUE',
        name: '对比值',
        showType: ShowType.num.code
    }
}

/**
 * 时间频率
 * @type {{year: {code: string, name: string}, quarter: {code: string, name: string}, month: {code: string, name: string}, week: {code: string, name: string}, day: {code: string, name: string}, hour: {code: string, name: string}, minute: {code: string, name: string}, second: {code: string, name: string}}}
 */
export const TimeFreq = {
    year: {
        code: 'year',
        name: '年',
        advancedCompute: [THB.hb],
        single: [ // 单选
            {dateNum: 0, name: '今年'},
            {dateNum: 1, name: '去年'}
        ],
        singleDefaultDateNum: 0, // 单选的默认值
        range: [ // 区间选
            {dateNum: 0, name: '今年'},
            {dateNum: 1, name: '去年'},
            {dateNum: 3, name: '近3年'}
        ],
        rangeDefaultDateNum: 0, // 区间的默认值
        pattern: 'yyyy',
        sortNum: 8,
        getDateStr (dateNum, isRange) {
            let dateStr = ''
            let currentYear = DateUtils.formatDate(new Date(), 'yyyy')
            if (isRange) { // 区间
                if (dateNum === 0) {
                    dateStr = currentYear + ',' + currentYear
                } else if (dateNum === 1) {
                    let lastYear = DateUtils.addYear(currentYear, -1)
                    dateStr = lastYear + ',' + lastYear
                } else {
                    dateStr = DateUtils.addYear(currentYear, -dateNum) + ',' + currentYear
                }
            } else {
                dateStr = DateUtils.addYear(currentYear, -dateNum)
            }
            return dateStr
        }
    },
    quarter: {
        code: 'quarter',
        name: '季',
        advancedCompute: [THB.hb, THB.tb_y],
        single: [
            {dateNum: 0, name: '本季度'},
            {dateNum: 1, name: '上季度'}
        ],
        singleDefaultDateNum: 1,
        range: [
            {dateNum: 0, name: '本季度'},
            {dateNum: 1, name: '上季度'},
            {dateNum: 4, name: '近4季'}
        ],
        rangeDefaultDateNum: 1,
        pattern: '',
        sortNum: 7
    },
    month: {
        code: 'month',
        name: '月',
        advancedCompute: [THB.hb, THB.tb_y],
        single: [
            {dateNum: 0, name: '本月'},
            {dateNum: 1, name: '上月'}
        ],
        singleDefaultDateNum: 1,
        range: [
            {dateNum: 0, name: '本月'},
            {dateNum: 1, name: '上月'},
            {dateNum: 6, name: '近半年'},
            {dateNum: 12, name: '近一年'}
        ],
        rangeDefaultDateNum: 1,
        pattern: 'yyyy-MM',
        sortNum: 6,
        getDateStr (dateNum, isRange) {
            let dateStr = ''
            let currentMonth = DateUtils.formatDate(new Date(), 'yyyy-MM')
            if (isRange) { // 区间
                if (dateNum === 0) {
                    dateStr = currentMonth + ',' + currentMonth
                } else if (dateNum === 1) {
                    let lastMonth = DateUtils.addMonth(currentMonth, -1, 'yyyy-MM')
                    dateStr = lastMonth + ',' + lastMonth
                } else {
                    dateStr = DateUtils.addMonth(currentMonth, -dateNum, 'yyyy-MM') + ',' + currentMonth
                }
            } else {
                dateStr = DateUtils.addMonth(currentMonth, -dateNum, 'yyyy-MM')
            }
            return dateStr
        }
    },
    week: {
        code: 'week',
        name: '周',
        advancedCompute: [THB.hb, THB.tb_y],
        single: [
            {dateNum: 0, name: '本周'},
            {dateNum: 1, name: '上周'}
        ],
        singleDefaultDateNum: 1,
        range: [
            {dateNum: 0, name: '本周'},
            {dateNum: 1, name: '上周'},
            {dateNum: 12, name: '近12周'}
        ],
        rangeDefaultDateNum: 1,
        pattern: '',
        sortNum: 5
    },
    day: {
        code: 'day',
        name: '日',
        advancedCompute: [THB.hb, THB.tb_m, THB.tb_m, THB.tb_y],
        single: [
            {dateNum: 1, name: '昨天'},
            {dateNum: 0, name: '今天'},
            {dateNum: 2, name: '前天'},
            {dateNum: 7, name: '上周'},
            {dateNum: 30, name: '上月'}
        ],
        singleDefaultDateNum: 1,
        range: [
            {dateNum: 1, name: '昨天'},
            {dateNum: 0, name: '今天'},
            {dateNum: 7, name: '近7天'},
            {dateNum: 30, name: '近30天'},
            {dateNum: 90, name: '近90天'},
            {dateNum: 180, name: '近半年'},
            {dateNum: 365, name: '近一年'}
        ],
        rangeDefaultDateNum: 30,
        pattern: 'yyyy-MM-dd',
        sortNum: 4,
        getDateStr (dateNum, isRange) {
            let dateStr = ''
            let currentDay = DateUtils.getYesterday()
            if (isRange) { // 区间
                if (dateNum === 0) {
                    let today = DateUtils.formatDate(new Date())
                    dateStr = today + ',' + today
                } else if (dateNum === 1) {
                    dateStr = currentDay + ',' + currentDay
                } else {
                    dateStr = DateUtils.addDate(currentDay, 1 - dateNum, 'yyyy-MM-dd') + ',' + currentDay
                }
                dateStr = dateStr + ' 23:59:59'
            } else {
                dateStr = DateUtils.addDate(currentDay, 1 - dateNum, 'yyyy-MM-dd')
            }
            return dateStr
        }
    },
    hour: {
        code: 'hour',
        name: '时',
        advancedCompute: [THB.hb]
    },
    minute: {
        code: 'minute',
        name: '分',
        advancedCompute: [THB.hb]
    },
    second: {
        code: 'second',
        name: '秒',
        advancedCompute: [THB.hb]
    }
}

/**
 * 排序类型
 * @type {{asc: {code: string, name: string}, desc: {code: string, name: string}}}
 */
export const SortType = {
    asc: {
        code: 'asc',
        name: '正序'
    },
    desc: {
        code: 'desc',
        name: '降序'
    }
}

export const GridAxisType = {
    LeftY: {
        code: 'LeftY',
        name: '左Y轴'
    },
    RightY: {
        code: 'RightY',
        name: '右Y轴'
    },
    DownX: {
        code: 'DownX',
        name: '底X轴'
    },
    UpX: {
        code: 'UpX',
        name: '上X轴'
    }
}

export const ChartType = {
    Table: {
        code: 'TABLE',
        name: '表格'
    },
    IndexCard: {
        code: 'INDEX_CARD',
        name: '指标卡'
    },
    LineBar: {
        code: 'LINE_BAR',
        name: '折现/柱状图'
    },
    Pie: {
        code: 'PIE',
        name: '饼图'
    },
    Funnel: {
        code: 'FUNNEL',
        name: '漏斗图'
    },
    Map: {
        code: 'MAP',
        name: '地图'
    },
    GisMap: {
        code: 'GIS_MAP',
        name: 'GIS地图'
    }
}

export const proviceCitys = [
    {
        areaCode: 110000,
        cityList: [
            {
                areaCode: 110100,
                id: 1,
                name: '北京',
                pid: 25760
            }
        ],
        id: 25760,
        name: '北京',
        echartsJsName: 'beijing',
        pid: 25794
    },
    {
        areaCode: 120000,
        cityList:  [
            {
                areaCode: 120100,
                id: 18,
                name: '天津',
                pid: 25762
            }
        ],
        id: 25762,
        name: '天津',
        echartsJsName: 'tianjin',
        pid: 25794
    },
    {
        areaCode: 310000,
        cityList:  [
            {
                areaCode: 310100,
                id: 2,
                name: '上海',
                pid: 25793
            }
        ],
        id: 25793,
        name: '上海',
        echartsJsName: 'shanghai',
        pid: 25794
    },
    {
        areaCode: 710000,
        cityList:  [
            {
                areaCode: 710000,
                id: 2051,
                name: '台湾',
                pid: 25761
            },
            {
                areaCode: 710000,
                id: 20652,
                name: '台北',
                pid: 25761
            },
            {
                areaCode: 710000,
                id: 20654,
                name: '台中',
                pid: 25761
            },
            {
                areaCode: 710000,
                id: 20655,
                name: '台南',
                pid: 25761
            },
            {
                areaCode: 710000,
                id: 20656,
                name: '高雄',
                pid: 25761
            },
            {
                areaCode: 710000,
                id: 20657,
                name: '基隆',
                pid: 25761
            },
            {
                areaCode: 710000,
                id: 20658,
                name: '新竹',
                pid: 25761
            },
            {
                areaCode: 710000,
                id: 20659,
                name: '嘉义',
                pid: 25761
            }
        ],
        id: 25761,
        name: '台湾',
        echartsJsName: 'taiwan',
        pid: 25794
    },
    {
        areaCode: 140000,
        cityList:  [
            {
                areaCode: 140100,
                id: 740,
                name: '太原',
                pid: 25763
            },
            {
                areaCode: 141100,
                id: 3222,
                name: '吕梁',
                pid: 25763
            },
            {
                areaCode: 140500,
                id: 3350,
                name: '晋城',
                pid: 25763
            },
            {
                areaCode: 140900,
                id: 3453,
                name: '忻州',
                pid: 25763
            },
            {
                areaCode: 140800,
                id: 5653,
                name: '运城',
                pid: 25763
            },
            {
                areaCode: 141000,
                id: 5669,
                name: '临汾',
                pid: 25763
            },
            {
                areaCode: 140400,
                id: 6921,
                name: '长治',
                pid: 25763
            },
            {
                areaCode: 140200,
                id: 6964,
                name: '大同',
                pid: 25763
            },
            {
                areaCode: 140300,
                id: 8738,
                name: '阳泉',
                pid: 25763
            },
            {
                areaCode: 140700,
                id: 8832,
                name: '晋中',
                pid: 25763
            },
            {
                areaCode: 140600,
                id: 9869,
                name: '朔州',
                pid: 25763
            }
        ],
        id: 25763,
        name: '山西',
        echartsJsName: 'shanxi',
        pid: 25794
    },
    {
        areaCode: 820000,
        cityList:  [
            {
                areaCode: 820000,
                id: 9384,
                name: '澳门',
                pid: 25764
            }
        ],
        id: 25764,
        name: '澳门',
        echartsJsName: 'aomen',
        pid: 25794
    },
    {
        areaCode: 620000,
        cityList:  [
            {
                areaCode: 620100,
                id: 952,
                name: '兰州',
                pid: 25765
            },
            {
                areaCode: 622900,
                id: 7112,
                name: '临夏',
                pid: 25765
            },
            {
                areaCode: 620800,
                id: 7154,
                name: '平凉',
                pid: 25765
            },
            {
                areaCode: 620300,
                id: 7428,
                name: '金昌',
                pid: 25765
            },
            {
                areaCode: 620500,
                id: 8467,
                name: '天水',
                pid: 25765
            },
            {
                areaCode: 620400,
                id: 10307,
                name: '白银',
                pid: 25765
            },
            {
                areaCode: 621100,
                id: 10320,
                name: '定西',
                pid: 25765
            },
            {
                areaCode: 623000,
                id: 10337,
                name: '甘南',
                pid: 25765
            },
            {
                areaCode: 620200,
                id: 10356,
                name: '嘉峪关',
                pid: 25765
            },
            {
                areaCode: 620900,
                id: 10381,
                name: '酒泉',
                pid: 25765
            },
            {
                areaCode: 621200,
                id: 10409,
                name: '陇南',
                pid: 25765
            },
            {
                areaCode: 620600,
                id: 10443,
                name: '武威',
                pid: 25765
            },
            {
                areaCode: 620700,
                id: 10449,
                name: '张掖',
                pid: 25765
            },
            {
                areaCode: 621000,
                id: 10470,
                name: '庆阳',
                pid: 25765
            }
        ],
        id: 25765,
        name: '甘肃',
        echartsJsName: 'gansu',
        pid: 25794
    },
    {
        areaCode: 520000,
        cityList:  [
            {
                areaCode: 520100,
                id: 2015,
                name: '贵阳',
                pid: 25766
            },
            {
                areaCode: 520400,
                id: 7458,
                name: '安顺',
                pid: 25766
            },
            {
                areaCode: 520300,
                id: 7624,
                name: '遵义',
                pid: 25766
            },
            {
                areaCode: 522600,
                id: 9348,
                name: '黔东南',
                pid: 25766
            },
            {
                areaCode: 520600,
                id: 10419,
                name: '铜仁',
                pid: 25766
            },
            {
                areaCode: 522300,
                id: 10430,
                name: '黔西南',
                pid: 25766
            },
            {
                areaCode: 522700,
                id: 10441,
                name: '黔南',
                pid: 25766
            },
            {
                areaCode: 520200,
                id: 10500,
                name: '六盘水',
                pid: 25766
            },
            {
                areaCode: 520500,
                id: 10553,
                name: '毕节',
                pid: 25766
            }
        ],
        id: 25766,
        name: '贵州',
        echartsJsName: 'guizhou',
        pid: 25794
    },
    {
        areaCode: 500000,
        cityList:  [
            {
                areaCode: 500100,
                id: 37,
                name: '重庆',
                pid: 25767
            }
        ],
        id: 25767,
        name: '重庆',
        echartsJsName: 'chongqing',
        pid: 25794
    },
    {
        areaCode: 610000,
        cityList:  [
            {
                areaCode: 610100,
                id: 483,
                name: '西安',
                pid: 25768
            },
            {
                areaCode: 610300,
                id: 2044,
                name: '宝鸡',
                pid: 25768
            },
            {
                areaCode: 610900,
                id: 3157,
                name: '安康',
                pid: 25768
            },
            {
                areaCode: 610700,
                id: 3163,
                name: '汉中',
                pid: 25768
            },
            {
                areaCode: 610500,
                id: 5733,
                name: '渭南',
                pid: 25768
            },
            {
                areaCode: 610800,
                id: 5942,
                name: '榆林',
                pid: 25768
            },
            {
                areaCode: 610400,
                id: 7453,
                name: '咸阳',
                pid: 25768
            },
            {
                areaCode: 610600,
                id: 8951,
                name: '延安',
                pid: 25768
            },
            {
                areaCode: 610200,
                id: 9829,
                name: '铜川',
                pid: 25768
            },
            {
                areaCode: 611000,
                id: 9851,
                name: '商洛',
                pid: 25768
            }
        ],
        id: 25768,
        name: '陕西',
        echartsJsName: 'shanxi1',
        pid: 25794
    },
    {
        areaCode: 810000,
        cityList:  [
            {
                areaCode: 810000,
                id: 2050,
                name: '香港',
                pid: 25769
            }
        ],
        id: 25769,
        name: '香港',
        echartsJsName: 'xianggang',
        pid: 25794
    },
    {
        areaCode: 230000,
        cityList:  [
            {
                areaCode: 230100,
                id: 202,
                name: '哈尔滨',
                pid: 25770
            },
            {
                areaCode: 230600,
                id: 375,
                name: '大庆',
                pid: 25770
            },
            {
                areaCode: 231000,
                id: 3489,
                name: '牡丹江',
                pid: 25770
            },
            {
                areaCode: 230200,
                id: 5853,
                name: '齐齐哈尔',
                pid: 25770
            },
            {
                areaCode: 231200,
                id: 6718,
                name: '绥化',
                pid: 25770
            },
            {
                areaCode: 230800,
                id: 6776,
                name: '佳木斯',
                pid: 25770
            },
            {
                areaCode: 230300,
                id: 7289,
                name: '鸡西',
                pid: 25770
            },
            {
                areaCode: 230400,
                id: 9039,
                name: '鹤岗',
                pid: 25770
            },
            {
                areaCode: 230700,
                id: 9765,
                name: '伊春',
                pid: 25770
            },
            {
                areaCode: 230500,
                id: 9836,
                name: '双鸭山',
                pid: 25770
            },
            {
                areaCode: 230900,
                id: 9846,
                name: '七台河',
                pid: 25770
            },
            {
                areaCode: 231100,
                id: 9858,
                name: '黑河',
                pid: 25770
            },
            {
                areaCode: 232700,
                id: 9875,
                name: '大兴安岭',
                pid: 25770
            }
        ],
        id: 25770,
        name: '黑龙江',
        echartsJsName: 'heilongjiang',
        pid: 25794
    },
    {
        areaCode: 440000,
        cityList:  [
            {
                areaCode: 440100,
                id: 3,
                name: '广州',
                pid: 25771
            },
            {
                areaCode: 440300,
                id: 4,
                name: '深圳',
                pid: 25771
            },
            {
                areaCode: 440600,
                id: 222,
                name: '佛山',
                pid: 25771
            },
            {
                areaCode: 441900,
                id: 413,
                name: '东莞',
                pid: 25771
            },
            {
                areaCode: 440700,
                id: 629,
                name: '江门',
                pid: 25771
            },
            {
                areaCode: 440900,
                id: 679,
                name: '茂名',
                pid: 25771
            },
            {
                areaCode: 441300,
                id: 722,
                name: '惠州',
                pid: 25771
            },
            {
                areaCode: 442000,
                id: 771,
                name: '中山',
                pid: 25771
            },
            {
                areaCode: 440500,
                id: 783,
                name: '汕头',
                pid: 25771
            },
            {
                areaCode: 440800,
                id: 791,
                name: '湛江',
                pid: 25771
            },
            {
                areaCode: 441200,
                id: 901,
                name: '肇庆',
                pid: 25771
            },
            {
                areaCode: 440400,
                id: 910,
                name: '珠海',
                pid: 25771
            },
            {
                areaCode: 445200,
                id: 927,
                name: '揭阳',
                pid: 25771
            },
            {
                areaCode: 440200,
                id: 2192,
                name: '韶关',
                pid: 25771
            },
            {
                areaCode: 441700,
                id: 2284,
                name: '阳江',
                pid: 25771
            },
            {
                areaCode: 441800,
                id: 7303,
                name: '清远',
                pid: 25771
            },
            {
                areaCode: 441400,
                id: 9374,
                name: '梅州',
                pid: 25771
            },
            {
                areaCode: 441500,
                id: 9441,
                name: '汕尾',
                pid: 25771
            },
            {
                areaCode: 445100,
                id: 10456,
                name: '潮州',
                pid: 25771
            },
            {
                areaCode: 441600,
                id: 10462,
                name: '河源',
                pid: 25771
            },
            {
                areaCode: 445300,
                id: 10480,
                name: '云浮',
                pid: 25771
            }
        ],
        id: 25771,
        name: '广东',
        echartsJsName: 'guangdong',
        pid: 25794
    },
    {
        areaCode: 330000,
        cityList:  [
            {
                areaCode: 330100,
                id: 79,
                name: '杭州',
                pid: 25772
            },
            {
                areaCode: 330200,
                id: 135,
                name: '宁波',
                pid: 25772
            },
            {
                areaCode: 330300,
                id: 330,
                name: '温州',
                pid: 25772
            },
            {
                areaCode: 330600,
                id: 355,
                name: '绍兴',
                pid: 25772
            },
            {
                areaCode: 331000,
                id: 403,
                name: '台州',
                pid: 25772
            },
            {
                areaCode: 330400,
                id: 497,
                name: '嘉兴',
                pid: 25772
            },
            {
                areaCode: 330700,
                id: 531,
                name: '金华',
                pid: 25772
            },
            {
                areaCode: 330500,
                id: 831,
                name: '湖州',
                pid: 25772
            },
            {
                areaCode: 330800,
                id: 6793,
                name: '衢州',
                pid: 25772
            },
            {
                areaCode: 331100,
                id: 7923,
                name: '丽水',
                pid: 25772
            },
            {
                areaCode: 330900,
                id: 8470,
                name: '舟山',
                pid: 25772
            }
        ],
        id: 25772,
        name: '浙江',
        echartsJsName: 'zhejiang',
        pid: 25794
    },
    {
        areaCode: 420000,
        cityList:  [
            {
                areaCode: 420100,
                id: 158,
                name: '武汉',
                pid: 25773
            },
            {
                areaCode: 420500,
                id: 858,
                name: '宜昌',
                pid: 25773
            },
            {
                areaCode: 420600,
                id: 891,
                name: '襄阳',
                pid: 25773
            },
            {
                areaCode: 420200,
                id: 1734,
                name: '黄石',
                pid: 25773
            },
            {
                areaCode: 420300,
                id: 2032,
                name: '十堰',
                pid: 25773
            },
            {
                areaCode: 420800,
                id: 2296,
                name: '荆门',
                pid: 25773
            },
            {
                areaCode: 421100,
                id: 2299,
                name: '黄冈',
                pid: 25773
            },
            {
                areaCode: 422800,
                id: 2302,
                name: '恩施',
                pid: 25773
            },
            {
                areaCode: 420900,
                id: 3434,
                name: '孝感',
                pid: 25773
            },
            {
                areaCode: 421000,
                id: 3479,
                name: '荆州',
                pid: 25773
            },
            {
                areaCode: 429006,
                id: 9475,
                name: '天门',
                pid: 25773
            },
            {
                areaCode: 429021,
                id: 9597,
                name: '神农架',
                pid: 25773
            },
            {
                areaCode: 421200,
                id: 9616,
                name: '咸宁',
                pid: 25773
            },
            {
                areaCode: 421300,
                id: 9630,
                name: '随州',
                pid: 25773
            },
            {
                areaCode: 429005,
                id: 9655,
                name: '潜江',
                pid: 25773
            },
            {
                areaCode: 420700,
                id: 9702,
                name: '鄂州',
                pid: 25773
            },
            {
                areaCode: 429004,
                id: 9723,
                name: '仙桃',
                pid: 25773
            }
        ],
        id: 25773,
        name: '湖北',
        echartsJsName: 'hubei',
        pid: 25794
    },
    {
        areaCode: 430000,
        cityList:  [
            {
                areaCode: 430100,
                id: 414,
                name: '长沙',
                pid: 25774
            },
            {
                areaCode: 430600,
                id: 821,
                name: '岳阳',
                pid: 25774
            },
            {
                areaCode: 430700,
                id: 872,
                name: '常德',
                pid: 25774
            },
            {
                areaCode: 430400,
                id: 914,
                name: '衡阳',
                pid: 25774
            },
            {
                areaCode: 430200,
                id: 1086,
                name: '株洲',
                pid: 25774
            },
            {
                areaCode: 430300,
                id: 2047,
                name: '湘潭',
                pid: 25774
            },
            {
                areaCode: 430500,
                id: 2303,
                name: '邵阳',
                pid: 25774
            },
            {
                areaCode: 431100,
                id: 2307,
                name: '永州',
                pid: 25774
            },
            {
                areaCode: 431000,
                id: 5695,
                name: '郴州',
                pid: 25774
            },
            {
                areaCode: 431200,
                id: 5756,
                name: '怀化',
                pid: 25774
            },
            {
                areaCode: 430800,
                id: 6788,
                name: '张家界',
                pid: 25774
            },
            {
                areaCode: 431300,
                id: 9455,
                name: '娄底',
                pid: 25774
            },
            {
                areaCode: 430900,
                id: 10193,
                name: '益阳',
                pid: 25774
            },
            {
                areaCode: 433100,
                id: 10214,
                name: '湘西',
                pid: 25774
            }
        ],
        id: 25774,
        name: '湖南',
        echartsJsName: 'hunan',
        pid: 25794
    },
    {
        areaCode: 220000,
        cityList:  [
            {
                areaCode: 220100,
                id: 319,
                name: '长春',
                pid: 25775
            },
            {
                areaCode: 220200,
                id: 700,
                name: '吉林',
                pid: 25775
            },
            {
                areaCode: 220700,
                id: 2315,
                name: '松原',
                pid: 25775
            },
            {
                areaCode: 220400,
                id: 2501,
                name: '辽源',
                pid: 25775
            },
            {
                areaCode: 222400,
                id: 3184,
                name: '延边',
                pid: 25775
            },
            {
                areaCode: 220800,
                id: 5918,
                name: '白城',
                pid: 25775
            },
            {
                areaCode: 220500,
                id: 10157,
                name: '通化',
                pid: 25775
            },
            {
                areaCode: 220300,
                id: 10167,
                name: '四平',
                pid: 25775
            },
            {
                areaCode: 220600,
                id: 10177,
                name: '白山',
                pid: 25775
            }
        ],
        id: 25775,
        name: '吉林',
        echartsJsName: 'jilin',
        pid: 25794
    },
    {
        areaCode: 370000,
        cityList:  [
            {
                areaCode: 370200,
                id: 122,
                name: '青岛',
                pid: 25776
            },
            {
                areaCode: 370600,
                id: 228,
                name: '烟台',
                pid: 25776
            },
            {
                areaCode: 370100,
                id: 265,
                name: '济南',
                pid: 25776
            },
            {
                areaCode: 370700,
                id: 362,
                name: '潍坊',
                pid: 25776
            },
            {
                areaCode: 370300,
                id: 385,
                name: '淄博',
                pid: 25776
            },
            {
                areaCode: 370800,
                id: 450,
                name: '济宁',
                pid: 25776
            },
            {
                areaCode: 371300,
                id: 505,
                name: '临沂',
                pid: 25776
            },
            {
                areaCode: 371000,
                id: 518,
                name: '威海',
                pid: 25776
            },
            {
                areaCode: 370500,
                id: 623,
                name: '东营',
                pid: 25776
            },
            {
                areaCode: 370900,
                id: 686,
                name: '泰安',
                pid: 25776
            },
            {
                areaCode: 371400,
                id: 728,
                name: '德州',
                pid: 25776
            },
            {
                areaCode: 371500,
                id: 882,
                name: '聊城',
                pid: 25776
            },
            {
                areaCode: 371600,
                id: 944,
                name: '滨州',
                pid: 25776
            },
            {
                areaCode: 370400,
                id: 961,
                name: '枣庄',
                pid: 25776
            },
            {
                areaCode: 371200,
                id: 2292,
                name: '莱芜',
                pid: 25776
            },
            {
                areaCode: 371100,
                id: 3177,
                name: '日照',
                pid: 25776
            },
            {
                areaCode: 371700,
                id: 5632,
                name: '菏泽',
                pid: 25776
            }
        ],
        id: 25776,
        name: '山东',
        echartsJsName: 'shandong',
        pid: 25794
    },
    {
        areaCode: 340000,
        cityList:  [
            {
                areaCode: 340100,
                id: 837,
                name: '合肥',
                pid: 25777
            },
            {
                areaCode: 340500,
                id: 2039,
                name: '马鞍山',
                pid: 25777
            },
            {
                areaCode: 340200,
                id: 2045,
                name: '芜湖',
                pid: 25777
            },
            {
                areaCode: 340400,
                id: 2319,
                name: '淮南',
                pid: 25777
            },
            {
                areaCode: 341000,
                id: 2323,
                name: '黄山',
                pid: 25777
            },
            {
                areaCode: 341200,
                id: 2325,
                name: '阜阳',
                pid: 25777
            },
            {
                areaCode: 341500,
                id: 2328,
                name: '六安',
                pid: 25777
            },
            {
                areaCode: 341600,
                id: 2329,
                name: '亳州',
                pid: 25777
            },
            {
                areaCode: 340800,
                id: 3251,
                name: '安庆',
                pid: 25777
            },
            {
                areaCode: 341300,
                id: 3359,
                name: '宿州',
                pid: 25777
            },
            {
                areaCode: 340300,
                id: 3470,
                name: '蚌埠',
                pid: 25777
            },
            {
                areaCode: 341800,
                id: 5633,
                name: '宣城',
                pid: 25777
            },
            {
                areaCode: 340600,
                id: 9342,
                name: '淮北',
                pid: 25777
            },
            {
                areaCode: 341700,
                id: 10254,
                name: '池州',
                pid: 25777
            },
            {
                areaCode: 341100,
                id: 10260,
                name: '滁州',
                pid: 25777
            },
            {
                areaCode: 340700,
                id: 10279,
                name: '铜陵',
                pid: 25777
            }
        ],
        id: 25777,
        name: '安徽',
        echartsJsName: 'anhui',
        pid: 25794
    },
    {
        areaCode: 450000,
        cityList:  [
            {
                areaCode: 450100,
                id: 845,
                name: '南宁',
                pid: 25778
            },
            {
                areaCode: 450300,
                id: 1039,
                name: '桂林',
                pid: 25778
            },
            {
                areaCode: 450400,
                id: 2046,
                name: '梧州',
                pid: 25778
            },
            {
                areaCode: 450700,
                id: 2335,
                name: '钦州',
                pid: 25778
            },
            {
                areaCode: 450900,
                id: 2337,
                name: '玉林',
                pid: 25778
            },
            {
                areaCode: 451200,
                id: 2340,
                name: '河池',
                pid: 25778
            },
            {
                areaCode: 450800,
                id: 6770,
                name: '贵港',
                pid: 25778
            },
            {
                areaCode: 450200,
                id: 7133,
                name: '柳州',
                pid: 25778
            },
            {
                areaCode: 451000,
                id: 10506,
                name: '百色',
                pid: 25778
            },
            {
                areaCode: 450500,
                id: 10510,
                name: '北海',
                pid: 25778
            },
            {
                areaCode: 451400,
                id: 10514,
                name: '崇左',
                pid: 25778
            },
            {
                areaCode: 450600,
                id: 10530,
                name: '防城港',
                pid: 25778
            },
            {
                areaCode: 451100,
                id: 10541,
                name: '贺州',
                pid: 25778
            },
            {
                areaCode: 451300,
                id: 10549,
                name: '来宾',
                pid: 25778
            }
        ],
        id: 25778,
        name: '广西',
        echartsJsName: 'guangxi',
        pid: 25794
    },
    {
        areaCode: 410000,
        cityList:  [
            {
                areaCode: 410100,
                id: 342,
                name: '郑州',
                pid: 25779
            },
            {
                areaCode: 410300,
                id: 556,
                name: '洛阳',
                pid: 25779
            },
            {
                areaCode: 411300,
                id: 592,
                name: '南阳',
                pid: 25779
            },
            {
                areaCode: 411600,
                id: 933,
                name: '周口',
                pid: 25779
            },
            {
                areaCode: 411000,
                id: 977,
                name: '许昌',
                pid: 25779
            },
            {
                areaCode: 410400,
                id: 1005,
                name: '平顶山',
                pid: 25779
            },
            {
                areaCode: 410700,
                id: 1016,
                name: '新乡',
                pid: 25779
            },
            {
                areaCode: 411400,
                id: 1029,
                name: '商丘',
                pid: 25779
            },
            {
                areaCode: 411700,
                id: 1067,
                name: '驻马店',
                pid: 25779
            },
            {
                areaCode: 410500,
                id: 1096,
                name: '安阳',
                pid: 25779
            },
            {
                areaCode: 410200,
                id: 2342,
                name: '开封',
                pid: 25779
            },
            {
                areaCode: 410600,
                id: 2344,
                name: '鹤壁',
                pid: 25779
            },
            {
                areaCode: 410900,
                id: 2346,
                name: '濮阳',
                pid: 25779
            },
            {
                areaCode: 411100,
                id: 2347,
                name: '漯河',
                pid: 25779
            },
            {
                areaCode: 410800,
                id: 3266,
                name: '焦作',
                pid: 25779
            },
            {
                areaCode: 411501,
                id: 8531,
                name: '明港',
                pid: 25779
            },
            {
                areaCode: 411500,
                id: 8672,
                name: '信阳',
                pid: 25779
            },
            {
                areaCode: 411200,
                id: 9303,
                name: '三门峡',
                pid: 25779
            },
            {
                areaCode: 419001,
                id: 9894,
                name: '济源',
                pid: 25779
            }
        ],
        id: 25779,
        name: '河南',
        echartsJsName: 'henan',
        pid: 25794
    },
    {
        areaCode: 210000,
        cityList:  [
            {
                areaCode: 210200,
                id: 147,
                name: '大连',
                pid: 25780
            },
            {
                areaCode: 210100,
                id: 188,
                name: '沈阳',
                pid: 25780
            },
            {
                areaCode: 210300,
                id: 523,
                name: '鞍山',
                pid: 25780
            },
            {
                areaCode: 211000,
                id: 2038,
                name: '辽阳',
                pid: 25780
            },
            {
                areaCode: 211100,
                id: 2041,
                name: '盘锦',
                pid: 25780
            },
            {
                areaCode: 210700,
                id: 2354,
                name: '锦州',
                pid: 25780
            },
            {
                areaCode: 210600,
                id: 3445,
                name: '丹东',
                pid: 25780
            },
            {
                areaCode: 210400,
                id: 5722,
                name: '抚顺',
                pid: 25780
            },
            {
                areaCode: 210500,
                id: 5845,
                name: '本溪',
                pid: 25780
            },
            {
                areaCode: 210800,
                id: 5898,
                name: '营口',
                pid: 25780
            },
            {
                areaCode: 211200,
                id: 6729,
                name: '铁岭',
                pid: 25780
            },
            {
                areaCode: 211400,
                id: 10083,
                name: '葫芦岛',
                pid: 25780
            },
            {
                areaCode: 210900,
                id: 10093,
                name: '阜新',
                pid: 25780
            },
            {
                areaCode: 211300,
                id: 10102,
                name: '朝阳',
                pid: 25780
            }
        ],
        id: 25780,
        name: '辽宁',
        echartsJsName: 'liaoning',
        pid: 25794
    },
    {
        areaCode: 360000,
        cityList:  [
            {
                areaCode: 360100,
                id: 669,
                name: '南昌',
                pid: 25781
            },
            {
                areaCode: 360400,
                id: 2247,
                name: '九江',
                pid: 25781
            },
            {
                areaCode: 360300,
                id: 2248,
                name: '萍乡',
                pid: 25781
            },
            {
                areaCode: 360200,
                id: 2360,
                name: '景德镇',
                pid: 25781
            },
            {
                areaCode: 360700,
                id: 2363,
                name: '赣州',
                pid: 25781
            },
            {
                areaCode: 360800,
                id: 2364,
                name: '吉安',
                pid: 25781
            },
            {
                areaCode: 360600,
                id: 3209,
                name: '鹰潭',
                pid: 25781
            },
            {
                areaCode: 360900,
                id: 5709,
                name: '宜春',
                pid: 25781
            },
            {
                areaCode: 360500,
                id: 10111,
                name: '新余',
                pid: 25781
            },
            {
                areaCode: 361100,
                id: 10116,
                name: '上饶',
                pid: 25781
            },
            {
                areaCode: 361000,
                id: 10138,
                name: '抚州',
                pid: 25781
            }
        ],
        id: 25781,
        name: '江西',
        echartsJsName: 'jiangxi',
        pid: 25794
    },
    {
        areaCode: 320000,
        cityList:  [
            {
                areaCode: 320500,
                id: 5,
                name: '苏州',
                pid: 25782
            },
            {
                areaCode: 320200,
                id: 93,
                name: '无锡',
                pid: 25782
            },
            {
                areaCode: 320100,
                id: 172,
                name: '南京',
                pid: 25782
            },
            {
                areaCode: 320600,
                id: 394,
                name: '南通',
                pid: 25782
            },
            {
                areaCode: 320400,
                id: 463,
                name: '常州',
                pid: 25782
            },
            {
                areaCode: 320300,
                id: 471,
                name: '徐州',
                pid: 25782
            },
            {
                areaCode: 320900,
                id: 613,
                name: '盐城',
                pid: 25782
            },
            {
                areaCode: 321000,
                id: 637,
                name: '扬州',
                pid: 25782
            },
            {
                areaCode: 321100,
                id: 645,
                name: '镇江',
                pid: 25782
            },
            {
                areaCode: 321200,
                id: 693,
                name: '泰州',
                pid: 25782
            },
            {
                areaCode: 320800,
                id: 968,
                name: '淮安',
                pid: 25782
            },
            {
                areaCode: 320700,
                id: 2049,
                name: '连云港',
                pid: 25782
            },
            {
                areaCode: 321300,
                id: 2350,
                name: '宿迁',
                pid: 25782
            }
        ],
        id: 25782,
        name: '江苏',
        echartsJsName: 'jiangsu',
        pid: 25794
    },
    {
        areaCode: 130000,
        cityList:  [
            {
                areaCode: 130100,
                id: 241,
                name: '石家庄',
                pid: 25783
            },
            {
                areaCode: 130200,
                id: 276,
                name: '唐山',
                pid: 25783
            },
            {
                areaCode: 130600,
                id: 424,
                name: '保定',
                pid: 25783
            },
            {
                areaCode: 130400,
                id: 572,
                name: '邯郸',
                pid: 25783
            },
            {
                areaCode: 130900,
                id: 652,
                name: '沧州',
                pid: 25783
            },
            {
                areaCode: 130500,
                id: 751,
                name: '邢台',
                pid: 25783
            },
            {
                areaCode: 131000,
                id: 772,
                name: '廊坊',
                pid: 25783
            },
            {
                areaCode: 131100,
                id: 993,
                name: '衡水',
                pid: 25783
            },
            {
                areaCode: 130300,
                id: 1078,
                name: '秦皇岛',
                pid: 25783
            },
            {
                areaCode: 130700,
                id: 3328,
                name: '张家口',
                pid: 25783
            },
            {
                areaCode: 130800,
                id: 6760,
                name: '承德',
                pid: 25783
            }
        ],
        id: 25783,
        name: '河北',
        echartsJsName: 'hebei',
        pid: 25794
    },
    {
        areaCode: 510000,
        cityList:  [
            {
                areaCode: 510100,
                id: 102,
                name: '成都',
                pid: 25784
            },
            {
                areaCode: 510700,
                id: 1057,
                name: '绵阳',
                pid: 25784
            },
            {
                areaCode: 510400,
                id: 2371,
                name: '攀枝花',
                pid: 25784
            },
            {
                areaCode: 510500,
                id: 2372,
                name: '泸州',
                pid: 25784
            },
            {
                areaCode: 510600,
                id: 2373,
                name: '德阳',
                pid: 25784
            },
            {
                areaCode: 511300,
                id: 2378,
                name: '南充',
                pid: 25784
            },
            {
                areaCode: 511500,
                id: 2380,
                name: '宜宾',
                pid: 25784
            },
            {
                areaCode: 511600,
                id: 2381,
                name: '广安',
                pid: 25784
            },
            {
                areaCode: 511100,
                id: 3237,
                name: '乐山',
                pid: 25784
            },
            {
                areaCode: 511000,
                id: 5928,
                name: '内江',
                pid: 25784
            },
            {
                areaCode: 510300,
                id: 6745,
                name: '自贡',
                pid: 25784
            },
            {
                areaCode: 512000,
                id: 6803,
                name: '资阳',
                pid: 25784
            },
            {
                areaCode: 511800,
                id: 9676,
                name: '雅安',
                pid: 25784
            },
            {
                areaCode: 510900,
                id: 9695,
                name: '遂宁',
                pid: 25784
            },
            {
                areaCode: 511400,
                id: 9704,
                name: '眉山',
                pid: 25784
            },
            {
                areaCode: 513400,
                id: 9715,
                name: '凉山',
                pid: 25784
            },
            {
                areaCode: 510800,
                id: 9751,
                name: '广元',
                pid: 25784
            },
            {
                areaCode: 513300,
                id: 9760,
                name: '甘孜',
                pid: 25784
            },
            {
                areaCode: 511700,
                id: 9799,
                name: '达州',
                pid: 25784
            },
            {
                areaCode: 511900,
                id: 9808,
                name: '巴中',
                pid: 25784
            },
            {
                areaCode: 513200,
                id: 9814,
                name: '阿坝',
                pid: 25784
            }
        ],
        id: 25784,
        name: '四川',
        echartsJsName: 'sichuan',
        pid: 25794
    },
    {
        areaCode: 530000,
        cityList:  [
            {
                areaCode: 530100,
                id: 541,
                name: '昆明',
                pid: 25785
            },
            {
                areaCode: 530400,
                id: 2040,
                name: '玉溪',
                pid: 25785
            },
            {
                areaCode: 530300,
                id: 2389,
                name: '曲靖',
                pid: 25785
            },
            {
                areaCode: 530500,
                id: 2390,
                name: '保山',
                pid: 25785
            },
            {
                areaCode: 530700,
                id: 2392,
                name: '丽江',
                pid: 25785
            },
            {
                areaCode: 532300,
                id: 2393,
                name: '楚雄',
                pid: 25785
            },
            {
                areaCode: 532500,
                id: 2394,
                name: '红河',
                pid: 25785
            },
            {
                areaCode: 532600,
                id: 2395,
                name: '文山',
                pid: 25785
            },
            {
                areaCode: 532800,
                id: 2397,
                name: '西双版纳',
                pid: 25785
            },
            {
                areaCode: 532900,
                id: 2398,
                name: '大理',
                pid: 25785
            },
            {
                areaCode: 530600,
                id: 9394,
                name: '昭通',
                pid: 25785
            },
            {
                areaCode: 530900,
                id: 9407,
                name: '临沧',
                pid: 25785
            },
            {
                areaCode: 533400,
                id: 9417,
                name: '迪庆',
                pid: 25785
            },
            {
                areaCode: 533100,
                id: 9422,
                name: '德宏',
                pid: 25785
            },
            {
                areaCode: 530800,
                id: 9429,
                name: '普洱',
                pid: 25785
            },
            {
                areaCode: 533300,
                id: 9452,
                name: '怒江',
                pid: 25785
            }
        ],
        id: 25785,
        name: '云南',
        echartsJsName: 'yunnan',
        pid: 25794
    },
    {
        areaCode: 150000,
        cityList:  [
            {
                areaCode: 150200,
                id: 801,
                name: '包头',
                pid: 25786
            },
            {
                areaCode: 150100,
                id: 811,
                name: '呼和浩特',
                pid: 25786
            },
            {
                areaCode: 150600,
                id: 2037,
                name: '鄂尔多斯',
                pid: 25786
            },
            {
                areaCode: 150300,
                id: 2404,
                name: '乌海',
                pid: 25786
            },
            {
                areaCode: 152500,
                id: 2408,
                name: '锡林郭勒',
                pid: 25786
            },
            {
                areaCode: 150400,
                id: 6700,
                name: '赤峰',
                pid: 25786
            },
            {
                areaCode: 152200,
                id: 9983,
                name: '兴安盟',
                pid: 25786
            },
            {
                areaCode: 150900,
                id: 9998,
                name: '乌兰察布',
                pid: 25786
            },
            {
                areaCode: 150500,
                id: 10012,
                name: '通辽',
                pid: 25786
            },
            {
                areaCode: 150700,
                id: 10035,
                name: '呼伦贝尔',
                pid: 25786
            },
            {
                areaCode: 150800,
                id: 10063,
                name: '巴彦淖尔',
                pid: 25786
            },
            {
                areaCode: 152900,
                id: 10078,
                name: '阿拉善盟',
                pid: 25786
            }
        ],
        id: 25786,
        name: '内蒙古',
        echartsJsName: 'neimenggu',
        pid: 25794
    },
    {
        areaCode: 640000,
        cityList:  [
            {
                areaCode: 640100,
                id: 2054,
                name: '银川',
                pid: 25787
            },
            {
                areaCode: 640400,
                id: 2421,
                name: '固原',
                pid: 25787
            },
            {
                areaCode: 640500,
                id: 9949,
                name: '中卫',
                pid: 25787
            },
            {
                areaCode: 640300,
                id: 9959,
                name: '吴忠',
                pid: 25787
            },
            {
                areaCode: 640200,
                id: 9967,
                name: '石嘴山',
                pid: 25787
            }
        ],
        id: 25787,
        name: '宁夏',
        echartsJsName: 'ningxia',
        pid: 25794
    },
    {
        areaCode: 350000,
        cityList:  [
            {
                areaCode: 350500,
                id: 291,
                name: '泉州',
                pid: 25788
            },
            {
                areaCode: 350100,
                id: 304,
                name: '福州',
                pid: 25788
            },
            {
                areaCode: 350200,
                id: 606,
                name: '厦门',
                pid: 25788
            },
            {
                areaCode: 350600,
                id: 710,
                name: '漳州',
                pid: 25788
            },
            {
                areaCode: 350400,
                id: 2048,
                name: '三明',
                pid: 25788
            },
            {
                areaCode: 350300,
                id: 2429,
                name: '莆田',
                pid: 25788
            },
            {
                areaCode: 350800,
                id: 6752,
                name: '龙岩',
                pid: 25788
            },
            {
                areaCode: 350900,
                id: 7969,
                name: '宁德',
                pid: 25788
            },
            {
                areaCode: 350700,
                id: 10285,
                name: '南平',
                pid: 25788
            }
        ],
        id: 25788,
        name: '福建',
        echartsJsName: 'fujian',
        pid: 25794
    },
    {
        areaCode: 460000,
        cityList:  [
            {
                areaCode: 460100,
                id: 2053,
                name: '海口',
                pid: 25789
            },
            {
                areaCode: 460200,
                id: 2422,
                name: '三亚',
                pid: 25789
            },
            {
                areaCode: 469001,
                id: 9948,
                name: '五指山',
                pid: 25789
            },
            {
                areaCode: 469005,
                id: 9968,
                name: '文昌',
                pid: 25789
            },
            {
                areaCode: 469006,
                id: 10011,
                name: '万宁',
                pid: 25789
            },
            {
                areaCode: 469022,
                id: 10049,
                name: '屯昌',
                pid: 25789
            },
            {
                areaCode: 469030,
                id: 10060,
                name: '琼中',
                pid: 25789
            },
            {
                areaCode: 469002,
                id: 10130,
                name: '琼海',
                pid: 25789
            },
            {
                areaCode: 469028,
                id: 10166,
                name: '陵水',
                pid: 25789
            },
            {
                areaCode: 469024,
                id: 10196,
                name: '临高',
                pid: 25789
            },
            {
                areaCode: 469027,
                id: 10231,
                name: '乐东',
                pid: 25789
            },
            {
                areaCode: 469007,
                id: 10244,
                name: '东方',
                pid: 25789
            },
            {
                areaCode: 469021,
                id: 10297,
                name: '定安',
                pid: 25789
            },
            {
                areaCode: 469023,
                id: 10316,
                name: '澄迈',
                pid: 25789
            },
            {
                areaCode: 469026,
                id: 10347,
                name: '昌江',
                pid: 25789
            },
            {
                areaCode: 469029,
                id: 10367,
                name: '保亭',
                pid: 25789
            },
            {
                areaCode: 469025,
                id: 10375,
                name: '白沙',
                pid: 25789
            },
            {
                areaCode: 460400,
                id: 10390,
                name: '儋州',
                pid: 25789
            },
            {
                areaCode: 460300,
                id: 13663,
                name: '三沙',
                pid: 25789
            }
        ],
        id: 25789,
        name: '海南',
        echartsJsName: 'hainan',
        pid: 25794
    },
    {
        areaCode: 630000,
        cityList:  [
            {
                areaCode: 630100,
                id: 2052,
                name: '西宁',
                pid: 25790
            },
            {
                areaCode: 632700,
                id: 9886,
                name: '玉树',
                pid: 25790
            },
            {
                areaCode: 632300,
                id: 9896,
                name: '黄南',
                pid: 25790
            },
            {
                areaCode: 632800,
                id: 9905,
                name: '海西',
                pid: 25790
            },
            {
                areaCode: 630200,
                id: 9921,
                name: '海东',
                pid: 25790
            },
            {
                areaCode: 632200,
                id: 9934,
                name: '海北',
                pid: 25790
            },
            {
                areaCode: 632600,
                id: 9940,
                name: '果洛',
                pid: 25790
            },
            {
                areaCode: 632500,
                id: 10567,
                name: '海南',
                pid: 25790
            }
        ],
        id: 25790,
        name: '青海',
        echartsJsName: 'qinghai',
        pid: 25794
    },
    {
        areaCode: 540000,
        cityList:  [
            {
                areaCode: 540100,
                id: 2055,
                name: '拉萨',
                pid: 25791
            },
            {
                areaCode: 540500,
                id: 9578,
                name: '山南',
                pid: 25791
            },
            {
                areaCode: 540200,
                id: 9587,
                name: '日喀则',
                pid: 25791
            },
            {
                areaCode: 542400,
                id: 9625,
                name: '那曲',
                pid: 25791
            },
            {
                areaCode: 540400,
                id: 9635,
                name: '林芝',
                pid: 25791
            },
            {
                areaCode: 540300,
                id: 9636,
                name: '昌都',
                pid: 25791
            },
            {
                areaCode: 542500,
                id: 9686,
                name: '阿里',
                pid: 25791
            }
        ],
        id: 25791,
        name: '西藏',
        echartsJsName: 'xizang',
        pid: 25794
    },
    {
        areaCode: 650000,
        cityList:  [
            {
                areaCode: 650100,
                id: 984,
                name: '乌鲁木齐',
                pid: 25792
            },
            {
                areaCode: 650200,
                id: 2042,
                name: '克拉玛依',
                pid: 25792
            },
            {
                areaCode: 650500,
                id: 7452,
                name: '哈密',
                pid: 25792
            },
            {
                areaCode: 652300,
                id: 8572,
                name: '昌吉',
                pid: 25792
            },
            {
                areaCode: 653100,
                id: 9311,
                name: '喀什',
                pid: 25792
            },
            {
                areaCode: 650400,
                id: 9464,
                name: '吐鲁番',
                pid: 25792
            },
            {
                areaCode: 654000,
                id: 9465,
                name: '伊犁',
                pid: 25792
            },
            {
                areaCode: 653201,
                id: 9486,
                name: '和田',
                pid: 25792
            },
            {
                areaCode: 652900,
                id: 9510,
                name: '阿克苏',
                pid: 25792
            },
            {
                areaCode: 653000,
                id: 9527,
                name: '克孜勒苏',
                pid: 25792
            },
            {
                areaCode: 652800,
                id: 9533,
                name: '巴音郭楞',
                pid: 25792
            },
            {
                areaCode: 652700,
                id: 9539,
                name: '博尔塔拉',
                pid: 25792
            },
            {
                areaCode: 659002,
                id: 9545,
                name: '阿拉尔',
                pid: 25792
            },
            {
                areaCode: 659001,
                id: 9556,
                name: '石河子',
                pid: 25792
            },
            {
                areaCode: 659003,
                id: 9563,
                name: '图木舒克',
                pid: 25792
            },
            {
                areaCode: 659004,
                id: 9564,
                name: '五家渠',
                pid: 25792
            },
            {
                areaCode: 654300,
                id: 18804,
                name: '阿勒泰',
                pid: 25792
            },
            {
                areaCode: 654200,
                id: 18812,
                name: '塔城',
                pid: 25792
            }
        ],
        id: 25792,
        name: '新疆',
        echartsJsName: 'xinjiang',
        pid: 25794
    }
]