<template>
  <div class="chl-wrap">
    <div class="chl-l">
      <slot name="icon"></slot>
      <slot name="title"></slot>
      <h1 class="chl-title" v-if="!$slots.title">{{ title }}</h1>
      <div class="chl-fncs">
        <slot name="fncs"></slot>
      </div>
    </div>
    <div class="chl-r">
      <slot name="link"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HeadLine',
  props: ['title'],
  components: {
  }
}
</script>

<style lang="less">
.chl-wrap {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 2px solid #ce0000;
  margin-bottom: 25px;
  .chl-l {
    display: flex;
    align-items: baseline;
    font-size: 20px;
    .chl-title {
      margin: 0;
      font-size: 20px;
      line-height: 24px;
      font-weight: normal;
      color: #333;
    }
    .chl-fncs {
      margin-left: 20px;
    }
  }
  .chl-r {
    font-size: 12px;
    color: #999;
    display: flex;
    align-items: flex-end;
  }
}
</style>
