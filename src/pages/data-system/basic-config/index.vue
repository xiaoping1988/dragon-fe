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
        name: 'DDataSystemBasicConfig',
        data () {
            return {
                sideMenuList: [
                    {name: '数仓分层', path: '/data-system/basic-config/dw-layer'},
                    {name: '词根映射', path: '/data-system/basic-config/word-mapping'}
                ]
            }
        }
    }
</script>

<style>

</style>