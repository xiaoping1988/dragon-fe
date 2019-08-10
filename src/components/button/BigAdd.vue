<template>
  <div class="d-big-add d-middle">
    <div class="d-big-add-panel d-panel d-font-hover">
      <span class="d-big-add-icon"><i class="fa fa-plus-square-o"></i></span>
      <br/>
      <span class="d-big-add-title" @click="clickAdd">
          {{title}}
        </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DBigAdd',
    props: {
      title: String
    },
    methods: {
      clickAdd () {
        this.$emit('click')
      }
    }
  }
</script>

<style>
  .d-big-add {
    width: 100%;
    height: 100%;
  }

  .d-big-add-panel {
    border: 1px dashed #409EFF;
    text-align: center;
    cursor: pointer;
  }

  .d-big-add-title {
    font-size: 32px;
  }

  .d-big-add-icon {
    font-size: 64px;
  }
</style>
