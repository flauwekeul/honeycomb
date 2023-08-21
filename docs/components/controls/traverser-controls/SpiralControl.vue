<script setup lang="ts">
import { SpiralControlProps } from '../../../types'
import PairControl from '../PairControl.vue'

type SpiralControlEmits = {
  change: [value: SpiralControlProps]
}

const props = defineProps<SpiralControlProps>()
const emit = defineEmits<SpiralControlEmits>()

const update = <T,>(propName: keyof SpiralControlProps, value: T) => {
  emit('change', { ...props, [propName]: value })
}
</script>

<template>
  <el-form-item label="Start">
    <PairControl
      :values="start && [start.q, start.r]"
      :allow-default="true"
      :has-picker="true"
      @change="update('start', $event && { q: $event[0], r: $event[1] })"
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
