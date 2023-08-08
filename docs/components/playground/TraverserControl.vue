<script setup lang="ts">
import {
  LineControlProps,
  RectangleControlProps,
  RingControlProps,
  SpiralControlProps,
  TRAVERSER_NAMES,
  defaultLineOptions,
  defaultRectangleOptions,
  defaultRingOptions,
  defaultSpiralOptions,
  traverserName,
} from './shared'
import LineControl from './traverser-controls/LineControl.vue'
import RectangleControl from './traverser-controls/RectangleControl.vue'
import RingControl from './traverser-controls/RingControl.vue'
import SpiralControl from './traverser-controls/SpiralControl.vue'

interface BaseTraverserOptions {
  name: traverserName
}

// Make all props partial (except name), because Vue can't handle discriminated unions as props (yet)

export interface LineTraverserOptions extends BaseTraverserOptions, LineControlProps {
  name: 'line'
}

export interface RectangleTraverserOptions extends BaseTraverserOptions, RectangleControlProps {
  name: 'rectangle'
}

export interface RingTraverserOptions extends BaseTraverserOptions, RingControlProps {
  name: 'ring'
}

export interface SpiralTraverserOptions extends BaseTraverserOptions, SpiralControlProps {
  name: 'spiral'
}

type ControlProps = LineControlProps | RectangleControlProps | RingControlProps | SpiralControlProps

export type TraverserControlProps =
  | LineTraverserOptions
  | RectangleTraverserOptions
  | RingTraverserOptions
  | SpiralTraverserOptions

export type TraverserControlEmits = {
  change: [value: TraverserControlProps]
}

defineProps<TraverserControlProps>()
const emit = defineEmits<TraverserControlEmits>()

const DEFAULT_OPTIONS: Record<traverserName, ControlProps> = {
  line: defaultLineOptions,
  rectangle: defaultRectangleOptions,
  ring: defaultRingOptions,
  spiral: defaultSpiralOptions,
} as const

const updateTraverser = (name: traverserName) => {
  emit('change', { name, ...DEFAULT_OPTIONS[name] })
}

const update = (name: traverserName, options: ControlProps) => {
  emit('change', { name, ...options })
}
</script>

<template>
  <el-form-item label="Shape">
    <!-- todo: don't always use defaults, use previous options instead -->
    <el-select :model-value="name" @change="updateTraverser($event)">
      <el-option
        v-for="type in TRAVERSER_NAMES"
        :key="type"
        :label="type"
        :value="type"
        style="--el-color-primary: var(--vp-c-brand)"
      />
    </el-select>
  </el-form-item>
  <el-divider />
  <LineControl v-if="name === 'line'" :start="start" :stop="stop" @change="update('line', $event)" />
  <RectangleControl
    v-if="name === 'rectangle'"
    :start="start"
    :width="width"
    :height="height"
    :direction="direction"
    @change="update('rectangle', $event)"
  />
  <RingControl
    v-if="name === 'ring'"
    :center="center"
    :radius="radius"
    :rotation="rotation"
    @change="update('ring', $event)"
  />
  <SpiralControl
    v-if="name === 'spiral'"
    :start="start"
    :radius="radius"
    :rotation="rotation"
    @change="update('spiral', $event)"
  />
</template>
