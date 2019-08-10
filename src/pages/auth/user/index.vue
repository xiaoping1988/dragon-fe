<template>
    <DPageContent>
        <el-row class="d-row">
            <el-card shadow="never">
                <el-select filterable
                           remote
                           placeholder="请输入用户名或姓名,例如xiao"
                           size="small"
                           v-model="currentUserName"
                           @change="selectUser"
                           :remote-method="searchUser"
                           style="width: 250px">
                    <el-option
                            v-for="item in searchUserList"
                            :key="item.userName"
                            :label="item.userNameCn + '(' + item.userName + ')'"
                            :value="item.userName">
                    </el-option>
                </el-select>
            </el-card>
        </el-row>
        <el-row class="d-row">
            <el-card shadow="never">
                <div slot="header">
                    <span class="d-card-title">基本信息</span>
                </div>
                <DDetail :data="currentUserBase" :columns="detailColumns"></DDetail>
            </el-card>
        </el-row>
        <el-row class="d-row">
            <UserRole :userName="currentUserName" :userNameCn="currentUserBase.userNameCn"></UserRole>
        </el-row>
        <el-row class="d-row">
            <UserCity :userName="currentUserName"></UserCity>
        </el-row>
    </DPageContent>
</template>

<script>
    import {
        searchUser,
        getUserBase
    } from '../../../services/auth/user'
    import UserRole from './UserRole.vue'
    import UserCity from './UserCity.vue'
    export default {
        name: 'DUser',
        components: {UserRole, UserCity},
        data () {
            return {
                currentUserName: '',
                currentUserBase: {},
                detailColumns: [
                    {key: 'userNameCn', title: '姓名'},
                    {key: 'userName', title: '用户名'},
                    {key: 'departmentName', title: '部门'},
                    {key: 'phone', title: '手机号'},
                    {key: 'email', title: '邮箱'}
                ],
                searchUserList: []
            }
        },
        methods: {
            searchUser (keyword) {
                if (keyword) {
                    searchUser({
                        keyword: keyword
                    }).then(res => {
                        this.searchUserList = res.data
                    }).catch(this.$handleError)
                }
            },
            selectUser () {
                this.setCurrentUserBase()
            },
            setCurrentUserBase () {
                getUserBase({
                    userName: this.currentUserName
                }).then(res => {
                    this.currentUserBase = res.data
                }).catch(this.$handleError)
            }
        }
    }
</script>