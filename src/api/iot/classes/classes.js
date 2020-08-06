import request from '@/utils/request'

export default {
    // 页面初始化信息
    init() {
        return request({
            url: `/iot-clas/classeslist`,
            method: 'get'
        })
    },
    // 通过 id 得到设备的基本信息
    getinfo(id) {
        return request({
            url: `/iot-clas/getiofo`,
            method: 'get'
        })
    }
}