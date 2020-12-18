<template>
  <div class="home-container">
    <!-- navbar -->
    <van-nav-bar class="page-nav-bar" fixed>
      <div slot="title">
        <van-button
          round
          type="info"
          size="small"
          class="search-btn"
          icon="search"
          to="/search"
          >首页</van-button
        >
      </div>
    </van-nav-bar>

    <van-tabs v-model="active" class="channel-tabs" swipeable animated>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <article-list :channel="channel"></article-list>
      </van-tab>
      <div class="placeholder" slot="nav-right"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isShowSelectChannel = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道下方弹出框 -->
    <van-popup
      v-model="isShowSelectChannel"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
      round
    >
      <channel-edit
        :channels="channels"
        :active="active"
        @chenageActive="chenageActive"
      />
    </van-popup>
  </div>
</template>
<script>
import { getUserChannel } from '@/api/user'
//导入文章列表组件
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'homeIndex',
  created() {
    this.getUserList()
  },
  mounted() {},
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channels: [],
      isShowSelectChannel: false
    }
  },
  methods: {
    async getUserList() {
      //判断用户是否登录
      if (this.user) {
        try {
          const { data } = await getUserChannel()
          this.channels = data.data.channels
          // console.log(this.channels)
        } catch (err) {
          this.$toast('获取频道失败，请重试！')
        }
      } else {
        //判断是否有本地存储
        const channel = getItem('TOUTIAO_CHANNEL')
        if (channel) {
          //有本地存储
          this.channels = channel
        } else {
          //没有本地存储  获取接口数据
          try {
            const { data } = await getUserChannel()
            this.channels = data.data.channels
          } catch (err) {
            this.$taost('获取频道失败，请重试')
          }
        }
      }
    },
    //频道的跳转  子传父
    chenageActive(active, isShowSelectChannel = true) {
      this.active = active
      this.isShowSelectChannel = isShowSelectChannel
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
<style lang="less">
.home-container {
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    background-color: #5babfb;
    width: 560px;
  }
  .channel-tabs {
    //
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 100;
    }
    .van-tabs__content {
      padding-top: 178px;
    }
    .van-tab {
      min-width: 200px;
      font-size: 30px;
      color: #777;
      border-right: 1px solid #edeff3;
    }
    // 激活元素的颜色
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 30px;
      height: 6px;
      border-radius: 50%;
      background-color: #3296fa;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      background: #ffffff;
      opacity: 0.9;
      line-height: 82px;
      text-align: center;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
  }
}
</style>
