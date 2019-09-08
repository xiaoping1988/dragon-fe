<template>
    <div class="accurate-filter-config">
        <el-row class="d-row d-transfer-head">
            <div class="d-transfer-head-panel">
                <el-input
                        size="mini"
                        clearable
                        :placeholder="'搜索' + col.colLabel"
                        suffix-icon="el-icon-search"
                        v-model.trim="keyword">
                </el-input>
            </div>
            <div class="d-transfer-center"></div>
            <div class="d-transfer-head-panel">
                <el-select v-model="configForm.oper" size="mini" style="width: 100%">
                    <el-option v-for="item in operList" :key="item.code" :value="item.code" :label="item.name"></el-option>
                </el-select>
            </div>
        </el-row>
        <el-row class="d-row">
            <el-transfer v-model="transferValue"
                         class="d-transfer"
                         :titles="['可选项', '已选项']"
                         :data="transferData"></el-transfer>
        </el-row>
        <el-row class="d-row">
            <DSubmitCancel nohr
                           size="mini"
                           @submit="submit"
                           @cancel="cancel"
                           submitText="确定">
            </DSubmitCancel>
        </el-row>
    </div>
</template>

<script>
    import {Operator} from '../../constants'
    import {querySelectData} from '../../../../services/data-visual/filter'
    export default {
        name: 'DAccurateFilterConfigForm',
        props: {
            col: Object
        },
        data () {
            return {
                operList: [Operator.in, Operator.notin],
                configForm: {
                    oper: Operator.in.code,
                    value: ''
                },
                transferValue: [],
                transferData: [],
                keyword: '',
                allData: [],
                loading: false,
                maxSize: 50
            }
        },
        methods: {
            initData () {
                if (this.col.colConfig.value) {
                    this.transferValue = this.col.colConfig.value.split(',')
                }
                if (this.col.colConfig.oper) {
                    this.configForm.oper = this.col.colConfig.oper
                }
                this.setAllData()
            },
            setAllData () {
                this.loading = true
                querySelectData({
                    tbId: this.$store.state.GeneralChart.editConfig.workTable.tbId,
                    tbName: this.$store.state.GeneralChart.editConfig.workTable.tbName,
                    dbName: this.$store.state.GeneralChart.editConfig.workTable.dbName,
                    colName: this.col.colName
                }).then(res => {
                    this.loading = false
                    this.allData = res.data
                    this.searchTransferData()
                }).catch(error => {
                    this.$handleError(error)
                    this.loading = false
                })
            },
            searchTransferData () {
                let tmpData = []
                if (this.keyword) {
                    tmpData = this.allData.filter(d => d.includes(this.keyword))
                } else {
                    tmpData = this.allData
                }
                if (tmpData.length > this.maxSize) {
                    tmpData = tmpData.slice(0, this.maxSize)
                }
                this.transferValue.forEach(v => {
                    if (!tmpData.includes(v)) {
                        tmpData.push(v)
                    }
                })
                this.transferData = tmpData.map(d => {
                    return {
                        key: d,
                        label: d
                    }
                })
            },
            submit () {
                if (!this.transferValue.length) {
                    this.$messageWarn('未选择任何选项!')
                    return
                }
                this.configForm.value = this.transferValue.join(',')
                this.$emit('submit', this.configForm)
            },
            cancel () {
                this.$emit('cancel')
            }
        },
        watch: {
            keyword () {
                this.searchTransferData()
            }
        },
        mounted () {
            this.initData()
        }
    }
</script>

<style>
    .accurate-filter-config {
        width: 100%;
        margin-top: 15px;
    }

    .d-transfer .el-checkbox {
        display: block!important;
    }

    .d-transfer-head {
        display: flex;
    }

    .d-transfer-head .d-transfer-center {
        width: 96px;
    }

    .d-transfer-head .d-transfer-head-panel,
    .d-transfer .el-transfer-panel {
        width: calc(50% - 48px)!important;
    }
</style>