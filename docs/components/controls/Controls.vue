<script setup lang="ts">
import 'element-plus/theme-chalk/dark/css-vars.css'
import { useInitialHexesStore, useTraversalsStore } from '../../stores'
import HexSettings from './HexSettings.vue'
import Settings from './Settings.vue'
import TraverserControl from './TraverserControl.vue'

const initialHexesStore = useInitialHexesStore()
const traversalsStore = useTraversalsStore()
</script>

<template>
  <el-card class="controls">
    <el-form label-width="auto" class="form">
      <el-tabs>
        <el-tab-pane label="Hex">
          <HexSettings />
        </el-tab-pane>
        <el-tab-pane label="Grid">
          <TraverserControl v-bind="initialHexesStore.$state" @change="initialHexesStore.$patch($event)" />
        </el-tab-pane>
        <el-tab-pane label="Traversals">
          <TraverserControl v-bind="traversalsStore.$state" @change="traversalsStore.$patch($event)" />
        </el-tab-pane>
        <el-tab-pane label="Settings">
          <Settings />
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<style>
.controls {
  --el-color-primary: var(--vp-c-brand);
  --el-color-primary-light-3: var(--vp-c-brand-dark);
  --el-color-primary-light-5: var(--vp-c-brand-darker);
  --el-color-primary-dark-2: var(--vp-c-brand-light);
  --el-text-color-regular: var(--vp-c-text-1);

  margin: 2rem 0;
}

.dark .el-radio-button {
  --el-radio-button-checked-text-color: var(--el-color-black);
}
</style>
