<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <div v-if="isDelete">
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDelete = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDelete = true" />
    </van-cell>
    <van-cell title="单元格">
      <van-icon name="close" v-show="isDelete" />
    </van-cell>
  </div>
</template>
<script>
export default {
  name: 'searchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDelete: false
    }
  },
  methods: {},
  computed: {},
  components: {}
}
</script>
<style lang="less">
.search-history {
  .van-icon {
    line-height: 48px;
  }
}
</style>
