<script setup lang="ts">
import {
  RectangleControlProps,
  RingControlProps,
  TRAVERSER_NAMES,
  defaultRectangleOptions,
  defaultRingOptions,
  traverserName,
} from './shared'
import RectangleControl from './traverser-controls/RectangleControl.vue'
import RingControl from './traverser-controls/RingControl.vue'

interface BaseTraverserOptions {
  name: traverserName
}

// Make all props partial (except name), because Vue can't handle discriminated unions as props (yet)

export interface RectangleTraverserOptions extends BaseTraverserOptions, RectangleControlProps {
  name: 'rectangle'
}

export interface RingTraverserOptions extends BaseTraverserOptions, RingControlProps {
  name: 'ring'
}

export type TraverserControlProps = RectangleTraverserOptions | RingTraverserOptions

export type TraverserControlEmits = {
  change: [value: TraverserControlProps]
}

defineProps<TraverserControlProps>()
const emit = defineEmits<TraverserControlEmits>()

const DEFAULT_OPTIONS: Record<string, RectangleControlProps | RingControlProps> = {
  rectangle: defaultRectangleOptions,
  ring: defaultRingOptions,
} as const

const update = <T,>(name: traverserName, options: T) => {
  emit('change', { name, ...options })
}
</script>

<template>
  <el-form-item label="Shape">
    <!-- todo: don't always use defaults, use previous options instead -->
    <el-select :model-value="name" @change="update($event, DEFAULT_OPTIONS[$event])">
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
</template>
