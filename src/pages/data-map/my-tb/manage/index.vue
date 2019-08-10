<template>
    <el-card shadow="never">
        <el-row class="d-row d-search-form">
            <el-select size="small"
                       clearable
                       filterable
                       placeholder="库名,可搜索"
                       class="item"
                       v-model="searchForm.dbId"
                       @change="setTableData">
                <el-option v-for="db in allDbList" :key="db.id" :value="db.id" :label="db.dbName">
                    <!--<span style="float: left">{{ db.dbName }}</span>-->
                    <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ db.id }}</span>-->
                </el-option>
            </el-select>
            <el-input size="small"
                      clearable
                      placeholder="表关键词搜索"
                      suffix-icon="el-icon-search"
                      class="item"
                      v-model="searchForm.tbName"
                      @change="setTableData"></el-input>
        </el-row>
        <el-row class="d-row">
            <el-table
                    :data="tableData.data">
                <el-table-column
                        prop="tbName"
                        label="表名">
                    <template slot-scope="scope">
                        <router-link :to="'/data-map/tb-manage/' + scope.row.id">{{ scope.row.tbName }}</router-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tbNameCn"
                        label="中文名"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="tagList"
                        label="标签"
                        width="200">
                    <template slot-scope="scope">
                        <div class="d-tag-group">
                            <el-tag size="mini" effect="plain" v-for="item in scope.row.tagList" :key="item.id">{{item.name}}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="dbName"
                        label="数据库"
                        width="200">
                    <template slot-scope="scope">
                        <router-link :to="'/data-map/db-manage/' + scope.row.dbId">{{ scope.row.dbName }}</router-link>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作"
                width="250">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="openGrantUserForm(scope.row)">授权用户</el-button>
                        <el-button type="text" size="mini">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="d-right-pagination">
            <el-pagination
                    @current-change="setTableData"
                    @size-change="setTableData"
                    background
                    :current-page.sync="pageNo"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size.sync="pageSize"
                    layout="total, sizes, prev, pager, next"
                    :total="tableData.total">
            </el-pagination>
        </el-row>
        <el-dialog :title="'授权用户表：' + currentTb.dbName + '.' + currentTb.tbName"
                   :visible.sync="grantUserFormVisible">
            <el-row style="margin-bottom: 20px">
                <el-select filterable
                           reserve-keyword
                           multiple
                           remote
                           placeholder="请输入用户名或姓名,搜索添加"
                           size="small"
                           v-model="userNameList"
                           @change="selectUser"
                           :remote-method="searchUser"
                           style="float: right;width: 220px">
                    <el-option
                            v-for="(item, index) in searchUserList"
                            :key="item.userName"
                            :label="item.userNameCn"
                            :value="item.userName">
                        <span style="float: left">{{ item.userNameCn }}({{item.userName}})</span>
                        <span style="float: right">
                            <el-button type="text"
                                       title="添加用户"
                                       icon="el-icon-plus"
                                       @click="addTbUser(item, index)"></el-button>
                        </span>
                    </el-option>
                </el-select>
            </el-row>
            <el-row>
                <el-col :span="6"
                        v-for="(item, index) in tbUserList"
                        :key="item.id"
                        class="d-hover-btn">
                    <span>{{item.userNameCn}}({{item.userName}})</span>
                    <el-button type="text"
                               title="删除用户"
                               icon="el-icon-delete"
                               @click="deleteTbUserById(item.id, index)"></el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </el-card>
</template>

<script>
    import {
        listMyTbManage,
        listTbUser,
        addTbUser,
        deleteTbUser
    } from '../../../../services/data-map/tb-manage'
    import {
        listAllDb
    } from '../../../../services/data-map/db-manage'
    import {
        searchUser
    } from '../../../../services/auth/user'
    export default {
        name: 'DMyTbManage',
        data () {
            return {
                isMy: true,
                searchForm: {
                    dbId: '',
                    tbName: ''
                },
                pageNo: 1,
                pageSize: 10,
                tableData: {},
                allDbList: [],
                currentTb: {},
                grantUserFormVisible: false,
                tbUserList: [],
                searchUserList: [],
                userNameList: []
            }
        },
        methods: {
            clickTab (isMy) {
                this.isMy = isMy
            },
            setAllDbList () {
                listAllDb().then(res => {
                    this.allDbList = res.data
                }).catch(this.$handleError)
            },
            setTableData () {
                listMyTbManage({
                    dbId: this.searchForm.dbId,
                    tbName: this.searchForm.tbName,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                }).then(res => {
                    this.tableData = res.data
                }).catch(this.$handleError)
            },
            openGrantUserForm (row) {
                this.grantUserFormVisible = true
                this.currentTb = row
                this.setTbUserList()
            },
            setTbUserList () {
                listTbUser({
                    id: this.currentTb.id
                }).then(res => {
                    this.tbUserList = res.data
                }).catch(this.$handleError)
            },
            searchUser (keyword) {
                if (keyword) {
                    searchUser({
                        keyword: keyword
                    }).then(res => {
                        this.searchUserList = res.data.filter(d => {
                            let i = this.tbUserList.findIndex(u => u.userName === d.userName)
                            return i === -1
                        })
                    }).catch(this.$handleError)
                }
            },
            addTbUser (user, index) {
                addTbUser({
                    tbId: this.currentTb.id,
                    userName: user.userName,
                    userNameCn: user.userNameCn
                }).then(res => {
                    this.tbUserList.unshift({
                        id: res.data,
                        userName: user.userName,
                        userNameCn: user.userNameCn
                    })
                    this.searchUserList.splice(index, 1)
                }).catch(this.$handleError)
            },
            deleteTbUserById (tbUserId, index) {
                deleteTbUser({
                    tbUserId: tbUserId
                }).then(res => {
                    this.tbUserList.splice(index, 1)
                }).catch(this.$handleError)
            },
            selectUser () {
                this.userNameList = []
            }
        },
        mounted () {
            this.setAllDbList()
            this.setTableData()
        }
    }
</script>