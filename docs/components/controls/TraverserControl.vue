<script setup lang="ts">
import { TRAVERSER_NAMES, TraverserControlProps } from '../../types'
import LineControl from './traverser-controls/LineControl.vue'
import RectangleControl from './traverser-controls/RectangleControl.vue'
import RingControl from './traverser-controls/RingControl.vue'
import SpiralControl from './traverser-controls/SpiralControl.vue'

type TraverserControlEmits = {
  change: [value: Partial<TraverserControlProps>]
}

defineProps<TraverserControlProps>()
const emit = defineEmits<TraverserControlEmits>()

const update = <T,>(propName: keyof TraverserControlProps, value: T) => {
  emit('change', { [propName]: value })
}
</script>

<template>
  <el-form-item label="Shape" class="name">
    <el-select :model-value="name" @change="update('name', $event)">
      <el-option
        v-for="type in TRAVERSER_NAMES"
        :key="type"
        :label="type"
        :value="type"
        style="--el-color-primary: var(--vp-c-brand)"
      />
    </el-select>
  </el-form-item>
  <LineControl v-if="name === 'line'" v-bind="line" @change="update('line', $event)" />
  <RectangleControl v-if="name === 'rectangle'" v-bind="rectangle" @change="update('rectangle', $event)" />
  <RingControl v-if="name === 'ring'" v-bind="ring" @change="update('ring', $event)" />
  <SpiralControl v-if="name === 'spiral'" v-bind="spiral" @change="update('spiral', $event)" />
</template>

<style scoped>
.name {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--el-border-color);
}
</style>
