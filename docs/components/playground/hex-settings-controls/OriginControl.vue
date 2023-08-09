<script setup lang="ts">
import { computed, ref } from 'vue'
import { HexOptions, Point } from '../../../../src'
import CoordinatesControl from '../CoordinatesControl.vue'
import { pointToTuple, tupleToPoint } from '../shared'

export interface OriginControlProps {
  origin: Origin
}

export type OriginControlEmits = {
  change: [value: Origin]
}

type Origin = HexOptions['origin']
type OriginType = 'point' | 'topLeft'

const props = defineProps<OriginControlProps>()
const emit = defineEmits<OriginControlEmits>()

const originType = computed<OriginType>(() => (props.origin === 'topLeft' ? 'topLeft' : 'point'))
const cachedOriginPoint = ref<Point>(props.origin === 'topLeft' ? { x: 0, y: 0 } : props.origin)

const update = (value: OriginType | Point) => {
  if (value === 'topLeft') {
    emit('change', 'topLeft')
  } else if (value === 'point') {
    emit('change', cachedOriginPoint.value)
  } else {
    cachedOriginPoint.value = value
    emit('change', value)
  }
}
</script>

<template>
  <el-radio-group :model-value="originType" @change="update($event as OriginType)" size="small">
    <el-radio-button label="topLeft" />
    <el-radio-button label="point" />
  </el-radio-group>
  <div class="variable-input">
    <code v-if="origin === 'topLeft'">'topLeft'</code>
    <CoordinatesControl
      v-else
      :values="pointToTuple(origin)"
      :labels="['x', 'y']"
      :step="10"
      @change="update(tupleToPoint($event))"
    />
  </div>
</template>

<style scoped>
/* todo: duplicated in DimensionsControl.vue */
.variable-input {
  margin: 8px 0;
  width: 100%;
}
</style>
