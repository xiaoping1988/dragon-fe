<template>
    <div class="d-dashboard">
        <div class="d-dash-side">
            <div class="d-dash-menu-head">
                <div class="d-dash-search">
                    <el-input
                            size="mini"
                            clearable
                            placeholder="搜索仪表盘/图表"
                            suffix-icon="el-icon-search"
                            class="d-visual-input"
                            v-model.trim="keyword">
                    </el-input>
                    <div v-show="keyword" class="d-dash-search-result d-btn-list">
                        <div v-if="searchResult.chartList.length" class="d-dash-search-result-type">
                            <div class="head">
                                <span class="type">图表</span>
                                <span class="count">{{searchResult.chartList.length}}</span>
                                <!--<el-button type="text" size="mini" class="more">更多</el-button>-->
                            </div>
                            <ul class="d-dash-search-result-list">
                                <li v-for="chart in searchResult.chartList" :key="chart.id" @click="clickSearchedChart(chart)">
                                    <p class="title d-ellipsis" :title="chart.name">{{chart.name}}</p>
                                    <p class="sub d-ellipsis" :title="chart.dash.name + '/' + chart.proj.name">{{chart.dash.name}}/{{chart.proj.name}}</p>
                                </li>
                            </ul>
                        </div>
                        <div v-if="searchResult.dashList.length" class="d-dash-search-result-type">
                            <div class="head">
                                <span class="type">仪表盘</span>
                                <span class="count">{{searchResult.dashList.length}}</span>
                                <!--<el-button type="text" size="mini" class="more">更多</el-button>-->
                            </div>
                            <ul class="d-dash-search-result-list">
                                <li v-for="dash in searchResult.dashList" :key="dash.id" @click="clickSearchedDash(dash)">
                                    <p class="title d-ellipsis" :title="dash.name">{{dash.name}}</p>
                                    <p class="sub d-ellipsis" :title="dash.proj.name">{{dash.proj.name}}</p>
                                </li>
                            </ul>
                        </div>
                        <div v-if="searchResult.projList.length" class="d-dash-search-result-type">
                            <div class="head">
                                <span class="type">文件夹</span>
                                <span class="count">{{searchResult.projList.length}}</span>
                                <!--<el-button type="text" size="mini" class="more">更多</el-button>-->
                            </div>
                            <ul class="d-dash-search-result-list">
                                <li v-for="proj in searchResult.projList" :key="proj.id" @click="clickSearchedProj(proj)">
                                    <p class="title d-ellipsis" :title="proj.name">{{proj.name}}</p>
                                </li>
                            </ul>
                        </div>
                        <div v-if="!searchResult.chartList.length && !searchResult.dashList.length && !searchResult.projList.length" class="d-no-data-tip">
                            没有找到图表/仪表盘/文件
                        </div>
                    </div>
                </div>

                <div class="d-dash-btn">
                    <i class="el-icon-plus" title="创建文件夹/仪表盘"></i>
                    <ul class="d-dash-head-btn-list d-btn-list">
                        <li @click="openAddProj">创建文件夹</li>
                        <li @click="openAddDash">创建仪表盘</li>
                    </ul>
                </div>
            </div>
            <ul class="d-dash-menu" id="dashSideMenu">
                <li v-for="proj in projList"
                    :key="proj.id"
                    class="d-project-item"
                    :id="'proj_' + proj.id">
                    <div class="d-project-name">
                        <div class="name d-ellipsis" @click="clickProj(proj)"
                             @mouseover="(e) => {hoverProjItem(e, proj)}">
                            <i class="fa fa-folder-o"></i>
                            <span>{{proj.name}}</span>
                        </div>
                        <div class="btn" v-if="proj.editAuth">
                            <i class="fa fa-ellipsis-v"></i>
                            <ul class="d-project-btn-list d-btn-list" :id="'proj_btn_' + proj.id">
                                <li @click="openUpdateProj(proj)">编辑文件夹</li>
                                <li @click="openMoveProj(proj)">移动文件夹</li>
                                <li @click="openDeleteProj(proj)">删除文件夹</li>
                            </ul>
                        </div>
                        <div class="d-project-detail d-btn-list"
                             :id="'proj_detail_' + proj.id">
                            <el-row :gutter="24">
                                <el-col class="d-desclist-index">
                                    <h4>文件夹</h4>
                                </el-col>
                                <el-col class="d-desclist-index">
                                    <div class="d-desclist-index-term">名称</div>
                                    <div class="d-desclist-index-detail">{{proj.name}}</div>
                                </el-col>
                                <el-col class="d-desclist-index">
                                    <div class="d-desclist-index-term">标签</div>
                                    <div class="d-desclist-index-detail d-tag-group">
                                        <el-tag v-for="tag in proj.tagList" :key="tag.id" size="mini">{{tag.name}}</el-tag>
                                    </div>
                                </el-col>
                                <el-col class="d-desclist-index">
                                    <div class="d-desclist-index-term">描述</div>
                                    <div class="d-desclist-index-detail">{{proj.remark}}</div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <ul class="d-dash-list">
                        <li class="d-dash-item"
                            v-for="dash in proj.dashList"
                            :key="dash.id"
                            @click="clickDash(proj, dash)"
                            :id="'dash_' + dash.id">
                            <div class="name d-ellipsis"
                                 @mouseover="(e) => {hoverDashItem(e, dash)}">
                                <i class="fa fa-file-image-o"></i>
                                <span>{{dash.name}}</span>
                            </div>
                            <div class="btn" v-if="dash.editAuth">
                                <i class="fa fa-ellipsis-v"></i>
                                <ul class="d-dash-btn-list d-btn-list" :id="'dash_btn_' + dash.id">
                                    <li @click="openUpdateDash(proj, dash)">编辑仪表盘</li>
                                    <li @click="openMoveDash(proj, dash)">移动仪表盘</li>
                                    <li @click="openCopyDash(proj, dash)">复制仪表盘</li>
                                    <li @click="openDeleteDash(proj, dash)">删除仪表盘</li>
                                </ul>
                            </div>
                            <div class="d-dash-detail d-btn-list" :id="'dash_detail_' + dash.id">
                                <el-row :gutter="24">
                                    <el-col class="d-desclist-index">
                                        <h4>仪表盘</h4>
                                    </el-col>
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-term">名称</div>
                                        <div class="d-desclist-index-detail">{{dash.name}}</div>
                                    </el-col>
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-term">标签</div>
                                        <div class="d-desclist-index-detail d-tag-group">
                                            <el-tag v-for="tag in dash.tagList" :key="tag.id" size="mini">{{tag.name}}</el-tag>
                                        </div>
                                    </el-col>
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-term">描述</div>
                                        <div class="d-desclist-index-detail">{{dash.remark}}</div>
                                    </el-col>
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-term">负责人</div>
                                        <div class="d-desclist-index-detail">{{dash.creatorCn}}({{dash.creator}})</div>
                                    </el-col>
                                    <el-col class="d-desclist-index">
                                        <div class="d-desclist-index-term">负责部门</div>
                                        <div class="d-desclist-index-detail">{{dash.departmentName}}</div>
                                    </el-col>
                                </el-row>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <DLoading :loading="loading"></DLoading>
        </div>
        <div class="d-dash-content">
            <router-view/>
        </div>

        <el-dialog :title="projFormTitle"
                   :visible.sync="projFormVisible">
            <el-form ref="projForm"
                     :model="projForm"
                     :rules="projFormRules"
                     label-width="50px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="projForm.name"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <div class="d-tag-group">
                        <el-tag v-for="(tag, index) in projForm.tagList"
                                :key="tag.id"
                                @close="handleCloseProjTag(tag, index)"
                                closable>{{tag.name}}</el-tag>
                        <el-input
                                v-if="projTagInputVisible"
                                v-model="projTagValue"
                                style="width: 90px"
                                size="small"
                                @keyup.enter.native="handleProjTagInputConfirm"
                                @blur="handleProjTagInputConfirm"
                        >
                        </el-input>
                        <el-button v-else size="small" title="添加标签" @click="showProjTagInput">+</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="描述" prop="remark">
                    <el-input v-model.trim="projForm.remark"
                              type="textarea"
                              :rows="5"></el-input>
                </el-form-item>
            </el-form>
            <DSubmitCancel slot="footer" nohr @submit="submitProjForm" @cancel="projFormVisible = false">
            </DSubmitCancel>
        </el-dialog>
        <el-dialog :title="dashFormTitle"
                   :visible.sync="dashFormVisible">
            <el-form ref="dashForm"
                     :model="dashForm"
                     :rules="dashFormRules"
                     label-width="100px">
                <el-form-item label="归属文件夹" prop="projId">
                    <el-select v-model="dashForm.projId" filterable style="width: 100%">
                        <el-option v-for="item in projList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model.trim="dashForm.name"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <div class="d-tag-group">
                        <el-tag v-for="(tag, index) in dashForm.tagList"
                                :key="tag.id"
                                @close="handleCloseDashTag(tag, index)"
                                closable>{{tag.name}}</el-tag>
                        <el-input
                                v-if="dashTagInputVisible"
                                v-model="dashTagValue"
                                style="width: 90px"
                                size="small"
                                @keyup.enter.native="handleDashTagInputConfirm"
                                @blur="handleDashTagInputConfirm"
                        >
                        </el-input>
                        <el-button v-else size="small" title="添加标签" @click="showDashTagInput">+</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="描述" prop="remark">
                    <el-input v-model.trim="dashForm.remark"
                              type="textarea"
                              :rows="5"></el-input>
                </el-form-item>
            </el-form>
            <DSubmitCancel slot="footer" nohr @submit="submitDashForm" @cancel="dashFormVisible = false">
            </DSubmitCancel>
        </el-dialog>
    </div>
