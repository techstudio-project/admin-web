<template><div><div class="cards"><el-card v-for="item in stats" :key="item.label"><h3>{{ item.label }}</h3><p>{{ item.value }}</p></el-card></div><el-card class="chart"><h3>ECharts 图表区域（预留）</h3><div class="ph">Chart Placeholder</div></el-card></div></template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';import { getHomeStatsApi } from '@/api/home'
const stats=ref<{label:string;value:string|number}[]>([])
onMounted(async()=>{const res=await getHomeStatsApi();stats.value=res.data})
</script>
<style scoped>
.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-bottom:16px}h3{margin:0 0 8px}.ph{height:300px;display:flex;align-items:center;justify-content:center;background:#fafafc;color:#7a7a7a;border:1px dashed #d0d0d0}
</style>
