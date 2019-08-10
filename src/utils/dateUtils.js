export default {
    /**
     * 解析日期字符串为日期Date对象
     * @param dateStr 字符串日期
     * @param pattern 日期格式
     * @returns {Date}
     */
    parseStrToDate (dateStr, pattern) {
        if (!pattern || pattern === '') pattern = 'yyyy-MM-dd'
        let date = new Date()
        if (pattern.includes('yyyy')) { // 年份
            date.setFullYear(Number(dateStr.substr(pattern.indexOf('yyyy'), 4)))
        }
        if (pattern.includes('MM')) { // 月份
            date.setMonth(Number(dateStr.substr(pattern.indexOf('MM'), 2)) - 1)
        }
        if (pattern.includes('dd')) { // 天
            date.setDate(Number(dateStr.substr(pattern.indexOf('dd'), 2)))
        }
        if (pattern.includes('HH')) { // 小时
            date.setHours(Number(dateStr.substr(pattern.indexOf('HH'), 2)))
        }
        if (pattern.includes('mm')) { // 分钟
            date.setMinutes(Number(dateStr.substr(pattern.indexOf('mm'), 2)))
        }
        if (pattern.includes('ss')) { // 秒
            date.setSeconds(Number(dateStr.substr(pattern.indexOf('ss'), 2)))
        }
        if (pattern.includes('SSS')) { // 毫秒
            date.setMilliseconds(Number(dateStr.substr(pattern.indexOf('SSS'), 3)))
        }
        return date
    },

    /**
     * 检验一个字符串是否为日期
     * @param dateStr
     * @returns {boolean}
     */
    testStrDate (dateStr) {
        let expArr = [
            new RegExp('\\d{4}-\\d{2}-\\d{2}'),
            new RegExp('\\d{4}\\d{2}\\d{2}'),
            new RegExp('\\d{4}-\\d{2}'),
            new RegExp('\\d{4}\\d{2}'),
            new RegExp('\\d{4}'),
            new RegExp('\\d{2}:\\d{2}:\\d{2}'),
            new RegExp('\\d{2}:\\d{2}'),
            new RegExp('\\d{2}')
        ]
        for (let i in expArr) {
            if (expArr[i].test(dateStr)) {
                return true
            }
        }
        return false
    },

    /**
     * 格式化日期
     * @param dat 日期对象
     * @param parttern 格式
     * @returns {*}
     */
    formatDate (dat, parttern) {
        if (!parttern || parttern === '') parttern = 'yyyy-MM-dd'
        let o = {
            'M+': dat.getMonth() + 1, // 月份
            'd+': dat.getDate(), // 日
            'h+': dat.getHours() % 12 === 0 ? 12 : dat.getHours() % 12, // 小时
            'H+': dat.getHours(), // 小时
            'm+': dat.getMinutes(), // 分
            's+': dat.getSeconds(), // 秒
            'q+': Math.floor((dat.getMonth() + 3) / 3), // 季度
            'S': dat.getMilliseconds() // 毫秒
        };
        let week = {
            '0': '/u65e5',
            '1': '/u4e00',
            '2': '/u4e8c',
            '3': '/u4e09',
            '4': '/u56db',
            '5': '/u4e94',
            '6': '/u516d'
        };
        if (/(y+)/.test(parttern)) {
            parttern = parttern.replace(RegExp.$1, (dat.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(parttern)) {
            parttern = parttern.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[dat.getDay() + '']);
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(parttern)) {
                parttern = parttern.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return parttern
    },

    /**
     * 获取某个日期范围内的所有日期
     * @param startDate 开始日期对象
     * @param stopDate 结束日期对象
     * @returns {Array}
     */
    getDates (startDate, stopDate, parttern) {
        if (!parttern || parttern === '') parttern = 'yyyy-MM-dd'
        let dateArray = []
        let currentDate = startDate
        while (currentDate <= stopDate) {
            dateArray.push(this.formatDate(currentDate, parttern))
            currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
        }
        return dateArray
    },

    /**
     * 获取某个日期范围内的所有日期
     * @param startDateStr 字符串日期开始
     * @param stopDateStr 字符串日期结束
     * @returns {Array}
     */
    getDatesByStr (startDateStr, stopDateStr, parttern) {
        if (!parttern || parttern === '') parttern = 'yyyy-MM-dd'
        let dateArray = []
        let startDate = this.parseStrToDate(startDateStr, parttern)
        let stopDate = this.parseStrToDate(stopDateStr, parttern)
        let currentDate = startDate
        while (currentDate <= stopDate) {
            dateArray.push(this.formatDate(currentDate, parttern))
            currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
        }
        return dateArray
    },

    /**
     * 获取两个时间区间的天数
     * @param startDate
     * @param stopDate
     * @param parttern
     * @returns {Number}
     */
    getDays (startDate, stopDate, parttern) {
        if (!parttern || parttern === '') parttern = 'yyyy-MM-dd'
        return this.getDates(this.parseStrToDate(startDate, parttern), this.parseStrToDate(stopDate, parttern)).length
    },

    /**
     * 增加日期天数
     * @param strDate
     * @param days
     * @param parttern
     * @returns {*}
     */
    addDate (strDate, days, parttern) {
        let date = this.parseStrToDate(strDate, parttern)
        date.setDate(date.getDate() + days)
        return this.formatDate(date, parttern)
    },

    /**
     * 增加月份
     * @param strMonth
     * @param days
     * @param parttern
     * @returns {*}
     */
    addMonth (strMonth, days, parttern) {
        let date = this.parseStrToDate(strMonth, parttern)
        date.setMonth(date.getMonth() + days)
        return this.formatDate(date, parttern)
    },

    /**
     * 增加年
     * @param strYear
     * @param days
     * @returns {string}
     */
    addYear (strYear, days) {
        return (Number(strYear) + days) + ''
    },

    /**
     * 昨天
     * @param parttern
     * @returns {*}
     */
    getYesterday (parttern) {
        let date = new Date()
        date.setDate(date.getDate() - 1)
        return this.formatDate(date, parttern)
    }
}
