<script setup lang="ts">
import 'element-plus/theme-chalk/dark/css-vars.css'
import { AxialCoordinates, DIRECTIONS, Direction, HexOptions, RectangleOptions, isNumber, isPoint } from '../../../src'
import CoordinatesControl from './CoordinatesControl.vue'

export interface RectangleTraverserOptions extends RectangleOptions {
  name: 'rectangle'
  start: AxialCoordinates
  direction: Direction
}

export interface ControlsProps {
  hexSettings: HexOptions
  initialHexes: RectangleTraverserOptions
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

const updateInitialHexes = <T,>(propName: keyof RectangleTraverserOptions, value: T) => {
  emit('update', {
    ...props,
    initialHexes: {
      ...props.initialHexes,
      [propName]: value,
    },
  })
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
          <el-form-item label="Shape">
            <el-radio-group :model-value="initialHexes.name">
              <el-radio-button label="rectangle"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Width">
            <el-input-number
              :model-value="initialHexes.width"
              @change="updateInitialHexes('width', $event)"
              :min="1"
              :max="1000"
              :step="1"
              value-on-clear="min"
            />
          </el-form-item>
          <el-form-item label="Height">
            <el-input-number
              :model-value="initialHexes.height"
              @change="updateInitialHexes('height', $event)"
              :min="1"
              :max="1000"
              :step="1"
              value-on-clear="min"
            />
          </el-form-item>
          <el-form-item label="Direction">
            <el-select :model-value="initialHexes.direction" @change="updateInitialHexes('direction', $event)">
              <el-option
                v-for="direction in DIRECTIONS"
                :key="direction"
                :label="direction"
                :value="direction"
                style="--el-color-primary: var(--vp-c-brand)"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Start">
            <CoordinatesControl
              :values="[initialHexes.start.q, initialHexes.start.r]"
              :labels="['q', 'r']"
              @change="updateInitialHexes('start', { q: $event[0], r: $event[1] })"
            />
          </el-form-item>
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

  --el-card-padding: 12px;

  opacity: 90%;
}

.dark .el-radio-button {
  --el-radio-button-checked-text-color: var(--el-color-black);
}

.form {
  max-width: 240px;
}
</style>
