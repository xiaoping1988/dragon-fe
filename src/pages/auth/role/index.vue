<template>
    <DPageContent>
        <el-card shadow="never">
            <el-form inline
                     :model="searchForm"
                     ref="searchForm">
                <el-form-item prop="projId">
                    <el-select v-model="searchForm.projId" style="width: 180px" size="small" @change="changeProj">
                        <el-option v-for="proj in projList" :value="proj.id" :key="proj.id" :label="proj.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="keyword">
                    <el-input suffix-icon="el-icon-search"
                              size="small"
                              clearable
                              v-model.trim="searchForm.keyword"
                              @change="searchRole"
                              placeholder="请输入关键字搜索"></el-input>
                </el-form-item>
                <el-form-item style="float: right">
                    <el-button icon="el-icon-plus" type="primary" size="small" @click="openAddStaticRoleForm">创建功能角色</el-button>
                    <el-button icon="el-icon-plus" type="primary" size="small" @click="openAddDataRoleForm()">创建数据角色</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    :data="tableData">
                <el-table-column
                        prop="name"
                        label="名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="code"
                        label="编码"
                        width="220">
                </el-table-column>
                <el-table-column
                        prop="gradeName"
                        width="120"
                        label="等级">
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        width="120"
                        label="类型">
                </el-table-column>
                <el-table-column
                        prop="operPrivilegeName"
                        width="100"
                        label="操作权限">
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="描述">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="250">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="openGrantUserForm(scope.row)">授权用户</el-button>
                        <el-button v-if="scope.row.grade !== 1" type="text" size="mini" @click="openGrantRoleAuthForm(scope.row)">配置权限</el-button>
                        <el-button v-if="scope.row.grade !== 1" type="text" size="mini" @click="openUpdateRoleBaseForm(scope.row)">编辑</el-button>
                        <el-button v-if="scope.row.grade !== 1" type="text" size="mini" @click="deleteById(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="编辑基本信息"
                   :visible.sync="updateRoleBaseFormVisible">
            <el-form :model="updateRoleBaseForm"
                     :rules="updateRoleBaseFormRule"
                     ref="updateRoleBaseForm"
                     label-width="80px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="updateRoleBaseForm.name"></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="code">
                    <el-input v-model.trim="updateRoleBaseForm.code" placeholder="字母开头,只能包含字母、数字、下划线">
                    </el-input>
                </el-form-item>
                <el-form-item label="描述" prop="remark">
                    <el-input v-model.trim="updateRoleBaseForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <DSubmitCancel slot="footer" nohr @submit="submitRoleBaseForm" @cancel="updateRoleBaseFormVisible = false"></DSubmitCancel>
        </el-dialog>
        <el-dialog :title="'授权用户角色：' + currentRole.name"
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
                                       @click="addRoleUser(item, index)"></el-button>
                        </span>
                    </el-option>
                </el-select>
            </el-row>
            <el-row>
                <el-col :span="6"
                        v-for="(roleUser, index) in roleUserList"
                        :key="roleUser.id"
                        class="d-hover-btn">
                    <span>{{roleUser.userNameCn}}({{roleUser.userName}})</span>
                    <el-button type="text"
                               title="删除用户"
                               icon="el-icon-delete"
                               @click="deleteRoleUserById(roleUser.id, index)"></el-button>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog title="创建功能角色"
                   top="10px"
                   :visible.sync="addStaticRoleFormVisible">
            <el-form :model="staticRoleForm"
                     :rules="staticRoleFormRule"
                     ref="staticRoleForm"
                     label-width="80px">
                <el-form-item label="项目">
                    <el-select v-model="searchForm.projId" disabled style="width: 100%">
                        <el-option v-for="proj in projList" :value="proj.id" :key="proj.id" :label="proj.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="staticRoleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="code">
                    <el-input v-model.trim="staticRoleForm.code" placeholder="字母开头,只能包含字母、数字、下划线">
                        <template slot="prepend">{{currentProj.code}}_</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="描述" prop="remark">
                    <el-input v-model.trim="staticRoleForm.remark"></el-input>
                </el-form-item>
                <el-form-item label="角色等级" prop="grade">
                    <el-radio-group v-model="staticRoleForm.grade">
                        <el-radio :label="3">普通角色</el-radio>
                        <el-radio :label="2">管理员角色</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="资源">
                    <el-tree default-expand-all
                             show-checkbox
                             node-key="id"
                             ref="staticResourceTree"
                             :data="staticResourceTreeData"
                    ></el-tree>
                </el-form-item>
            </el-form>
            <DSubmitCancel slot="footer" nohr @submit="submitStaticRoleForm" @cancel="addStaticRoleFormVisible = false"></DSubmitCancel>
        </el-dialog>
        <el-dialog title="配置权限"
                   top="10px"
                   :visible.sync="grantStaticRoleAuthFormVisible">
            <el-form :model="grantStaticRoleAuthForm"
                     label-width="80px">
                <el-form-item label="功能角色">
                    <span class="d-desclist-index-detail">{{currentRole.name}}</span>
                </el-form-item>
                <el-form-item label="角色等级">
                    <el-radio-group v-model="grantStaticRoleAuthForm.grade">
                        <el-radio :label="3">普通角色</el-radio>
                        <el-radio :label="2">管理员角色</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="资源">
                    <el-tree default-expand-all
                             show-checkbox
                             node-key="id"
                             ref="staticResourceTree2"
                             :data="staticResourceTreeData"
                             :default-checked-keys="grantStaticRoleAuthForm.resourceIdList"
                    ></el-tree>
                </el-form-item>
            </el-form>
            <DSubmitCancel slot="footer" nohr @submit="submitGrantStaticRoleAuthForm" @cancel="grantStaticRoleAuthFormVisible = false"></DSubmitCancel>
        </el-dialog>
        <el-dialog title="创建数据角色"
                   top="10px"
                   :visible.sync="addDataRoleFormVisible">
            <el-form :model="addDataRoleForm"
                     :rules="addDataRoleFormRule"
                     ref="addDataRoleForm"
                     label-width="80px">
                <el-form-item label="项目">
                    <el-select v-model="searchForm.projId" disabled style="width: 100%">
                        <el-option v-for="proj in projList" :value="proj.id" :key="proj.id" :label="proj.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="addDataRoleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="remark">
                    <el-input v-model.trim="addDataRoleForm.remark"></el-input>
                </el-form-item>
                <el-form-item label="操作权限">
                    <el-select v-model="addDataRoleForm.operPrivilege" clearable style="width: 100%">
                        <el-option v-for="item in dataRolePrivilege" :value="item.code" :key="item.code" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-for="item in dataResourceList" :label="item.name" :key="item.id">
                    <el-tree show-checkbox
                             node-key="id"
                             :ref="'dataResourceTree' + item.id"
                             :data="dataResourceTreeData[item.id]"
                    >
                        <span class="d-custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <!--<span v-if="data.children">-->
                              <!--<el-checkbox @change="(value) => {changeGrantLevel(node, value)}">全选按父级授权</el-checkbox>-->
                            <!--</span>-->
                        </span>
                    </el-tree>
                </el-form-item>
                <el-form-item v-if="dataResourceList === null || dataResourceList.length === 0">
                    <span class="d-desclist-index-detail">此项目暂未配置数据资源大类</span>
                </el-form-item>
            </el-form>
            <DSubmitCancel slot="footer" nohr @submit="submitAddDataRoleForm" @cancel="addDataRoleFormVisible = false"></DSubmitCancel>
        </el-dialog>
        <el-dialog title="配置权限"
                   top="10px"
                   :visible.sync="grantDataRoleAuthFormVisible">
            <el-form :model="grantDataRoleAuthForm"
                     ref="grantDataRoleAuthForm"
                     label-width="80px">
                <el-form-item label="数据角色">
                    <span class="d-desclist-index-detail">{{currentRole.name}}</span>
                </el-form-item>
                <el-form-item label="操作权限">
                    <el-select v-model="grantDataRoleAuthForm.operPrivilege" clearable style="width: 100%">
                        <el-option v-for="item in dataRolePrivilege" :value="item.code" :key="item.code" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-for="item in dataResourceList" :label="item.name" :key="item.id">
                    <el-tree show-checkbox
                             node-key="id"
                             :default-checked-keys="grantDataRoleAuthDefaultChecked[item.id]"
                             :ref="'dataResourceTreeGrant' + item.id"
                             :data="dataResourceTreeData[item.id]"
                    >
                        <span class="d-custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <!--<span v-if="data.children">-->
                              <!--<el-checkbox @change="(value) => {changeGrantLevel(node, value)}">全选按父级授权</el-checkbox>-->
                            <!--</span>-->
                        </span>
                    </el-tree>
                </el-form-item>
                <el-form-item v-if="dataResourceList === null || dataResourceList.length === 0">
                    <span class="d-desclist-index-detail">此项目暂未配置数据资源大类</span>
                </el-form-item>
            </el-form>
            <DSubmitCancel slot="footer" nohr @submit="submitGrantDataRoleAuthForm" @cancel="grantDataRoleAuthFormVisible = false"></DSubmitCancel>
        </el-dialog>
    </DPageContent>
