<template>
  <div class="login-shell">
    <div class="ambient ambient-a" />
    <div class="ambient ambient-b" />

    <main class="login-stage">
      <section class="brand-side glass">
        <div class="brand-badge">Admin Console</div>
        <h1>Build. Ship. Scale.</h1>
        <p>一体化管理中枢，连接团队、数据与流程。让每一次登录，都像进入一款精致的产品。</p>
        <div class="brand-metrics">
          <div>
            <strong>99.99%</strong>
            <span>系统可用性</span>
          </div>
          <div>
            <strong>2.4x</strong>
            <span>协作效率提升</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>稳定运行</span>
          </div>
        </div>
      </section>

      <section class="panel-side">
        <el-card class="login-card" shadow="never">
          <div class="card-top">
            <h2>欢迎回来</h2>
            <p>登录后进入后台管理系统</p>
          </div>

          <el-form ref="formRef" :model="form" :rules="rules" size="large" @keyup.enter="onSubmit">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名" clearable />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                type="password"
                show-password
                placeholder="请输入密码"
                clearable
              />
            </el-form-item>
            <el-button class="submit-btn" type="primary" :loading="submitting" @click="onSubmit">
              登录系统
            </el-button>
          </el-form>

          <div class="card-foot">体验账号：admin / 123456</div>
        </el-card>
      </section>
    </main>
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
.login-shell {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 10% 10%, #2f7bff 0%, transparent 30%),
    radial-gradient(circle at 90% 90%, #8a5cff 0%, transparent 35%),
    linear-gradient(135deg, #0f1221 0%, #161a2f 40%, #1d2340 100%);
}

.ambient {
  position: absolute;
  filter: blur(48px);
  opacity: 0.5;
  border-radius: 999px;
}

.ambient-a {
  width: 380px;
  height: 380px;
  background: #2f7bff;
  top: -120px;
  left: -90px;
}

.ambient-b {
  width: 420px;
  height: 420px;
  background: #8a5cff;
  right: -120px;
  bottom: -160px;
}

.login-stage {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
  display: grid;
  gap: 28px;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: stretch;
}

.glass,
.login-card {
  border-radius: 28px;
  backdrop-filter: blur(14px);
}

.brand-side {
  padding: 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  background: linear-gradient(150deg, rgb(255 255 255 / 20%), rgb(255 255 255 / 8%));
  border: 1px solid rgb(255 255 255 / 25%);
}

.brand-badge {
  width: fit-content;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgb(255 255 255 / 16%);
  border: 1px solid rgb(255 255 255 / 22%);
  font-size: 12px;
  letter-spacing: 0.4px;
}

h1 {
  margin: 24px 0 16px;
  font-size: clamp(42px, 5vw, 66px);
  line-height: 1.03;
}

p {
  margin: 0;
  color: rgb(241 245 255 / 88%);
  font-size: 18px;
  line-height: 1.7;
  max-width: 580px;
}

.brand-metrics {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.brand-metrics div {
  padding: 18px;
  border-radius: 16px;
  background: rgb(255 255 255 / 12%);
  border: 1px solid rgb(255 255 255 / 18%);
}

.brand-metrics strong {
  font-size: 30px;
  display: block;
}

.brand-metrics span {
  margin-top: 6px;
  display: block;
  font-size: 13px;
  color: rgb(225 231 255 / 86%);
}

.panel-side {
  display: flex;
  align-items: center;
}

.login-card {
  width: 100%;
  padding: 18px 10px 6px;
  background: linear-gradient(165deg, rgb(255 255 255 / 96%), rgb(249 250 255 / 90%));
  border: 1px solid rgb(255 255 255 / 80%);
  box-shadow: 0 26px 70px rgb(16 24 40 / 35%);
}

.card-top {
  margin-bottom: 18px;
}

.card-top h2 {
  margin: 0;
  color: #141a2e;
  font-size: 34px;
}

.card-top p {
  margin-top: 8px;
  color: #5b6482;
  font-size: 15px;
}

.submit-btn {
  width: 100%;
  height: 48px;
  border-radius: 14px;
  margin-top: 4px;
  font-weight: 600;
}

.card-foot {
  margin-top: 14px;
  color: #69708c;
  text-align: center;
  font-size: 12px;
}

:deep(.el-form-item) {
  margin-bottom: 20px;
}

:deep(.el-input__wrapper) {
  border-radius: 12px;
  padding: 2px 14px;
}

@media (max-width: 1024px) {
  .login-stage {
    grid-template-columns: 1fr;
    padding-top: 24px;
  }

  .brand-side {
    padding: 34px 24px;
  }

  .brand-metrics {
    grid-template-columns: 1fr;
  }

  .card-top h2 {
    font-size: 30px;
  }
}
</style>
