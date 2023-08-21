<script setup lang="ts">
import { DIRECTIONS, Direction } from '../../../../src'

interface DirectionControlProps {
  modelValue?: Direction
}

type DirectionControlEmits = {
  'update:modelValue': [value: Direction]
}

defineProps<DirectionControlProps>()
const emit = defineEmits<DirectionControlEmits>()

const DIRECTION_LABELS: Record<Direction, string> = {
  N: '↑ North',
  NE: '↗ North East',
  E: '→ East',
  SE: '↘ South East',
  S: '↓ South',
  SW: '↙ South West',
  W: '← West',
  NW: '↖ North West',
} as const
</script>

<template>
  <el-select :model-value="modelValue" @change="emit('update:modelValue', $event)">
    <el-option
      v-for="direction in DIRECTIONS"
      :key="direction"
      :label="DIRECTION_LABELS[direction]"
      :value="direction"
      style="--el-color-primary: var(--vp-c-brand)"
    />
  </el-select>
</template>
