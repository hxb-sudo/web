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


Mock.mock('http://127.0.0.1:8001/manageservice/loginlog/login', 'post', res => {
  return user
})

Mock.mock('http://127.0.0.1:8001/user/info', 'get', res => {
  return info
})

Mock.mock('http://127.0.0.1:8001/manageservice/position/list', 'post', res => {
  return positionList
})

