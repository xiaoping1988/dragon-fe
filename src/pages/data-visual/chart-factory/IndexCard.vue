<template>
    <ul class="d-indexcard d-box-middle" :id="id">
       <li id="advancedComputeName" class="d-advanced-compute-name" v-if="advancedComputeIndexList.length">
          <div class="index-name"></div>
          <div class="index-value"></div>
          <div v-for="(item, index) in advancedComputeIndexList"
               :key="index"
               class="advanced-value d-ellipsis">
              {{item.name}}
          </div>
       </li>
       <li v-for="(col, index) in columns" :key="index" :style="indexColStyle(col)">
           <div class="index-name d-ellipsis" :title="col.name">{{col.name}}</div>
           <div class="index-value d-ellipsis">
               <DFormatValue :value="oneData[col.key]"
                             :showType="col.showType"
                             :unit="col.unit"></DFormatValue>
           </div>
           <div v-for="(item, index) in advancedComputeIndexList"
                :key="index"
                class="advanced-value d-ellipsis">
               <DFormatValue :value="oneData[col.key + '_' + item.code]"
                             :showType="THBValueTypeObj[col.THBValueType] ? THBValueTypeObj[col.THBValueType].showType : ''"
                             growthSign></DFormatValue>
           </div>
       </li>
    </ul>
</template>

<script>
    import {THB, THBValueType} from '../constants'
    export default {
        name: 'DIndexCard',
        props: {
            meta: {
                required: true,
                type: Object
            },
            data: Array,
            id: [Number, String]
        },
        data () {
            return {
                columns: [],
                advancedComputeIndexList: [],
                advancedComputeNameWidth: 0,
                oneData: {},
                THBValueTypeObj: THBValueType
            }
        },
        computed: {

        },
        methods: {
            indexColStyle (col) {
                let sumLen = 0
                this.columns.forEach(c => {
                    sumLen = c.name.length + sumLen
                })
                let colLen = col.name.length
                let rate = (colLen*100)/sumLen
                if (this.advancedComputeNameWidth) {
                    return {'max-width': 'calc(' + rate + '% - ' + (this.advancedComputeNameWidth*colLen)/sumLen + 'px)'}
                } else {
                    return {'max-width': rate + '%'}
                }
            },
            handleMeta () {
                this.columns = this.meta.columns
                let tempTHB = {}
                this.meta.columns.forEach(c => {
                    if (c.THB && c.THB.length) {
                        c.THB.forEach(thb => {
                            tempTHB[thb] = THB[thb]
                        })
                    }
                })
                this.advancedComputeIndexList = Object.values(tempTHB).sort((a, b) => a.sortNum - b.sortNum)
                this.$nextTick(function () {
                    this.setAdvancedComputeNameWidth()
                })
            },
            handleData () {
                if (this.data && this.data.length) {
                    this.oneData = this.data[0]
                } else {
                    this.oneData = {}
                }
            },
            setAdvancedComputeNameWidth () {
                let acn = document.getElementById('advancedComputeName')
                if (acn) {
                    this.advancedComputeNameWidth = acn.clientWidth
                }
            }
        },
        watch: {
            meta () {
                this.handleMeta()
            },
            data () {
                this.handleData()
            }
        },
        mounted () {
            this.handleMeta()
            this.handleData()
        }
    }
</script>

<style>
    .d-chart-full-screen .d-indexcard {
        font-size: 24px;
    }

    .d-chart-full-screen .d-indexcard .index-name {
        font-size: 38px;
    }

    .d-chart-full-screen .d-indexcard .index-name,
    .d-chart-full-screen .d-indexcard .advanced-value {
        height: 38px;
        line-height: 38px;
    }

    .d-chart-full-screen .d-indexcard .index-value {
        height: 52px;
        line-height: 52px;
        font-size: 42px;
    }

    .d-indexcard {
        display: flex;
        width: 100%;
    }

    .d-indexcard li {
        padding: 5px 5px!important;
        box-sizing: border-box;
    }

    .d-indexcard .d-advanced-compute-name {
    }

    .d-indexcard .index-name {
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
    }

    .d-indexcard .index-value {
        height: 20px;
        line-height: 20px;
        text-align: right;
        font-weight: 700;
        font-size: 18px;
    }

    .d-indexcard .advanced-value {
        text-align: right;
        height: 20px;
        line-height: 20px;
    }
</style>