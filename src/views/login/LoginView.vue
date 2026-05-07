<template>
  <div class="login-page">
    <section class="hero-panel">
      <p class="kicker">Apple Admin</p>
      <h1>让管理像产品一样优雅。</h1>
      <p class="subtitle">统一账号、权限与数据视图，打造高效、清晰、可靠的运营后台。</p>
      <ul>
        <li>安全登录与 Token 托管</li>
        <li>标准化 Mock 接口联调</li>
        <li>可扩展布局与业务模块</li>
      </ul>
    </section>

    <section class="form-panel">
      <el-card class="login-card">
        <template #header>
          <div class="card-head">
            <h2>欢迎回来</h2>
            <p>请使用管理员账号登录系统</p>
          </div>
        </template>

        <el-form ref="formRef" :model="form" :rules="rules" size="large" @keyup.enter="onSubmit">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="用户名" clearable />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              show-password
              placeholder="密码"
              clearable
            />
          </el-form-item>
          <el-button class="submit-btn" type="primary" :loading="submitting" @click="onSubmit">
            登录
          </el-button>
          <p class="tip">测试账号：admin / 123456</p>
        </el-form>
      </el-card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInstance>()
const submitting = ref(false)

const form = reactive({ username: 'admin', password: '123456' })
const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为 3-20 位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为 6-20 位', trigger: 'blur' },
  ],
}

const onSubmit = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  try {
    await userStore.login(form)
    await userStore.fetchInfo()
    ElMessage.success('登录成功')
    router.push('/home')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr minmax(360px, 460px);
  background: linear-gradient(120deg, #000 0%, #1d1d1f 55%, #2a2a2c 100%);
  color: #fff;
}

.hero-panel {
  padding: 88px 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.kicker {
  color: #2997ff;
  font-size: 14px;
  letter-spacing: 0.3px;
  margin-bottom: 16px;
}

h1 {
  font-size: 56px;
  line-height: 1.07;
  letter-spacing: -0.28px;
  margin: 0;
}

.subtitle {
  margin-top: 24px;
  max-width: 560px;
  color: #cccccc;
  font-size: 21px;
  line-height: 1.4;
}

ul {
  margin: 32px 0 0;
  padding-left: 18px;
  color: #d2d2d7;
  line-height: 1.9;
}

.form-panel {
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.login-card {
  width: 100%;
  border-radius: 18px;
  border: 1px solid #e0e0e0;
}

.card-head h2 {
  margin: 0;
  font-size: 34px;
  color: #1d1d1f;
}

.card-head p {
  margin: 10px 0 0;
  color: #7a7a7a;
}

.submit-btn {
  width: 100%;
  border-radius: 9999px;
  margin-top: 6px;
  height: 44px;
}

.tip {
  margin: 14px 0 0;
  text-align: center;
  font-size: 12px;
  color: #7a7a7a;
}

@media (max-width: 1024px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .hero-panel {
    padding: 56px 24px 24px;
  }

  h1 {
    font-size: 40px;
  }

  .form-panel {
    padding: 0 16px 24px;
  }
}
</style>
