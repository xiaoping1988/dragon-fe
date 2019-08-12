<template>
    <el-input :style="{width: width + 'px'}"
              size="mini"
              v-model="inputValue"
              placeholder="请输入关键词搜索"
              @change="changeInput"></el-input>
</template>

<script>
    export default {
        name: 'DInputText',
        props: {
            value: String,
            width: Number
        },
        data () {
            return {
                inputValue: ''
            }
        },
        methods: {
            initData () {
                this.inputValue = this.value
                this.$emit('inited', this.inputValue, this.inputValue)
            },
            changeInput (value) {
                this.$emit('change', value, value)
            }
        },
        mounted () {
            this.initData()
        }
    }
</script>