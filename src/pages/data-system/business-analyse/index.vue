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
        name: 'DDataSystemBusinessAnalyse',
        data () {
            return {
                sideMenuList: [
                    {name: '业务板块', path: '/data-system/business-analyse/plate'},
                    {name: '业务', path: '/data-system/business-analyse/business'},
                    {name: '业务过程', path: '/data-system/business-analyse/process'}
                ]
            }
        }
    }
</script>

<style>

</style>