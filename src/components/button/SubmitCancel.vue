<template>
  <div class="d-submit-cancel">
    <!--<hr v-if="!nohr">-->
    <el-button @click="cancel" :size="size">{{cacelText}}</el-button>
    <el-button type="primary" @click="submit" :size="size">{{submitText}}</el-button>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'DSubmitCancel',
    props: {
      nohr: Boolean,
      size: {
        type: String,
        default: ''
      },
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
      submit () {
        this.$emit('submit')
      },
      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style>
  .d-submit-cancel {
    text-align: center;
    width: 100%;
  }

  .d-submit-cancel hr {
    margin-top: 0px;
    border-top: 0px;
    border-right: 0px;
    border-left: 0px;
    border-bottom: 1px solid #dcdfe6;
  }
</style>
