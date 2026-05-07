import Mock from 'mockjs'

Mock.setup({ timeout: '200-600' })

const ok = (data: any) => ({ code: 0, message: 'ok', data })
const fail = (message = 'error') => ({ code: 4001, message, data: null })

Mock.mock('/api/user/login', 'post', ({ body }) => {
  const { username, password } = JSON.parse(body)
  if (username === 'admin' && password === '123456') return ok({ token: 'mock-token-apple-admin' })
  return fail('用户名或密码错误')
})

Mock.mock('/api/user/info', 'get', (options) => {
  if (options.headers.Authorization?.includes('mock-token'))
    return ok({ nickname: '管理员', permissions: ['home:view'] })
  return fail('token 无效')
})

Mock.mock('/api/user/logout', 'post', () => ok(true))
Mock.mock('/api/home/stats', 'get', () =>
  ok([
    { label: '总用户', value: 12890 },
    { label: '订单数', value: 3280 },
    { label: '活跃度', value: '87%' },
    { label: '销售额', value: '¥928,000' },
    { label: '复购率', value: '41%' },
  ]),
)
