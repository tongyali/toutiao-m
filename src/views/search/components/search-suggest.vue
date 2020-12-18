<template>
  <div class="search-suggest">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestions"
      :key="index"
      @click="$emit('search', item)"
    >
      <span slot="title" v-html="keepActive(item)"></span>
    </van-cell>
  </div>
</template>
<script>
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'searchSuggest',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    searchText: {
      handler: debounce(function(value) {
        this.getSearchSuggestions(value)
      }, 250)
    },
    immediate: true
  },

  methods: {
    async getSearchSuggestions(value) {
      try {
        const { data } = await getSuggestions(value)
        // console.log(data)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('获取失败', err)
      }
    },
    keepActive(val) {
      const reg = new RegExp(this.searchText, 'gi')
      return val.replace(
        reg,
        `<span style="color:#3296fa">${this.searchText}</span>`
      )
    }
  }
}
</script>
<style lang="less"></style>
