<template>
    <div style="width: 100%">
        <el-row  class="d-row">
            <el-col :span="8">
                <el-input suffix-icon="el-icon-search"
                          size="small"
                          clearable
                          v-model.trim="searchColKey"
                          placeholder="请输入关键字搜索"></el-input>
            </el-col>
        </el-row>
        <el-row v-for="(item, i) in searchedColList" :key="i"  class="d-row">
            <el-col :span="5">
                <el-checkbox v-model="dataTypeChecked[item.code]" @change="(value) => changeDataTypeChecked(value, item)">
                    <i class="fa d-icon" :class="'fa-' + item.icon"></i><span>{{item.name}}</span>
                </el-checkbox>
            </el-col>
            <el-col :span="19">
                <el-checkbox-group v-model="checkedColList"
                                   @change="(value) => {changeCheckedCol(value, item)}">
                    <el-checkbox v-for="(city, j) in item.colList"
                                 :key="j"
                                 :label="city.colName">{{city.colLabel}}</el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>
        <el-row>
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
    import {DataType} from '../../../services/data-map/col-manage'
    export default {
        name: 'DBatchAddCol',
        data () {
            return {
                searchedColList: [], // 批量添加，搜索出来的字段
                searchColKey: '', // 搜索关键字
                checkedColList: [],
                dataTypeChecked: {}
            }
        },
        methods: {
            submit () {
                let tmpAllColList = this.$store.state.GeneralChart.workTableColList
                let colList = []
                this.checkedColList.forEach(colName => {
                    let col = tmpAllColList.filter(c => c.colName === colName)[0]
                    let tmpCol = JSON.parse(JSON.stringify(col))
                    colList.push(tmpCol)
                })
                this.initFormData()
                this.$emit('submit', colList)
            },
            cancel () {
                this.initFormData()
                this.$emit('cancel')
            },
            initFormData () {
                this.checkedColList = []
                this.dataTypeChecked = {
                    date: false,
                    text: false,
                    num: false
                }
                this.searchColKey = ''
            },
            searchColList () {
                let tmpAllColList = this.$store.state.GeneralChart.workTableColList
                let dateList = [] // 日期
                let textList = [] // 文本
                let numberList = [] // 数值
                let tmpColList = []
                if (this.searchColKey) {
                    tmpColList = tmpAllColList.filter(c => c.colName.includes(this.searchColKey.toLowerCase()) || c.colLabel.includes(this.searchColKey))
                } else {
                    tmpColList = tmpAllColList
                }
                tmpColList.forEach(c => {
                    if (c.dataType === DataType.date.code) {
                        dateList.push(c)
                    } else if (c.dataType === DataType.num.code) {
                        numberList.push(c)
                    } else {
                        textList.push(c)
                    }
                })
                let tmpSearchedColList = []
                if (dateList.length) {
                    tmpSearchedColList.push({
                        code: DataType.date.code,
                        name: '日期',
                        icon: DataType.date.icon,
                        colList: dateList
                    })
                }
                if (textList.length) {
                    tmpSearchedColList.push({
                        code: DataType.text.code,
                        name: '文本',
                        icon: DataType.text.icon,
                        colList: textList
                    })
                }
                if (numberList.length) {
                    tmpSearchedColList.push({
                        code: DataType.num.code,
                        name: '数值',
                        icon: DataType.num.icon,
                        colList: numberList
                    })
                }
                this.searchedColList = tmpSearchedColList
            },
            setDataTypeChecked (dataType) {
                this.dataTypeChecked[dataType.code] = true
                for (let i in dataType.colList) {
                    if (!this.checkedColList.includes(dataType.colList[i].colName)) {
                        this.dataTypeChecked[dataType.code] = false
                        break
                    }
                }
            },
            changeCheckedCol (value, dataType) {
                this.setDataTypeChecked(dataType)
                this.$forceUpdate()
            },
            changeDataTypeChecked (value, dataType) {
                if (value) {
                    dataType.colList.forEach(c => {
                        if (!this.checkedColList.includes(c.colName)) {
                            this.checkedColList.push(c.colName)
                        }
                    })
                } else {
                    let delIndex = []
                    this.checkedColList.forEach((colName, i) => {
                        let j = dataType.colList.findIndex(c => c.colName === colName)
                        if (j >= 0) {
                            delIndex.push(i)
                        }
                    })
                    delIndex.forEach((d, i) => {
                        this.checkedColList.splice(d - i, 1)
                    })
                }
            }
        },
        watch: {
            searchColKey () {
                this.searchColList()
            }
        },
        mounted () {
            this.searchColList()
        }
    }
</script>