<script setup lang="ts">
import { ref } from 'vue'

type Coordinates = [first: number, second: number]

interface CoordinatesControlProps {
  values?: Coordinates
  labels?: [first: string, second: string]
  allowDefault?: boolean
  step?: number
  labelWidth?: string
}

type CoordinatesControlEmits = {
  change: [values: Coordinates | undefined]
}

const props = withDefaults(defineProps<CoordinatesControlProps>(), {
  labels: () => ['q', 'r'],
  allowDefault: false,
  labelWidth: '24px',
})
const emit = defineEmits<CoordinatesControlEmits>()

const useDefault = ref(!props.values)
const first = ref(props.values?.[0] ?? 0)
const second = ref(props.values?.[1] ?? 0)

const update = (first: number, second: number) => {
  emit('change', [first, second])
}
</script>

<template>
  <el-switch
    v-if="allowDefault"
    v-model="useDefault"
    active-text="Use default"
    size="small"
    @change="$event ? emit('change', undefined) : update(first, second)"
    class="switch"
  />
  <div v-if="!useDefault" class="coordinates-control">
    <el-form-item :label="labels[0]" :label-width="labelWidth">
      <el-input-number
        v-model="first"
        @change="update($event as number, second)"
        :step="step"
        :value-on-clear="0"
        :disabled="useDefault"
        class="input-number"
      />
    </el-form-item>
    <el-form-item :label="labels[1]" :label-width="labelWidth">
      <el-input-number
        v-model="second"
        @change="update(first, $event as number)"
        :step="step"
        :value-on-clear="0"
        :disabled="useDefault"
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

.switch {
  margin: 4px 0 8px;
}

.input-number {
  /* 150px - 24px: default width - default label width */
  max-width: 126px;
}
</style>
