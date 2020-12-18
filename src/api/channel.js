import request from '@/utils/request'
//获取全部频道
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
//添加用户频道
export const addUserChannel = (channel) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
//删除指定的频道
export const deleteChannelById = id => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/user/channels/' + id
  })
}