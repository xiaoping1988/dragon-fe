<template>
    <DPageContent>
        <el-row style="height: 100%">
            <el-col class="d-col" style="height: 100%">
                <el-card shadow="never" style="height: 100%">
                    <div class="d-user">
                        <img src="../../assets/me.jpg"/>
                        <div class="d-user-name" style="margin-bottom: 20px">小平</div>
                    </div>
                    <div class="d-box-middle">
                        <div class="d-me">
                            <el-row class="d-row">
                                <i class="el-icon-suitcase d-me-icon"></i> <span>我就是个敲代码的</span>
                            </el-row>
                            <el-row class="d-row">
                                <i class="fa fa-wechat d-me-icon"></i><span>136291865</span>
                            </el-row>
                            <el-row class="d-row">
                                <i class="el-icon-location-outline d-me-icon"></i><span>58到家</span>
                            </el-row>
                            <el-row class="d-row">
                                <i class="fa fa-github d-me-icon"></i><a href="https://github.com/xiaoping1988" target="_blank">https://github.com/xiaoping1988</a>
                            </el-row>
                            <el-row class="d-row">
                                <i class="fa fa-share-alt d-me-icon"></i><a href="https://blog.csdn.net/xiaoping_1988" target="_blank">https://blog.csdn.net/xiaoping_1988</a>
                            </el-row>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </DPageContent>
</template>

<script>
    export default {
        name: 'DAboutMe'
    }
</script>

<style>
    .d-user {
        text-align: center;
    }

    .d-user img {
        width: 204px;
        height: 204px;
        margin-bottom: 20px;
    }

    .d-user-name {
        font-size: 20px;
        font-weight: 700;
    }

    .d-me {
        font-size: 20px;
        width: 454px;
        padding-left: 100px;
        box-sizing: border-box;
    }
    
    .d-me-icon {
        text-align: right;
        padding-right: 15px;
    }
</style>