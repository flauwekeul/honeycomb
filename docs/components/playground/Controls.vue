<script setup lang="ts">
import 'element-plus/theme-chalk/dark/css-vars.css'
import { HexOptions, isNumber, isPoint } from '../../../src'
import CoordinatesControl from './CoordinatesControl.vue'
import TraverserControl, { TraverserControlProps } from './TraverserControl.vue'

export interface ControlsProps {
  hexSettings: HexOptions
  initialHexes: TraverserControlProps
}

export type ControlsEmits = {
  update: [value: ControlsProps]
}

const props = defineProps<ControlsProps>()
const emit = defineEmits<ControlsEmits>()

const updateHexSettings = <T,>(propName: keyof HexOptions, value: T) => {
  emit('update', {
    ...props,
    hexSettings: {
      ...props.hexSettings,
      [propName]: value,
    },
  })
}

const updateInitialHexes = (initialHexes: TraverserControlProps) => {
  emit('update', { ...props, initialHexes })
}
</script>

<template>
  <el-card class="controls">
    <el-form label-width="auto" class="form">
      <el-tabs>
        <el-tab-pane label="Hex settings">
          <el-form-item label="Orientation">
            <el-radio-group :model-value="hexSettings.orientation" @change="updateHexSettings('orientation', $event)">
              <el-radio-button label="pointy" />
              <el-radio-button label="flat" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Dimensions">
            <!-- todo: also support BoundingBox and Ellipse -->
            <el-input-number
              v-if="isNumber(hexSettings.dimensions)"
              :model-value="hexSettings.dimensions"
              @change="updateHexSettings('dimensions', $event)"
              :min="10"
              :max="100"
              :step="5"
              value-on-clear="min"
            />
          </el-form-item>
          <el-form-item label="Origin">
            <CoordinatesControl
              v-if="isPoint(hexSettings.origin)"
              :values="[hexSettings.origin.x, hexSettings.origin.y]"
              @change="updateHexSettings('origin', { x: $event[0], y: $event[1] })"
            />
          </el-form-item>
          <!-- todo: support origin: 'topLeft' -->
          <el-form-item label="Offset">
            <el-radio-group :model-value="hexSettings.offset" @change="updateHexSettings('offset', $event)">
              <el-radio-button :label="-1" />
              <el-radio-button :label="1" />
            </el-radio-group>
          </el-form-item>
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
}

.dark .el-radio-button {
  --el-radio-button-checked-text-color: var(--el-color-black);
}
</style>
