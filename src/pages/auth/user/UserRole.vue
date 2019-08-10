<template>
    <el-card shadow="never">
        <div slot="header">
            <span class="d-card-title">角色权限</span>
            <DEditSaveSwitch v-if="userName"
                             style="float: right"
                             editName="授权"
                             v-model="roleGranting"
                             @submit="submitRoleGrantedForm"
                             @edit="openRoleGrantedForm"></DEditSaveSwitch>
        </div>
        <div v-if="!roleGranting">
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
        </div>
        <div v-else>
            <el-row  class="d-row">
                <el-col :span="4">
                    <el-input suffix-icon="el-icon-search"
                              size="small"
                              clearable
                              v-model.trim="searchRoleKey"
                              @change="searchGrantRole"
                              placeholder="请输入角色名搜索"></el-input>
                </el-col>
            </el-row>
            <el-row v-for="(item, i) in searchedRoleList" :key="i"  class="d-row">
                <el-col :span="2">
                    <span class="d-desclist-index-term">{{item.projName}}</span>
                </el-col>
                <el-col :span="22">
                    <el-checkbox-group v-model="checkedRoleObj[item.projId]"
                                       @change="(value) => {changeCheckedRole(value, item)}">
                        <el-checkbox v-for="(role, j) in item.roleList"
                                     :key="j"
                                     :label="role.roleId"
                                     :disabled="role.disable">{{role.roleName}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
    import {
        listUserRole,
        grantUserRole
    } from '../../../services/auth/user'
    import {
        listProjRole
    } from '../../../services/auth/role'
    export default {
        name: 'UserRole',
        props: {
            userName: String,
            userNameCn: String
        },
        data () {
            return {
                projRoleGrantedList: [], // 用户已有的角色权限，数组
                projRoleGrantedObj: {}, // 用户已有的角色权限，kv,key是projId,value是roleList
                checkedRoleObj: {},
                roleGranting: false,
                allProjRoleObj: null, // 登录用户可以操作授权的角色列表
                allProjRoleForm: {},
                searchRoleKey: '',
                searchedRoleList: []
            }
        },
        watch: {
            userName: function () {
                this.setRoleGrantedList()
            }
        },
        methods: {
            setRoleGrantedList () {
                this.roleGranting = false
                this.projRoleGrantedList = []
                this.projRoleGrantedObj = {}
                listUserRole({
                    userName: this.userName
                }).then(res => {
                    this.projRoleGrantedList = res.data
                    this.projRoleGrantedList.forEach(r => {
                        this.projRoleGrantedObj[r.projId] = r.roleList
                    })
                }).catch(this.$handleError)
            },
            setAllProjRoleObj () {
                if (this.allProjRoleObj) {
                    this.setAllProjRoleForm()
                    return
                }
                this.allProjRoleObj = {}
                listProjRole().then(res => {
                    res.data.forEach(d => {
                        this.allProjRoleObj[d.projId] = d
                    })
                    this.setAllProjRoleForm()
                }).catch(this.$handleError)
            },
            openRoleGrantedForm () {
                this.searchRoleKey = ''
                this.setAllProjRoleObj()
            },
            setAllProjRoleForm () {
                this.checkedRoleObj = {}
                this.allProjRoleForm = {}
                this.projRoleGrantedList.forEach(p => {
                    this.checkedRoleObj[p.projId] = p.roleList.map(r => r.roleId)
                    this.allProjRoleForm[p.projId] = {
                        projId: p.projId,
                        projName: p.projName,
                        roleList: []
                    }
                    if (this.allProjRoleObj[p.projId]) {
                        this.allProjRoleForm[p.projId].roleList = this.allProjRoleObj[p.projId].roleList.map(r => {
                            return {
                                roleId: r.roleId,
                                roleName: r.roleName
                            }
                        })
                        p.roleList.forEach(r => {
                            if (this.allProjRoleForm[p.projId].roleList.findIndex(rr => rr.roleId === r.roleId) === -1) {
                                this.allProjRoleForm[p.projId].roleList.push({
                                    roleId: r.roleId,
                                    roleName: r.roleName,
                                    disable: true
                                })
                            }
                        })
                    } else {
                        this.allProjRoleForm[p.projId].roleList = p.roleList.map(r => {
                            return {
                                roleId: r.roleId,
                                roleName: r.roleName,
                                disable: true
                            }
                        })
                    }
                })
                Object.values(this.allProjRoleObj).forEach(p => {
                    if (!this.allProjRoleForm[p.projId]) {
                        this.checkedRoleObj[p.projId] = []
                        this.allProjRoleForm[p.projId] = {
                            projId: p.projId,
                            projName: p.projName,
                            roleList: []
                        }
                        this.allProjRoleForm[p.projId].roleList = this.allProjRoleObj[p.projId].roleList.map(r => {
                            return {
                                roleId: r.roleId,
                                roleName: r.roleName
                            }
                        })
                    }
                })
                this.searchGrantRole()
            },
            searchGrantRole () {
                this.searchedRoleList = []
                if (!this.searchRoleKey) {
                    this.searchedRoleList = Object.values(this.allProjRoleForm)
                } else {
                    Object.values(this.allProjRoleForm).forEach(p => {
                        let searchResult = p.roleList.filter(r => r.roleName.includes(this.searchRoleKey))
                        if (searchResult.length) {
                            this.searchedRoleList.push({
                                projId: p.projId,
                                projName: p.projName,
                                roleList: searchResult
                            })
                        }
                    })
                }
            },
            changeCheckedRole (value, item) {
                this.$forceUpdate()
            },
            submitRoleGrantedForm () {
                let addRoleIdList = [] // 新授权的角色ID集合
                let delRelationIdList = [] // 勾掉的角色的关系ID集合
                Object.keys(this.checkedRoleObj).forEach(projId => {
                    let newCheckedRoleIds = this.checkedRoleObj[projId]
                    if (this.projRoleGrantedObj[projId]) {
                        this.projRoleGrantedObj[projId].forEach(ur => {
                            if (!newCheckedRoleIds.includes(ur.roleId)) {
                                delRelationIdList.push(ur.roleUserId)
                            }
                        })
                    }

                    newCheckedRoleIds.forEach(roleId => {
                        let i = -1
                        if (this.projRoleGrantedObj[projId]) {
                            i = this.projRoleGrantedObj[projId].findIndex(ur => ur.roleId === roleId)
                        }
                        if (i === -1) {
                            addRoleIdList.push(roleId)
                        }
                    })
                })
                grantUserRole({
                    userName: this.userName,
                    userNameCn: this.userNameCn,
                    addRoleIdList: addRoleIdList.toString(),
                    delRelationIdList: delRelationIdList.toString()
                }).then(res => {
                    this.setRoleGrantedList()
                }).catch(this.$handleError)
            }
        }
    }
</script>