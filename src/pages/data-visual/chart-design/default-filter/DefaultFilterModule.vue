<template>
    <div class="d-default-filter">
        <div class="label">过滤器</div>
        <ul class="filter-list"
            @dragover="allowDrop($event)"
            @drop="dragDropCol($event)">
            <li v-for="(item, index) in filterList"
                :key="index"
                class="filter-item">
                <div class="filter-item-head">
                    <div class="angle-icon" @click="toggleShowCondition(item)">
                        <i class="fa fa-angle-down" v-show="item.colConfig.showCondition"></i>
                        <i class="fa fa-angle-right" v-show="!item.colConfig.showCondition"></i>
                    </div>
                    <div class="filter-name d-ellipsis" :title="item.colLabel"  @click="toggleShowCondition(item)">
                        {{item.colLabel}}
                    </div>
                    <div class="oper-btn">
                        <i class="fa fa-pencil" title="编辑配置" @click="openConfig(item)"></i>
                        <i class="fa fa-times-circle" title="移除字段" @click="removeCol(index)"></i>
                    </div>
                </div>
                <div v-show="item.colConfig.showCondition" class="filter-condition-list">
                    <div v-if="item.colConfig.filterPanelType === 'condition'">
                        <div>{{conditionSpliceTypeObj[item.colConfig.conditionSpliceType].name}}</div>
                        <ul>
                            <li v-for="(item, index) in item.colConfig.conditionList"
                                :key="index"
                                class="condition-item">
                                <div class="oper-label">
                                    {{operatorObj[item.oper].name}}
                                </div>
                                <div class="oper-value">
                                    {{item.value}}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-else-if="item.colConfig.filterPanelType === 'accurate'">
                        <div>{{operatorObj[item.colConfig.oper].name}}</div>
                        <ul>
                            <li v-for="item in item.colConfig.value.split(',')" :key="item" class="d-ellipsis">
                                {{item}}
                            </li>
                        </ul>
                    </div>
                    <div v-else-if="item.colConfig.filterPanelType === 'time'">
                        {{item.colConfig.relativeTimeLabel}}
                    </div>
                </div>
            </li>
            <li v-if="!filterList.length" class="d-no-data-tip">
                从左侧字段列表拖拽字段到这里
            </li>
            <li style="height: 28px">

            </li>
        </ul>
        <el-dialog title="配置过滤器条件"
                   :visible.sync="configModalVisible"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :show-close="false"
                   width="600px">
            <el-row class="d-row">
                <el-radio-group v-model="filterPanelType">
                    <el-radio v-for="item in filterPanelTypeList" :key="item.code" :label="item.code">{{item.name}}</el-radio>
                </el-radio-group>
            </el-row>
            <el-row class="default-filter-form">
                <DTimeFilterConfigForm v-if="filterPanelType === 'time'"
                                       :col="currentConfigCol"
                                       @submit="submitConfigForm"
                                       @cancel="configModalVisible = false"></DTimeFilterConfigForm>
                <DAccurateFilterConfigForm v-if="filterPanelType === 'accurate'"
                                       :col="currentConfigCol"
                                       @submit="submitConfigForm"
                                       @cancel="configModalVisible = false"></DAccurateFilterConfigForm>
                <DConditionFilterConfigForm v-if="filterPanelType === 'condition'"
                                           :col="currentConfigCol"
                                           @submit="submitConfigForm"
                                           @cancel="configModalVisible = false"></DConditionFilterConfigForm>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    import {getDefaultFilterColConfig} from '../utils'
    import {FilterPanelType, Operator, ConditionSpliceType} from '../../constants'
    import {DataType} from '../../../../services/data-map/col-manage'
    import DTimeFilterConfigForm from './TimeFilterConfigForm'
    import DAccurateFilterConfigForm from './AccurateFilterConfigForm'
    import DConditionFilterConfigForm from './ConditionFilterConfigForm'
    export default {
        name: 'DDefaultFilterModule',
        components: {DTimeFilterConfigForm, DAccurateFilterConfigForm, DConditionFilterConfigForm},
        data () {
            return {
                operatorObj: Operator,
                conditionSpliceTypeObj: ConditionSpliceType,
                filterList: [],
                currentConfigCol: null,
                filterPanelTypeList: [],
                filterPanelType: '',
                configModalVisible: false,
                isAdd: true
            }
        },
        methods: {
            allowDrop (e) {
                e.preventDefault()
            },
            setFilterPanelTypeList () {
                if (this.currentConfigCol.dataType === DataType.text.code) {
                    this.filterPanelTypeList = [FilterPanelType.accurate, FilterPanelType.condition]
                } else if (this.currentConfigCol.dataType === DataType.num.code) {
                    this.filterPanelTypeList = [FilterPanelType.condition]
                } else {
                    this.filterPanelTypeList = [FilterPanelType.time]
                }
            },
            dragDropCol (e) {
                let dragingCol = e.dataTransfer.getData('dragingCol')
                dragingCol = JSON.parse(dragingCol)
                if (dragingCol.isNewCol) {
                    this.$messageWarn('计算字段不可添加!')
                    return
                }
                let i = this.filterList.findIndex(c => c.colName === dragingCol.colName)
                if (i > -1) {
                    this.$messageWarn('此字段已添加!')
                    return
                }
                dragingCol.colConfig = getDefaultFilterColConfig(dragingCol)
                this.currentConfigCol = dragingCol
                this.setFilterPanelTypeList()
                this.filterPanelType = dragingCol.colConfig.filterPanelType
                this.isAdd = true
                this.configModalVisible = true
            },
            openConfig (col) {
                this.isAdd = false
                this.currentConfigCol = col
                this.setFilterPanelTypeList()
                this.configModalVisible = true
            },
            submitConfigForm (configForm) {
                this.currentConfigCol.colConfig = JSON.parse(JSON.stringify(configForm))
                this.currentConfigCol.colConfig.filterPanelType = this.filterPanelType
                this.currentConfigCol.colConfig.showCondition = true
                if (this.isAdd) {
                    this.filterList.push(this.currentConfigCol)
                }
                this.changeDefaultFilterStore()
                this.configModalVisible = false
            },
            removeCol (index) {
                this.filterList.splice(index, 1)
                this.changeDefaultFilterStore()
            },
            changeDefaultFilterStore () {
                this.$store.commit('GeneralChart/updateDefaultFilterMeta', JSON.parse(JSON.stringify(this.filterList)))
            },
            toggleShowCondition (col) {
                col.colConfig.showCondition = !col.colConfig.showCondition
                this.$forceUpdate()
            }
        }
    }
