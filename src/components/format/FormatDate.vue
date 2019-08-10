<template>
  <span>{{formatStr}}</span>
</template>

<script>
  import dateUtils from '../../assets/js/dateUtils'
  export default {
    name: 'DFormatDate',
    props: {
      value: Number
    },
    data () {
      return {
        formatStr: ''
      }
    },
    methods: {
      formatDate () {
        try {
          this.formatStr = dateUtils.formatDate(new Date(this.value), 'yyyy-MM-dd HH:mm:ss')
        } catch (e) {
          this.formatStr = this.value
        }
      }
    },
    watch: {
      value () {
        this.formatDate()
      }
    },
    mounted () {
      this.formatDate()
    }
  }
</script>
