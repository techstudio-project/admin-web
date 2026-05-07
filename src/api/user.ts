import request from '@/utils/request'

export const loginApi = (payload: { username: string; password: string }) => request.post('/user/login', payload)
export const fetchUserInfoApi = () => request.get('/user/info')
export const logoutApi = () => request.post('/user/logout')