</script>

<style>
    .d-default-filter {
        width: 180px;
        height: 100%;
        display: table-cell;
        vertical-align: top;
        overflow-y: auto;
        overflow-x: hidden;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        padding-right: 10px;
        box-sizing: border-box;
    }

    .d-default-filter .label {
        padding-left: 5px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .filter-list .filter-item {
        padding: 0px;
        cursor: pointer;
    }

    .filter-list .filter-item-head {
        display: flex;
        height: 28px;
        line-height: 28px;
        background: #E8EBED;
        padding-left: 5px;
        padding-right: 5px;
    }

    .filter-item-head .angle-icon {
        padding-right: 5px;
        width: 15px;
        box-sizing: border-box;
    }

    .filter-item-head  .filter-name {
        flex-grow: 1;
    }

    .filter-list .filter-item {
        margin-bottom: 10px;
    }

    .filter-list .filter-item:hover .oper-btn {
        display: block;
    }

    .filter-item-head .oper-btn {
        width: 32px;
        display: none;
    }

    .filter-item-head .oper-btn i {
        margin-left: 5px;
    }

    .filter-item-head .oper-btn i:hover {
        color: #3a8ee6;
    }

    .filter-condition-list {
        background: #ffffff;
        padding: 10px;
    }

    .default-filter-form {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding: 10px;
    }

    .condition-item {
        display: flex;
    }

    .condition-item .oper-label {
        color: rgba(0,0,0,.65);
    }

    .condition-item .oper-value {
        padding-left: 10px;
        box-sizing: border-box;
    }
</style>