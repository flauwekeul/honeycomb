<script setup lang="ts">
import { DIRECTIONS, Direction } from '../../../../src'
import { RectangleControlProps } from '../../../types'
import PairControl from '../PairControl.vue'

type RectangleControlEmits = {
  change: [value: RectangleControlProps]
}

const props = defineProps<RectangleControlProps>()
const emit = defineEmits<RectangleControlEmits>()

const DIRECTION_LABELS: Record<Direction, string> = {
  N: '↑ North',
  NE: '↗ North East',
  E: '→ East',
  SE: '↘ South East',
  S: '↓ South',
  SW: '↙ South West',
  W: '← West',
  NW: '↖ North West',
}

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
    <el-select :model-value="direction" @change="update('direction', $event)">
      <el-option
        v-for="direction in DIRECTIONS"
        :key="direction"
        :label="DIRECTION_LABELS[direction]"
        :value="direction"
        style="--el-color-primary: var(--vp-c-brand)"
      />
    </el-select>
  </el-form-item>
</template>