</template>

<script>
    import {
        listUserDash,
        addOrUpdateDash,
        copyDash,
        moveDash,
        getDashMetaForShow,
        deleteDash
    } from '../../../services/data-visual/dashboard'
    import {
        addOrUpdateProj,
        deleteProj,
        moveProj
    } from '../../../services/data-visual/project'
    export default {
        name: 'DDashboard',
        data () {
            return {
                keyword: '',
                projList: [],
                activeProjId: '',
                activeDashId: '',
                searchResult: {
                    chartList: [],
                    dashList: [],
                    projList: []
                },
                projFormTitle: '',
                projFormVisible: false,
                projForm: {
                    id: '',
                    name: '',
                    remark: '',
                    tagList: [],
                    delTagIdList: []
                },
                projFormRules: {
                    name: [
                        { required: true, message: '请输入文件夹名称', trigger: 'blur' }
                    ]
                },
                projTagInputVisible: false,
                projTagValue: '',
                dashFormTitle: '',
                dashFormVisible: false,
                dashForm: {
                    id: '',
                    name: '',
                    remark: '',
                    projId: '',
                    tagList: [],
                    delTagIdList: []
                },
                dashFormRules: {
                    name: [
                        { required: true, message: '请输入仪表盘名称', trigger: 'blur' }
                    ],
                    projId: [
                        { required: true, message: '请选择文件夹归属', trigger: 'change' }
                    ]
                },
                dashTagInputVisible: false,
                dashTagValue: '',
                loading: false
            }
        },
        methods: {
            clickProj (proj) {
                let projDom = document.getElementById('proj_' + proj.id)
                projDom.classList.toggle('active')
                let preIcon = projDom.querySelector('.d-project-name .name i')
                if (preIcon.classList.contains('fa-folder-open-o')) {
                    preIcon.classList.remove('fa-folder-open-o')
                    preIcon.classList.add('fa-folder-o')
                } else {
                    preIcon.classList.add('fa-folder-open-o')
                    preIcon.classList.remove('fa-folder-o')
                }
            },
            activeProj (proj) {
                let projDom = document.getElementById('proj_' + proj.id)
                if (!projDom.classList.contains('active')) {
                    projDom.classList.add('active')
                    let preIcon = projDom.querySelector('.d-project-name .name i')
                    preIcon.classList.add('fa-folder-open-o')
                    preIcon.classList.remove('fa-folder-o')
                }
            },
            setProjList (projId, dashId) {
                this.loading = true
                listUserDash().then(res => {
                    this.loading = false
                    this.projList = res.data
                    if (!projId || !dashId) {
                        let p = this.projList[0]
                        let d = p.dashList[0]
                        this.$router.push('/data-visual/dashboard/' + p.id + '/' + d.id)
                    } else {
                        if (this.$route.params.dashId === undefined) {
                            this.$router.push('/data-visual/dashboard/' + projId + '/' + dashId)
                        }
                    }
                    this.$nextTick(function () {
                        this.setActive()
                    })
                }).catch(this.$handleError)
            },
            openAddProj () {
                this.projForm = {
                    name: '',
                    remark: '',
                    tagList: [],
                    delTagIdList: []
                }
                this.projFormTitle = '创建文件夹'
                this.projFormVisible = true
            },
            submitProjForm () {
                this.$refs['projForm'].validate((valid) => {
                    if (valid) {
                        addOrUpdateProj({
                            id: this.projForm.id,
                            name: this.projForm.name,
                            remark: this.projForm.remark,
                            addTagList: JSON.stringify(this.projForm.tagList.filter(t => t.id === undefined)),
                            delTagIdList: this.projForm.delTagIdList.toString()
                        }).then(res => {
                            this.projFormVisible = false
                            this.setProjList()
                        }).catch(this.$handleError)
                    } else {
                        return false
                    }
                })
            },
            openUpdateProj (proj) {
                this.projForm = {
                    id: proj.id,
                    name: proj.name,
                    remark: proj.remark,
                    tagList: proj.tagList,
                    delTagIdList: []
                }
                this.projFormTitle = '编辑文件夹'
                this.projFormVisible = true
            },
            showProjTagInput () {
                this.projTagInputVisible = true
                this.projTagValue = ''
            },
            handleProjTagInputConfirm () {
                if (this.projTagValue) {
                    if (this.projTagValue.length > 50) {
                        this.$messageWarn('标签长度不能超过50个字符!')
                        return
                    }
                    this.projForm.tagList.push({
                        name: this.projTagValue
                    })
                }
                this.projTagInputVisible = false
                this.projTagValue = ''
            },
            handleCloseProjTag (tag, index) {
                if (tag.id) {
                    this.projForm.delTagIdList.push(tag.id)
                }
                this.projForm.tagList.splice(index, 1)
            },
            openMoveProj (proj) {

            },
            openDeleteProj (proj) {
                let msg = '确认删除文件夹<strong class="d-error">"' + proj.name + '"</strong>吗?'
                let vue = this
                vue.$confirmInfo(msg, function () {
                    deleteProj({
                        id: proj.id
                    }).then(res => {
                        vue.activeProjId = ''
                        vue.setProjList()
                    }).catch(vue.$handleError)
                })
            },
            clickDash (proj, dash, chart) {
                let path = '/data-visual/dashboard/' + proj.id + '/' + dash.id
                if (chart) {
                    path = path + '?chartId=' + chart.id + '&tabId=' + chart.tabId
                }
                this.$router.push(path)
            },
            openAddDash () {
                this.dashForm = {
                    name: '',
                    remark: '',
                    projId: this.projList.length ? this.projList[0].id : '',
                    tagList: [],
                    delTagIdList: []
                }
                this.dashFormTitle = '创建仪表盘'
                this.dashFormVisible = true
            },
            openUpdateDash (proj, dash) {
                this.dashForm = {
                    id: dash.id,
                    name: dash.name,
                    remark: dash.remark,
                    projId: proj.id,
                    tagList: dash.tagList,
                    delTagIdList: []
                }
                this.dashFormTitle = '编辑仪表盘'
                this.dashFormVisible = true
            },
            submitDashForm () {
                this.$refs['dashForm'].validate((valid) => {
                    if (valid) {
                        addOrUpdateDash({
                            id: this.dashForm.id,
                            name: this.dashForm.name,
                            remark: this.dashForm.remark,
                            projId: this.dashForm.projId,
                            addTagList: JSON.stringify(this.dashForm.tagList.filter(t => t.id === undefined)),
                            delTagIdList: this.dashForm.delTagIdList.toString()
                        }).then(res => {
                            this.dashFormVisible = false
                            this.setProjList(this.dashForm.projId, res.data)
                        }).catch(this.$handleError)
                    } else {
                        return false
                    }
                })
            },
            showDashTagInput () {
                this.dashTagInputVisible = true
                this.dashTagValue = ''
            },
            handleDashTagInputConfirm () {
                if (this.dashTagValue) {
                    if (this.dashTagValue.length > 50) {
                        this.$messageWarn('标签长度不能超过50个字符!')
                        return
                    }
                    this.dashForm.tagList.push({
                        name: this.dashTagValue
                    })
                }
                this.dashTagInputVisible = false
                this.dashTagValue = ''
            },
            handleCloseDashTag (tag, index) {
                if (tag.id) {
                    this.dashForm.delTagIdList.push(tag.id)
                }
                this.dashForm.tagList.splice(index, 1)
            },
            openMoveDash (proj, dash) {

            },
            openDeleteDash (proj, dash) {
                let msg = '确认删除仪表盘<strong class="d-error">"' + dash.name + '"</strong>吗?'
                let vue = this
                vue.$confirmInfo(msg, function () {
                    deleteDash({
                        id: dash.id
                    }).then(res => {
                        if (Number(vue.activeDashId) === dash.id) {
                            vue.activeDashId = ''
                        }
                        vue.setProjList()
                    }).catch(vue.$handleError)
                })
            },
            openCopyDash (proj, dash) {

            },
            setActive () {
                this.$nextTick(function () {
                    let oldDashDom = document.getElementById('dash_' + this.activeDashId)
                    if (oldDashDom) {
                        oldDashDom.classList.remove('active')
                    }
                    this.activeProjId = this.$route.params.projId
                    this.activeDashId = this.$route.params.dashId
                    let newDashDom = document.getElementById('dash_' + this.activeDashId)
                    newDashDom.classList.add('active')
                    this.activeProj({id: this.activeProjId})
                    this.scrollToActiveDash()
                })
            },
            searchDash () {
                if (!this.keyword) {
                    return
                }
                this.searchResult = {
                    chartList: [],
                    dashList: [],
                    projList: []
                }
                this.projList.forEach(p => {
                    if (p.name.includes(this.keyword)) {
                        this.searchResult.projList.push({
                            id: p.id,
                            name: p.name
                        })
                    }
                    p.dashList.forEach(d => {
                        if (d.name.includes(this.keyword)) {
                            this.searchResult.dashList.push({
                                id: d.id,
                                name: d.name,
                                proj: {
                                    id: p.id,
                                    name: p.name
                                }
                            })
                        }
                        d.chartList.forEach(c => {
                            if (c.name.includes(this.keyword)) {
                                this.searchResult.chartList.push({
                                    id: c.id,
                                    name: c.name,
                                    tabId: c.tabId,
                                    proj: {
                                        id: p.id,
                                        name: p.name
                                    },
                                    dash: {
                                        id: d.id,
                                        name: d.name
                                    }
                                })
                            }
                        })
                    })
                })
            },
            clickSearchedChart (chart) {
                this.keyword = ''
                this.clickDash(chart.proj, chart.dash, chart)
            },
            clickSearchedDash (dash) {
                this.keyword = ''
                this.clickDash(dash.proj, dash)
            },
            clickSearchedProj (proj) {
                this.keyword = ''
                let tmpProj = this.projList.filter(p => p.id === proj.id)[0]
                if (tmpProj.dashList.length) {
                    this.clickDash(tmpProj, tmpProj.dashList[0])
                }
            },
            hoverDashItem (e, dash) {
                let detailTip = document.getElementById('dash_detail_' + dash.id)
                detailTip.style.top = (e.clientY - (detailTip.clientHeight / 2)) + 'px'
            },
//            hoverDashBtn (e, dash) {
//                let detailTip = document.getElementById('dash_detail_' + dash.id)
//                detailTip.style.display = 'none'
//            },
            hoverProjItem (e, proj) {
                let detailTip = document.getElementById('proj_detail_' + proj.id)
                detailTip.style.top = (e.clientY - (detailTip.clientHeight / 2)) + 'px'
            },
            scrollToActiveDash () {
                let dashSideMenu = document.getElementById('dashSideMenu')
                let activeDash = document.getElementById('dash_' + this.activeDashId)
                dashSideMenu.scrollTo(0, activeDash.offsetTop - 100)
            }
        },
        watch: {
            '$route.path': function () {
                this.setActive()
            },
            keyword: 'searchDash'
        },
        mounted () {
            this.setProjList(this.$route.params.projId, this.$route.params.dashId)
        }
    }
