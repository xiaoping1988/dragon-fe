<template>
    <DPageContent>
        <div slot="side">
            <DMenuNav :data="sideMenuList" mode="vertical"></DMenuNav>
        </div>
        <router-view></router-view>
    </DPageContent>
</template>

<script>
    export default {
        name: 'DMyTb',
        data () {
            return {
                sideMenuList: [
                    {name: '我拥有的数据', path: '/data-map/my-tb/own'},
                    {name: '我管理的数据', path: '/data-map/my-tb/manage'},
                    {name: '权限管理', path: '/data-map/my-tb/auth'}
                ]
            }
        }
    }
</script>

<style>

</style>