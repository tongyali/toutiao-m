<template>
  <div class="channel-edit">
    <van-cell :border="false" @click="showEditChannel">
      <span slot="title">我的频道</span>
      <van-button type="danger" plain round size="mini">{{
        isShowEdit ? '完成' : '编辑'
      }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(value, index) in channels"
        :key="index"
        @click="onMyChannel(value, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isShowEdit && !fixedChannel.includes(value.id)"
        ></van-icon>
        <span slot="text" class="text" :class="{ kactive: active === index }">{{
          value.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <span slot="title">频道推荐</span>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="(value, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="value.name"
        @click="addMyChannel(value, index)"
      />
    </van-grid>
  </div>
</template>
<script>
import {
  getAllChannels,
  addUserChannel,
  deleteChannelById
} from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'channel-edit',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created() {
    //获取全部频道
    this.getAllChannel()
  },
  mounted() {},
  data() {
    return {
      allChannels: [],
      isShowEdit: false,
      //固定推荐的频道 不显示删除图标
      fixedChannel: [0]
    }
  },
  methods: {
    async getAllChannel() {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取失败', err)
      }
    },
    //编辑按钮的显示隐藏
    showEditChannel() {
      this.isShowEdit = !this.isShowEdit
    },
    onMyChannel(channel, index) {
      //判断时编辑还是跳转
      if (this.isShowEdit) {
        //编辑 删除
        //固定频道不允许删除
        if (this.fixedChannel.includes(channel.id)) {
          return
        }

        this.channels.splice(index, 1)
        this.deleteMyChannel(channel)
        if (index <= this.active) {
          this.$emit('chenageActive', this.active - 1, true)
        }
      } else {
        //跳转
        this.$emit('chenageActive', index, false)
      }
    },
    //添加pd
    async addMyChannel(channel, index) {
      this.channels.push(channel)
      if (this.user) {
        //登录状态下
        try {
          const { data } = await addUserChannel({
            id: channel.id,
            seq: this.channels.length
          })
        } catch (err) {
          this.$toast('添加频道失败', err)
        }
      } else {
        //fei登录状态下  进行本地存储
        setItem('TOUTIAO_CHANNEL', this.channels)
      }
    },
    //删除频道
    async deleteMyChannel(channel) {
      if (this.user) {
        try {
          const { data } = await deleteChannelById(channel.id)
          console.log(data)
        } catch (err) {
          this.$toast('删除频道失败，请查重试', err)
        }
      } else {
        setItem('TOUTIAO_CHANNEL', this.channels)
      }
    }
  },
  computed: {
    //推荐频道
    recommendChannels() {
      return this.allChannels.filter(item => {
        return !this.channels.find(channel => {
          return channel.id === item.id
        })
      })
    },
    ...mapState(['user'])
  },
  components: {}
}
</script>
<style lang="less">
.channel-edit {
  margin-top: 87px;
  .van-grid-item__content {
    width: 160px;
    height: 86px;
    background: #f4f5f6;
    border-radius: 6px;
    .van-grid-item__text {
      white-space: nowrap;
      font-size: 28px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #222222;
      line-height: 36px;
    }
  }
  .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon {
        font-size: 24px;
        padding-right: 4px;
      }
      .van-grid-item__text {
        margin-top: 0;
        font-size: 28px;
        color: #222;
      }
    }
  }
  .my-grid {
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon {
      position: absolute;
      right: 2px;
      top: -12px;
      font-size: 28px;
      padding-right: 6px;
      color: #cacaca;
      z-index: 3;
    }
    .kactive {
      color: #f85959;
    }
  }
}
</style>
