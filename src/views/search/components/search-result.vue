<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(item, index) in resultList"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>
<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'searchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      resultList: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        // console.log('233')
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        // console.log(data)
        const results = data.data.results
        // 加载状态结束
        this.loading = false
        this.resultList.push(...results)
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        // console.log(err)
        this.loading = false
        this.error = true
        // this.$toast('获取失败，请重试')
      }

      // 数据全部加载完成
    }
  },
  computed: {},
  components: {}
}
</script>
<style lang="less"></style>
