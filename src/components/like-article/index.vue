<template>
  <van-button
    :icon="isLiked === 1 ? 'good-job' : 'good-job-o'"
    class="like-article"
    :class="{ collected: isLiked === 1 }"
    @click="onLiked"
    :loading="isloading"
  />
</template>
<script>
import { addLiked, deleteLiked } from '@/api/article'
export default {
  name: 'likeArticle',
  model: {
    prop: 'isLiked',
    event: 'changeLiked'
  },
  props: {
    isLiked: {
      type: Number,
      required: true
    },
    artId: {
      type: [Object, String, Number],
      required: true
    }
  },
  data() {
    return {
      isloading: false
    }
  },
  methods: {
    async onLiked() {
      this.isloading = true
      let state = -1
      try {
        if (this.isLiked === 1) {
          //取消点赞
          const { data } = await deleteLiked(this.artId)
          state = -1
        } else {
          //点赞
          const { data } = await addLiked(this.artId)
          state = 1
        }
        this.$emit('changeLiked', state)
        this.$toast(this.isLiked === 1 ? '取消点赞' : '点赞成功')
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
      }
      this.isloading = false
    }
  }
}
</script>
<style lang="less">
.isLiked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
