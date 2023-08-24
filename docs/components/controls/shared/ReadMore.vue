<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'

interface ReadMoreProps {
  link: string
  tooltip?: string
  margin?: string
}

withDefaults(defineProps<ReadMoreProps>(), {
  tooltip: 'Docs',
  margin: '0 0 0 auto',
})
</script>

<template>
  <el-tooltip :content="tooltip" :show-after="500">
    <el-link :href="link" :icon="QuestionFilled" :underline="false" type="info" class="read-more" />
  </el-tooltip>
</template>

<style scoped>
.read-more {
  margin: v-bind(margin);
}

.read-more:hover {
  color: var(--vp-c-brand);
}
</style>
