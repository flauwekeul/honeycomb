<script setup lang="ts">
import { computed } from 'vue'

interface CoordinatesControlProps {
  values: [first: number, second: number]
  labels?: [first: string, second: string]
  step?: number
  labelWidth?: string
}

type CoordinatesControlEmits = {
  change: [values: CoordinatesControlProps['values']]
}

const props = withDefaults(defineProps<CoordinatesControlProps>(), {
  labels: () => ['q', 'r'],
  step: undefined,
  labelWidth: '24px',
})
const emit = defineEmits<CoordinatesControlEmits>()

const first = computed(() => props.values[0])
const second = computed(() => props.values[1])

const change = (first: number, second: number) => {
  emit('change', [first, second])
}
</script>

<template>
  <div class="coordinates-control">
    <el-form-item :label="labels[0]" :label-width="labelWidth">
      <el-input-number
        :model-value="first"
        @change="change($event as number, second)"
        :step="step"
        :value-on-clear="0"
        class="input-number"
      />
    </el-form-item>
    <el-form-item :label="labels[1]" :label-width="labelWidth">
      <el-input-number
        :model-value="second"
        @change="change(first, $event as number)"
        :step="step"
        :value-on-clear="0"
        class="input-number"
      />
    </el-form-item>
  </div>
</template>

<style scoped>
.coordinates-control {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-number {
  /* 150px - 24px: default width - default label width */
  max-width: 126px;
}
</style>
