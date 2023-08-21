<script setup lang="ts">
import { LineBetweenProps } from '../../../types'
import PairControl from '../shared/PairControl.vue'

type LineControlEmits = {
  change: [value: LineBetweenProps]
}

const props = defineProps<LineBetweenProps>()
const emit = defineEmits<LineControlEmits>()

const update = <T,>(propName: keyof LineBetweenProps, value: T) => {
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
  <el-form-item label="Stop">
    <PairControl
      :values="[stop.q, stop.r]"
      :has-picker="true"
      @change="update('stop', { q: $event![0], r: $event![1] })"
    />
  </el-form-item>
</template>
