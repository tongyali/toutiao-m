import dayjs from 'dayjs'
//导入vue  
import Vue from 'vue'
//配置中文
import 'dayjs/locale/zh-cn'
//按需导入相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用
dayjs().locale('zh-cn').format() // 当前实例使用
//组成全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})