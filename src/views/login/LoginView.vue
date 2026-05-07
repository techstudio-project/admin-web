<template><div class="login"><div class="card"><h1>欢迎登录</h1><el-form ref="formRef" :model="form" :rules="rules"><el-form-item prop="username"><el-input v-model="form.username" placeholder="用户名"/></el-form-item><el-form-item prop="password"><el-input v-model="form.password" show-password placeholder="密码"/></el-form-item><el-button type="primary" class="btn" @click="onSubmit">登录</el-button></el-form></div></div></template>
<script setup lang="ts">
import { reactive, ref } from 'vue';import { ElMessage, type FormInstance } from 'element-plus';import { useRouter } from 'vue-router';import { useUserStore } from '@/store/user'
const router=useRouter();const userStore=useUserStore();const formRef=ref<FormInstance>();const form=reactive({username:'admin',password:'123456'});
const rules={username:[{required:true,message:'请输入用户名',trigger:'blur'},{min:3,max:20,message:'长度3-20',trigger:'blur'}],password:[{required:true,message:'请输入密码',trigger:'blur'},{min:6,max:20,message:'长度6-20',trigger:'blur'}]}
const onSubmit=async()=>{const ok=await formRef.value?.validate().catch(()=>false);if(!ok)return;try{await userStore.login(form);await userStore.fetchInfo();ElMessage.success('登录成功');router.push('/home')}catch{}}
</script>
<style scoped>
.login{height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f5f5f7,#ffffff)}.card{width:380px;padding:32px;border-radius:18px;background:#fff;box-shadow:0 20px 60px rgba(0,0,0,.08)}h1{font-size:28px;margin:0 0 24px}.btn{width:100%;margin-top:8px}
</style>
