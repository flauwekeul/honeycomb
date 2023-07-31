<script setup lang="ts">
import 'element-plus/theme-chalk/dark/css-vars.css'
import { HexOptions, isPoint } from '../../src'
import { isNumber } from '../../src/utils'
import XYControl from './XYControl.vue'

export interface TileControlsProps {
  hexSettings: HexOptions
}

export type TileControlsEmits = {
  update: [value: TileControlsProps]
}

const props = defineProps<TileControlsProps>()
const emit = defineEmits<TileControlsEmits>()

// todo: improve value type?
const updateHexSettings = (propName: string, value: unknown) => {
  emit('update', {
    ...props,
    hexSettings: {
      ...props.hexSettings,
      [propName]: value,
    },
  })
}
</script>

<template>
  <el-card class="tile-controls">
    <el-form label-width="auto" class="form">
      <el-collapse :model-value="['hex-settings']">
        <el-collapse-item title="Hex settings" name="hex-settings">
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
            <XYControl
              v-if="isPoint(hexSettings.origin)"
              v-bind="hexSettings.origin"
              @update="updateHexSettings('origin', $event)"
            />
          </el-form-item>
          <!-- todo: support origin: 'topLeft' -->
          <el-form-item label="Offset">
            <el-radio-group :model-value="hexSettings.offset" @change="updateHexSettings('offset', $event)">
              <el-radio-button :label="-1" />
              <el-radio-button :label="1" />
            </el-radio-group>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-card>
</template>

<style>
.tile-controls {
  /* Override Element Plus vars */
  --el-color-primary: var(--vp-c-brand);
  --el-color-primary-light-3: var(--vp-c-brand-dark);
  --el-color-primary-light-5: var(--vp-c-brand-darker);
  --el-color-primary-dark-2: var(--vp-c-brand-light);

  opacity: 90%;
}

.dark .el-radio-button {
  --el-radio-button-checked-text-color: var(--el-color-black);
}

.form {
  max-width: 240px;
}
</style>
