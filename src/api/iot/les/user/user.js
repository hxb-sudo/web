import request from '@/utils/request'

export default {

    //用户数据列表 [当前页,数据量,条件]
    getUserPageList(page, limt, UserQuery) {
        return request({
            //url:'/iot-les/pagelesCondition/'+page+'/'+limt
            url: `/iot-user/pageuseCondition`,
            //url:`/iot-les/pagelesCondition`,
            method: 'post',
            data: UserQuery
        })
    },
    // 根据 ID 获取租户信息
    getUserInfo(id) {
        return request({
            url: `/iot-use/getuserbyid`,
            method: 'get'
        })
    }
}