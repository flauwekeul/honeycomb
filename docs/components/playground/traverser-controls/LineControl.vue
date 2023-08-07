<script setup lang="ts">
import CoordinatesControl from '../CoordinatesControl.vue'
import { LineControlEmits, LineControlProps, defaultLineOptions, toVueDefaults } from '../shared'

const props = withDefaults(defineProps<LineControlProps>(), toVueDefaults(defaultLineOptions))
const emit = defineEmits<LineControlEmits>()

const update = <T,>(propName: keyof LineControlProps, value: T) => {
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
  <el-form-item label="Stop">
    <CoordinatesControl
      :values="[stop.q, stop.r]"
      :labels="['q', 'r']"
      @change="update('stop', { q: $event[0], r: $event[1] })"
    />
  </el-form-item>
</template>
