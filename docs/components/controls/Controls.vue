<script setup lang="ts">
import 'element-plus/theme-chalk/dark/css-vars.css'
import { useInitialHexesStore, useTraversalsStore } from '../../stores'
import HexSettings from './HexSettings.vue'
import Settings from './Settings.vue'
import Traversals from './Traversals.vue'

const traversalsStore = useTraversalsStore()
const initialHexesStore = useInitialHexesStore()
</script>

<template>
  <el-card class="controls">
    <el-form label-width="auto" class="form">
      <el-tabs>
        <el-tab-pane label="Hex">
          <HexSettings />
        </el-tab-pane>
        <el-tab-pane label="Grid">
          <Traversals :traversals-store="initialHexesStore" />
        </el-tab-pane>
        <el-tab-pane label="Traversals">
          <Traversals :traversals-store="traversalsStore" />
        </el-tab-pane>
        <el-tab-pane label="Settings">
          <Settings />
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<style>
.dark .el-radio-button {
  --el-radio-button-checked-text-color: var(--vp-c-black);
}

.dark .el-button.el-button--primary {
  --el-button-text-color: var(--vp-c-black);
  --el-button-hover-text-color: var(--vp-c-text-light-1);
}

.controls {
  --el-color-primary: var(--vp-c-brand);
  --el-color-primary-light-3: var(--vp-c-brand-dark);
  --el-color-primary-light-5: var(--vp-c-brand-darker);
  --el-color-primary-dark-2: var(--vp-c-brand-light);
  --el-text-color-regular: var(--vp-c-text-1);
}
</style>
