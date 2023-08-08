<script setup lang="ts">
import { computed } from 'vue'

export interface CoordinatesControlProps {
  values: [first: number, second: number]
  labels?: [first: string, second: string]
  step?: number
}

export type CoordinatesControlEmits = {
  change: [values: CoordinatesControlProps['values']]
}

const props = withDefaults(defineProps<CoordinatesControlProps>(), {
  labels: () => ['q', 'r'],
  step: undefined,
})
const emit = defineEmits<CoordinatesControlEmits>()

const first = computed(() => props.values[0])
const second = computed(() => props.values[1])

const change = (first: number, second: number) => {
  emit('change', [first, second])
}
</script>

<template>
  <el-space direction="vertical">
    <el-form-item :label="labels[0]" label-width="32px">
      <el-input-number
        :model-value="first"
        @change="change($event as number, second)"
        :step="step"
        :value-on-clear="0"
        class="input-number"
      />
    </el-form-item>
    <el-form-item :label="labels[1]" label-width="32px">
      <el-input-number
        :model-value="second"
        @change="change(first, $event as number)"
        :step="step"
        :value-on-clear="0"
        class="input-number"
      />
    </el-form-item>
  </el-space>
</template>

<style scoped>
.input-number {
  /* 150px - 32px: default width - label width */
  max-width: 118px;
}
</style>
