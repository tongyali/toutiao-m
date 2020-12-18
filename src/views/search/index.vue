<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296FA"
        @focus="isShowSearchResult = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isShowSearchResult" :search-text="searchText" />
    <!-- 联想搜索 -->
    <search-suggest
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- 搜索历史 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @searchHistory="onSearch"
    />
  </div>
</template>
<script>
import searchResult from './components/search-result'
import searchHistory from './components/search-history'
import searchSuggest from './components/search-suggest'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'saerchIndex',
  created() {
    // console.log(this.searchText)
  },
  mounted() {},
  data() {
    return {
      searchText: '',
      isShowSearchResult: false,
      //历史记录
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORY') || []
    }
  },
  methods: {
    onSearch(val) {
      this.searchText = val
      //判断是否是重复搜索
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isShowSearchResult = true
      // console.log('search')
    },
    onCancel() {
      this.$router.back()
      // console.log('cancle')
    }
  },
  watch: {
    searchHistories(val) {
      setItem('TOUTIAO_SEARCH_HISTORY', val)
    }
  },
  components: {
    searchResult,
    searchHistory,
    searchSuggest
  }
}
</script>
<style lang="less"></style>
