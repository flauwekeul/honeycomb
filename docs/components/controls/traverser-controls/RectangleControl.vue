<script setup lang="ts">
import { RectangleControlProps } from '../../../types'
import DirectionControl from '../shared/DirectionControl.vue'
import PairControl from '../shared/PairControl.vue'

type RectangleControlEmits = {
  change: [value: RectangleControlProps]
}

const props = defineProps<RectangleControlProps>()
const emit = defineEmits<RectangleControlEmits>()

const update = <T,>(propName: keyof RectangleControlProps, value: T) => {
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
  <el-form-item label="Width">
    <el-input-number :model-value="width" @change="update('width', $event)" :min="1" :max="1000" value-on-clear="min" />
  </el-form-item>
  <el-form-item label="Height">
    <el-input-number
      :model-value="height"
      @change="update('height', $event)"
      :min="1"
      :max="1000"
      value-on-clear="min"
    />
  </el-form-item>
  <el-form-item label="Direction">
    <DirectionControl :model-value="direction" @change="update('direction', $event)" />
  </el-form-item>
</template>
