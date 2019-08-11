<template>
    <div :style="{width: width + 'px'}">
        <el-input :style="{width: (width/2 - 20) + 'px'}"
                  size="mini"
                  placeholder="大于等于"
                  v-model="start"
                  @change="changeStart"></el-input>
        <span style="margin-left: 10px;margin-right: 10px">~</span>
        <el-input :style="{width: (width/2 - 20) + 'px'}"
                  size="mini"
                  placeholder="小于等于"
                  v-model="end"
                  @change="changeEnd"></el-input>
    </div>
</template>

<script>
    export default {
        name: 'DInputNumber',
        props: {
            value: String,
            width: Number
        },
        data () {
            return {
                start: '',
                end: ''
            }
        },
        methods: {
            initData () {
                if (this.value !== undefined && this.value.trim() !== '') {
                    let vals = this.value.split(',')
                    this.start = vals[0]
                    this.end = vals[1]
                    let tmpShowLabel = this.getShowLabel()
                    this.$emit('inited', this.start + ',' + this.end, tmpShowLabel)
                } else {
                    this.$emit('inited', '', '')
                }
            },
            changeStart (value) {
                if (value !== '' && isNaN(value)) {
                    this.start = ''
                }
                this.changeValue()
            },
            changeEnd (value) {
                if (value !== '' && isNaN(value)) {
                    this.end = ''
                }
                this.changeValue()
            },
            getShowLabel () {
                let tmpShowLabel = ''
                if (this.start !== '') {
                    tmpShowLabel = tmpShowLabel + '大于等于' + this.start
                }
                if (this.end !== '') {
                    tmpShowLabel = tmpShowLabel + '小于等于' + this.end
                }
                return tmpShowLabel
            },
            changeValue () {
                let tmpShowLabel = this.getShowLabel()
                let tmpConditionValue = ''
                if (tmpShowLabel !== '') {
                    tmpConditionValue = this.start + ',' + this.end
                }
                this.$emit('change', tmpConditionValue, tmpShowLabel)
            }
        },
        mounted () {
            this.initData()
        }
    }
</script>