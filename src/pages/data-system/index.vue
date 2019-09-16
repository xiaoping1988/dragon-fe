<template>
    <DLayout logo="数据体系">
        <DMenuNav :data="menuList"></DMenuNav>
    </DLayout>
</template>

<script>
    export default {
        name: 'DDataSystem',
        data () {
            return {
                menuList: [
                    {name: '业务剖析', path: '/data-system/business-analyse'},
                    {name: '模型设计', path: '/data-system/model-design'},
                    {name: '基础配置', path: '/data-system/basic-config'}
                ]
            }
        }
    }
</script>