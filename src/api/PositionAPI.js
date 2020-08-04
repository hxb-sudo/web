import request from '@/utils/request'
import qs from 'qs'

/**
 * @description 获取位置信息列表
 * */
export function list() {
  return request({
    url: '/manageservice/position/list',
    method: 'post'
  })
}

/**
 * @description 添加位置信息
 * @param position
 * */
export function addPosition(position) {
  return request({
    url: '/manageservice/position/addPosition',
    method: 'post',
    data: qs.stringify(position)
  })
}
