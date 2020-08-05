import request from '@/utils/request'

export default {
    init() {
        return request({
            url: `/iot-clas/classeslist`,
            method: 'get'
        })
    }
}