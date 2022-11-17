import {LoginDto, SignupDto} from '#/api'
import request from 'utils/axios'

export function login(data: LoginDto) {
  return request.post('/auth/login', data)
}

export function signup(data: SignupDto) {
  return request.post('/user/register', data)
}
