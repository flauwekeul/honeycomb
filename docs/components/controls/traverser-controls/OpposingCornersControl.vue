<script setup lang="ts">
import { OpposingCornersControlProps } from '../../../types'
import PairControl from '../shared/PairControl.vue'

type OpposingCornersControlEmits = {
  change: [value: OpposingCornersControlProps]
}

const props = defineProps<OpposingCornersControlProps>()
const emit = defineEmits<OpposingCornersControlEmits>()

const update = <T,>(propName: keyof OpposingCornersControlProps, value: T) => {
  emit('change', { ...props, [propName]: value })
}
</script>

<template>
  <el-form-item label="Corner A">
    <PairControl
      :values="cornerA && [cornerA.q, cornerA.r]"
      :has-picker="true"
      @change="update('cornerA', $event && { q: $event[0], r: $event[1] })"
    />
  </el-form-item>
  <el-form-item label="Corner B">
    <PairControl
      :values="cornerB && [cornerB.q, cornerB.r]"
      :has-picker="true"
      @change="update('cornerB', $event && { q: $event[0], r: $event[1] })"
    />
  </el-form-item>
</template>
