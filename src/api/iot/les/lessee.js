import request from '@/utils/request'

export default {
    //租户数据列表 [当前页,数据量,条件]
    getlesPageList(page, limt, lesQuery) {
        return request({
            //url:'/iot-les/pagelesCondition/'+page+'/'+limt
            url: `/iot-les/pagelesCondition`,
            //url:`/iot-les/pagelesCondition`,
            method: 'post',
            data: lesQuery
        })
    },
    // 根据 ID 获取租户信息
    getlesInfo(id){
        return request({
            url: `/iot-les/getlesbyid`,
            method: 'get'
        })
    }

}