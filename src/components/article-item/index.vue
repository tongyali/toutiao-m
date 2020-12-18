<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label" class="cover-warp">
      <div class="img" v-if="article.cover.type === 3">
        <div
          class="cover-warp-img"
          v-for="(img, index) in article.cover.image"
          :key="index"
          fit="cover"
        >
          <van-image :src="img" />
        </div>
      </div>
      <span>{{ article.aut_name }}</span>
      <span>{{ article.comm_count }}评论</span>
      <span>{{ article.pubdate | relativeTime }}</span>
    </div>
    <div slot="default" v-if="article.cover.type === 1" class="cover-right">
      <van-image :src="article.cover.images[0]" class="cover-img" fit="cover" />
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
    // console.log(this.article)
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
<style lang="less">
.article-item {
  .title {
    font-size: 32px;
  }
  .van-cell__value {
    flex: unset;
    margin-left: 25px;
    .cover-right {
      width: 232px;
      height: 146px;
      .cover-img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .cover-warp {
    .img {
      display: flex;
      .cover-warp-img {
        flex: 1;
        height: 146px;
        margin: 29px 0 31px 0;
        &not:last-child {
          margin-right: 4px;
        }
        .van-image {
          width: 100%;
          height: 100%;
        }
      }
    }
    span {
      padding-right: 25px;
      font-style: 22px;
    }
  }
}
</style>
