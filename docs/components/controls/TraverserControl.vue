<script setup lang="ts">
import { TRAVERSER_NAMES, TraverserControlProps, TraverserName } from '../../types'
import LineAsVectorControl from './traverser-controls/LineAsVectorControl.vue'
import LineBetweenControl from './traverser-controls/LineBetweenControl.vue'
import OpposingCornersControl from './traverser-controls/OpposingCornersControl.vue'
import RectangleControl from './traverser-controls/RectangleControl.vue'
import RingControl from './traverser-controls/RingControl.vue'
import RingFromRadiusControl from './traverser-controls/RingFromRadiusControl.vue'
import SpiralControl from './traverser-controls/SpiralControl.vue'

type TraverserControlEmits = {
  change: [value: Partial<TraverserControlProps>]
}

const LABELS: Record<TraverserName, string> = {
  lineBetween: 'Line (between coordinates)',
  lineAsVector: 'Line (as vector)',
  rectangle: 'Rectangle (width/height)',
  opposingCorners: 'Rectangle (opposing corners)',
  ring: 'Ring (with start)',
  ringFromRadius: 'Ring (from radius)',
  spiral: 'Spiral',
} as const

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
        :label="LABELS[type]"
        :value="type"
        style="--el-color-primary: var(--vp-c-brand)"
      />
    </el-select>
  </el-form-item>
  <LineBetweenControl v-if="name === 'lineBetween'" v-bind="lineBetween" @change="update('lineBetween', $event)" />
  <LineAsVectorControl v-if="name === 'lineAsVector'" v-bind="lineAsVector" @change="update('lineAsVector', $event)" />
  <RectangleControl v-if="name === 'rectangle'" v-bind="rectangle" @change="update('rectangle', $event)" />
  <OpposingCornersControl
    v-if="name === 'opposingCorners'"
    v-bind="opposingCorners"
    @change="update('opposingCorners', $event)"
  />
  <RingControl v-if="name === 'ring'" v-bind="ring" @change="update('ring', $event)" />
  <RingFromRadiusControl
    v-if="name === 'ringFromRadius'"
    v-bind="ringFromRadius"
    @change="update('ringFromRadius', $event)"
  />
  <SpiralControl v-if="name === 'spiral'" v-bind="spiral" @change="update('spiral', $event)" />
</template>

<style scoped>
.name {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--el-border-color);
}
</style>