</script>

<style>
    .d-dashboard {
        background: #f0f2f5;
        height: 100%;
        width: 100%;
        position: relative;
    }

    .d-dash-side {
        width: 220px;
        height: 100%;
        position: absolute;
        box-shadow: 1px 0 1px 0 rgba(0,0,0,.06), inset -1px 0 0 0 rgba(255,255,255,.2);
        z-index: 900;
    }

    .d-dash-menu {
        width: 100%;
        height: calc(100% - 38px);
        overflow: auto;
        color: rgba(10,18,32,.64);
        z-index: 900;
        position: absolute;
    }

    .d-dash-menu-head {
        width: 100%;
        padding-left: 5px;
        display: flex;
        height: 38px;
        line-height: 38px;
        box-sizing: border-box;
    }

    .d-dash-search {
        flex: 1;
        position: relative;
    }

    .d-dash-search-result {
        position: absolute;
        z-index: 1000;
        width: 100%;
        max-height: 500px;
        overflow: auto;
    }

    .d-dash-search-result-type {
        border-bottom: 1px solid rgba(0,0,0,.1);
    }

    .d-dash-search-result-type:last-child {
        border-bottom: 0px;
    }

    .d-dash-search-result-type .head {
        padding-left: 10px;
    }

    .d-dash-search-result-type .head .type {

    }

    .d-dash-search-result-type .head .count {
        margin-left: 15px;
        line-height: 16px;
        display: inline-block;
        color: #ffffff;
        background-color: #5182E4;
        min-width: 16px;
        border-radius: 16px;
        text-align: center;
        font-weight: 700;
        font-family: Roboto,sans-serif;
    }

    .d-dash-search-result-type .head .more {
        float: right;
        margin-right: 10px;
    }

    .d-dash-search-result-list li {
        cursor: pointer;
        padding: 8px 0px 8px 15px!important;
        line-height: initial;
    }

    .d-dash-search-result-list li .title {
        color: rgba(10,18,32,.87);
    }

    .d-dash-search-result-list li .sub {
        color: rgba(10,18,32,.46);
    }

    .d-dash-btn {
        width: 35px;
        text-align: center;
        cursor: pointer;
        position: relative;
    }

    .d-btn-list {
        position: absolute;
        background-color: #ffffff;
        z-index: 1000;
        box-shadow: 0 0 6px 0 rgba(0,0,0,.1), 0 10px 12px 0 rgba(170,182,206,.36);
        padding: 8px 0px;
        color: rgba(10,18,32,.64);
        line-height: 28px;
    }

    .d-btn-list li {
        padding: 0px 10px;
    }

    .d-btn-list li:hover {
        background-color: #f5f7fa;
    }


    .d-dash-head-btn-list {
        display: none;
        text-align: left;
        width: 80px;
        right: -20px;
    }

    .d-dash-btn:hover .d-dash-head-btn-list {
        display: block;
    }

    .d-dash-btn:hover i {
        color: #409eff;
        font-weight: 700;
    }

    .d-project-item {
        padding: 0px;
        line-height: 33px;
        cursor: pointer;
    }

    .d-project-name {
        display: flex;
    }

    .d-project-name:hover {
        background-color: #f5f7fa;
    }

    .d-project-name .name {
        flex: 1;
        padding-left: 10px;
        padding-right: 10px;
    }

    .d-project-name .name i {
        margin-right: 10px;
    }

    .d-project-name .btn {
        display: none;
        width: 35px;
        text-align: center;
        cursor: pointer;
        position: relative;
    }

    .d-project-name:hover .btn {
        display: block;
    }

    .d-project-name .btn:hover {
        color: #409eff;
    }

    .d-project-btn-list {
        display: none;
        width: 90px;
        right: 10px;
        position: absolute;
    }

    .d-project-name .btn:hover .d-project-btn-list {
        display: block;
    }

    .d-project-detail,
    .d-dash-detail {
        position: fixed;
        display: none;
        left: 225px;
        padding: 10px 10px;
        width: 200px;
    }

    .d-project-name:hover .d-project-detail {
        display: block;
    }

    .d-project-item.active .d-dash-list {
        display: block;
    }

    .d-dash-list {
        display: none;
    }

    .d-dash-item {
        display: flex;
        padding: 0px;
        line-height: 33px;
    }

    .d-dash-item:hover {
        background-color: #f5f7fa;
    }

    .d-dash-item:hover .d-dash-detail {
        display: block;
    }

    .d-dash-item.active {
        background-color: #ffffff;
    }

    .d-dash-item .name {
        flex: 1;
        padding-left: 20px;
        padding-right: 10px;
    }

    .d-dash-item .name i {
        margin-right: 10px;
    }

    .d-dash-item .btn {
        display: none;
        width: 35px;
        text-align: center;
        cursor: pointer;
        position: relative;
    }

    .d-dash-item:hover .btn {
        display: block;
    }

    .d-dash-item .btn:hover {
        color: #409eff;
    }

    .d-dash-btn-list {
        display: none;
        position: absolute;
        width: 90px;
        right: 10px;
    }

    .d-dash-item .btn:hover .d-dash-btn-list {
        display: block;
    }

    .d-dash-content {
        height: 100%;
        position: relative;
        padding-left: 220px;

    }
</style>