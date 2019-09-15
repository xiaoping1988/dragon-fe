<template>
    <DLayout logo="数据API">
        <DMenuNav :data="menuList"></DMenuNav>
    </DLayout>
</template>

<script>
    export default {
        name: 'DDataApi',
        data () {
            return {
                menuList: [
                    {name: '我的API', path: '/data-api/my-api'},
                    {name: '我的应用', path: '/data-api/app'},
                    {name: 'API市场', path: '/data-api/api-market'}
                ]
            }
        }
    }
</script>