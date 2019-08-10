<template>
    <span class="d-format-value" :class="classStyle" :title="spanText + unit">
        <i v-if="growthSign" class="fa" :class="arrowClass"></i>
        <span>{{spanText}}</span>
        <sub>{{unit}}</sub>
    </span>
</template>

<script>
    import {formatThousandth} from '../../utils/assist'
    export default {
        name: 'DFormatValue',
        props: {
            value: [Number, String], // 要格式化的值
            showType: { // 显示类型,text 文本, num 数字, amt 金额, rate 百分比
                type: String,
                default: 'num'
            },
            unit: {
                type: String,
                default: ''
            }, // 单位
            prefixSymbol: {
                type: String,
                default: ''
            }, // 前缀符号
            suffixSymbol: {
                type: String,
                default: ''
            }, // 后缀符号
            rate100: Boolean, // 百分比是否要乘以100
            growthSign: Boolean // 是否要显示上升或者下降的箭头标识
        },
        data () {
            return {
                spanText: '--',
                up: false,
                down: false
            }
        },
        computed: {
            classStyle () {
                if (this.growthSign) {
                    if (this.up) {
                        return 'd-growth-up'
                    }
                    if (this.down) {
                        return 'd-growth-down'
                    }
                }
                return ''
            },
            arrowClass () {
                if (this.growthSign) {
                    if (this.up) {
                        return 'fa-arrow-up'
                    }
                    if (this.down) {
                        return 'fa-arrow-down'
                    }
                }
                return ''
            }
        },
        methods: {
            formatValue () {
                if (this.value !== undefined && this.value !== null) {
                    if (this.showType === 'num' || this.showType === 'amt' || this.showType === 'rate') {
                        this.up = this.value >= 0
                        this.down = this.value < 0
                    }
                    if (this.showType === 'num') {
                        this.spanText = this.prefixSymbol + formatThousandth(this.value) + this.suffixSymbol
                    } else if (this.showType === 'amt') {
                        let tempPre = '￥'
                        if (this.prefixSymbol) {
                            tempPre = this.prefixSymbol
                        }
                        this.spanText = tempPre + formatThousandth(this.value) + this.suffixSymbol
                    } else if (this.showType === 'rate') {
                        let tempVal = this.value
                        if (this.rate100) {
                            tempVal = parseFloat((this.value * 100).toFixed(2))
                        }
                        this.spanText = tempVal + '%'
                    } else {
                        this.spanText = this.prefixSymbol + this.value + this.suffixSymbol
                    }
                } else {
                    this.spanText = '--'
                }
            }
        },
        watch: {
            value () {
                this.formatValue()
            }
        },
        mounted () {
            this.formatValue()
        }
    }
</script>

<style>
    .d-growth-up {
        color: red;
    }

    .d-growth-down {
        color: green;
    }

    .d-format-value .fa {
        margin-right: 5px;
    }
    .d-format-value sub {
        font-size: 12px;
        position: relative;
        font-weight: 400;
        vertical-align: baseline;
        margin-left: 4px;
    }
</style>