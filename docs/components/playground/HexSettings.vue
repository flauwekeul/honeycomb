<script setup lang="ts">
import { computed, ref } from 'vue'
import { HexOptions, Point, isNumber } from '../../../src'
import CoordinatesControl from './CoordinatesControl.vue'
import { pointToTuple, tupleToPoint } from './shared'

export type HexSettingsProps = HexOptions

export type ControlsEmits = {
  change: [value: HexSettingsProps]
}

const props = defineProps<HexSettingsProps>()
const emit = defineEmits<ControlsEmits>()

type OriginType = 'point' | 'topLeft'
const originType = computed<OriginType>(() => (props.origin === 'topLeft' ? 'topLeft' : 'point'))
const cachedOriginPoint = ref<Point>(props.origin === 'topLeft' ? { x: 0, y: 0 } : props.origin)

const updateOrigin = (value: OriginType | Point) => {
  if (value === 'topLeft') {
    update('origin', 'topLeft')
  } else if (value === 'point') {
    update('origin', cachedOriginPoint.value)
  } else {
    cachedOriginPoint.value = value
    update('origin', value)
  }
}

const update = <T,>(propName: keyof HexSettingsProps, value: T) => {
  emit('change', { ...props, [propName]: value })
}
</script>

<template>
  <el-form-item label="Orientation">
    <el-radio-group :model-value="orientation" @change="update('orientation', $event)">
      <el-radio-button label="pointy" />
      <el-radio-button label="flat" />
    </el-radio-group>
  </el-form-item>
  <el-form-item label="Dimensions">
    <!-- todo: also support BoundingBox and Ellipse -->
    <el-input-number
      v-if="isNumber(dimensions)"
      :model-value="dimensions"
      @change="update('dimensions', $event)"
      :min="10"
      :max="100"
      :step="5"
      value-on-clear="min"
    />
  </el-form-item>
  <el-form-item label="Origin">
    <el-radio-group :model-value="originType" @change="updateOrigin($event as OriginType)">
      <el-radio label="topLeft" class="radio">
        <code>'topLeft'</code>
      </el-radio>
      <el-radio label="point" class="radio">
        <CoordinatesControl
          :values="origin === 'topLeft' ? pointToTuple(cachedOriginPoint) : pointToTuple(origin)"
          :labels="['x', 'y']"
          :step="10"
          @change="updateOrigin(tupleToPoint($event))"
        />
      </el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="Offset">
    <el-radio-group :model-value="offset" @change="update('offset', $event)">
      <el-radio-button :label="-1" />
      <el-radio-button :label="1" />
    </el-radio-group>
  </el-form-item>
</template>

<style scoped>
.radio {
  padding: 8px;
  height: initial;
  margin-right: 0;
  min-width: 190px;
}

.radio:first-child {
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base) var(--el-border-radius-base) 0 0;
}

.radio:last-child {
  border: 1px solid var(--el-border-color);
  border-top: 0;
  border-radius: 0 0 var(--el-border-radius-base) var(--el-border-radius-base);
}
</style>
