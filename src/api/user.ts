import request from 'utils/axios'

export function login(data: {username: string; password: string}) {
  return request.post('/auth/login', data)
}

export function signup(data: {username: string; password: string}) {
  return request.post('/user/register', data)
}
