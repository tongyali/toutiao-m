<template>
  <van-button
    :icon="isCollect ? 'star' : 'star-o'"
    class="collect-container"
    :class="{ collected: isCollect }"
    @click="onCollected"
    :loading="isloading"
  />
</template>
<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'collectArticle',
  model: {
    prop: 'isCollect',
    event: 'changeCollect'
  },
  props: {
    isCollect: {
      type: Boolean,
      required: true
    },
    artId: {
      type: [Object, Number, String],
      required: true
    }
  },
  created() {},
  mounted() {},
  data() {
    return {
      isloading: false
    }
  },
  methods: {
    async onCollected() {
      this.isloading = true
      try {
        if (this.isCollect) {
          //取消收藏
          await deleteCollect(this.artId)
        } else {
          //收藏文章
          await addCollect(this.artId)
        }
        this.$emit('changeCollect', !this.isCollect)
        this.$nextTick(() => {
          this.$toast(this.isCollect ? '收藏成功' : '取消收藏')
        })
      } catch (err) {
        // console.log(err)
        this.$toast('操作失败，请稍后重试')
      }
      this.isloading = false
    }
  }
}
</script>
<style lang="less">
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
