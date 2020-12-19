<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <!-- :immediate-check="false" -->
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
      />
    </van-list>
  </div>
</template>
<script>
import { getCommentList } from '@/api/comment'
import commentItem from './comment-item'
export default {
  name: 'commentList',
  props: {
    source: {
      type: [Object, String, Number],
      required: true
    }
  },
  created() {
    this.onLoad()
    // console.log(this.source)
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      type: 'a',
      offset: null,
      limit: 10,
      error: false
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getCommentList({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        this.list.push(...results)
        this.$emit('total', data.data)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        // console.log(err)
        this.error = true
        this.loading = false
        this.$toast('获取失败，请重试')
      }
      this.loading = false
    }
  },
  computed: {},
  components: { commentItem }
}
</script>
<style lang="less"></style>
