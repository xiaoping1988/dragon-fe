<template>
    <el-select v-model="selectValue"
               ref="Select"
               size="mini"
               multiple
               filterable
               remote
               reserve-keyword
               placeholder="可输入关键词搜索"
               :remote-method="filterOptions"
               :style="{width: width + 'px'}"
               @change="changeOption">
        <el-option :value="allValue" label="全部">全部</el-option>
        <el-option v-for="(item, index) in optionList" :value="item" :key="index" :label="item">{{ item }}</el-option>
    </el-select>
</template>

<script>
    export default {
        name: 'DSelect',
        props: {
            value: String,
            data: Array,
            width: Number
        },
        data () {
            return {
                optionList: [], // 下拉框的选项
                selectValue: [], // 选中的值
                allValue: '全部',
                maxListSize: 25 // 下拉框最多展现的选项数量
            }
        },
        methods: {
            initData () {
                let tmpValue = this.value
                if (tmpValue === undefined || tmpValue.trim() === '') { // 全部
                    tmpValue = this.allValue
                }
                this.selectValue = tmpValue.split(',')
                this.$refs.Select.$refs.input.placeholder = '可输入关键词搜索'
                if (tmpValue === this.allValue) { // 全部
                    this.$emit('inited', '')
                } else {
                    this.$emit('inited', tmpValue)
                }
                this.filterOptions()
            },
            filterOptions (keyword) {
                if (!keyword) {
                    this.optionList = this.data.slice(0, this.maxListSize)
                } else {
                    this.optionList = this.data.filter(d => d.includes(keyword)).slice(0, this.maxListSize)
                }
            },
            changeOption (option) {
                if (option.length === 0) { // 清空了选项,还原成全部选项
                    this.selectValue = [this.allValue]
                } else if (option.length > 1) { // 选择了两个及两个以上的选项,要判断全部选项,形成互斥
                    if (option[option.length - 1] === this.allValue) { // 点击了全部选线
                        this.selectValue = [this.allValue]
                    } else {
                        let i = this.selectValue.indexOf(this.allValue) // 点击其他选项,之前是全部状态
                        if (i > -1) {
                            this.selectValue.splice(i, 1)
                        }
                    }
                }
                let conditionValue = this.selectValue.toString()
                if (conditionValue === this.allValue) {
                    this.$emit('change', '')
                } else {
                    this.$emit('change', conditionValue)
                }
            }
        },
        mounted () {
            this.initData()
        }
    }
</script>