<template>
    <DLayout logo="数据地图">
        <DMenuNav :data="menuList"></DMenuNav>
    </DLayout>
</template>

<script>
    export default {
        name: 'DDataMap',
        data () {
            return {
                menuList: [
                    {name: '我的数据', path: '/data-map/my-tb'},
                    {name: '全部数据', path: '/data-map/tb-manage'},
                    {name: '数据源', path: '/data-map/ds-manage'}
                ]
            }
        }
    }
</script>