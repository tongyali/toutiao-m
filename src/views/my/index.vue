<template>
  <div class="my-container">
    <!-- 登录 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <!-- <van-image class="avatar" round fit="cover" :src="userInfo.photo" /> -->
          <van-image class="avatar" :src="userInfo.photo" round fit="cover" />

          <span class="name">{{ userInfo.name }}</span>
        </div>
        <van-button round type="default" size="mini">编辑资料</van-button>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div
        class="login-btn"
        @click="
          $router.push({
            name: 'login',
            query: {
              redirect: '/my'
            }
          })
        "
      >
        <img src="~@/assets/mobile.png" alt="" class="mobile-img" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav">
      <van-grid-item class="grid-item" to="/" clickable>
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item" to="/" clickable>
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      title="退出登录"
      class="layout-cell"
      v-if="user"
      @click="onLayout"
      clickable
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUser } from '@/api/user'
export default {
  name: 'myIndex',
  created() {
    if (this.user) {
      this.getUserInfo()
    }
  },
  mounted() {},
  data() {
    return {
      userInfo: []
    }
  },
  methods: {
    //获取用户信息
    async getUserInfo() {
      try {
        const { data } = await getUser()
        // console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast.fail('获取失败')
      }
    },
    //退出
    onLayout() {
      this.$dialog
        .confirm({
          title: '确定退出吗？'
        })
        .then(() => {
          this.$store.commit('setUser', null)
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
<style lang="less">
.my-container {
  .header {
    height: 361px;
    width: 100%;
    background: url(~@/assets/banner.png);
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 13px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    color: #fff;
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      height: 231px;
      padding: 76px 32px 23px;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .name {
          margin-left: 25px;
          font-size: 30px;
        }
      }
      .van-button {
        width: 120px;
        height: 35px;
        font-size: 20px;
      }
    }
    .data-stats {
      display: flex;
      height: 130px;
      box-sizing: border-box;
      .data-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count {
          margin-bottom: 16px;
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    margin-bottom: 10px;
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
        margin-bottom: 15px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .mb-9 {
    height: 100px;
    margin: 2px 0 10px 0;
  }
  .layout-cell {
    height: 105px;
    font-size: 30px;
    color: #d86262;
    text-align: center;
  }
}
</style>
