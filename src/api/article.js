import request from '@/utils/request'
//获取文章列表
export const getArticle = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params

  })
}
//获取文章详情
export const getArticleDetails = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
/**
 * 文章收藏
 */
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}
/**
 * 文章取消收藏
 */
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}
/**
 * 文章点赞
 */
export const addLiked = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}
/**
 * 文章取消点赞
 */
export const deleteLiked = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}