<script setup lang="ts">
import { computed } from 'vue'
import {
  BoundingBox,
  Ellipse,
  HexOptions,
  Orientation,
  createHexDimensions,
  isEllipse,
  isNumber,
} from '../../../../src'
import PairControl from '../shared/PairControl.vue'
import ReadMore from '../shared/ReadMore.vue'

interface DimensionsControlProps {
  modelValue: Dimensions
  orientation: Orientation
}

type DimensionsControlEmits = {
  'update:modelValue': [value: Dimensions]
}

type Dimensions = HexOptions['dimensions']
type DimensionsType = 'radius' | 'ellipse' | 'bbox'

const props = defineProps<DimensionsControlProps>()
const emit = defineEmits<DimensionsControlEmits>()

const dimensionsType = computed<DimensionsType>(() => {
  if (isNumber(props.modelValue)) {
    return 'radius'
  } else if (isEllipse(props.modelValue)) {
    return 'ellipse'
  } else {
    return 'bbox'
  }
})

const update = (value: DimensionsType | Dimensions) => {
  if (value === 'radius') {
    emit('update:modelValue', dimensionsToNumber(props.modelValue))
  } else if (value === 'ellipse') {
    emit('update:modelValue', dimensionsToEllipse(props.modelValue, props.orientation))
  } else if (value === 'bbox') {
    emit('update:modelValue', dimensionsToBBox(props.modelValue, props.orientation))
  } else {
    emit('update:modelValue', value)
  }
}

const dimensionsToNumber = (dimensions: Dimensions) => {
  if (isNumber(dimensions)) {
    return dimensions
  } else if (isEllipse(dimensions)) {
    return props.orientation === 'pointy' ? dimensions.yRadius : dimensions.xRadius
  } else {
    return Math.round((dimensions.width + dimensions.height) / 2 / Math.sqrt(3))
  }
}

const dimensionsToEllipse = (dimensions: Dimensions, orientation: Orientation): Ellipse => {
  const { xRadius, yRadius } = createHexDimensions(dimensions as BoundingBox, orientation)
  return { xRadius: Math.round(xRadius), yRadius: Math.round(yRadius) }
}

const dimensionsToBBox = (dimensions: Dimensions, orientation: Orientation): BoundingBox => {
  if (isNumber(dimensions)) {
    return orientation === 'pointy'
      ? { width: Math.round(dimensions * Math.sqrt(3)), height: dimensions * 2 }
      : { width: dimensions * 2, height: Math.round(dimensions * Math.sqrt(3)) }
  } else if (isEllipse(dimensions)) {
    const { xRadius, yRadius } = dimensions
    return orientation === 'pointy'
      ? { width: Math.round(xRadius * Math.sqrt(3)), height: yRadius * 2 }
      : { width: xRadius * 2, height: Math.round(yRadius * Math.sqrt(3)) }
  } else {
    return dimensions
  }
}
</script>

<template>
  <el-radio-group :model-value="dimensionsType" @change="update($event as DimensionsType)" size="small">
    <el-radio-button label="radius" />
    <el-radio-button label="ellipse" />
    <el-radio-button label="bbox" />
  </el-radio-group>
  <ReadMore link="/guide/custom-hexes#dimensions" tooltip="Read more about hex dimensions" />
  <div class="variable-input">
    <el-input-number
      v-if="isNumber(modelValue)"
      :model-value="modelValue"
      @change="update($event as number)"
      :min="20"
      :max="100"
      value-on-clear="min"
    />
    <PairControl
      v-else-if="isEllipse(modelValue)"
      :values="[modelValue.xRadius, modelValue.yRadius]"
      :labels="['xRadius', 'yRadius']"
      label-width="64px"
      @change="update({ xRadius: $event![0], yRadius: $event![1] })"
    />
    <PairControl
      v-else
      :values="[modelValue.width, modelValue.height]"
      :labels="['width', 'height']"
      label-width="64px"
      @change="update({ width: $event![0], height: $event![1] })"
    />
  </div>
</template>

<style scoped>
.variable-input {
  margin: 8px 0;
  width: 100%;
}
</style>
