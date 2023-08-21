<script setup lang="ts">
import { LineAsVectorProps } from '../../../types'
import DirectionControl from '../shared/DirectionControl.vue'
import PairControl from '../shared/PairControl.vue'

type LineControlEmits = {
  change: [value: LineAsVectorProps]
}

const props = defineProps<LineAsVectorProps>()
const emit = defineEmits<LineControlEmits>()

const update = <T,>(propName: keyof LineAsVectorProps, value: T) => {
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
  <el-form-item label="Direction">
    <DirectionControl :model-value="direction" @change="update('direction', $event)" />
  </el-form-item>
  <el-form-item label="Length">
    <el-input-number
      :model-value="length"
      @change="update('length', $event)"
      :min="1"
      :max="100"
      value-on-clear="min"
    />
  </el-form-item>
</template>
