<template>
    <DPageContent>
        <el-row>
            <el-col :span="8" class="d-col">
                <el-card shadow="never">
                    <div class="d-user">
                        <!--<img :src="loginUser.headPic"/>-->
                        <img src="../../../assets/headpic.png"/>
                        <div class="d-user-name">{{loginUser.userNameCn}}</div>
                    </div>
                    <div>
                        <el-row class="d-row">
                            <el-col :span="2">
                                <i class="el-icon-suitcase"></i>
                            </el-col>
                            <el-col :span="22">
                                <span>{{loginUser.position}}</span>
                            </el-col>
                        </el-row>
                        <el-row class="d-row">
                            <el-col :span="2">
                                <i class="el-icon-coin"></i>
                            </el-col>
                            <el-col :span="22">
                                <span>{{loginUser.departmentName}}</span>
                            </el-col>
                        </el-row>
                        <el-row class="d-row">
                            <el-col :span="2">
                                <i class="el-icon-location-outline"></i>
                            </el-col>
                            <el-col :span="22">
                                <span>{{loginUser.city}}</span>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16" class="d-col">
                <el-row class="d-row">
                    <el-card shadow="never">
                        <el-tabs v-model="currentTab">
                            <el-tab-pane label="消息(8)" name="notice">消息</el-tab-pane>
                            <el-tab-pane label="告警(8)" name="warn">告警</el-tab-pane>
                            <el-tab-pane label="代办(8)" name="todo">代办</el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-row>
                <el-row class="d-row">
                    <el-card shadow="never">
                        <div slot="header">
                            <span class="d-card-title">角色权限</span>
                            <div style="float: right;">
                                <el-button class="d-card-btn" type="text">
                                    申请权限
                                </el-button>
                            </div>
                        </div>
                        <el-row v-for="(item, i) in projRoleGrantedList" :key="i" class="d-row">
                            <el-col :span="2">
                                <span class="d-desclist-index-term">{{item.projName}}</span>
                            </el-col>
                            <el-col :span="22">
                                <el-row>
                                    <el-col v-for="(role, j) in item.roleList" :key="j" :span="3">
                                        <span class="d-desclist-index-detail">{{role.roleName}}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-row>
                <el-row class="d-row">
                    <el-card shadow="never">
                        <div slot="header">
                            <span class="d-card-title">城市权限</span>
                            <div style="float: right;">
                                <el-button class="d-card-btn" type="text">
                                    申请权限
                                </el-button>
                            </div>
                        </div>
                        <el-row class="d-row">
                            <el-col :span="1" v-for="(item, i) in userCityGrantedList" :key="i" >
                                <span class="d-desclist-index-detail">{{item.cityName}}</span>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-row>
            </el-col>
        </el-row>
    </DPageContent>
</template>

<script>
    import {
        getUserBase,
        listUserCity,
        listUserRole
    } from '../../../services/auth/user'
    export default {
        name: 'UserConsole',
        data () {
            return {
                loginUser: {
                    userName: '', // 用户名
                    userNameCn: '', // 姓名
                    position: '', // 职位
                    departmentName: '', // 部门
                    city: '', // 所在城市
                    headPic: '' // 头像图片地址
                },
                currentTab: 'notice',
                projRoleGrantedList: [],
                userCityGrantedList: []
            }
        },
        methods: {
            setLoginUser () {
                getUserBase().then(res => {
                    this.loginUser = res.data
                }).catch(this.$handleError)

                listUserRole().then(res => {
                    this.projRoleGrantedList = res.data
                }).catch(this.$handleError)

                listUserCity().then(res => {
                    this.userCityGrantedList = res.data
                }).catch(this.$handleError)
            }
        },
        mounted () {
            this.setLoginUser()
        }
    }
</script>

<style>
    .d-user {
        text-align: center;
    }

    .d-user img {
        width: 104px;
        height: 104px;
        margin-bottom: 20px;
    }

    .d-user-name {
        font-size: 20px;
        font-weight: 700;
    }
</style>