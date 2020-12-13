/**
 * 本地存储封装
 */
/**
 * 设置
 */
export const setItem = (key, val) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  return window.localStorage.setItem(key, val)
}
/**
 * 获取
 */
export const getItem = key => {
  const val = window.localStorage.getItem(key)
  try {
    return JSON.parse(val)
  } catch (err) {
    return val
  }
}
/**
 * 移除
 */
export const removeItem = key => {
  return windom.localStorage.removeItem(key)
}