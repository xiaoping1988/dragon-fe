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
        name: 'DDataSystemModelDesign',
        data () {
            return {
                sideMenuList: [
                    {name: '主题', path: '/data-system/model-design/subject'},
                    {name: '维度', path: '/data-system/model-design/dim'},
                    {name: '事实表', path: '/data-system/model-design/fact'}
                ]
            }
        }
    }
</script>

<style>

</style>