<template>
  <div id="app" :style="heightStyle">
    <router-view/>
  </div>
</template>

<script>

    export default {
        name: 'app',
        components: {},
        data () {
            return {
                paths: ['/sso/login', '/chart-design', '/']
            }
        },
        computed: {
            heightStyle () {
                let tmpPath = this.$route.path
                if (!window.HeadNav || this.paths.includes(tmpPath)) {
                    return {
                        height: '100%'
                    }
                }
                return {
                    height: 'calc(100% - 31px)'
                }
            }
        },
        watch: {
            '$route.path': function () {
                this.toggleShowHeadNav()
            }
        },
        methods: {
           toggleShowHeadNav () {
               if (window.HeadNav) {
                   let tmpPath = this.$route.path
                   if (this.paths.includes(tmpPath)) {
                       window.HeadNav.hide()
                   } else {
                       window.HeadNav.show()
                   }
               }
           }
        },
        mounted () {
            this.toggleShowHeadNav()
        }
    }
</script>

<style>
  #app {
    width: 100%;
  }
</style>
