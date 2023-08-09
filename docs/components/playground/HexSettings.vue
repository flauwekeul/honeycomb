<script setup lang="ts">
import { HexOptions } from '../../../src'
import DimensionsControl from './hex-settings-controls/DimensionsControl.vue'
import OriginControl from './hex-settings-controls/OriginControl.vue'

export type HexSettingsProps = HexOptions

export type HexSettingsEmits = {
  change: [value: HexSettingsProps]
}

const props = defineProps<HexSettingsProps>()
const emit = defineEmits<HexSettingsEmits>()

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
    <DimensionsControl :dimensions="dimensions" :orientation="orientation" @change="update('dimensions', $event)" />
  </el-form-item>
  <el-form-item label="Origin">
    <OriginControl :origin="origin" @change="update('origin', $event)" />
  </el-form-item>
  <el-form-item label="Offset">
    <el-radio-group :model-value="offset" @change="update('offset', $event)">
      <el-radio-button :label="-1" />
      <el-radio-button :label="1" />
    </el-radio-group>
  </el-form-item>
</template>
