<template>
  <div class="login_container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon
        name="cross"
        slot="left"
        @click="$router.back()"
        v-if="$route.query.redirect"
      />
    </van-nav-bar>
    <!-- <van-nav-bar class="page-nav-bar" title="登录" /> -->
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="userFormRef">
      <van-field
        v-model="user.mobile"
        type="number"
        name="mobile"
        placeholder="请输入手机号"
        maxlength="11"
        :rules="userRules.mobile"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        maxlength="6"
        :rules="userRules.code"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down
            :time="1000 * 10"
            format="ss s"
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            size="small"
            type="default"
            round
            class="send-sms-btn"
            native-type="button"
            @click="sendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-warp">
        <van-button block type="info" native-type="submit" class="login-btn">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, sendCode } from '@/api/user'
export default {
  name: 'loginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号码格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证号码格式错误' }
        ]
      },
      isShowCountDown: false
    }
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = await login(this.user)
        // console.log(data)
        this.$store.commit('setUser', data.data)
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码格式错误')
        }
        this.$toast.fail('登录失败')
      }
    },

    //发送验证码
    async sendSms() {
      try {
        this.$refs.userFormRef.validate('mobile')
      } catch (err) {
        this.$toast.fail('手机号码格式错误')
      }
      this.isShowCountDown = true
      try {
        const ret = await sendCode(this.user.mobile)
        // console.log('cg')
        this.$toast.success('发送验证码成功')
      } catch (err) {
        this.isShowCountDown = false
        if (err.response.status === 429) {
          this.$toast.fail('发送频繁，请稍后重试')
        }
        this.$toast.fail('发送失败，请稍后重试')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  .toutiao {
    font-size: 37px;
    // padding-right: 35px;
  }

  .send-sms-btn {
    // width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
    background-color: #ededed;
  }
  .login-btn-warp {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
