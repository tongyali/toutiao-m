import request from '@/utils/request'
//登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
//发送验证码
export const sendCode = data => {
  return request({
    method: 'GET',
    url: '/app/v1_0/sms/codes/' + data
  })
}
//获取用户信息
export const getUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
//获取频道列表
export const getUserChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels',
  })

}
/**
 * 关注用户
 */
export const addFollowed = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}
/**
 * 取消关注
 */
export const deleteFollowed = target => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/user/followings/' + target,

  })
}