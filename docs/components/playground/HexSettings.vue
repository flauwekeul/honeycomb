<script setup lang="ts">
import { HexOptions, isNumber, isPoint } from '../../../src'
import CoordinatesControl from './CoordinatesControl.vue'

export type HexSettingsProps = HexOptions

export type ControlsEmits = {
  change: [value: HexSettingsProps]
}

const props = defineProps<HexSettingsProps>()
const emit = defineEmits<ControlsEmits>()

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
    <CoordinatesControl
      v-if="isPoint(origin)"
      :values="[origin.x, origin.y]"
      :labels="['x', 'y']"
      :step="10"
      @change="update('origin', { x: $event[0], y: $event[1] })"
    />
  </el-form-item>
  <!-- todo: support origin: 'topLeft' -->
  <el-form-item label="Offset">
    <el-radio-group :model-value="offset" @change="update('offset', $event)">
      <el-radio-button :label="-1" />
      <el-radio-button :label="1" />
    </el-radio-group>
  </el-form-item>
</template>
