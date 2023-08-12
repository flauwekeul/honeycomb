<script setup lang="ts">
import { computed, ref } from 'vue'
import { HexOptions, Point } from '../../../../src'
import CoordinatesControl from '../CoordinatesControl.vue'

interface OriginControlProps {
  modelValue: Origin
}

type OriginControlEmits = {
  'update:modelValue': [value: Origin]
}

type Origin = HexOptions['origin']
type OriginType = 'point' | 'topLeft'

const props = defineProps<OriginControlProps>()
const emit = defineEmits<OriginControlEmits>()

const originType = computed<OriginType>(() => (props.modelValue === 'topLeft' ? 'topLeft' : 'point'))
const cachedOriginPoint = ref<Point>(props.modelValue === 'topLeft' ? { x: 0, y: 0 } : props.modelValue)

const update = (value: OriginType | Point) => {
  if (value === 'topLeft') {
    emit('update:modelValue', 'topLeft')
  } else if (value === 'point') {
    emit('update:modelValue', cachedOriginPoint.value)
  } else {
    cachedOriginPoint.value = value
    emit('update:modelValue', value)
  }
}

const pointToTuple = ({ x, y }: Point): [number, number] => [x, y]

const tupleToPoint = ([x, y]: [number, number]): Point => ({ x, y })
</script>

<template>
  <el-radio-group :model-value="originType" @change="update($event as OriginType)" size="small">
    <el-radio-button label="topLeft" />
    <el-radio-button label="point" />
  </el-radio-group>
  <div class="variable-input">
    <code v-if="modelValue === 'topLeft'">'topLeft'</code>
    <CoordinatesControl
      v-else
      :values="pointToTuple(modelValue)"
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
