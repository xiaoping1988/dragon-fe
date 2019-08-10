<template>
    <DLayout logo="权限中心">
        <DMenuNav :data="menuList"></DMenuNav>
    </DLayout>
</template>

<script>
    export default {
        name: 'DAuth',
        data () {
            return {
                menuList: [
                    {name: '控制台', path: '/auth/console'},
                    {name: '用户', path: '/auth/user'},
                    {name: '角色', path: '/auth/role'},
                    {name: '资源', path: '/auth/resource'}
                ]
            }
        }
    }
</script>