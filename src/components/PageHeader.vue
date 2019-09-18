<template>
    <el-card shadow="never" class="d-page-header">
        <div class="container">
            <div class="left">
                <el-button v-if="hasBack" size="mini" icon="el-icon-back" @click="goBack" type="text">返回</el-button>
                <span class="title">
                {{title}}
            </span>
            </div>
            <div class="right">
                <slot name="right"></slot>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: 'DPageHeader',
        props: {
            title: String,
            hasBack: Boolean,
            backPath: String
        },
        methods: {
            goBack () {
                if (this.backPath) {
                    this.$router.push(this.backPath)
                } else {
                    this.$goBack()
                }
            }
        }
    }
</script>

<style>
    .d-page-header .el-card__body {
        padding: 10px 20px!important;
    }



    .d-page-header .container {
        height: 32px;
        line-height: 32px;
    }

    .d-page-header .container .left {
        float: left;
        display: inline-flex;
    }

    .d-page-header .container .left .title {
        font-weight: 700;
        margin-left: 10px;
        font-size: 20px;
    }

    .d-page-header .container .right {
        float: right;
    }
</style>