import Mock from 'mockjs'
// ===========================租户数据========================
//数据列表
const leslist = {
    list: [
        { name: '张三', id: 1, tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 2, tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 3, tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 4, tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 5, tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 6, tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 7, tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 8, tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 9, tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
        , { name: '张三', id: 10, tel: '1231231231', gmtCreate: '2020/08/5', msmnum: '1000', equipmentnum: '100', addr: '花海市人间省良人县天堂街好人路' }
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

// ===========================================用户数据=======================================

const uselist = {
    list: [
          { name: '张三', id: 1, type: 1, role: 3, firm: "广州浩安智能科技有限公司", email: "666888@163.com", tel: '1231231231', gmtCreate: '2020/08/15', gmtEnd: '2023/08/15', addr: '花海市人间省良人县天堂街好人路', textarea: "这是个描述", status: true }
        , { name: '张三', id: 2, type: 1, role: 3, firm: "广州浩安智能科技有限公司", email: "666888@163.com", tel: '1231231231', gmtCreate: '2020/08/15', gmtEnd: '2023/08/15', addr: '花海市人间省良人县天堂街好人路', textarea: "这是个描述", status: true }
        , { name: '张三', id: 3, type: 1, role: 3, firm: "广州浩安智能科技有限公司", email: "666888@163.com", tel: '1231231231', gmtCreate: '2020/08/15', gmtEnd: '2023/08/15', addr: '花海市人间省良人县天堂街好人路', textarea: "这是个描述", status: true }
        , { name: '张三', id: 4, type: 1, role: 3, firm: "广州浩安智能科技有限公司", email: "666888@163.com", tel: '1231231231', gmtCreate: '2020/08/15', gmtEnd: '2023/08/15', addr: '花海市人间省良人县天堂街好人路', textarea: "这是个描述", status: true }
        , { name: '张三', id: 5, type: 1, role: 3, firm: "广州浩安智能科技有限公司", email: "666888@163.com", tel: '1231231231', gmtCreate: '2020/08/15', gmtEnd: '2023/08/15', addr: '花海市人间省良人县天堂街好人路', textarea: "这是个描述", status: true }
        , { name: '张三', id: 6, type: 1, role: 3, firm: "广州浩安智能科技有限公司", email: "666888@163.com", tel: '1231231231', gmtCreate: '2020/08/15', gmtEnd: '2023/08/15', addr: '花海市人间省良人县天堂街好人路', textarea: "这是个描述", status: true }
        , { name: '张三', id: 7, type: 1, role: 3, firm: "广州浩安智能科技有限公司", email: "666888@163.com", tel: '1231231231', gmtCreate: '2020/08/15', gmtEnd: '2023/08/15', addr: '花海市人间省良人县天堂街好人路', textarea: "这是个描述", status: true }
        , { name: '张三', id: 8, type: 1, role: 3, firm: "广州浩安智能科技有限公司", email: "666888@163.com", tel: '1231231231', gmtCreate: '2020/08/15', gmtEnd: '2023/08/15', addr: '花海市人间省良人县天堂街好人路', textarea: "这是个描述", status: true }
        , { name: '张三', id: 9, type: 1, role: 3, firm: "广州浩安智能科技有限公司", email: "666888@163.com", tel: '1231231231', gmtCreate: '2020/08/15', gmtEnd: '2023/08/15', addr: '花海市人间省良人县天堂街好人路', textarea: "这是个描述", status: true }
], total: 29,
}

// 返回展示列表
Mock.mock(`http://127.0.0.1:8001/iot-user/pageuseCondition`, 'post', res => {
    return {
        code: 20000,
        message: '这是个测试',
        data: uselist
    }
})

// 返回某条数据
Mock.mock(`http://127.0.0.1:8001/iot-use/getuserbyid`, 'get', res => {

    return {
        code: 20000,
        message: '这是个测试',
        data: uselist.list[0]
    }
})
// ===========================================权限角色=======================================

// ===========================================类型管理_智能快递柜=======================================

// 返回数据
const classeslist = [
    {
        id: 1,
        shortname: "标准25口",
        longname: "标准柜16小格口2中格口2大格口",
        wide: 1200,
        hige: 1900,
        deep: 400,
        status: true,
        description: "标准柜",
        // 小格口
        smallMouth:{
            id: 1,
            shortname: "小格口",
            longname: "标准柜16小格口2中格口2大格口",
            wide: 1200,
            hige: 1900,
            deep: 400,
            issave: '是',
            num:0,
            description: "小的格口",
        },
         // 中格口
         centreMouth:{
            id: 1,
            shortname: "中型格口",
            longname: "标准柜16小格口2中格口2大格口",
            wide: 1200,
            hige: 1900,
            deep: 400,
            issave: '是',
            num:0,
            description: "中型",
        }, // 大格口
        longMouth:{
            id: 1,
            shortname: "大格口",
            longname: "标准柜16小格口2中格口2大格口",
            wide: 1200,
            hige: 1900,
            deep: 400,
            issave: '是',
            num:0,
            description: "大格口",
        },
         // 特大格口
         bigMouth:{
            id: 1,
            shortname: "特大格口",
            longname: "标准柜16小格口2中格口2大格口",
            wide: 1200,
            hige: 1900,
            deep: 400,
            issave: '是',
            num:0,
            description: "特大格口",
        },
         // 主格口
         mainMouth:{
            id: 1,
            shortname: "主格口",
            longname: "标准柜16小格口2中格口2大格口",
            wide: 1200,
            hige: 1900,
            deep: 400,
            issave: '否',
            num:1,
            description: "操作终端的主格口",
        }
    }
]


Mock.mock(`http://127.0.0.1:8001/iot-clas/classeslist`, 'get', res => {
    return {
        code: 20000,
        message: '数据初始化',
        data: classeslist
    }
})
// 得到设备的基本信息
Mock.mock(`http://127.0.0.1:8001/iot-clas/getiofo`, 'get', res => {
    return {
        code: 20000,
        message: '数据基本信息',
        data: classeslist[0]
    }
})
