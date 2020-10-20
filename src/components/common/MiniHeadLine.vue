<template>
  <div class="mini-title">
    <h3 class="m-title">
      {{ title }}
    </h3>
    <div class="m-link">
      <slot name="link"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MiniHeadLine',
  props: ['title'],
  components: {
  },
}
</script>

<style lang="less">
.mini-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dedede;
  padding-top: 5px;
  .m-title {
    font-size: 12px;
    color: #454;
  }
  .m-link a {
    font-size: 12px;
    line-height: 24px;
    color: #999;
    &:hover {
      color: #666;
      text-decoration: underline;
    }
  }
}
</style>