</template>

<script>
    import {get} from '@/axios'
    import {
        listProjectAuth
    } from '../../../services/auth/project'
    import {
        listStaticResourceTree,
        listDataResource
    } from '../../../services/auth/resource'
    import {
        searchUser
    } from '../../../services/auth/user'
    import {
        listRole,
        addStaticRole,
        updateRoleBase,
        deleteRole,
        listRoleUser,
        addRoleUser,
        deleteRoleUser,
        RoleType,
        OperPrivilege,
        listStaticRoleResourceRelation,
        grantStaticRoleAuth,
        addDataRole,
        listDataRoleResourceRelation,
        grantDataRoleAuth
    } from '../../../services/auth/role'
    export default {
        name: 'Role',
        data () {
            return {
                searchForm: {
                    projId: null,
                    keyword: ''
                },
                projList: [],
                currentProj: {},
                roleList: [],
                tableData: [],
                addStaticRoleFormVisible: false,
                staticRoleForm: {},
                staticRoleFormRule: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    code: [
                        { type: 'string', pattern: /^[A-Za-z]+[A-Za-z0-9_]*[A-Za-z0-9]+$/, message: '字母开头,只能包含字母、数字、下划线', trigger: 'blur' }
                    ]
                },
                staticResourceTreeData: null,
                updateRoleBaseFormVisible: false,
                updateRoleBaseForm: {},
                updateRoleBaseFormRule: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    code: [
                        { type: 'string', pattern: /^[A-Za-z]+[A-Za-z0-9_]*[A-Za-z0-9]+$/, message: '字母开头,只能包含字母、数字、下划线', trigger: 'blur' }
                    ]
                },
                currentRole: {},
                grantUserFormVisible: false,
                roleUserList: [],
                searchUserList: [],
                userNameList: [],
                grantStaticRoleAuthForm: {},
                grantStaticRoleAuthFormVisible: false,
                staticRoleResourceRelations: [],
                addDataRoleFormVisible: false,
                addDataRoleForm: {},
                addDataRoleFormRule: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ]
                },
                dataRolePrivilege: Object.values(OperPrivilege),
                dataResourceList: null,
                dataResourceTreeData: {},
                grantDataRoleAuthForm: {},
                grantDataRoleAuthFormVisible: false,
                grantDataRoleAuthDefaultChecked: {},
                dataRoleResourceRelations: {}
            }
        },
        methods: {
            setProjList () {
                listProjectAuth().then(res => {
                    this.projList = res.data
                    if (this.projList && this.projList.length) {
                        this.searchForm.projId = this.projList[0].id
                        this.changeProj()
                    } else {
                        this.searchForm.projId = null
                        this.proj.detailData = {}
                    }
                }).catch(this.$handleError)
            },
            changeProj () {
                this.setRoleList()
                this.staticResourceTreeData = null
                this.dataResourceList = null
                this.projList.forEach(p => {
                    if (p.id === this.searchForm.projId) {
                        this.currentProj = p
                    }
                })
            },
            setRoleList () {
                listRole({
                    projId: this.searchForm.projId
                }).then(res => {
                    this.roleList = res.data
                    this.searchRole()
                }).catch(this.$handleError)
            },
            searchRole () {
                if (!this.searchForm.keyword) {
                    this.tableData = this.roleList
                    return
                }
                this.tableData = this.roleList.filter(r => {
                    return r.code.includes(this.searchForm.keyword.toUpperCase()) ||
                            r.name.includes(this.searchForm.keyword) ||
                        (r.operPrivilegeName && r.operPrivilegeName.includes(this.searchForm.keyword)) ||
                        (r.remark && r.remark.includes(this.searchForm.keyword))
                })
            },
            openAddStaticRoleForm () {
                this.addStaticRoleFormVisible = true
                this.staticRoleForm = {
                    projId: this.searchForm.projId,
                    name: '',
                    code: '',
                    remark: '',
                    grade: 3
                }
                this.setStaticResourceTreeData()
            },
            setStaticResourceTreeData () {
                if (this.staticResourceTreeData) {
                    return
                }
                listStaticResourceTree({
                    projId: this.searchForm.projId
                }).then(res => {
                    this.staticResourceTreeData = res.data
                }).catch(this.$handleError)
            },
            submitStaticRoleForm () {
                this.$refs['staticRoleForm'].validate((valid) => {
                    if (valid) {
                        let param = JSON.parse(JSON.stringify(this.staticRoleForm))
                        param.resourceIdList = this.$refs.staticResourceTree.getCheckedKeys().toString()
                        param.code = this.currentProj.code + '_' + param.code
                        addStaticRole(param).then(res => {
                            this.addStaticRoleFormVisible = false
                            this.setRoleList()
                        }).catch(this.$handleError)
                    } else {
                        return false
                    }
                })
            },
            openUpdateRoleBaseForm (row) {
                this.updateRoleBaseForm = {
                    id: row.id,
                    name: row.name,
                    code: row.code,
                    remark: row.remark
                }
                this.updateRoleBaseFormVisible = true
            },
            submitRoleBaseForm () {
                this.$refs['updateRoleBaseForm'].validate((valid) => {
                    if (valid) {
                        updateRoleBase(this.updateRoleBaseForm).then(res => {
                            this.updateRoleBaseFormVisible = false
                            this.setRoleList()
                        }).catch(this.$handleError)
                    } else {
                        return false
                    }
                })
            },
            deleteById (row) {
                let msg = '确认删除角色<strong class="d-error">"' + row.name + '"</strong>吗?'
                let vue = this
                vue.$confirmInfo(msg, function () {
                    deleteRole({
                        id: row.id
                    }).then(res => {
                        vue.setRoleList()
                    }).catch(vue.$handleError)
                })
            },
            openGrantUserForm (row) {
                this.currentRole = row
                this.grantUserFormVisible = true
                this.setRoleUserList()
            },
            setRoleUserList () {
                this.roleUserList = []
                listRoleUser({
                    id: this.currentRole.id
                }).then(res => {
                    this.roleUserList = res.data
                }).catch(this.$handleError)
            },
            deleteRoleUserById (roleUserId, index) {
                deleteRoleUser({
                    roleUserId: roleUserId
                }).then(res => {
                    this.roleUserList.splice(index, 1)
                }).catch(this.$handleError)
            },
            searchUser (keyword) {
                if (keyword) {
                    searchUser({
                        keyword: keyword
                    }).then(res => {
                        this.searchUserList = res.data.filter(d => {
                            let i = this.roleUserList.findIndex(u => u.userName === d.userName)
                            return i === -1
                        })
                    }).catch(this.$handleError)
                }
            },
            addRoleUser (user, index) {
                addRoleUser({
                    roleId: this.currentRole.id,
                    userName: user.userName,
                    userNameCn: user.userNameCn
                }).then(res => {
                    this.roleUserList.unshift({
                        id: res.data,
                        userName: user.userName,
                        userNameCn: user.userNameCn
                    })
                    this.searchUserList.splice(index, 1)
                }).catch(this.$handleError)
            },
            selectUser () {
                this.userNameList = []
            },
            openGrantRoleAuthForm (row) {
                this.currentRole = row
                if (row.type === RoleType.STATIC.code) {
                    this.openGrantStaticRoleAuthForm()
                } else {
                    this.openGrantDataRoleAuthForm()
                }
            },
            openGrantStaticRoleAuthForm () {
                this.grantStaticRoleAuthForm = {
                    grade: this.currentRole.grade,
                    resourceIdList: []
                }
                this.setStaticRoleResourceRelations()
                this.setStaticResourceTreeData()
                this.grantStaticRoleAuthFormVisible = true
            },
            setStaticRoleResourceRelations () {
                listStaticRoleResourceRelation({
                    roleId: this.currentRole.id
                }).then(res => {
                    this.staticRoleResourceRelations = res.data
                    this.grantStaticRoleAuthForm.resourceIdList = res.data.map(d => d.resourceId)
                }).catch(this.$handleError)
            },
            submitGrantStaticRoleAuthForm () {
                let checkedIds = this.$refs.staticResourceTree2.getCheckedKeys()
                let addResourceIdList = []
                checkedIds.forEach(id => {
                    if (this.staticRoleResourceRelations.findIndex(r => r.resourceId === id) === -1) {
                        addResourceIdList.push(id)
                    }
                })
                let delRelationIdList = []
                this.staticRoleResourceRelations.forEach(r => {
                    if (!checkedIds.includes(r.resourceId)) {
                        delRelationIdList.push(r.id)
                    }
                })
                grantStaticRoleAuth({
                    roleId: this.currentRole.id,
                    grade: this.grantStaticRoleAuthForm.grade,
                    addResourceIdList: addResourceIdList.toString(),
                    delRelationIdList: delRelationIdList.toString()
                }).then(res => {
                    this.grantStaticRoleAuthFormVisible = false
                    this.setRoleList()
                }).catch(this.$handleError)
            },
            openAddDataRoleForm () {
                this.addDataRoleForm = {
                    projId: this.searchForm.projId,
                    name: '',
                    remark: '',
                    operPrivilege: ''
                }
                this.addDataRoleFormVisible = true
                this.setDataResourceList()
            },
            setDataResourceList (isGrant) {
                if (this.dataResourceList) {
                    if (isGrant) {
                        this.updateDataAuthDefaultChecked()
                    }
                    return
                }
                listDataResource({
                    projId: this.searchForm.projId
                }).then(res => {
                    this.dataResourceList = res.data
                    this.setDataResourceTreeData(true)
                }).catch(this.$handleError)
            },
            setDataResourceTreeData (isGrant) {
                this.dataResourceTreeData = {}
                this.dataResourceList.forEach(d => {
                    get(d.url).then(res => {
                        this.dataResourceTreeData[d.id] = res.data
                        this.$forceUpdate()
                        if (isGrant) {
                            this.updateDataAuthDefaultChecked()
                        }
                    }).catch(this.$handleError)
                })
            },
            changeGrantLevel (node, value) {
                node.grantParent = value
            },
            submitAddDataRoleForm () {
                this.$refs['addDataRoleForm'].validate((valid) => {
                    if (valid) {
                        let param = JSON.parse(JSON.stringify(this.addDataRoleForm))
                        let resourceIdList = {}
                        this.dataResourceList.forEach(d => {
                            resourceIdList[d.id] = []
                            let ref = 'dataResourceTree' + d.id
                            let tree = this.$refs[ref][0]
                            let checkedNodes = tree.getCheckedNodes()
                            checkedNodes.forEach(n => {
                                let node = tree.getNode(n.id)
                                let p = node.parent
                                resourceIdList[d.id].push({
                                    resourceId: n.id,
                                    realId: n.realId,
                                    label: n.label,
                                    type: n.type,
                                    pid: p ? p.data.id : ''
                                })
                            })
                        })
                        param.resourceIdList = JSON.stringify(resourceIdList)
                        addDataRole(param).then(res => {
                            this.addDataRoleFormVisible = false
                            this.setRoleList()
                        }).catch(this.$handleError)
                    } else {
                        return false
                    }
                })
            },
            openGrantDataRoleAuthForm () {
                this.grantDataRoleAuthForm = {
                    roleId: this.currentRole.id,
                    operPrivilege: this.currentRole.operPrivilege
                }
                this.grantDataRoleAuthFormVisible = true
                this.setDataRoleResourceRelations()
            },
            setDataRoleResourceRelations () {
                listDataRoleResourceRelation({
                    roleId: this.currentRole.id
                }).then(res => {
                    this.dataRoleResourceRelations = res.data
                    this.grantDataRoleAuthDefaultChecked = {}
                    Object.keys(res.data).forEach(d => {
                        this.grantDataRoleAuthDefaultChecked[d] = []
                        res.data[d].forEach(r => {
                            this.grantDataRoleAuthDefaultChecked[d].push(r.resourceId)
                        })
                    })
                    this.dataResourceList = null
                    this.$forceUpdate()
                    this.setDataResourceList(true)
                }).catch(this.$handleError)
            },
            updateDataAuthDefaultChecked () {
                let vue = this
                vue.$nextTick(function () {
                    Object.keys(vue.grantDataRoleAuthDefaultChecked).forEach(d => {
                        let ref = 'dataResourceTreeGrant' + d
                        vue.grantDataRoleAuthDefaultChecked[d] = vue.$refs[ref][0].getCheckedKeys()
                    })
                })
            },
            submitGrantDataRoleAuthForm () {
                let param = JSON.parse(JSON.stringify(this.grantDataRoleAuthForm))
                let addResourceIdList = {}
                let delRelationIdList = []
                this.dataResourceList.forEach(d => {
                    addResourceIdList[d.id] = []
                    let ref = 'dataResourceTreeGrant' + d.id
                    let tree = this.$refs[ref][0]
                    let checkedNodes = tree.getCheckedNodes()
                    checkedNodes.forEach(n => {
                        if (!this.grantDataRoleAuthDefaultChecked[d.id] || !this.grantDataRoleAuthDefaultChecked[d.id].includes(n.id)) {
                            let node = tree.getNode(n.id)
                            let p = node.parent
                            addResourceIdList[d.id].push({
                                resourceId: n.id,
                                realId: n.realId,
                                label: n.label,
                                type: n.type,
                                pid: p ? p.data.id : ''
                            })
                        }
                    })
                    if (this.grantDataRoleAuthDefaultChecked[d.id]) {
                        this.grantDataRoleAuthDefaultChecked[d.id].forEach(resourceId => {
                            let i = checkedNodes.findIndex(n => n.id === resourceId)
                            if (i === -1) {
                                this.dataRoleResourceRelations[d.id].filter(r => r.resourceId === resourceId).forEach(rr => {
                                    delRelationIdList.push(rr.id)
                                })
                            }
                        })
                    }
                })
                param.addResourceIdList = JSON.stringify(addResourceIdList)
                param.delRelationIdList = delRelationIdList.toString()
                grantDataRoleAuth(param).then(res => {
                    this.grantDataRoleAuthFormVisible = false
                    this.setRoleList()
                }).catch(this.$handleError)
            }
        },
        mounted () {
            this.setProjList()
        }
    }
</script>

<style>
    .d-custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>