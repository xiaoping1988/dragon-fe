<template>
    <div class="computed-field-form">
        <el-row class="d-row">
            <el-input v-model.trim="formData.colLabel" placeholder="字段中文名" size="mini"></el-input>
        </el-row>
        <el-row class="d-row">
            <el-select v-model="formData.dataType" size="mini" style="width: 100%">
                <el-option v-for="item in dataTypeList" :key="item.code" :value="item.code" :label="item.name"></el-option>
            </el-select>
        </el-row>
        <el-row class="d-row">
            <div class="el-textarea el-input--mini">
                <textarea autocomplete="off"
                          ref="formulaInput"
                          placeholder="计算公式,请输入英文运算符"
                          class="el-textarea__inner"
                          style="min-height: 33px;"
                          v-model="formData.formulaShow">
                </textarea>
            </div>
        </el-row>
        <el-row class="d-row">
            <el-col :span="12" class="panel">
                <el-row class="d-row">
                    <span>函数</span>
                </el-row>
                <ul class="item-list agg-list">
                    <li v-for="(aggFunc, index) in aggFuncList"
                        :key="index"
                        class="item d-ellipsis"
                        @click="clickAggFunc(aggFunc)">
                        {{aggFunc.code}}({{aggFunc.name}})
                    </li>
                </ul>
            </el-col>
            <el-col :span="12">
                <el-row class="d-row">
                    <span>字段</span>
                </el-row>
                <div>
                    <el-input
                            size="mini"
                            clearable
                            placeholder="搜索字段"
                            suffix-icon="el-icon-search"
                            v-model.trim="colKeyword">
                    </el-input>
                </div>
                <ul class="col-list">
                    <li v-for="col in searchedColList" :key="col.colName" @click="clickColumn(col)">
                        <div class="col-item"
                             :title="col.colName">
                            <div class="pre-icon">
                                <i class="fa" :class="'fa-' + dataTypeObj[col.dataType].icon"></i>
                            </div>
                            <div class="col-label d-ellipsis">
                                {{col.colLabel}}
                            </div>
                        </div>
                    </li>
                </ul>
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
    import {AggFunc} from '../../constants'
    import {DataType, addOrUpdateFormula} from '../../../../services/data-map/col-manage'
    export default {
        name: 'DComputeFieldForm',
        props: {
            col: Object
        },
        data () {
            return {
                dataTypeList: Object.values(DataType),
                dataTypeObj: DataType,
                aggFuncList: Object.values(AggFunc),
                colKeyword: '',
                searchedColList: [],
                formData: {
                    id: '', // 字段ID
                    tbId: '', // 表ID
                    colName: '', // 字段名
                    colLabel: '', // 字段中文名
                    dataType: DataType.num.code, // 数据类型
                    formula: '', // 字段计算表达式
                    formulaShow: '' // 字段计算表达式显示
                }
            }
        },
        methods: {
            initForm () {
                this.formData.tbId = this.$store.state.GeneralChart.editConfig.workTable.tbId
                if (this.col && this.col.id) { // 修改
                    this.formData.id = this.col.id
                    this.formData.colName = this.col.colName
                    this.formData.colLabel = this.col.colLabel
                    this.formData.dataType = this.col.dataType
                    this.formData.formula = this.col.formula
                    this.formData.formulaShow = this.col.formulaShow
                } else { // 新增
                    this.formData.id = ''
                    this.formData.colName = ''
                    this.formData.colLabel = ''
                    this.formData.dataType = DataType.num.code
                    this.formData.formula = ''
                    this.formData.formulaShow = ''
                }
                this.searchColList()
            },
            searchColList () {
                let tmpAllColList = JSON.parse(JSON.stringify(this.$store.state.GeneralChart.workTableColList))
                let tmpColList = []
                if (this.colKeyword) {
                    tmpColList = tmpAllColList.filter(c => c.colName.includes(this.colKeyword.toLowerCase()) || c.colLabel.includes(this.colKeyword))
                } else {
                    tmpColList = tmpAllColList
                }
                this.searchedColList = tmpColList
            },
            addStrToTextArea (str, focusNum) {
                if (!focusNum) {
                    focusNum = 0
                }
                let textarea = this.$refs.formulaInput
                textarea.focus()
                let rangeData = {
                    start: textarea.selectionStart,
                    end: textarea.selectionEnd
                }
                textarea.value = textarea.value.substr(0, rangeData.start) + str + textarea.value.substr(rangeData.end)
                textarea.setSelectionRange(rangeData.start + str.length - focusNum, rangeData.start + str.length - focusNum)
                this.formData.formulaShow = textarea.value
            },
            clickAggFunc (aggFunc) {
                let str = aggFunc.pattern.replace('{}', '')
                this.addStrToTextArea(str, 1)
            },
            clickColumn (col) {
                let str = '[' + col.colLabel + ']'
                this.addStrToTextArea(str)
            },
            transferFormula () {
                let formula = this.formData.formulaShow
                let colList = this.$store.state.GeneralChart.workTableColList
                colList.forEach(col => {
                    formula = this.transferCol(formula, col)
                })
                return formula
            },
            transferCol (formula, col) {
                let pattern = '[' + col.colLabel + ']'
                let index = formula.indexOf(pattern)
                if (index >= 0) {
                    formula = formula.substring(0, index) + col.colName + formula.substring(index + pattern.length)
                    return this.transferCol(formula, col)
                }
                return formula
            },
            submit () {
                if (!this.validForm()) {
                    return
                }
                this.formData.formula = this.transferFormula()
                addOrUpdateFormula(this.formData).then(res => {
                    this.formData.id = res.data.id
                    this.formData.colName = res.data.colName
                    this.$emit('submit', this.formData)
                }).catch(this.$handleError)
            },
            validForm () {
                if (!this.formData.colLabel || this.formData.colLabel.trim() === '') {
                    this.$messageWarn('请填写字段名称')
                    return false
                }
                if (this.formData.colLabel.length > 50) {
                    this.$messageWarn('字段名称不能超过50个字符')
                    return false
                }
                if (!this.formData.formulaShow || this.formData.formulaShow.trim() === '') {
                    this.$messageWarn('请编辑计算公式')
                    return false
                }
                return true
            },
            cancel () {
                this.$emit('cancel')
            }
        },
        watch: {
            colKeyword () {
                this.searchColList()
            }
        },
        mounted () {
            this.initForm()
        }
    }
</script>

<style>

    .computed-field-form .col-list {
        height: calc(100% - 60px);
        overflow: auto;
    }

    .computed-field-form .col-list li {
        padding: 0px;
    }

    .computed-field-form .col-list .col-item {
        cursor: pointer;
        box-sizing: border-box;
        width: 100%;
        height: 32px;
        line-height: 32px;
        display: flex;
        padding-left: 10px;
        padding-right: 10px;
    }

    .computed-field-form .col-list .col-item .pre-icon {
        width: 18px;
        color: #3a8ee6;
    }

    .computed-field-form .col-list .col-item:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    .computed-field-form .col-list .col-item .col-label {
        flex-grow: 1;
    }

    .computed-field-form .agg-list,
    .computed-field-form .col-list {
        height: 200px;
        overflow: auto;
    }
</style>
