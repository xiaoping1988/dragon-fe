<template>
    <DLayout logo="数据可视化">
        <DMenuNav :data="menuList"></DMenuNav>
    </DLayout>
</template>

<script>
    export default {
        name: 'DDataVisual',
        data () {
            return {
                menuList: [
                    {name: '仪表盘', path: '/data-visual/dashboard'},
                    {name: '模板', path: '/data-visual/template'},
                    {name: '图表示例', path: '/data-visual/chart-demo'}
                ]
            }
        }
    }
</script>