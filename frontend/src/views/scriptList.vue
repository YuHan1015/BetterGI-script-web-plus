// src/views/ScriptList.vue
<template>
  <div class="script-container">
    <el-row :gutter="20">
      <el-col 
        v-for="script in scripts" 
        :key="script.id"
        :xs="24" :sm="12" :md="8" :lg="6"
      >
        <el-card class="script-card">
          <template #header>
            <div class="card-header">
              <el-icon><Document /></el-icon>
              <span class="script-name">{{ script.name }}</span>
              <el-tag type="warning" size="small">v{{ script.version }}</el-tag>
            </div>
          </template>

          <div class="script-meta">
            <el-text type="info">{{ script.description }}</el-text>
            <el-divider />
            <div class="script-stats">
              <el-statistic :value="script.downloads" title="下载量" />
              <el-statistic 
                :value="script.update_date" 
                title="最后更新" 
                :formatter="dateFormatter"
              />
            </div>
          </div>

          <template #footer>
            <el-button-group>
              <el-button
                type="primary"
                @click="handleDownload(script)"
                :icon="Download"
              >
                下载脚本
              </el-button>
              <el-button
                type="info"
                @click="viewSource(script.download_url)"
                :icon="View"
              >
                查看源码
              </el-button>
            </el-button-group>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Document, Download, View } from '@element-plus/icons-vue'
import axios from 'axios'

const scripts = ref([])

const fetchScripts = async () => {
  try {
    const { data } = await axios.get('/api/scripts')
    scripts.value = data
  } catch (error) {
    ElMessage.error('获取脚本列表失败')
  }
}

const dateFormatter = (date) => {
  return new Date(date).toLocaleDateString()
}

onMounted(() => {
  fetchScripts()
})
</script>