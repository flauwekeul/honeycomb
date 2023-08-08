<script setup lang="ts">
import 'element-plus/theme-chalk/dark/css-vars.css'
import { HexOptions } from '../../../src'
import HexSettings, { HexSettingsProps } from './HexSettings.vue'
import TraverserControl, { TraverserControlProps } from './TraverserControl.vue'

export interface ControlsProps {
  hexSettings: HexOptions
  initialHexes: TraverserControlProps
}

export type ControlsEmits = {
  change: [value: ControlsProps]
}

const props = defineProps<ControlsProps>()
const emit = defineEmits<ControlsEmits>()

const updateHexSettings = (hexSettings: HexSettingsProps) => {
  emit('change', { ...props, hexSettings })
}

const updateInitialHexes = (initialHexes: TraverserControlProps) => {
  emit('change', { ...props, initialHexes })
}
</script>

<template>
  <el-card class="controls">
    <el-form label-width="auto" class="form">
      <el-tabs>
        <el-tab-pane label="Hex settings">
          <HexSettings v-bind="hexSettings" @change="updateHexSettings" />
        </el-tab-pane>
        <el-tab-pane label="Grid">
          <TraverserControl v-bind="initialHexes" @change="updateInitialHexes" />
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
