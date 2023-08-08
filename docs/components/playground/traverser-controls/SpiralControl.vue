<script setup lang="ts">
import CoordinatesControl from '../CoordinatesControl.vue'
import { SpiralControlEmits, SpiralControlProps, defaultSpiralOptions, toVueDefaults } from '../shared'

const props = withDefaults(defineProps<SpiralControlProps>(), toVueDefaults(defaultSpiralOptions))
const emit = defineEmits<SpiralControlEmits>()

const update = <T,>(propName: keyof SpiralControlProps, value: T) => {
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
  <el-form-item label="Radius">
    <el-input-number :model-value="radius" @change="update('radius', $event)" :min="1" :max="50" value-on-clear="min" />
  </el-form-item>
  <el-form-item label="Rotation">
    <el-select :model-value="rotation" @change="update('rotation', $event)">
      <el-option label="↻ Clockwise" value="cw" style="--el-color-primary: var(--vp-c-brand)" />
      <el-option label="↺ Counterclockwise" value="ccw" style="--el-color-primary: var(--vp-c-brand)" />
    </el-select>
  </el-form-item>
</template>
