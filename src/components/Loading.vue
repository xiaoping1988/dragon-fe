<template>
  <div v-show="loading" class="el-loading-mask" style="background-color: rgba(0, 0, 0, 0.8);">
    <div class="el-loading-spinner">
      <i class="el-icon-loading" style="font-size: 38px"></i>
      <p v-if="desc" class="el-loading-text">{{desc}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DLoading',
    props: {
      desc: String,
      loading: Boolean
    }
  }
</script>

<style>

</style>
