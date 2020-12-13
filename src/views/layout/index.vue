<template>
  <div class="layout-container">
    <!-- 子路由的出口 -->
    <router-view />
    <!-- 标签导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span></van-tabbar-item
      >
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span></van-tabbar-item
      >
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{
          $store.state.user ? '我的' : '未登录'
        }}</span></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  name: 'layoutIndex',
  created() {},
  mounted() {},
  data() {
    return {
      active: 0
    }
  },
  methods: {},
  computed: {
    // ...mapState(['user'])
  }
}
</script>
<style lang="less">
.layout-container {
  .toutiao {
    font-size: 40px;
  }
  .text {
    font-size: 20px;
  }
}
</style>
