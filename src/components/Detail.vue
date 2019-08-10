<template>
    <el-row :gutter="24">
        <el-col v-for="col in columns" :span="colSpan" :key="col.key" class="d-desclist-index">
            <div class="d-desclist-index-term">{{col.title}}</div>
            <div class="d-desclist-index-detail">{{data[col.key]}}</div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'DDetail',
        props: {
            data: Object,
            columns: Array,
            col: {
                type: Number,
                default: 3
            }
        },
        computed: {
            colSpan () {
                return 24 / this.col
            }
        }
    }
</script>

<style>
    .d-desclist-index {
        display: flex;
    }
    .d-desclist-index-term {
        padding-bottom: 12px;
        color: rgba(0,0,0,.85);
        line-height: 20px;
        white-space: nowrap;
    }
    .d-desclist-index-term:after {
        position: relative;
        top: -.5px;
        margin: 0 8px 0 2px;
        content: ":";
    }
    .d-desclist-index-detail {
        width: 100%;
        padding-bottom: 12px;
        color: rgba(0,0,0,.65);
        line-height: 20px;
        word-wrap: break-word;
    }
</style>