<template>
  <div class="login-container">
    <!-- 顶部 Logo -->
    <div class="logo-section">
      <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
      <span class="logo-text"></span>
    </div>

    <!-- 登录卡片 -->
    <div class="login-card">
      <h1 class="card-title">Sign in to Mockplus</h1>

      <!-- 表单 -->
      <form @submit.prevent="handleLogin" class="login-form">
        <!-- Email 输入 -->
        <div class="form-group">
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="form-input"
            :class="{ 'has-error': errors.email }"
            @blur="validateEmail"
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <!-- Password 输入 -->
        <div class="form-group">
          <div class="password-wrapper">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="form-input"
              :class="{ 'has-error': errors.password }"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              <svg v-if="showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <!-- 记住密码 + 忘记密码 -->
        <div class="form-footer">
          <label class="checkbox-wrapper">
            <input v-model="form.rememberMe" type="checkbox" />
            <span>Remember me</span>
          </label>
          <a href="#" class="forgot-password">Forgot password</a>
        </div>

        <!-- 登录按钮 -->
        <button type="submit" class="login-button" :disabled="isLoading">
          <span v-if="!isLoading">Sign in</span>
          <span v-else class="loading-spinner"></span>
        </button>
      </form>

      <!-- 注册链接 -->
      <p class="signup-text">
        Don't have an account?
        <a href="#" class="signup-link">Sign up</a>
      </p>

      <!-- 第三方登录 -->
      <div class="social-login">
        <p class="social-text">Or sign in with</p>
        <div class="social-buttons">
          <a href="#" class="social-button google" title="Sign in with Google">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </a>
          <a href="#" class="social-button twitter" title="Sign in with Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7s1.08-7.81-2-11z" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- 底部信息 -->
    <div class="footer-info">
      <p>© 2014-2025 Mockplus Technology Co., Ltd. All rights reserved</p>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <span>·</span>
        <a href="#">Terms of Service</a>
      </div>
    </div>

    <!-- 提示信息 -->
    <transition name="toast">
      <div v-if="successMessage" class="toast success">
        {{ successMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

const errors = ref({
  email: '',
  password: ''
})

const showPassword = ref(false)
const isLoading = ref(false)
const successMessage = ref('')

const validateEmail = () => {
  if (!form.value.email) {
    errors.value.email = 'Please enter your email address'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  } else {
    errors.value.email = ''
  }
}

const validatePassword = () => {
  if (!form.value.password) {
    errors.value.password = 'Please enter your password'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  } else {
    errors.value.password = ''
  }
}

const handleLogin = async () => {
  validateEmail()
  validatePassword()

  if (errors.value.email || errors.value.password) {
    return
  }

  isLoading.value = true

  try {
    // 模拟登录延迟
    await new Promise(resolve => setTimeout(resolve, 2000))

    successMessage.value = 'Login successful!'

    // 3秒后清除提示
    setTimeout(() => {
      successMessage.value = ''
      form.value = { email: '', password: '', rememberMe: false }
    }, 3000)
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 50%, #374151 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  padding: 20px;
}

/* Logo Section */
.logo-section {
  position: absolute;
  top: 30px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  z-index: 10;
}

.logo-icon {
  width: 28px;
  height: 28px;
  stroke: #ec4899;
}

.logo-text {
  color: white;
}

/* 登录卡片 */
.login-card {
  width: 100%;
  max-width: 440px;
  background: white;
  border-radius: 16px;
  padding: 48px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 32px;
  text-align: center;
}

/* 表单 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-input {
  padding: 12px 14px;
  border: 2px solid #f3f4f6;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #f9fafb;
}

.form-input:focus {
  outline: none;
  border-color: #ec4899;
  background: white;
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
}

.form-input.has-error {
  border-color: #ef4444;
  background: #fef2f2;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper .form-input {
  width: 100%;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  transition: color 0.3s ease;
  padding: 0;
}

.toggle-password:hover {
  color: #ec4899;
}

.toggle-password svg {
  width: 100%;
  height: 100%;
}

.error-message {
  font-size: 13px;
  color: #ef4444;
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

/* 表单底部 */
.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 24px;
  font-size: 14px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #6b7280;
  user-select: none;
}

.checkbox-wrapper input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #ec4899;
}

.forgot-password {
  color: #ec4899;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #be185d;
  text-decoration: underline;
}

/* 登录按钮 */
.login-button {
  padding: 12px;
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
}

.login-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #db2777 0%, #be185d 100%);
  box-shadow: 0 8px 20px rgba(236, 72, 153, 0.3);
  transform: translateY(-2px);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Sign up 链接 */
.signup-text {
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  margin: 24px 0;
}

.signup-link {
  color: #ec4899;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.signup-link:hover {
  color: #be185d;
  text-decoration: underline;
}

/* 第三方登录 */
.social-login {
  text-align: center;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid #e5e7eb;
}

.social-text {
  color: #9ca3af;
  font-size: 13px;
  margin-bottom: 12px;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.social-button {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.social-button svg {
  width: 24px;
  height: 24px;
}

.social-button.google {
  color: #4285f4;
}

.social-button.google:hover {
  background: #f1f5ff;
  border-color: #4285f4;
}

.social-button.twitter {
  color: #1da1f2;
}

.social-button.twitter:hover {
  background: #f1f9ff;
  border-color: #1da1f2;
}

/* 底部信息 */
.footer-info {
  position: absolute;
  bottom: 20px;
  left: 40px;
  right: 40px;
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.footer-links {
  margin-top: 6px;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: white;
  text-decoration: underline;
}

/* 提示信息 */
.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  animation: toastSlide 0.3s ease-out;
  z-index: 1000;
}

.toast.success {
  background: #10b981;
  color: white;
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
}

@keyframes toastSlide {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

/* 响应式设计 */
@media (max-width: 600px) {
  .login-container {
    padding: 20px;
  }

  .logo-section {
    position: static;
    margin-bottom: 30px;
  }

  .login-card {
    max-width: 100%;
    padding: 32px 24px;
  }

  .card-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .footer-info {
    position: static;
    margin-top: 30px;
  }
}
</style>
