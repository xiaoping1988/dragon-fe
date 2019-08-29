<template>
  <span>
    <span class="d-button" @click="clickSubmit" title="保存">
      <i class="el-icon-check"></i>
      保存
    </span>
    <span class="d-button" @click="clickCancel" title="取消">
      <i class="el-icon-close"></i>
      取消
    </span>
  </span>
</template>

<script>
  export default {
    name: 'DSmallSubmitCancel',
    props: {
      submitText: {
        type: String,
        default: '保存'
      },
      cacelText: {
        type: String,
        default: '取消'
      }
    },
    methods: {
      clickSubmit () {
        this.$emit('submit')
      },
      clickCancel () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style>

</style>
