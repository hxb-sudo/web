import request from '@/utils/request'

export function login(username, password) {
  return request({
    contentType: 'application/json',
    url: '/manageservice/loginlog/login',
    method: 'post',
    data: {
      userName: username,
      passWord: password
    }
  })
}

export function getInfo(token) {
  alert(data.token)
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {  
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
