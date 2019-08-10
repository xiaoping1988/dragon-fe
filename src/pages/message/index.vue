<template>
    <DLayout logo="消息中心">
        <DMenuNav :data="menuList"></DMenuNav>
    </DLayout>
</template>

<script>
    export default {
        name: 'DMessage',
        data () {
            return {
                menuList: [
                    {name: '站内消息', path: '/message/onsite'},
                    {name: '消息接收管理', path: '/message/receive-manage'}
                ]
            }
        }
    }
</script>