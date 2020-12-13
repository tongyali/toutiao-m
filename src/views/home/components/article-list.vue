<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="successMsg"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getArtcleList"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          :article="item"
          v-for="(item, index) in list"
          :key="index"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticle } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'articleIndex',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  created() {
    // console.log(this.channel.id)
    this.getArtcleList()
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pre_timestamp: null,
      isLoading: false,
      successMsg: '刷新成功',
      error: false
    }
  },
  methods: {
    //获取文章列表
    async getArtcleList() {
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: this.pre_timestamp || Date.now(),
          with_top: 1
        })
        const results = data.data.results
        //每次获取的为新数据，需添加到list中  不能直接赋值
        this.list.push(...results)
        // console.log(this.list, this.pre_timestamp)
        this.loading = false
        //判断数据是否加载完成
        if (results.length) {
          this.pre_timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id,
          //获取最新时间的数据
          timestamp: Date.now(),
          with_top: 1
        })
        const results = data.data.results
        //最新时间的数据加载在最上面
        this.list.unshift(...results)
        this.successMsg = `刷新成功，更新了${results.length}条数据`
        this.isLoading = false
      } catch (err) {
        this.successMsg = '刷新失败，请重试！'
        this.isloading = false
      }
    }
  },
  components: {
    ArticleItem
  }
}
</script>
<style lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
