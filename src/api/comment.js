import request from '@/utils/request'
/**
 * 获取评论
 */
export const getCommentList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}