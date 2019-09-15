<template>
    <DLayout logo="指标体系">
        <DMenuNav :data="menuList"></DMenuNav>
    </DLayout>
</template>

<script>
    export default {
        name: 'DIndexSystem',
        data () {
            return {
                menuList: [
                    {name: '指标', path: '/index-system/index'},
                    {name: '维度', path: '/index-system/dim'},
                    {name: '业务', path: '/index-system/business'},
                    {name: '主题', path: '/index-system/subject'}
                ]
            }
        }
    }
</script>