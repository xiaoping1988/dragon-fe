<template>
  <el-button v-if="!isEdit" type="text" :title="editName" @click="clickEdit">{{editName}}</el-button>
  <span v-else>
    <el-button type="text" title="保存" @click="clickSubmit">保存</el-button>
    <el-button type="text" title="取消" @click="clickCancel">取消</el-button>
  </span>
</template>

<script>
  export default {
    name: 'DEditSaveSwitch',
    props: {
      value: Boolean,
      editName: {
        type: String,
        default: '编辑'
      }
    },
    data () {
      return {
        isEdit: this.value
      }
    },
    watch: {
      value (newVal, oldVal) {
        this.isEdit = newVal
      },
      isEdit (newVal, oldVal) {
        this.$emit('input', newVal)
      }
    },
    methods: {
      clickEdit () {
        this.isEdit = true
        this.$emit('edit')
      },
      clickSubmit () {
        this.$emit('submit')
      },
      clickCancel () {
        this.isEdit = false
        this.$emit('cancel')
      }
    }
  }
</script>

<style>

</style>
