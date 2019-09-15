<template>
    <el-card shadow="never">
        <div class="d-page-header">
            <el-button v-if="hasBack" size="mini" icon="el-icon-back" @click="$goBack" type="text">返回</el-button>
            <span class="title">
                {{title}}
            </span>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: 'DPageHeader',
        props: {
            title: String,
            hasBack: Boolean
        }
    }
</script>

<style>
    .d-page-header .title {
        font-weight: 700;
        margin-left: 10px;
        font-size: 20px;
    }
</style>