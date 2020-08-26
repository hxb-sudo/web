import Mock from 'mockjs'

const user = {
  code: 20000,
  data: {
    name: 'admin',
    password: 'admin',
    token: 'Admin-Token',
    roles: ['admin','xxx']
  },
  message: '请求OK！'
}

const info = {
  code: 20000,
  data: {
    roles: ['admin']
  },
  message: '请求OK！'
}
const positionList = {
  code: 20000,
  message: '请求OK！',
  data: [
    {positionID:1,name:'北京',code:'beijing',createTime:'2020-02-05 00:00:00',children:[]},
    {positionID:2,name:'广东',code:'guangdong',createTime:'2020-02-05 00:00:00',children:[
        {positionID:5,name:'广州',code:'guangzhou',createTime:'2020-02-05 00:00:00',children:[]},
        {positionID:5,name:'深圳',code:'shenzhen',createTime:'2020-02-05 00:00:00',children:[]},
        {positionID:5,name:'东莞',code:'dongguan',createTime:'2020-02-05 00:00:00',children:[]},
      ]},
    {positionID:3,name:'上海',code:'shanghai',createTime:'2020-02-05 00:00:00',children:[]},
    {positionID:4,name:'陕西',code:'shanxi',createTime:'2020-02-05 00:00:00',children:[]}
  ]
}

const logout = {
  message: '请求OK！',
  code: 20000,
  data: [],
}

const cabinetManage = {
  message: '请求OK',
  code: 20000,
  data: [
    {cabinetID: '1',cabinetType: '快递柜',cabinetSIM: '115706731',cabinetAddre: '广州',state: true,price:[{name:'大格口',price: 1},{name:'中格口',price: 0.5},{name:'小格口',price: 0.1}]},
    {cabinetID: '2',cabinetType: '外卖柜',cabinetSIM: '115706732',cabinetAddre: '广州',state: true,price:[{name:'大格口',price: 1},{name:'中格口',price: 0.5},{name:'小格口',price: 0.1}]},
    {cabinetID: '3',cabinetType: '看护柜',cabinetSIM: '115706733',cabinetAddre: '广州',state: false,price:[{name:'大床位',price: 1},{name:'中床位',price: 0.5},{name:'小床位',price: 0.1}]},
    {cabinetID: '4',cabinetType: '冰箱柜',cabinetSIM: '115706734',cabinetAddre: '广州',state: true,price:[{name:'可乐',price: 3},{name:'雪碧',price: 3.5},{name:'茉莉',price: 4}]},
    {cabinetID: '5',cabinetType: '看书柜',cabinetSIM: '115706735',cabinetAddre: '广州',state: true,price:[{name:'名著',price: 5},{name:'科普',price: 4},{name:'小说',price: 1}]},
  ]
}

const putInStorage = {
  message: '请求OK',
  code: 20000,
  data: [
    {ID: 'storage0001',name: '物料1',num: 10,size: '规格1',provider: 'xxx',createTime: new Date(),isable: true,materialORgoods: true},
    {ID: 'storage0002',name: '商品1',num: 10,size: '规格2',provider: 'xxx',createTime: new Date(),isable: true,materialORgoods: false},
    {ID: 'storage0003',name: '物料1',num: 20,size: '规格1',provider: 'xxx',createTime: new Date(),isable: true,materialORgoods: true},
    {ID: 'storage0004',name: '商品1',num: 90,size: '规格1',provider: 'xxx',createTime: new Date(),isable: true,materialORgoods: false},
    {ID: 'storage0005',name: '物料1',num: 5,size: '规格2',provider: 'xxx',createTime: new Date(),isable: true,materialORgoods: true},
  ]
}


Mock.mock('http://127.0.0.1:8001/myAssets/cabinet/putInStorage', 'post', res => {
  return putInStorage
})

Mock.mock('http://127.0.0.1:8001/manageservice/cabinet/cabinetManage', 'post', res => {
  return cabinetManage
})

Mock.mock('http://127.0.0.1:8001/manageservice/loginlog/login', 'post', res => {
  return user
})

Mock.mock('http://127.0.0.1:8001/user/info', 'get', res => {
  return info
})

Mock.mock('http://127.0.0.1:8001/manageservice/position/list', 'post', res => {
  return positionList
})

Mock.mock('http://127.0.0.1:8001/user/logout', 'post', res => {
  return logout
})

