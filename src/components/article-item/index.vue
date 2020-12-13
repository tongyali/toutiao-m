<template>
  <van-cell>
    <div class="title" slot="title">{{ article.title }}</div>
    <div slot="label">
      <div class="img" v-if="article.cover.type === 3">
        <van-image width="100" height="100" :src="article.cover.images[0]" />
        <van-image width="100" height="100" :src="article.cover.images[1]" />
        <van-image width="100" height="100" :src="article.cover.images[2]" />
      </div>
      <span>{{ article.aut_name }}</span>
      <span>{{ article.comm_count }}</span>
      <span>{{ article.pubdate }}</span>
    </div>
    <div slot="default" v-if="article.cover.type === 1">
      <van-image width="100" height="100" :src="article.cover.images[0]" />
    </div>
  </van-cell>
</template>
<script>
export default {
  name: 'article-item',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log(this.article)
  },
  mounted() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  components: {}
}
</script>
<style lang="less"></style>
