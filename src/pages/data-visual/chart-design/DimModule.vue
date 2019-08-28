<template>
    <div class="d-chart-dim">
        <div class="d-dim-container">
            <div class="label">
                <span>维度</span>
                <i class="fa fa-pencil" title="批量添加"></i>
            </div>
            <ul class="drag-container">
                <li v-for="(item, index) in dimList" :key="index" class="drag-item">
                    <div class="tag-item">
                        <div>{{item.showName}}</div>
                        <div class="btn">
                            <i class="fa fa-times-circle" title="移除字段" @click="removeDim(index)"></i>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="!hasContrast" class="right-btn" @click="addContrast"><span>添加对比</span></div>
        </div>
        <div v-if="hasContrast" class="d-dim-container">
            <div class="label">对比</div>
            <ul class="drag-container"></ul>
            <div class="right-btn" @click="removeContrast"><span>移除对比</span></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DDimModule',
        data () {
            return {
                dimList: [
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'},
                    {key: 'col_1', showName: 'yyyy', colLabel: 'xxx'}
                ], // 维度集合
                hasContrast: false, // 是否添加对比
                contrastDimList: [], // 对比维度
            }
        },
        methods: {
            addContrast () {
                this.hasContrast = true
            },
            removeContrast () {
                this.hasContrast = false
                this.contrastDimList = []
            },
            removeDim (index) {
                this.dimList.splice(index, 1)
            }
        }
    }
</script>

<style>
    .d-dim-container {
        line-height: 32px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        display: flex;
        flex-flow: row;
        padding: 5px 5px;
    }

    .d-dim-container .label {
        width: 48px;
    }

    .d-dim-container .label i {
        margin-left: 10px;
        cursor: pointer;
    }

    .d-dim-container .right-btn,
    .d-dim-container .label i:hover {
        color: #3a8ee6;
    }

    .d-dim-container .drag-container {
        width: calc(100% - 103px);
        display: flex;
        flex-flow: wrap;
    }

    .d-dim-container .right-btn {
        cursor: pointer;
        width: 55px;
        text-align: center;
    }

    .drag-container .drag-item {
        padding: 0px;
        margin-top: 5px;
        cursor: pointer;
    }

    .tag-item {
        width: fit-content;
        height: 28px;
        color: #FFF;
        background-color: #5182E4;
        margin-right: 5px;
        border-top-right-radius:10px;
        display: flex;
        line-height: 28px;
        padding: 0px 8px;
    }

    .tag-item .btn {
        width: 18px;
        text-align: center;
        line-height: 30px;
    }

    .tag-item .btn i {
        font-size: 14px;
        display: none;
    }

    .tag-item:hover .btn i {
        display: inline-block;
    }

    .tag-item .btn i:hover {
        color: #cccccc;
    }
</style>