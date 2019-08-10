<template>
    <el-card shadow="never">
        <div slot="header">
            <span class="d-card-title">城市权限</span>
            <DEditSaveSwitch v-if="userName"
                             v-model="cityGranting"
                             style="float: right"
                             editName="授权"
                             @submit="submitCityGrantedForm"
                             @edit="openCityGrantedForm"></DEditSaveSwitch>
        </div>
        <div v-if="!cityGranting">
            <el-row class="d-row">
                <el-col :span="1" v-for="(item, i) in userCityGrantedList" :key="i" >
                    <span class="d-desclist-index-detail">{{item.cityName}}</span>
                </el-col>
            </el-row>
        </div>
        <div v-else>
            <el-row  class="d-row">
                <el-col :span="4">
                    <el-input suffix-icon="el-icon-search"
                              size="small"
                              clearable
                              v-model.trim="searchCityKey"
                              @change="searchGrantCity"
                              placeholder="请输入城市名搜索"></el-input>
                </el-col>
            </el-row>
            <el-row class="d-row">
                <el-col :span="2">
                    <el-checkbox v-model="wholeCountry">全国</el-checkbox>
                </el-col>
            </el-row>
            <el-row v-for="(item, i) in searchedCityList" :key="i"  class="d-row">
                <el-col :span="2">
                    <el-checkbox v-model="provincesChecked[item.id]" @change="(value) => changeProvinceChecked(value, item)">{{item.name}}</el-checkbox>
                </el-col>
                <el-col :span="22">
                    <el-checkbox-group v-model="checkedCityList"
                                       @change="(value) => {changeCheckedCity(value, item)}">
                        <el-checkbox v-for="(city, j) in item.cityList"
                                     :key="j"
                                     :label="city.id">{{city.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
    import {
        listUserCity,
        grantUserCity
    } from '../../../services/auth/user'
    import {
        listProvinceCity,
        WholeCountry
    } from '../../../services/auth/region'
    export default {
        name: 'UserCity',
        props: {
            userName: String
        },
        watch: {
            userName: function () {
                this.setCityGrantedList()
            }
        },
        data () {
            return {
                userCityGrantedList: [], // 用户已有的城市权限
                userCityGrantedMap: {},
                cityGranting: false,
                provinceCityList: null,
                checkedCityList: [],
                searchCityKey: '',
                searchedCityList: [],
                wholeCountry: false,
                provincesChecked: {},
                cityMap: {}
            }
        },
        methods: {
            setCityGrantedList () {
                this.cityGranting = false
                this.checkedCityList = []
                listUserCity({
                    userName: this.userName
                }).then(res => {
                    this.userCityGrantedList = res.data
                    this.userCityGrantedList.forEach(c => {
                        this.userCityGrantedMap[c.cityId] = c
                        if (c.cityId === WholeCountry.id) {
                            this.wholeCountry = true
                        } else {
                            this.checkedCityList.push(c.cityId)
                        }
                    })
                    if (this.wholeCountry) {
                        this.checkedCityList = [WholeCountry.id]
                    }
                }).catch(this.$handleError)
            },
            openCityGrantedForm () {
                this.cityGranting = true
                this.searchCityKey = ''
                this.setProvinceCityList()
            },
            setProvinceCityList () {
                if (this.provinceCityList) {
                    this.searchGrantCity()
                    return
                }
                listProvinceCity().then(res => {
                    this.provinceCityList = res.data
                    this.setCityMap()
                    this.searchGrantCity()
                }).catch(this.$handleError)
            },
            setCityMap () {
                this.cityMap[WholeCountry.id] = WholeCountry
                this.provinceCityList.forEach(p => {
                    p.cityList.forEach(c => {
                        this.cityMap[c.id] = c
                    })
                })
            },
            searchGrantCity () {
                this.searchedCityList = []
                if (!this.searchCityKey) {
                    this.searchedCityList = this.provinceCityList
                } else {
                    this.provinceCityList.forEach(p => {
                        let cityList = []
                        p.cityList.forEach(c => {
                            if (c.name.includes(this.searchCityKey)) {
                                cityList.push(c)
                            }
                        })
                        if (cityList.length) {
                            this.searchedCityList.push({
                                id: p.id,
                                name: p.name,
                                cityList: cityList
                            })
                        }
                    })
                }
                this.setProvincesChecked()
            },
            setProvincesChecked () {
                this.searchedCityList.forEach(p => {
                    this.setProvinceChecked(p)
                })
            },
            setProvinceChecked (province) {
                this.provincesChecked[province.id] = true
                for (let i in province.cityList) {
                    if (!this.checkedCityList.includes(province.cityList[i].id)) {
                        this.provincesChecked[province.id] = false
                        break
                    }
                }
            },
            uncheckedWholeCountry () {
                this.wholeCountry = false
                let w = this.checkedCityList.findIndex(cityId => cityId === WholeCountry.id)
                if (w >= 0) {
                    this.checkedCityList.splice(w, 1)
                }
            },
            changeCheckedCity (value, province) {
                this.uncheckedWholeCountry()
                this.setProvinceChecked(province)
                this.$forceUpdate()
            },
            changeProvinceChecked (value, province) {
                this.uncheckedWholeCountry()
                if (value) {
                    province.cityList.forEach(c => {
                        if (!this.checkedCityList.includes(c.id)) {
                            this.checkedCityList.push(c.id)
                        }
                    })
                } else {
                    let delIndex = []
                    this.checkedCityList.forEach((cityId, i) => {
                        let j = province.cityList.findIndex(c => c.id === cityId)
                        if (j >= 0) {
                            delIndex.push(i)
                        }
                    })
                    delIndex.forEach((d, i) => {
                        this.checkedCityList.splice(d - i, 1)
                    })
                }
            },
            submitCityGrantedForm () {
                let addCityList = []
                let delRelationIdList = []
                this.checkedCityList.forEach(cityId => {
                    if (!this.userCityGrantedMap[cityId]) {
                        addCityList.push({
                            cityId: this.cityMap[cityId].id,
                            cityName: this.cityMap[cityId].name
                        })
                    }
                })
                this.userCityGrantedList.forEach(c => {
                    if (!this.checkedCityList.includes(c.cityId)) {
                        delRelationIdList.push(c.id)
                    }
                })
                grantUserCity({
                    userName: this.userName,
                    addCityList: JSON.stringify(addCityList),
                    delRelationIdList: delRelationIdList.toString()
                }).then(res => {
                    this.setCityGrantedList()
                }).catch(this.$handleError)
            }
        }
    }
</script>