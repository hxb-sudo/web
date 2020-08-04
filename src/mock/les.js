import Mock from 'mockjs'
//数据列表
const leslist = {
    list: [
        { name: '张三', id: 1, tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 2 ,tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 3 ,tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 4 ,tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 5 ,tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 6 ,tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 7 ,tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 8 ,tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 9 ,tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 10 ,tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }   
    ],
    total: 29,
}
// 返回展示列表
Mock.mock(`http://127.0.0.1:8001/iot-les/pagelesCondition`, 'post', res => {

    return {
        code: 20000,
        message: '这是个测试',
        data: leslist
    }
})

// 返回某条数据
Mock.mock(`http://127.0.0.1:8001/iot-les/getlesbyid`, 'get', res => {

    return {
        code: 20000,
        message: '这是个测试',
        data: leslist.list[0]
    }
})