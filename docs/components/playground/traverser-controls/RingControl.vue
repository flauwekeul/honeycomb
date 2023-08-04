<script setup lang="ts">
import CoordinatesControl from '../CoordinatesControl.vue'
import { RingControlEmits, RingControlProps, defaultRingOptions, toVueDefaults } from '../shared'

const props = withDefaults(defineProps<RingControlProps>(), toVueDefaults(defaultRingOptions))
const emit = defineEmits<RingControlEmits>()

const update = <T,>(propName: keyof RingControlProps, value: T) => {
  emit('change', { ...props, [propName]: value })
}
</script>

<template>
  <el-form-item label="Center">
    <CoordinatesControl
      :values="[center.q, center.r]"
      :labels="['q', 'r']"
      @change="update('center', { q: $event[0], r: $event[1] })"
    />
  </el-form-item>
  <el-form-item label="Radius">
    <el-input-number :model-value="radius" @change="update('radius', $event)" :min="1" :max="50" value-on-clear="min" />
  </el-form-item>
  <el-form-item label="Rotation">
    <el-select :model-value="rotation" @change="update('rotation', $event)">
      <el-option label="Clockwise" value="cw" style="--el-color-primary: var(--vp-c-brand)" />
      <el-option label="Counterclockwise" value="ccw" style="--el-color-primary: var(--vp-c-brand)" />
    </el-select>
  </el-form-item>
</template>
