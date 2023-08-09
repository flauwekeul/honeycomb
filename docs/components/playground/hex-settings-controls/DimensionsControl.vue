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
import CoordinatesControl from '../CoordinatesControl.vue'

export interface DimensionsControlProps {
  dimensions: Dimensions
  orientation: Orientation
}

export type DimensionsControlEmits = {
  change: [value: Dimensions]
}

type Dimensions = HexOptions['dimensions']
type DimensionsType = 'radius' | 'ellipse' | 'bbox'

const props = defineProps<DimensionsControlProps>()
const emit = defineEmits<DimensionsControlEmits>()

const dimensionsType = computed<DimensionsType>(() => {
  if (isNumber(props.dimensions)) {
    return 'radius'
  } else if (isEllipse(props.dimensions)) {
    return 'ellipse'
  } else {
    return 'bbox'
  }
})

const update = (value: DimensionsType | Dimensions) => {
  if (value === 'radius') {
    emit('change', dimensionsToNumber(props.dimensions))
  } else if (value === 'ellipse') {
    emit('change', dimensionsToEllipse(props.dimensions, props.orientation))
  } else if (value === 'bbox') {
    emit('change', dimensionsToBBox(props.dimensions, props.orientation))
  } else {
    emit('change', value)
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
  <div class="variable-input">
    <el-input-number
      v-if="isNumber(dimensions)"
      :model-value="dimensions"
      @change="update($event as number)"
      :min="20"
      :max="100"
      value-on-clear="min"
    />
    <CoordinatesControl
      v-else-if="isEllipse(dimensions)"
      :values="[dimensions.xRadius, dimensions.yRadius]"
      :labels="['xRadius', 'yRadius']"
      label-width="64px"
      @change="update({ xRadius: $event[0], yRadius: $event[1] })"
    />
    <CoordinatesControl
      v-else
      :values="[dimensions.width, dimensions.height]"
      :labels="['width', 'height']"
      label-width="64px"
      @change="update({ width: $event[0], height: $event[1] })"
    />
  </div>
</template>

<style scoped>
.variable-input {
  margin: 8px 0;
  width: 100%;
}
</style>
