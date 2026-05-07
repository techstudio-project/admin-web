<template>
  <div class="layout">
    <header class="topbar"><div>Apple Admin</div><div>{{ user.nickname || 'Admin' }} <el-button link @click="onLogout">退出</el-button></div></header>
    <aside class="sidebar"><el-menu router :default-active="$route.path"><el-menu-item index="/home">首页</el-menu-item><el-menu-item index="/stats">数据统计</el-menu-item><el-menu-item index="/reserved">预留菜单</el-menu-item></el-menu></aside>
    <main class="content"><RouterView /></main>
    <footer class="footer">© 2026 Apple Admin · v1.0.0</footer>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
const router = useRouter(); const user = useUserStore()
const onLogout = async () => { await user.logout(); router.push('/login') }
</script>
<style scoped>
.layout{display:grid;grid-template-columns:220px 1fr;grid-template-rows:56px 1fr 40px;height:100vh;background:#f5f5f7;color:#1d1d1f}.topbar{grid-column:1/3;display:flex;justify-content:space-between;align-items:center;padding:0 24px;background:#000;color:#fff}.sidebar{background:#fff;border-right:1px solid #e0e0e0;padding-top:12px}.content{padding:24px;overflow:auto}.footer{grid-column:1/3;display:flex;align-items:center;justify-content:center;font-size:12px;color:#7a7a7a;background:#fff;border-top:1px solid #e0e0e0}
</style>
