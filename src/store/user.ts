import { defineStore } from 'pinia'
import { clearToken, getToken, setToken } from '@/utils/auth'
import { fetchUserInfoApi, loginApi, logoutApi } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({ token: getToken(), nickname: '', permissions: [] as string[] }),
  actions: {
    async login(form: { username: string; password: string }) {
      const res = await loginApi(form)
      this.token = res.data.token
      setToken(this.token)
    },
    async fetchInfo() {
      const res = await fetchUserInfoApi()
      this.nickname = res.data.nickname
      this.permissions = res.data.permissions
    },
    async logout() {
      await logoutApi()
      this.reset()
    },
    reset() {
      this.token = ''
      this.nickname = ''
      this.permissions = []
      clearToken()
    },
  },
})
