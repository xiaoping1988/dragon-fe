<template>
    <div class="api-guide-dev">
        <el-row class="d-row">
            <DPageHeader title="API开发" hasBack backPath="/data-api/my-api">
                <div slot="right">
                    <el-button size="mini" type="text">测试</el-button>
                    <el-button size="mini" type="text">发布</el-button>
                    <el-button size="mini" type="text">保存</el-button>
                    <el-button size="mini" type="text">刷新</el-button>
                </div>
            </DPageHeader>
        </el-row>
        <div class="api-guide-dev-container">
            <div class="main-dev">
                <el-row id="basic" class="d-row">
                    <el-card shadow="never">
                        <div slot="header">
                            <span class="d-card-title">基本信息</span>
                        </div>

                    </el-card>
                </el-row>
                <el-row id="table" class="d-row">
                    <el-card shadow="never">
                        <div slot="header">
                            <span class="d-card-title">数据表</span>
                        </div>
                    </el-card>
                </el-row>
                <el-row id="requestParam" class="d-row">
                    <el-card shadow="never">
                        <div slot="header">
                            <span class="d-card-title">请求参数</span>
                        </div>
                    </el-card>
                </el-row>
                <el-row id="responseParam" class="d-row">
                    <el-card shadow="never">
                        <div slot="header">
                            <span class="d-card-title">返回参数</span>
                        </div>
                    </el-card>
                </el-row>
            </div>
            <ul class="right-nav">
                <li>
                    <a href="#basic">基本信息</a>
                </li>
                <li>
                    <a href="#table">数据表</a>
                </li>
                <li>
                    <a href="#requestParam">请求参数</a>
                </li>
                <li>
                    <a href="#responseParam">返回参数</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DGuideDev'
    }
</script>

<style>
    .api-guide-dev {
        width: 100%;
        height: 100%;
        background: #f0f2f5;
    }

    .api-guide-dev-container {
        width: 100%;
        height: calc(100% - 70px);
        display: flex;
    }

    .api-guide-dev-container .right-nav {
        width: 36px;
        line-height: 36px;
        height: 100%;
    }

    .api-guide-dev-container .right-nav li {
        width: 100%;
        writing-mode: vertical-rl;
        padding: 10px 0px;
        cursor: pointer;
    }

    .api-guide-dev-container .right-nav li:hover {
        background: #d7d9dc;
        color: #3a8ee6;
    }

    .api-guide-dev-container .main-dev {
        width: calc(100% - 36px);
        height: 100%;
        overflow: auto;
    }
</style>