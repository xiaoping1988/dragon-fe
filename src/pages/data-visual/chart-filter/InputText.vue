<template>
    <el-input :style="containerStyle"
              size="mini"
              v-model="inputValue"
              placeholder="请输入关键词"
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
        computed: {
            containerStyle () {
                if (this.width) {
                    return {
                        width: this.width + 'px'
                    }
                }
                return {
                    width: '100%'
                }
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