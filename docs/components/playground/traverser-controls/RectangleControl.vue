<script setup lang="ts">
import { DIRECTIONS } from '../../../../src'
import CoordinatesControl from '../CoordinatesControl.vue'
import { RectangleControlEmits, RectangleControlProps, defaultRectangleOptions, toVueDefaults } from '../shared'

const props = withDefaults(defineProps<RectangleControlProps>(), toVueDefaults(defaultRectangleOptions))
const emit = defineEmits<RectangleControlEmits>()

// todo: maybe use pinia for state management instead of these event propagation?
const update = <T,>(propName: keyof RectangleControlProps, value: T) => {
  emit('change', { ...props, [propName]: value })
}
</script>

<template>
  <el-form-item label="Start">
    <CoordinatesControl
      :values="[start.q, start.r]"
      :labels="['q', 'r']"
      @change="update('start', { q: $event[0], r: $event[1] })"
    />
  </el-form-item>
  <el-form-item label="Width">
    <el-input-number
      :model-value="width"
      @change="update('width', $event)"
      :min="1"
      :max="1000"
      :step="1"
      value-on-clear="min"
    />
  </el-form-item>
  <el-form-item label="Height">
    <el-input-number
      :model-value="height"
      @change="update('height', $event)"
      :min="1"
      :max="1000"
      :step="1"
      value-on-clear="min"
    />
  </el-form-item>
  <el-form-item label="Direction">
    <el-select :model-value="direction" @change="update('direction', $event)">
      <el-option
        v-for="direction in DIRECTIONS"
        :key="direction"
        :label="direction"
        :value="direction"
        style="--el-color-primary: var(--vp-c-brand)"
      />
    </el-select>
  </el-form-item>
</template>
