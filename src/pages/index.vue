<template>
    <div class="d-arch d-box-middle">
        <el-row style="width: 80%">
            <el-col :span="18">
                <el-row>
                    <el-col :span="8">
                        <div>应用层</div>
                    </el-col>
                    <el-col :span="16">
                        <div @click="$router.push('/data-visual')">数据可视化</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div>数据服务层</div>
                    </el-col>
                    <el-col :span="16">
                        <div>数据服务</div>
                        <div>数据服务存储</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div>计算层</div>
                    </el-col>
                    <el-col :span="16">
                        <div>离线</div>
                        <div>实时</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div>
                            数据接入层
                        </div>
                    </el-col>
                    <el-col :span="16"></el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col :span="4">
                        <div class="base-service" @click="$router.push('/auth')">权限中心</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="base-service" @click="$router.push('/message')">消息中心</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="base-service" @click="$router.push('/search')">搜索中心</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="base-service">文档中心</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="base-service" @click="$router.push('/sso/login')">单点登录</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="base-service">导航中心</div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'DHome'
    }
</script>

<style>
    .d-arch {
        width: 100%;
        height: 100%;
        font-size: 24px;
    }

    .base-service {
        width: 32px;
        line-height: 26px;
        padding-left: 6px;
        padding-right: 6px;
    }
</style>