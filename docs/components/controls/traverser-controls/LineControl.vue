<script setup lang="ts">
import { LineControlProps } from '../../../types'
import CoordinatesControl from '../CoordinatesControl.vue'

type LineControlEmits = {
  change: [value: LineControlProps]
}

const props = defineProps<LineControlProps>()
const emit = defineEmits<LineControlEmits>()

const update = <T,>(propName: keyof LineControlProps, value: T) => {
  emit('change', { ...props, [propName]: value })
}
</script>

<template>
  <el-form-item label="Start">
    <CoordinatesControl :values="[start.q, start.r]" @change="update('start', { q: $event[0], r: $event[1] })" />
  </el-form-item>
  <el-form-item label="Stop">
    <CoordinatesControl :values="[stop.q, stop.r]" @change="update('stop', { q: $event[0], r: $event[1] })" />
  </el-form-item>
</template>
