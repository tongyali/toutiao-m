<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    @click="onFollowed"
    :loading="isloading"
    >已关注
  </van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollowed"
    :loading="isloading"
    >关注</van-button
  >
</template>
<script>
import { deleteFollowed, addFollowed } from '@/api/user'
export default {
  name: 'followUser',
  model: {
    prop: 'isFollowed',
    event: 'changeFollowed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Object, String, Number],
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
    async onFollowed() {
      this.isloading = true
      try {
        if (this.isFollowed) {
          await deleteFollowed(this.autId)
        } else {
          await addFollowed(this.autId)
        }
        this.$emit('changeFollowed', !this.isFollowed)
      } catch (err) {
        // console.log(err)
        this.$toast('操作失败')
      }
      this.isloading = false
    }
  },
  computed: {},
  components: {}
}
</script>
<style lang="less"></style>
