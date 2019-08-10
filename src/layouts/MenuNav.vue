<template>
    <el-menu :default-active="current"
             :mode="mode"
             @select="clickMenu">
        <el-menu-item v-for="(item, index) in data" :key="index" :index="item.path">{{item.name}}</el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: 'DMenuNav',
        props: {
            data: Array,
            mode: {
                type: String,
                default: 'horizontal'
            }
        },
        data () {
            return {
                current: ''
            }
        },
        methods: {
            clickMenu (key) {
                this.$router.push(key)
            },
            setMenuCurrent () {
                let curPath = '/' + this.$route.path + '/'
                this.data.forEach(m => {
                    if (curPath.includes(m.path + '/')) {
                        this.current = m.path
                    }
                })
            }
        },
        watch: {
            '$route': 'setMenuCurrent'
        },
        mounted () {
            this.setMenuCurrent()
        }
    }
</script>